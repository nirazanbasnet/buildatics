"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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

const barToneStyles: Record<StageTone, string> = {
  done: "bg-emerald-500",
  "in-progress": "bg-blue-500",
  pending: "bg-orange-500"
};

const textToneStyles: Record<StageTone, string> = {
  done: "text-emerald-700 dark:text-emerald-400",
  "in-progress": "text-blue-700 dark:text-blue-400",
  pending: "text-orange-700 dark:text-orange-400"
};

const dotToneStyles: Record<PreconstructionTaskStatus, string> = {
  completed: "bg-emerald-500",
  "in-progress": "bg-blue-500",
  pending: "bg-amber-500"
};

function stageTone(completed: number, total: number): StageTone {
  if (total > 0 && completed === total) return "done";
  if (completed > 0) return "in-progress";
  return "pending";
}

export function ItiPreconstructionV2({ project, className }: Props) {
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
          <StageSection
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

type StageSectionProps = {
  stage: PreconstructionStage;
  defaultOpen: boolean;
  isLast: boolean;
  onStatusChange: (stageId: string, taskId: string, status: PreconstructionTaskStatus) => void;
};

function StageSection({ stage, defaultOpen, isLast, onStatusChange }: StageSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const completed = stage.tasks.filter((task) => task.status === "completed").length;
  const total = stage.tasks.length;
  const tone = stageTone(completed, total);
  const fillPct = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className={cn(!isLast && "border-border border-b")} data-slot="stage-section">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="hover:bg-muted/40 flex w-full items-center gap-4 px-5 py-4 text-left transition-colors"
      >
        <ChevronDown
          className={cn(
            "text-muted-foreground size-4 shrink-0 transition-transform duration-200",
            !open && "-rotate-90"
          )}
        />
        <span className="text-foreground flex-1 text-base font-semibold">{stage.label}</span>
        <div className="bg-muted hidden h-1.5 w-24 overflow-hidden rounded-full sm:block">
          <div
            className={cn(
              "h-full rounded-full transition-[width] duration-300",
              barToneStyles[tone]
            )}
            style={{ width: `${fillPct}%` }}
          />
        </div>
        <span className={cn("text-sm font-semibold tabular-nums", textToneStyles[tone])}>
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
            <ul className="flex flex-col gap-1 px-3 pb-3">
              {stage.tasks.map((task) => (
                <li
                  key={task.id}
                  className="hover:bg-muted/50 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
                >
                  <span
                    className={cn("size-2 shrink-0 rounded-full", dotToneStyles[task.status])}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm font-medium">{task.label}</p>
                    <p className="text-muted-foreground truncate text-xs">
                      {task.staff} · {task.date}
                    </p>
                  </div>
                  <TaskStatusDropdown
                    status={task.status}
                    onStatusChange={(status) => onStatusChange(stage.id, task.id, status)}
                  />
                  <TaskActionsMenu />
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
