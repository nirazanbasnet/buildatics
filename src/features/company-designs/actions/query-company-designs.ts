"use server";

import {
  applyDesignFilters,
  type DesignFilterState,
} from "@/features/designs/lib/filter";
import type { DesignProperty } from "@/features/designs";

import { getAllCompanyDesigns } from "../lib/get-company-designs-page";

export type CompanyDesignQueryResult = {
  items: DesignProperty[];
  total: number;
};

// Server Action (BFF): the Company Library calls this on filter/page changes. PageDescending can't
// filter (it takes only pageNumber/pageSize), so we fetch all company designs and filter here —
// reusing the Design Library's filter logic since both share the DesignProperty UI shape.
export async function queryCompanyDesigns(params: {
  filters: DesignFilterState;
  page: number;
  pageSize: number;
}): Promise<CompanyDesignQueryResult> {
  const all = await getAllCompanyDesigns();
  const filtered = applyDesignFilters(all, params.filters);
  const start = Math.max(0, (params.page - 1) * params.pageSize);

  return {
    items: filtered.slice(start, start + params.pageSize),
    total: filtered.length,
  };
}
