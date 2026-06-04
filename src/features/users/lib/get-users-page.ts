import { apiFetch } from "@/features/auth/lib/api-client";

import type { PagedReq, UserDetailedResPage } from "./dto";
import { mapUserToRow } from "./map-user";
import type { UsersResult } from "../types";

// Fetches one page of users. POST /api/UsersA/Page (Bearer, Admin). Unlike Leads, the API paginates
// server-side, so the list requests pages on demand rather than loading everything up front.
export async function getUsersPage(pageNumber: number, pageSize: number): Promise<UsersResult> {
  const body: PagedReq = { pageNumber, pageSize };
  const res = await apiFetch<UserDetailedResPage>("/api/UsersA/Page", {
    method: "POST",
    auth: true,
    body
  });

  const items = (res.items ?? []).map(mapUserToRow);
  return {
    items,
    total: res.totalCount ?? items.length,
    pageNumber: res.pageNumber ?? pageNumber,
    pageSize: res.pageSize ?? pageSize
  };
}
