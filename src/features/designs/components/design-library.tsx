"use client";

import { useState, useTransition } from "react";

import { cn } from "@/lib/utils";
import { PaginationNav } from "@src/components/pagination-nav";

import { DesignToolbar } from "./toolbar/design-toolbar";
import { DesignGrid } from "./grid/design-grid";
import { DesignEmptyState } from "./grid/design-empty-state";
import { queryDesigns } from "../actions/query-designs";
import { makeDefaultFilters, type AreaBounds, type DesignFilterState } from "../lib/filter";
import type { DesignProperty, DesignView } from "../types";

type DesignLibraryProps = {
  initialItems: DesignProperty[];
  initialTotal: number;
  areaBounds: AreaBounds;
  pageSize: number;
};

// Orchestrator for the Design Library. View toggle is purely client-side (both image URLs are on
// each item), while filter + pagination round-trip through the queryDesigns server action (BFF).
export function DesignLibrary({
  initialItems,
  initialTotal,
  areaBounds,
  pageSize
}: DesignLibraryProps) {
  const [view, setView] = useState<DesignView>("facade");
  const [filters, setFilters] = useState<DesignFilterState>(() => makeDefaultFilters(areaBounds));
  const [page, setPage] = useState(1);

  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  // initialTotal is computed under default (match-all) filters, so it equals the full library size.
  const hasAnyDesigns = initialTotal > 0;

  function runQuery(nextFilters: DesignFilterState, nextPage: number) {
    startTransition(async () => {
      const res = await queryDesigns({ filters: nextFilters, page: nextPage, pageSize });
      setItems(res.items);
      setTotal(res.total);
    });
  }

  function applyFilters(next: DesignFilterState) {
    setFilters(next);
    setPage(1); // a filter change can shrink the result set; restart at page 1
    runQuery(next, 1);
  }

  function clearFilters() {
    const defaults = makeDefaultFilters(areaBounds);
    setFilters(defaults);
    setPage(1);
    runQuery(defaults, 1);
  }

  function goToPage(next: number) {
    setPage(next);
    runQuery(filters, next);
  }

  return (
    <div>
      <DesignToolbar
        view={view}
        onViewChange={setView}
        filters={filters}
        onFiltersChange={applyFilters}
        areaBounds={areaBounds}
        resultCount={total}
      />

      {items.length === 0 ? (
        // Two empty natures: no data at all (initial) vs data exists but filters exclude everything.
        <DesignEmptyState
          filtered={hasAnyDesigns}
          onClearFilters={hasAnyDesigns ? clearFilters : undefined}
        />
      ) : (
        <>
          <div
            className={cn(
              "transition-opacity duration-200",
              isPending && "pointer-events-none opacity-50"
            )}
          >
            <DesignGrid designs={items} view={view} detailEnabled />
          </div>
          {totalPages > 1 ? (
            <PaginationNav totalPages={totalPages} page={page} onPageChange={goToPage} />
          ) : null}
        </>
      )}
    </div>
  );
}
