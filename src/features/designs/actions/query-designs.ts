"use server";

import { getAllDesigns } from "../lib/get-designs-page";
import { applyDesignFilters, type DesignFilterState } from "../lib/filter";
import type { DesignProperty } from "../types";

export type DesignQueryResult = {
  items: DesignProperty[];
  total: number;
};

// Server Action (BFF): the Design Library calls this on filter/page changes. It fetches designs
// from the API and applies the filter + pagination server-side. (The API itself can't filter —
// all designs page endpoints take only pageNumber/pageSize — so the filtering happens here.)
export async function queryDesigns(params: {
  filters: DesignFilterState;
  page: number;
  pageSize: number;
}): Promise<DesignQueryResult> {
  const all = await getAllDesigns();
  const filtered = applyDesignFilters(all, params.filters);
  const start = Math.max(0, (params.page - 1) * params.pageSize);

  return {
    items: filtered.slice(start, start + params.pageSize),
    total: filtered.length
  };
}
