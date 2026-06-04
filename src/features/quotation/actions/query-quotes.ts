"use server";

import { getAllQuotes } from "../lib/get-quotes";
import { applyQuoteFilters } from "../lib/filter";
import type { QuotationsFilterState, QuotationsResult } from "../types";

// Server Action (BFF): the list calls this on filter/page change. Aggregates all quotes, filters and
// paginates server-side (the API has no global list / filtering — see get-quotes.ts).
export async function queryQuotes(params: {
  filters: QuotationsFilterState;
  page: number;
  pageSize: number;
}): Promise<QuotationsResult> {
  const all = await getAllQuotes();
  const filtered = applyQuoteFilters(all, params.filters);
  const start = Math.max(0, (params.page - 1) * params.pageSize);
  return {
    items: filtered.slice(start, start + params.pageSize),
    total: filtered.length
  };
}
