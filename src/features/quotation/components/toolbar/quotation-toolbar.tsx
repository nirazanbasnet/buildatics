"use client";

import { Download, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { QUOTE_STATUSES } from "../../lib/status";
import type { QuotationsFilterState } from "../../types";

type QuotationToolbarProps = {
  resultCount: number;
  filters: QuotationsFilterState;
  onFiltersChange: (filters: QuotationsFilterState) => void;
  onExportCsv: () => void;
  onAddQuotation: () => void;
};

export function QuotationToolbar({
  resultCount,
  filters,
  onFiltersChange,
  onExportCsv,
  onAddQuotation,
}: QuotationToolbarProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 pb-4"
      data-slot="quotation-toolbar"
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
          <Input
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            placeholder="Search quotes, client, address"
            className="h-9 w-64 pl-8"
            aria-label="Search quotations"
          />
        </div>
        <Select
          value={filters.status}
          onValueChange={(status) => onFiltersChange({ ...filters, status })}
        >
          <SelectTrigger className="h-9 w-40" aria-label="Filter by status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {QUOTE_STATUSES.map((s) => (
              <SelectItem key={s.value} value={String(s.value)}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-muted-foreground text-sm tabular-nums">
          {resultCount} {resultCount === 1 ? "quote" : "quotes"}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-9"
          onClick={onExportCsv}
        >
          <Download className="size-4" />
          Export CSV
        </Button>
        <Button size="sm" className="h-9" onClick={onAddQuotation}>
          <Plus className="size-4" />
          Add Quotation
        </Button>
      </div>
    </div>
  );
}
