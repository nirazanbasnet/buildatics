"use client";

import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"tr"> & { index?: number };

export function MotionTableRow({ index = 0, className, ...props }: Props) {
  return (
    <motion.tr
      data-slot="table-row"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03, ease: "easeOut" }}
      className={cn(
        "group hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}
