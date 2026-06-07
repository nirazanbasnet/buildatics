"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadActivityLogReq } from "../lib/lead-detail-dto";
import { MANUAL_ACTIVITY_TYPE } from "../lib/lead-detail-types";

export type LeadActivityResult = { ok: boolean; error?: string };

export async function addActivityLog(
  leadId: string,
  input: { summary: string; details?: string },
): Promise<LeadActivityResult> {
  const summary = input.summary.trim();
  if (!summary) return { ok: false, error: "Summary is required." };

  const body: LeadActivityLogReq = {
    type: MANUAL_ACTIVITY_TYPE,
    summary,
    details: input.details?.trim() || undefined,
  };
  try {
    await apiFetch(
      `/api/LeadActivityLogs/CreateManual?leadId=${encodeURIComponent(leadId)}`,
      {
        method: "POST",
        auth: true,
        body,
      },
    );
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError ? error.message : "Failed to add the log.",
    };
  }
}
