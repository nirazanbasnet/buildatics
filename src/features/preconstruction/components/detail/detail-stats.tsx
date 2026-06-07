"use client";

import { BarChart3, Clock, DollarSign, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { STATIC_STATS } from "../../lib/detail-static";
import type { ProjectOverview } from "../../lib/detail-types";

function StatCard({
  label,
  value,
  valueSuffix,
  caption,
  icon: Icon,
  index,
  reduceMotion,
}: {
  label: string;
  value: string;
  valueSuffix?: string;
  caption?: React.ReactNode;
  icon: LucideIcon;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
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
          <span className="text-foreground/80 ml-1 text-lg font-semibold">
            {valueSuffix}
          </span>
        ) : null}
      </p>
      {caption ? (
        <div className="text-muted-foreground text-sm">{caption}</div>
      ) : null}
    </motion.article>
  );
}

type DetailStatsProps = {
  overview: ProjectOverview;
};

// Four stat cards matching the design. Progress/Stage use real data; Budget falls back to a placeholder,
// and Spent/Timeline are design placeholders (no API — see lib/detail-static.ts).
export function DetailStats({ overview }: DetailStatsProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StatCard
        label="Progress"
        value={String(overview.progress)}
        valueSuffix="%"
        icon={BarChart3}
        index={0}
        reduceMotion={reduceMotion}
        caption={
          <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={reduceMotion ? false : { width: 0 }}
              animate={{ width: `${overview.progress}%` }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            />
          </div>
        }
      />
      <StatCard
        label="Total Budget"
        value={
          overview.budget !== "—"
            ? overview.budget
            : STATIC_STATS.budgetFallback
        }
        icon={DollarSign}
        index={1}
        reduceMotion={reduceMotion}
        caption={STATIC_STATS.spent}
      />
      <StatCard
        label="Timeline"
        value={STATIC_STATS.timeline}
        icon={Clock}
        index={2}
        reduceMotion={reduceMotion}
        caption={STATIC_STATS.timelineDate}
      />
      <StatCard
        label="Stage"
        value={overview.stage}
        icon={Settings}
        index={3}
        reduceMotion={reduceMotion}
        caption={STATIC_STATS.stageStatus}
      />
    </div>
  );
}
