import { apiFetch } from "@/features/auth/lib/api-client";

import type { LeadResPage } from "./dto";
import { mapLeadToRow } from "./map-lead";
import { getLeadStages, getStaff } from "./get-lead-options";
import type { LeadRow } from "../types";

const ALL_PAGE_SIZE = 100;
const ALL_MAX_PAGES = 20;

// Fetches every lead so the list can filter/paginate client-side (Leads/Page has no server-side filter),
// resolving stage + assignee names via LeadStages/GetAll and Staff/All.
export async function getAllLeads(): Promise<LeadRow[]> {
  const [stages, staff] = await Promise.all([getLeadStages(), getStaff()]);
  const stageNames = new Map(stages.map((s) => [s.id ?? "", s.name ?? "—"]));
  const staffNames = new Map(
    staff.map((s) => [s.id ?? "", [s.firstName, s.lastName].filter(Boolean).join(" ") || "—"])
  );

  const rows: LeadRow[] = [];
  let pageNumber = 1;

  while (pageNumber <= ALL_MAX_PAGES) {
    const res = await apiFetch<LeadResPage>("/api/Leads/Page", {
      method: "POST",
      auth: true,
      body: { pageNumber, pageSize: ALL_PAGE_SIZE }
    });
    const items = res.items ?? [];
    rows.push(...items.map((lead) => mapLeadToRow(lead, stageNames, staffNames)));

    const total = res.totalCount ?? rows.length;
    if (rows.length >= total || items.length < ALL_PAGE_SIZE) break;
    pageNumber += 1;
  }

  return rows;
}
