"use client";

import { useId } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export type SegmentedNavItem<T extends string = string> = {
  value: T;
  label?: React.ReactNode;
  icon?: LucideIcon;
};

type Props<T extends string> = {
  items: ReadonlyArray<SegmentedNavItem<T>>;
  value: T;
  onValueChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
};

export function SegmentedNav<T extends string>({
  items,
  value,
  onValueChange,
  ariaLabel,
  className
}: Props<T>) {
  const layoutId = useId();

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      data-slot="segmented-nav"
      className={cn(
        "border-border inline-flex w-full shrink-0 items-center overflow-hidden rounded-md border",
        className
      )}
    >
      {items.map((item) => {
        const isActive = item.value === value;
        const Icon = item.icon;
        return (
          <motion.button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={item.value}
            onClick={() => onValueChange(item.value)}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "focus-visible:ring-ring border-border relative flex flex-1 items-center justify-center gap-2 border-r px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors last:border-r-0 focus-visible:ring-2 focus-visible:outline-none",
              isActive
                ? "text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {isActive ? (
              <motion.span
                layoutId={layoutId}
                className="bg-primary absolute inset-0 z-0"
                transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden
              />
            ) : null}
            <span className="relative z-10 flex items-center gap-2">
              {Icon ? <Icon className="size-4" /> : null}
              <span className={cn(Icon && "hidden min-[30rem]:inline")}>
                {item.label ?? item.value}
              </span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
