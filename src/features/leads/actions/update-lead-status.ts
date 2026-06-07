"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

export type UpdateLeadStatusResult = { ok: boolean; error?: string };

// Server Action: updates only the lead's status (POST /api/Leads/UpdateStatus?id).
export async function updateLeadStatus(
  leadId: string,
  status: number,
): Promise<UpdateLeadStatusResult> {
  try {
    await apiFetch(`/api/Leads/UpdateStatus?id=${encodeURIComponent(leadId)}`, {
      method: "POST",
      auth: true,
      body: { status },
    });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to update the status.",
    };
  }
}
