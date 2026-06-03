import { Inbox, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LeadsEmptyStateProps = {
  // True when the empty result is due to active filters (offers a clear action).
  filtered?: boolean;
  onClearFilters?: () => void;
  className?: string;
};

export function LeadsEmptyState({ filtered, onClearFilters, className }: LeadsEmptyStateProps) {
  const Icon = filtered ? SearchX : Inbox;
  return (
    <div
      className={cn(
        "bg-card flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-20 text-center",
        className
      )}
      data-slot="leads-empty-state"
    >
      <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold">{filtered ? "No matching leads" : "No leads yet"}</h3>
      <p className="text-muted-foreground mt-1 max-w-sm text-sm">
        {filtered
          ? "No leads match the current filters. Try adjusting or clearing them."
          : "Create your first lead with the Add Lead button."}
      </p>
      {filtered && onClearFilters ? (
        <Button variant="outline" size="sm" className="mt-5" onClick={onClearFilters}>
          Clear filters
        </Button>
      ) : null}
    </div>
  );
}
