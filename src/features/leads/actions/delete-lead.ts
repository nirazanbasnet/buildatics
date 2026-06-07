"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

export type DeleteLeadResult = { ok: boolean; error?: string };

// Soft-deletes a lead (DELETE /api/Leads/SoftDelete?id=) — preserves audit history.
export async function deleteLead(id: string): Promise<DeleteLeadResult> {
  try {
    await apiFetch(`/api/Leads/SoftDelete?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      auth: true,
    });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to delete the lead.",
    };
  }
}
