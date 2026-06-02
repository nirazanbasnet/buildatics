import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DesignEmptyStateProps = {
  // Shown when the empty result is due to active filters (offers a clear action).
  filtered?: boolean;
  onClearFilters?: () => void;
  className?: string;
};

export function DesignEmptyState({ filtered, onClearFilters, className }: DesignEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-20 text-center",
        className
      )}
      data-slot="design-empty-state"
    >
      <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
        <SearchX className="size-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold">
        {filtered ? "No matching designs" : "No designs yet"}
      </h3>
      <p className="text-muted-foreground mt-1 max-w-sm text-sm">
        {filtered
          ? "No designs match the current filters. Try adjusting or clearing them."
          : "There are no designs in the library yet. New designs will appear here once added."}
      </p>
      {filtered && onClearFilters ? (
        <Button variant="outline" size="sm" className="mt-5" onClick={onClearFilters}>
          Clear filters
        </Button>
      ) : null}
    </div>
  );
}
