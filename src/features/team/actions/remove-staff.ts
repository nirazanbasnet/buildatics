"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { TeamActionResult } from "../types";

// Removes (soft-deletes) a staff member. DELETE /api/Staff/SoftDelete?staffId=… (Bearer).
export async function removeStaff(staffId: string): Promise<TeamActionResult> {
  try {
    await apiFetch(`/api/Staff/SoftDelete?staffId=${encodeURIComponent(staffId)}`, {
      method: "DELETE",
      auth: true
    });
    return { ok: true, message: "Member removed." };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof ApiError ? error.message : "Failed to remove the member."
    };
  }
}
