"use server";

import { getUsersPage } from "../lib/get-users-page";
import type { UsersResult } from "../types";

// Server Action (BFF): the users list calls this on page change. Thin wrapper over getUsersPage.
export async function queryUsers(pageNumber: number, pageSize: number): Promise<UsersResult> {
  return getUsersPage(pageNumber, pageSize);
}
