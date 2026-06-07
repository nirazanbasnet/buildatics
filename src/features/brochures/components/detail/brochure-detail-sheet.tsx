"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Calendar,
  CalendarDays,
  Download,
  FileText,
  Home,
  LayoutDashboard,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  SegmentedNav,
  type SegmentedNavItem,
} from "@src/components/ui/segmented-nav";
import { SheetMobileBar } from "@src/components/ui/sheet-mobile-bar";

import { loadBrochureDetail } from "../../actions/load-brochure-detail";
import type { BrochureDetailModel } from "../../lib/types";
import { NoApiData, NoApiDataBlock } from "../no-api-data";

type TabId = "builder" | "preview" | "history";

const TAB_ITEMS: SegmentedNavItem<TabId>[] = [
  { value: "builder", label: "Brochure Builder", icon: LayoutDashboard },
  { value: "preview", label: "Preview", icon: FileText },
  { value: "history", label: "History", icon: Calendar },
];

type BrochureDetailSheetProps = {
  brochureId: string | null;
  brochureName?: string;
  onOpenChange: (open: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string, name: string) => void;
};

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Home;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" />
      </span>
      <span className="text-foreground flex-1 text-sm font-medium">
        {label}
      </span>
      <span className="text-muted-foreground text-right text-sm">
        {children}
      </span>
    </li>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card rounded-2xl border p-5">
      <h3 className="text-foreground text-base font-semibold">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function BrochureDetailSheet({
  brochureId,
  brochureName,
  onOpenChange,
  onEdit,
  onDelete,
}: BrochureDetailSheetProps) {
  const open = brochureId !== null;
  const reduceMotion = useReducedMotion() ?? false;
  const [detail, setDetail] = useState<BrochureDetailModel | null>(null);
  const [isLoading, startLoad] = useTransition();
  const [tab, setTab] = useState<TabId>("builder");

  useEffect(() => {
    if (!brochureId) {
      setDetail(null);
      return;
    }
    setTab("builder");
    startLoad(async () => {
      const res = await loadBrochureDetail(brochureId);
      if (res.ok) setDetail(res.data);
    });
  }, [brochureId]);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onOpenChange(false)}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full gap-0 overflow-y-auto p-0 sm:max-w-3xl lg:max-w-5xl"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>
              Brochure detail — {detail?.name ?? brochureName ?? ""}
            </SheetTitle>
            <SheetDescription>
              Brochure builder, preview and history
            </SheetDescription>
          </SheetHeader>
        </VisuallyHidden>

        <SheetMobileBar
          onClose={() => onOpenChange(false)}
          title={detail?.name ?? brochureName ?? "Brochure"}
        />

        {isLoading && !detail ? (
          <div className="space-y-4 p-4 sm:p-6">
            <Skeleton className="h-10 w-full rounded-md" />
            <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
              <Skeleton className="h-72 rounded-2xl" />
              <Skeleton className="h-48 rounded-2xl" />
            </div>
          </div>
        ) : detail ? (
          <div className="flex flex-col gap-4 p-4 sm:p-6">
            <SegmentedNav<TabId>
              items={TAB_ITEMS}
              value={tab}
              onValueChange={setTab}
              ariaLabel="Brochure views"
            />

            <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <div className="min-w-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex flex-col gap-4"
                  >
                    {tab === "builder" ? (
                      <>
                        <section className="bg-card rounded-2xl border p-5">
                          <ul className="flex flex-col gap-3.5">
                            <InfoRow icon={FileText} label="#Ref">
                              {detail.name}
                            </InfoRow>
                            <InfoRow icon={MapPin} label="Site Address">
                              <NoApiData />
                            </InfoRow>
                            <InfoRow icon={Home} label="Brochure Template">
                              {detail.templateName || <NoApiData />}
                            </InfoRow>
                          </ul>
                        </section>
                        <SectionCard title="Owners">
                          <NoApiDataBlock />
                        </SectionCard>
                        <SectionCard title="Property Info">
                          <NoApiDataBlock />
                        </SectionCard>
                        <SectionCard title="Attached Designs">
                          <NoApiDataBlock />
                        </SectionCard>
                      </>
                    ) : tab === "preview" ? (
                      <section className="bg-card overflow-hidden rounded-2xl border">
                        {detail.htmlUrl ? (
                          <iframe
                            title={`${detail.name} preview`}
                            src={detail.htmlUrl}
                            sandbox="allow-same-origin"
                            className="min-h-[32rem] w-full"
                          />
                        ) : (
                          <div className="p-5">
                            <NoApiDataBlock label="No brochure file in API" />
                          </div>
                        )}
                      </section>
                    ) : (
                      <SectionCard title="History">
                        <NoApiDataBlock />
                      </SectionCard>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <aside className="flex flex-col gap-3">
                <section className="bg-card rounded-2xl border p-5">
                  <ul className="flex flex-col gap-3.5">
                    <InfoRow icon={CalendarDays} label="Date Created">
                      {detail.created}
                    </InfoRow>
                    <InfoRow icon={FileText} label="Status">
                      <NoApiData />
                    </InfoRow>
                  </ul>
                </section>

                <Card className="gap-2 p-3">
                  <Button
                    asChild
                    variant="secondary"
                    className="h-10 justify-center gap-2"
                  >
                    <a
                      href={`/api/brochures/${detail.id}/pdf`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Download className="size-4" />
                      Download PDF
                    </a>
                  </Button>
                  <Button
                    variant="secondary"
                    className="h-10 justify-center gap-2"
                    onClick={() => onEdit(detail.id)}
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    className="text-destructive h-10 justify-center gap-2"
                    onClick={() => onDelete(detail.id, detail.name)}
                  >
                    <Trash2 className="size-4" />
                    Delete
                  </Button>
                </Card>

                <p className="text-muted-foreground/70 px-1 text-xs">
                  Mark as Sent, Send Mail and Call actions: <NoApiData />
                </p>
              </aside>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[60vh] items-center justify-center p-6">
            <p className="text-muted-foreground text-sm">
              Couldn&apos;t load this brochure.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
