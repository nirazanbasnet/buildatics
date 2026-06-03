"use server";

import { getAllLeads } from "../lib/get-leads-page";
import { applyLeadFilters } from "../lib/filter";
import type { LeadsFilterState, LeadsResult } from "../types";

// Server Action (BFF): the leads list calls this on filter/page changes. Fetches leads from the API
// and applies filter + pagination server-side (the API can't filter — Leads/Page takes only paging).
export async function queryLeads(params: {
  filters: LeadsFilterState;
  page: number;
  pageSize: number;
}): Promise<LeadsResult> {
  const all = await getAllLeads();
  const filtered = applyLeadFilters(all, params.filters);
  const start = Math.max(0, (params.page - 1) * params.pageSize);

  return {
    items: filtered.slice(start, start + params.pageSize),
    total: filtered.length
  };
}
