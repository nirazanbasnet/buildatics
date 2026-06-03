"use client";

import { Download, ListFilter, Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { describeActiveLeadFilters, clearLeadFilterKey } from "../../lib/filter";
import type { LeadOptions, LeadsFilterState } from "../../types";

type LeadsToolbarProps = {
  resultCount: number;
  filters: LeadsFilterState;
  onFiltersChange: (filters: LeadsFilterState) => void;
  options: LeadOptions;
  onOpenFilter: () => void;
  onExportCsv: () => void;
  onAddLead: () => void;
};

export function LeadsToolbar({
  resultCount,
  filters,
  onFiltersChange,
  options,
  onOpenFilter,
  onExportCsv,
  onAddLead
}: LeadsToolbarProps) {
  const activeChips = describeActiveLeadFilters(filters, options);

  return (
    <div className="space-y-3 pb-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-sm tabular-nums">
            {resultCount} {resultCount === 1 ? "lead" : "leads"}
          </span>
          {activeChips.map((chip) => (
            <Badge key={chip.key} variant="default" className="h-7 gap-1 rounded-full py-1 pr-1 pl-3">
              {chip.label}
              <button
                type="button"
                aria-label={`Remove ${chip.label} filter`}
                onClick={() => onFiltersChange(clearLeadFilterKey(filters, chip.key))}
                className="hover:bg-primary-foreground/20 focus-visible:ring-primary-foreground/50 flex size-5 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9" onClick={onOpenFilter}>
            <ListFilter className="size-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9" onClick={onExportCsv}>
            <Download className="size-4" />
            Export CSV
          </Button>
          <Button size="sm" className="h-9" onClick={onAddLead}>
            <Plus className="size-4" />
            Add Lead
          </Button>
        </div>
      </div>
    </div>
  );
}
