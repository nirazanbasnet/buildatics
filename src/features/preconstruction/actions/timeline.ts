"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadActivityLogReq } from "../lib/dto";
import { MANUAL_ACTIVITY_TYPE } from "../lib/detail-types";

export type TimelineActionResult = { ok: boolean; error?: string };

export type AddTimelineLogInput = {
  summary: string;
  details?: string;
};

// Server Action: adds a manual timeline entry (POST /api/LeadActivityLogs/CreateManual?leadId).
// `type` defaults to MANUAL_ACTIVITY_TYPE (LeadActivityLogType is unlabeled in the spec — tentative).
export async function addTimelineLog(
  leadId: string,
  input: AddTimelineLogInput,
): Promise<TimelineActionResult> {
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
