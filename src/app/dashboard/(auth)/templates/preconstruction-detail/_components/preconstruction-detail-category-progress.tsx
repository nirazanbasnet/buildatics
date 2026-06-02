"use client";

import { Check, MinusCircle, MoreHorizontal } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

import type { PreconstructionCategory, PreconstructionCategoryStatus } from "../_data";

const statusStyles: Record<PreconstructionCategoryStatus, { wrapper: string; icon: typeof Check }> =
  {
    done: {
      wrapper: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      icon: Check
    },
    "in-progress": {
      wrapper: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
      icon: MoreHorizontal
    },
    pending: {
      wrapper: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
      icon: MinusCircle
    }
  };

type Props = {
  categories: PreconstructionCategory[];
};

export function PreconstructionDetailCategoryProgress({ categories }: Props) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="bg-card rounded-2xl border p-5">
      <h3 className="text-foreground text-base font-semibold">Category Progress</h3>
      <ul className="mt-4 flex flex-col gap-3">
        {categories.map((category, index) => {
          const { wrapper, icon: Icon } = statusStyles[category.status];
          const motionProps = reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 4 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.25, delay: index * 0.03, ease: "easeOut" as const }
              };
          return (
            <motion.li
              key={category.id}
              {...motionProps}
              className="group hover:bg-muted/50 -mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors"
            >
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full",
                  wrapper
                )}
              >
                <Icon className="size-4" />
              </span>
              <span className="text-foreground flex-1 text-sm font-medium">{category.label}</span>
              <span className="text-muted-foreground group-hover:text-foreground text-sm tabular-nums transition-all motion-safe:group-hover:-translate-x-0.5">
                {category.completed}/{category.total}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
