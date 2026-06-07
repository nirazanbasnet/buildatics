"use client";

import { BarChart3, DollarSign, Layers, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { LeadOverview } from "../../lib/lead-detail-types";

function StatCard({
  label,
  value,
  caption,
  icon: Icon,
  index,
  reduceMotion,
}: {
  label: string;
  value: string;
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
      <p className="text-foreground text-2xl font-bold tracking-tight">
        {value}
      </p>
      {caption ? (
        <div className="text-muted-foreground text-sm">{caption}</div>
      ) : null}
    </motion.article>
  );
}

type DetailStatsProps = {
  overview: LeadOverview;
};

export function DetailStats({ overview }: DetailStatsProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StatCard
        label="Status"
        value={overview.status}
        icon={Layers}
        index={0}
        reduceMotion={reduceMotion}
      />
      <StatCard
        label="Stage"
        value={overview.stage}
        icon={Settings}
        index={1}
        reduceMotion={reduceMotion}
      />
      <StatCard
        label="Progress"
        value={`${overview.progress}%`}
        icon={BarChart3}
        index={2}
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
        label="Budget"
        value={overview.budget}
        icon={DollarSign}
        index={3}
        reduceMotion={reduceMotion}
      />
    </div>
  );
}
