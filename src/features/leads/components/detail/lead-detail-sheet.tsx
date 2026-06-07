"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Activity,
  Building2,
  FileText,
  LayoutDashboard,
  ListChecks,
  MapPin,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";

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

import { loadLeadDetail } from "../../actions/load-lead-detail";
import { updateLeadStatus } from "../../actions/update-lead-status";
import type { LeadDetail } from "../../lib/lead-detail-types";
import type { LeadOptions } from "../../types";
import { EditLeadSheet } from "../add-lead/edit-lead-sheet";
import { OverviewTab } from "./overview-tab";
import { TasksTab } from "./tasks-tab";
import { QuotesTab } from "./quotes-tab";
import { ActivityTab } from "./activity-tab";
import { DesignsTab } from "./designs-tab";

type TabId = "overview" | "tasks" | "quotes" | "activity" | "designs";

const TAB_ITEMS: SegmentedNavItem<TabId>[] = [
  { value: "overview", label: "Overview", icon: LayoutDashboard },
  { value: "tasks", label: "Tasks", icon: ListChecks },
  { value: "quotes", label: "Quotes", icon: FileText },
  { value: "activity", label: "Activity", icon: Activity },
  { value: "designs", label: "Designs", icon: Building2 },
];

type LeadDetailSheetProps = {
  leadId: string | null;
  leadNo?: string;
  options: LeadOptions;
  onOpenChange: (open: boolean) => void;
  onChanged?: () => void;
};

export function LeadDetailSheet({
  leadId,
  leadNo,
  options,
  onOpenChange,
  onChanged,
}: LeadDetailSheetProps) {
  const open = leadId !== null;
  const reduceMotion = useReducedMotion() ?? false;
  const [detail, setDetail] = useState<LeadDetail | null>(null);
  const [isLoading, startLoad] = useTransition();
  const [, startStatus] = useTransition();
  const [tab, setTab] = useState<TabId>("overview");
  const [editId, setEditId] = useState<string | null>(null);

  function refresh(id: string) {
    startLoad(async () => {
      const res = await loadLeadDetail(id);
      if (res.ok) setDetail(res.data);
    });
  }

  useEffect(() => {
    if (!leadId) {
      setDetail(null);
      return;
    }
    setTab("overview");
    refresh(leadId);
  }, [leadId]);

  function changeStatus(status: number) {
    if (!leadId) return;
    startStatus(async () => {
      const res = await updateLeadStatus(leadId, status);
      if (res.ok) {
        toast.success("Status updated");
        refresh(leadId);
        onChanged?.();
      } else {
        toast.error(res.error ?? "Failed to update the status.");
      }
    });
  }

  const overview = detail?.overview;

  return (
    <>
      <Sheet open={open} onOpenChange={(o) => !o && onOpenChange(false)}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full gap-0 overflow-y-auto p-0 sm:max-w-3xl lg:max-w-5xl"
        >
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>
                Lead detail — {overview?.leadNo ?? leadNo ?? ""}
              </SheetTitle>
              <SheetDescription>Lead detail view</SheetDescription>
            </SheetHeader>
          </VisuallyHidden>

          <SheetMobileBar
            onClose={() => onOpenChange(false)}
            title={overview?.leadNo ?? leadNo ?? "Lead"}
          />

          {isLoading && !detail ? (
            <div className="space-y-4 p-4 sm:p-6">
              <Skeleton className="h-10 w-full rounded-md" />
              <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
                <div className="space-y-4">
                  <Skeleton className="h-24 rounded-2xl" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-24 rounded-2xl" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-40 rounded-2xl" />
              </div>
            </div>
          ) : detail && leadId && overview ? (
            <div className="flex flex-col gap-4 p-4 sm:p-6">
              <SegmentedNav<TabId>
                items={TAB_ITEMS}
                value={tab}
                onValueChange={setTab}
                ariaLabel="Lead views"
              />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {tab === "overview" ? (
                    <OverviewTab
                      overview={overview}
                      onEdit={() => setEditId(leadId)}
                      onStatusChange={changeStatus}
                    />
                  ) : tab === "tasks" ? (
                    <TasksTab
                      overview={overview}
                      leadId={leadId}
                      tasks={detail.tasks}
                      onChanged={() => refresh(leadId)}
                    />
                  ) : tab === "quotes" ? (
                    <QuotesTab
                      overview={overview}
                      leadId={leadId}
                      quotes={detail.quotes}
                      onChanged={() => refresh(leadId)}
                    />
                  ) : tab === "activity" ? (
                    <ActivityTab
                      overview={overview}
                      leadId={leadId}
                      activity={detail.activity}
                      onChanged={() => refresh(leadId)}
                    />
                  ) : (
                    <DesignsTab
                      overview={overview}
                      leadId={leadId}
                      designs={detail.designs}
                      designOptions={detail.designOptions}
                      onChanged={() => refresh(leadId)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex min-h-[60vh] items-center justify-center p-6">
              <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <MapPin className="size-4" />
                Couldn&apos;t load this lead.
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <EditLeadSheet
        leadId={editId}
        options={options}
        onOpenChange={() => setEditId(null)}
        onSaved={() => {
          setEditId(null);
          if (leadId) refresh(leadId);
          onChanged?.();
        }}
      />
    </>
  );
}
