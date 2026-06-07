"use client";

import { useState, useTransition } from "react";

import { cn } from "@/lib/utils";
import { PaginationNav } from "@src/components/pagination-nav";
import { DesignToolbar } from "@/features/designs/components/toolbar/design-toolbar";
import { DesignGrid } from "@/features/designs/components/grid/design-grid";
import { DesignEmptyState } from "@/features/designs/components/grid/design-empty-state";
import {
  makeDefaultFilters,
  type AreaBounds,
  type DesignFilterState,
} from "@/features/designs/lib/filter";
import type { DesignProperty, DesignView } from "@/features/designs";

import { queryCompanyDesigns } from "../actions/query-company-designs";
import { AddDesignMenu } from "./add-design/add-design-menu";

type CompanyLibraryProps = {
  initialItems: DesignProperty[];
  initialTotal: number;
  areaBounds: AreaBounds;
  pageSize: number;
};

// Orchestrator for the Company Library. Mirrors the Design Library (same toolbar/grid/filter), but
// over the company's own designs and with an Add Design control (create from scratch / import).
export function CompanyLibrary({
  initialItems,
  initialTotal,
  areaBounds,
  pageSize,
}: CompanyLibraryProps) {
  const [view, setView] = useState<DesignView>("facade");
  const [filters, setFilters] = useState<DesignFilterState>(() =>
    makeDefaultFilters(areaBounds),
  );
  const [page, setPage] = useState(1);

  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [isPending, startTransition] = useTransition();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasAnyDesigns = total > 0;

  function runQuery(nextFilters: DesignFilterState, nextPage: number) {
    startTransition(async () => {
      const res = await queryCompanyDesigns({
        filters: nextFilters,
        page: nextPage,
        pageSize,
      });
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

  // After a create/import, re-run the current query (state doesn't sync from server props alone).
  function refresh() {
    runQuery(filters, page);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div>
          <h1 className="text-lg font-semibold">Company Library</h1>
          <p className="text-muted-foreground text-sm">
            Your company&apos;s house designs and facades.
          </p>
        </div>
        <AddDesignMenu onSaved={refresh} />
      </div>

      <DesignToolbar
        view={view}
        onViewChange={setView}
        filters={filters}
        onFiltersChange={applyFilters}
        areaBounds={areaBounds}
        resultCount={total}
      />

      {items.length === 0 ? (
        <DesignEmptyState
          filtered={hasAnyDesigns}
          onClearFilters={hasAnyDesigns ? clearFilters : undefined}
        />
      ) : (
        <>
          <div
            className={cn(
              "transition-opacity duration-200",
              isPending && "pointer-events-none opacity-50",
            )}
          >
            <DesignGrid designs={items} view={view} detailEnabled />
          </div>
          {totalPages > 1 ? (
            <PaginationNav
              totalPages={totalPages}
              page={page}
              onPageChange={goToPage}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
