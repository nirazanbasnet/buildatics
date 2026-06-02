"use client";

import { BarChart3, Clock, DollarSign, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { PreconstructionDetailProject } from "../_data";

type StatCardProps = {
  label: string;
  value: string;
  valueSuffix?: string;
  caption?: React.ReactNode;
  icon: LucideIcon;
  index: number;
  reduceMotion: boolean;
};

function StatCard({
  label,
  value,
  valueSuffix,
  caption,
  icon: Icon,
  index,
  reduceMotion
}: StatCardProps) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              y: 0,
              transition: { duration: 0.25, delay: index * 0.05, ease: "easeOut" }
            }
      }
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="bg-card flex flex-col gap-3 rounded-2xl border p-5 transition-shadow hover:shadow-md"
    >
      <header className="flex items-start justify-between gap-3">
        <p className="text-muted-foreground text-sm">{label}</p>
        <span className="bg-muted text-foreground flex size-9 shrink-0 items-center justify-center rounded-full">
          <Icon className="size-4" />
        </span>
      </header>
      <p className="text-foreground text-3xl font-bold tracking-tight">
        {value}
        {valueSuffix ? (
          <span className="text-foreground/80 ml-1 text-lg font-semibold">{valueSuffix}</span>
        ) : null}
      </p>
      {caption ? <div className="text-muted-foreground text-sm">{caption}</div> : null}
    </motion.article>
  );
}

type Props = {
  project: PreconstructionDetailProject;
};

export function PreconstructionDetailStats({ project }: Props) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StatCard
        label="Progress"
        value={String(project.progress)}
        valueSuffix="%"
        icon={BarChart3}
        index={0}
        reduceMotion={reduceMotion}
        caption={
          <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={reduceMotion ? false : { width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            />
          </div>
        }
      />
      <StatCard
        label="Total Budget"
        value={project.totalBudget}
        icon={DollarSign}
        index={1}
        reduceMotion={reduceMotion}
        caption={`Spent ${project.spent}`}
      />
      <StatCard
        label="Timeline"
        value={project.timeline}
        icon={Clock}
        index={2}
        reduceMotion={reduceMotion}
        caption={project.timelineDate}
      />
      <StatCard
        label="Stage"
        value={project.stage}
        icon={Settings}
        index={3}
        reduceMotion={reduceMotion}
        caption={project.stageStatus}
      />
    </div>
  );
}
