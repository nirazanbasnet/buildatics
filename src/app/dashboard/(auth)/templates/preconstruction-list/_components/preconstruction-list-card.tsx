"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown, MapPin, Settings, User, UserCog } from "lucide-react";

import { cn } from "@/lib/utils";

import { preconstructionListStatusLabels, type PreconstructionListProject } from "../_data";

type Props = {
  project: PreconstructionListProject;
  className?: string;
  onClick?: () => void;
  index?: number;
};

function Row({ icon: Icon, label, value }: { icon: typeof MapPin; label?: string; value: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4" />
      </span>
      {label ? (
        <>
          <span className="text-foreground flex-1 self-center text-sm font-medium">{label}</span>
          <span className="text-muted-foreground self-center text-sm">{value}</span>
        </>
      ) : (
        <span className="text-foreground flex-1 self-center text-sm leading-snug">{value}</span>
      )}
    </li>
  );
}

export function PreconstructionListCard({ project, className, onClick, index = 0 }: Props) {
  const interactive = Boolean(onClick);
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={cn(
        "bg-card flex flex-col gap-5 rounded-2xl border p-5 shadow-sm",
        interactive &&
          "focus-visible:ring-ring cursor-pointer transition duration-300 hover:-translate-y-1.5 hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <h3 className="text-foreground text-xl font-bold tracking-tight">{project.projectNo}</h3>
        <button
          type="button"
          className="inline-flex min-w-28 items-center justify-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500"
        >
          {preconstructionListStatusLabels[project.status]}
          <ChevronDown className="size-3.5" />
        </button>
      </header>

      <ul className="flex flex-1 flex-col gap-3">
        <Row icon={MapPin} value={project.address} />
        <Row icon={Settings} label="Stage" value={project.stage} />
        <Row icon={UserCog} label="Developer" value={project.developer} />
        <Row icon={User} label="Client" value={project.council} />
      </ul>

      <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
        <motion.div
          className="bg-primary h-full rounded-full"
          initial={reduceMotion ? false : { width: 0 }}
          animate={{ width: `${project.progress}%` }}
          transition={{ duration: 0.5, delay: index * 0.06 + 0.15, ease: "easeOut" }}
        />
      </div>
    </motion.article>
  );
}
