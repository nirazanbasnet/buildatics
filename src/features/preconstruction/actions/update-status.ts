"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

export type UpdateStatusResult = { ok: boolean; error?: string };

// Server Action: updates only the project's (lead's) status (POST /api/Leads/UpdateStatus?id).
export async function updateProjectStatus(
  leadId: string,
  status: number,
): Promise<UpdateStatusResult> {
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
