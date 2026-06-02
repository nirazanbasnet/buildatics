"use client";

import { useState } from "react";
import { LayoutGrid, List, ListFilter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SegmentedNav } from "@src/components/ui/segmented-nav";

import { FilterSheet } from "../../display-center/_components/filter-sheet";

export type PreconstructionListView = "list" | "card";

type Props = {
  view: PreconstructionListView;
  onViewChange: (view: PreconstructionListView) => void;
};

const VIEW_ITEMS = [
  { value: "list" as const, label: "List View", icon: List },
  { value: "card" as const, label: "Card View", icon: LayoutGrid }
];

export function PreconstructionListToolbar({ view, onViewChange }: Props) {
  const [statusActive, setStatusActive] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Status</span>
        {statusActive ? (
          <Badge variant="default" className="h-7 gap-1 rounded-full py-1 pr-1 pl-3">
            In Progress
            <Button
              variant="ghost"
              size="icon"
              className="size-5 rounded-full hover:bg-white/20 hover:text-white"
              onClick={() => setStatusActive(false)}
              aria-label="Clear status filter"
            >
              <X className="size-3" />
            </Button>
          </Badge>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9" onClick={() => setFilterOpen(true)}>
          <ListFilter className="size-4" />
          Filter
        </Button>
        <FilterSheet open={filterOpen} onOpenChange={setFilterOpen} />

        <SegmentedNav<PreconstructionListView>
          items={VIEW_ITEMS}
          value={view}
          onValueChange={onViewChange}
          ariaLabel="View"
          className="h-9 w-auto"
        />
      </div>
    </div>
  );
}
