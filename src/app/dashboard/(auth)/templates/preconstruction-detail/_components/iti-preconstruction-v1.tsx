"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import type {
  PreconstructionDetailProject,
  PreconstructionStage,
  PreconstructionTaskStatus
} from "../_data";

import { PreconstructionTabLayout } from "./preconstruction-tab-layout";
import { TaskActionsMenu } from "./task-actions-menu";
import { TaskStatusDropdown } from "./task-status-dropdown";

type Props = {
  project: PreconstructionDetailProject;
  className?: string;
};

type StageTone = "done" | "in-progress" | "pending";

const countToneStyles: Record<StageTone, string> = {
  done: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  "in-progress": "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  pending: "bg-orange-500/15 text-orange-700 dark:text-orange-400"
};

function stageTone(completed: number, total: number): StageTone {
  if (total > 0 && completed === total) return "done";
  if (completed > 0) return "in-progress";
  return "pending";
}

export function ItiPreconstructionV1({ project, className }: Props) {
  const [stages, setStages] = useState<PreconstructionStage[]>(project.stages);

  function updateStatus(stageId: string, taskId: string, status: PreconstructionTaskStatus) {
    setStages((prev) =>
      prev.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              tasks: stage.tasks.map((task) => (task.id === taskId ? { ...task, status } : task))
            }
          : stage
      )
    );
  }

  return (
    <PreconstructionTabLayout categories={project.categories} className={className}>
      <section className="bg-card overflow-hidden rounded-2xl border" data-slot="stage-list">
        {stages.map((stage, index) => (
          <StageCard
            key={stage.id}
            stage={stage}
            defaultOpen={index === 0}
            isLast={index === stages.length - 1}
            onStatusChange={updateStatus}
          />
        ))}
      </section>
    </PreconstructionTabLayout>
  );
}

type StageCardProps = {
  stage: PreconstructionStage;
  defaultOpen: boolean;
  isLast: boolean;
  onStatusChange: (stageId: string, taskId: string, status: PreconstructionTaskStatus) => void;
};

function StageCard({ stage, defaultOpen, isLast, onStatusChange }: StageCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion() ?? false;
  const completed = stage.tasks.filter((task) => task.status === "completed").length;
  const total = stage.tasks.length;
  const tone = stageTone(completed, total);

  return (
    <div className={cn(!isLast && "border-border border-b")} data-slot="stage-card">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="hover:bg-muted/40 flex w-full items-center gap-3 px-5 py-4 text-left transition-colors"
      >
        <ChevronDown
          className={cn(
            "text-muted-foreground size-4 shrink-0 transition-transform duration-200",
            !open && "-rotate-90"
          )}
        />
        <span className="text-foreground flex-1 text-base font-semibold">{stage.label}</span>
        <span
          className={cn(
            "rounded-md px-2.5 py-1 text-sm font-semibold tabular-nums",
            countToneStyles[tone]
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
            <motion.ul
              className="bg-muted/40 divide-border border-border divide-y border-t"
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "show"}
              variants={
                reduceMotion
                  ? undefined
                  : {
                      hidden: {},
                      show: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } }
                    }
              }
            >
              {stage.tasks.map((task) => (
                <motion.li
                  key={task.id}
                  variants={
                    reduceMotion
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 6 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.25, ease: "easeOut" }
                          }
                        }
                  }
                  className="group hover:bg-background px-5 py-3 transition-colors"
                >
                  <div className="flex items-center gap-4 transition-transform motion-safe:group-hover:-translate-x-0.5">
                    <span className="text-foreground w-20 shrink-0 text-sm font-medium">
                      {task.label}
                    </span>
                    <span className="text-muted-foreground group-hover:text-foreground flex-1 truncate text-sm transition-colors">
                      {task.staff}
                    </span>
                    <TaskStatusDropdown
                      status={task.status}
                      onStatusChange={(status) => onStatusChange(stage.id, task.id, status)}
                    />
                    <span className="text-muted-foreground group-hover:text-foreground hidden w-28 shrink-0 text-right text-sm tabular-nums transition-colors sm:block">
                      {task.date}
                    </span>
                    <TaskActionsMenu />
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
