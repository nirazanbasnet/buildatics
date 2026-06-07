"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadQuoteStatus, LeadQuoteStatusReq } from "../lib/dto";

type Result = { ok: boolean; error?: string };

// Updates only the quote status. POST /api/LeadQuotes/UpdateStatus?leadId&id (Bearer).
export async function updateQuoteStatus(
  leadId: string,
  id: string,
  status: LeadQuoteStatus,
): Promise<Result> {
  const body: LeadQuoteStatusReq = { status };
  try {
    await apiFetch(
      `/api/LeadQuotes/UpdateStatus?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(id)}`,
      { method: "POST", auth: true, body },
    );
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
