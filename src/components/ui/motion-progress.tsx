"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type Props = {
  value: number;
  index?: number;
  className?: string;
  trackClassName?: string;
  showLabel?: boolean;
};

export function MotionProgress({
  value,
  index = 0,
  className,
  trackClassName,
  showLabel = true
}: Props) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("bg-muted h-1 w-32 overflow-hidden rounded-full", trackClassName)}>
        <motion.div
          className="bg-primary h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, delay: index * 0.03 + 0.15, ease: "easeOut" }}
        />
      </div>
      {showLabel ? <span className="text-muted-foreground w-10 text-sm">{value}%</span> : null}
    </div>
  );
}
