import { apiFetch } from "@/features/auth/lib/api-client";

import type { DesignationResPage, StaffRes } from "./dto";
import { mapStaffToRow } from "./map-staff";
import type { RoleOption, TeamMemberRow } from "../types";

const ROLES_PAGE_SIZE = 100;
const ROLES_MAX_PAGES = 10;

// Returns all (non-deleted) staff for the current user's company. POST /api/Staff/All (Bearer).
export async function getTeamMembers(): Promise<TeamMemberRow[]> {
  const staff = await apiFetch<StaffRes[]>("/api/Staff/All", {
    method: "POST",
    auth: true,
    body: {}
  });
  return (staff ?? []).map(mapStaffToRow);
}

// Returns the company's designations ("roles") for the change-role / invite selectors.
// POST /api/Designations/Page (Bearer) — paged, so walk pages until exhausted.
export async function getRoleOptions(): Promise<RoleOption[]> {
  const roles: RoleOption[] = [];
  let pageNumber = 1;

  while (pageNumber <= ROLES_MAX_PAGES) {
    const res = await apiFetch<DesignationResPage>("/api/Designations/Page", {
      method: "POST",
      auth: true,
      body: { pageNumber, pageSize: ROLES_PAGE_SIZE }
    });
    const items = res.items ?? [];
    roles.push(...items.map((d) => ({ id: d.id ?? "", name: d.name ?? "—" })).filter((r) => r.id));

    const total = res.totalCount ?? roles.length;
    if (roles.length >= total || items.length < ROLES_PAGE_SIZE) break;
    pageNumber += 1;
  }

  return roles;
}
