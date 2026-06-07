"use client";

import { useState } from "react";
import { Home, LayoutGrid, ListFilter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SegmentedNav } from "@src/components/ui/segmented-nav";

import { DesignFilterSheet } from "../filter/design-filter-sheet";
import {
  clearFilterKey,
  describeActiveFilters,
  type AreaBounds,
  type DesignFilterState,
} from "../../lib/filter";
import type { DesignView } from "../../types";

const VIEW_ITEMS = [
  { value: "facade" as const, label: "Facade View", icon: Home },
  { value: "floor" as const, label: "Floor Plan View", icon: LayoutGrid },
];

type DesignToolbarProps = {
  view: DesignView;
  onViewChange: (view: DesignView) => void;
  filters: DesignFilterState;
  onFiltersChange: (filters: DesignFilterState) => void;
  areaBounds: AreaBounds;
  resultCount: number;
};

export function DesignToolbar({
  view,
  onViewChange,
  filters,
  onFiltersChange,
  areaBounds,
  resultCount,
}: DesignToolbarProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const activeChips = describeActiveFilters(filters, areaBounds);

  return (
    <div className="space-y-3 pb-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-sm tabular-nums">
            {resultCount} {resultCount === 1 ? "design" : "designs"}
          </span>
          {activeChips.map((chip) => (
            <Badge
              key={chip.key}
              variant="default"
              className="h-7 gap-1 rounded-full py-1 pr-1 pl-3"
            >
              {chip.label}
              <button
                type="button"
                aria-label={`Remove ${chip.label} filter`}
                onClick={() =>
                  onFiltersChange(clearFilterKey(filters, chip.key, areaBounds))
                }
                className="hover:bg-primary-foreground/20 focus-visible:ring-primary-foreground/50 flex size-5 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => setFilterOpen(true)}
          >
            <ListFilter className="size-4" />
            Filter
          </Button>
          <DesignFilterSheet
            open={filterOpen}
            onOpenChange={setFilterOpen}
            value={filters}
            onApply={onFiltersChange}
            areaBounds={areaBounds}
          />
          <SegmentedNav<DesignView>
            items={VIEW_ITEMS}
            value={view}
            onValueChange={onViewChange}
            ariaLabel="View"
            className="h-9 w-auto"
          />
        </div>
      </div>
    </div>
  );
}
