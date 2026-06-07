"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { STATIC_ITI_STAGES, type ProjectStage } from "../../lib/detail-static";
import type { ProjectOverview } from "../../lib/detail-types";
import { TabLayout } from "./tab-layout";

type ItiTabProps = {
  overview: ProjectOverview;
};

type StageTone = "done" | "in-progress" | "pending";

const countToneStyles: Record<StageTone, string> = {
  done: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  "in-progress": "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  pending: "bg-orange-500/15 text-orange-700 dark:text-orange-400",
};

function stageTone(completed: number, total: number): StageTone {
  if (total > 0 && completed === total) return "done";
  if (completed > 0) return "in-progress";
  return "pending";
}

// ITI Preconstruction — design placeholder stages/tasks (no API). See lib/detail-static.ts.
export function ItiTab({ overview }: ItiTabProps) {
  return (
    <TabLayout overview={overview}>
      <section
        className="bg-card overflow-hidden rounded-2xl border"
        data-slot="stage-list"
      >
        {STATIC_ITI_STAGES.map((stage, index) => (
          <StageCard
            key={stage.id}
            stage={stage}
            defaultOpen={index === 0}
            isLast={index === STATIC_ITI_STAGES.length - 1}
          />
        ))}
      </section>
    </TabLayout>
  );
}

function StageCard({
  stage,
  defaultOpen,
  isLast,
}: {
  stage: ProjectStage;
  defaultOpen: boolean;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const completed = stage.tasks.filter((t) => t.status === "completed").length;
  const total = stage.tasks.length;
  const tone = stageTone(completed, total);

  return (
    <div
      className={cn(!isLast && "border-border border-b")}
      data-slot="stage-card"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="hover:bg-muted/40 flex w-full items-center gap-3 px-5 py-4 text-left transition-colors"
      >
        <ChevronDown
          className={cn(
            "text-muted-foreground size-4 shrink-0 transition-transform duration-200",
            !open && "-rotate-90",
          )}
        />
        <span className="text-foreground flex-1 text-base font-semibold">
          {stage.label}
        </span>
        <span
          className={cn(
            "rounded-md px-2.5 py-1 text-sm font-semibold tabular-nums",
            countToneStyles[tone],
          )}
        >
          {completed}/{total}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <ul className="bg-muted/40 divide-border border-border divide-y border-t">
              {stage.tasks.map((task) => (
                <li
                  key={task.id}
                  className="group hover:bg-background flex items-center gap-4 px-5 py-3 transition-colors"
                >
                  <span className="text-foreground w-20 shrink-0 text-sm font-medium">
                    {task.label}
                  </span>
                  <span className="text-muted-foreground flex-1 truncate text-sm">
                    {task.staff}
                  </span>
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-xs font-medium capitalize",
                      countToneStyles[
                        task.status === "completed"
                          ? "done"
                          : task.status === "in-progress"
                            ? "in-progress"
                            : "pending"
                      ],
                    )}
                  >
                    {task.status.replace("-", " ")}
                  </span>
                  <span className="text-muted-foreground hidden w-28 shrink-0 text-right text-sm tabular-nums sm:block">
                    {task.date}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
