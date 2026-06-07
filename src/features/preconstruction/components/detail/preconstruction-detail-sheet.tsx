"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Calendar,
  FileText,
  HardHat,
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
import type { LeadOptions } from "@/features/leads/types";

import { loadProjectDetail } from "../../actions/load-detail";
import { updateProjectStatus } from "../../actions/update-status";
import type { ProjectDetail } from "../../lib/detail-types";
import { EditProjectSheet } from "../add-project/edit-project-sheet";
import { OverviewTab } from "./overview-tab";
import { ItiTab } from "./iti-tab";
import { TasksTab } from "./tasks-tab";
import { DocumentsTab } from "./documents-tab";
import { TimelineTab } from "./timeline-tab";

type TabId = "overview" | "iti" | "tasks" | "documents" | "timeline";

const TAB_ITEMS: SegmentedNavItem<TabId>[] = [
  { value: "overview", label: "Overview", icon: LayoutDashboard },
  { value: "iti", label: "ITI Preconstruction", icon: HardHat },
  { value: "tasks", label: "Tasks", icon: ListChecks },
  { value: "documents", label: "Documents", icon: FileText },
  { value: "timeline", label: "Timeline", icon: Calendar },
];

type PreconstructionDetailSheetProps = {
  leadId: string | null;
  projectNo?: string;
  address?: string;
  options: LeadOptions;
  onOpenChange: (open: boolean) => void;
  onChanged?: () => void;
};

export function PreconstructionDetailSheet({
  leadId,
  projectNo,
  options,
  onOpenChange,
  onChanged,
}: PreconstructionDetailSheetProps) {
  const open = leadId !== null;
  const reduceMotion = useReducedMotion() ?? false;
  const [detail, setDetail] = useState<ProjectDetail | null>(null);
  const [isLoading, startLoad] = useTransition();
  const [, startStatus] = useTransition();
  const [tab, setTab] = useState<TabId>("overview");
  const [editId, setEditId] = useState<string | null>(null);

  function refresh(id: string) {
    startLoad(async () => {
      const res = await loadProjectDetail(id);
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
      const res = await updateProjectStatus(leadId, status);
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
                Preconstruction detail —{" "}
                {overview?.projectNo ?? projectNo ?? ""}
              </SheetTitle>
              <SheetDescription>Project detail view</SheetDescription>
            </SheetHeader>
          </VisuallyHidden>

          {/* Mobile-only top bar (Back + Close); the desktop X is removed via showCloseButton={false}. */}
          <SheetMobileBar
            onClose={() => onOpenChange(false)}
            title={overview?.projectNo ?? projectNo ?? "Project"}
          />

          {isLoading && !detail ? (
            <div className="space-y-4 p-4 sm:p-6">
              <Skeleton className="h-10 w-full rounded-md" />
              <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
                <div className="space-y-4">
                  <Skeleton className="h-24 rounded-2xl" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="h-28 rounded-2xl" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-72 rounded-2xl" />
              </div>
            </div>
          ) : detail && leadId && overview ? (
            <div className="flex flex-col gap-4 p-4 sm:p-6">
              <SegmentedNav<TabId>
                items={TAB_ITEMS}
                value={tab}
                onValueChange={setTab}
                ariaLabel="Preconstruction views"
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
                  ) : tab === "iti" ? (
                    <ItiTab overview={overview} />
                  ) : tab === "tasks" ? (
                    <TasksTab
                      overview={overview}
                      leadId={leadId}
                      tasks={detail.tasks}
                      onChanged={() => refresh(leadId)}
                    />
                  ) : tab === "documents" ? (
                    <DocumentsTab
                      overview={overview}
                      leadId={leadId}
                      documents={detail.documents}
                      onChanged={() => refresh(leadId)}
                    />
                  ) : (
                    <TimelineTab
                      overview={overview}
                      leadId={leadId}
                      timeline={detail.timeline}
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
                Couldn&apos;t load this project.
              </p>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <EditProjectSheet
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
