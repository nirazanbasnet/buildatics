"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

type Result = { ok: boolean; error?: string };

// Deletes a quote. DELETE /api/LeadQuotes/Delete?leadId&id (Bearer).
export async function deleteQuote(leadId: string, id: string): Promise<Result> {
  try {
    await apiFetch(
      `/api/LeadQuotes/Delete?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(id)}`,
      { method: "DELETE", auth: true },
    );
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to delete the quote.",
    };
  }
}
