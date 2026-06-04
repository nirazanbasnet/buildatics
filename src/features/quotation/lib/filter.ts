import type { QuotationRow, QuotationsFilterState } from "../types";

export const QUOTES_FILTER_DEFAULTS: QuotationsFilterState = { search: "", status: "all" };

// Client-side filtering: the aggregated list is already in memory, so we filter here (mirrors leads).
export function applyQuoteFilters(
  rows: QuotationRow[],
  filters: QuotationsFilterState
): QuotationRow[] {
  const search = filters.search.trim().toLowerCase();
  return rows.filter((row) => {
    if (filters.status !== "all" && String(row.statusValue) !== filters.status) return false;
    if (!search) return true;
    return (
      row.ref.toLowerCase().includes(search) ||
      row.client.toLowerCase().includes(search) ||
      row.siteAddress.toLowerCase().includes(search)
    );
  });
}

export function countActiveQuoteFilters(filters: QuotationsFilterState): number {
  let n = 0;
  if (filters.search.trim()) n += 1;
  if (filters.status !== "all") n += 1;
  return n;
}
