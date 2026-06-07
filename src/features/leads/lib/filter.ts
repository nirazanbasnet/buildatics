import type { LeadRow, LeadsFilterState, LeadOptions } from "../types";

// Client-side filtering: Leads/Page accepts only PagedReq (no server-side filter/search), so the
// list fetches all leads and filters here over the fields the API returns (joined for names).

export const LEADS_FILTER_DEFAULTS: LeadsFilterState = {
  search: "",
  stageId: "all",
  assignedUserId: "all",
  status: "all",
};

export function countActiveLeadFilters(f: LeadsFilterState): number {
  let n = 0;
  if (f.search.trim()) n++;
  if (f.stageId !== "all") n++;
  if (f.assignedUserId !== "all") n++;
  if (f.status !== "all") n++;
  return n;
}

export function applyLeadFilters(
  rows: LeadRow[],
  f: LeadsFilterState,
): LeadRow[] {
  const q = f.search.trim().toLowerCase();
  return rows.filter((r) => {
    if (q && !`${r.client} ${r.address} ${r.leadNo}`.toLowerCase().includes(q))
      return false;
    if (f.stageId !== "all" && r.stageId !== f.stageId) return false;
    if (f.assignedUserId !== "all" && r.assignedUserId !== f.assignedUserId)
      return false;
    if (f.status !== "all" && String(r.statusValue) !== f.status) return false;
    return true;
  });
}

// Toolbar chips for active filters (labels resolved via the loaded options).
export function describeActiveLeadFilters(
  f: LeadsFilterState,
  options: LeadOptions,
): Array<{ key: keyof LeadsFilterState; label: string }> {
  const chips: Array<{ key: keyof LeadsFilterState; label: string }> = [];
  if (f.search.trim())
    chips.push({ key: "search", label: `Search: ${f.search.trim()}` });
  if (f.stageId !== "all") {
    const name =
      options.stages.find((s) => s.id === f.stageId)?.name ?? "Stage";
    chips.push({ key: "stageId", label: `Stage: ${name}` });
  }
  if (f.assignedUserId !== "all") {
    const name =
      options.staff.find((s) => s.id === f.assignedUserId)?.name ?? "Assignee";
    chips.push({ key: "assignedUserId", label: `Assigned: ${name}` });
  }
  if (f.status !== "all")
    chips.push({ key: "status", label: `Status: ${f.status}` });
  return chips;
}

export function clearLeadFilterKey(
  f: LeadsFilterState,
  key: keyof LeadsFilterState,
): LeadsFilterState {
  if (key === "search") return { ...f, search: "" };
  return { ...f, [key]: "all" };
}
