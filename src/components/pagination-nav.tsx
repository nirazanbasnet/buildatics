"use client";

import { useId, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaginationNavProps = {
  totalPages?: number;
  defaultPage?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  className?: string;
};

export function PaginationNav({
  totalPages = 4,
  defaultPage = 3,
  page: controlledPage,
  onPageChange,
  className,
}: PaginationNavProps) {
  const reduceMotion = useReducedMotion() ?? false;
  // Unique per instance so multiple paginations on one page don't share the
  // animated pill's layoutId (which would make it jump between them).
  const pillId = useId();
  const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);

  const isControlled = controlledPage != null;
  const page = isControlled ? controlledPage : uncontrolledPage;

  const setPage = (next: number) => {
    const clamped = Math.min(totalPages, Math.max(1, next));
    if (!isControlled) setUncontrolledPage(clamped);
    onPageChange?.(clamped);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className={cn("mt-4 flex items-center justify-end gap-1", className)}
    >
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1 px-2 text-sm"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <ChevronLeft className="size-4" />
        Previous
      </Button>
      {pages.map((p) => {
        const isActive = p === page;
        return (
          <motion.button
            key={p}
            type="button"
            onClick={() => setPage(p)}
            aria-current={isActive ? "page" : undefined}
            whileTap={{ scale: 0.9 }}
            className={cn(
              "focus-visible:ring-ring relative flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none",
              isActive
                ? "text-primary-foreground z-10"
                : "bg-muted text-foreground hover:bg-muted/80"
            )}
          >
            {isActive ? (
              reduceMotion ? (
                <span aria-hidden className="bg-primary absolute inset-0 z-0 rounded-full" />
              ) : (
                <motion.span
                  aria-hidden
                  layoutId={`pagination-active-pill-${pillId}`}
                  transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-primary absolute inset-0 z-0 rounded-full"
                />
              )
            ) : null}
            <span className="relative z-10">{p}</span>
          </motion.button>
        );
      })}
      <Button
        variant="ghost"
        size="sm"
        className="h-8 gap-1 px-2 text-sm"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
