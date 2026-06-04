"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadQuoteRes } from "../lib/dto";

type Result = { ok: boolean; error?: string; version?: number };

// Bumps the quote version (creates a new revision). POST /api/LeadQuotes/IncrementVersion?leadId&id.
export async function incrementVersion(leadId: string, id: string): Promise<Result> {
  try {
    const quote = await apiFetch<LeadQuoteRes>(
      `/api/LeadQuotes/IncrementVersion?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(id)}`,
      { method: "POST", auth: true }
    );
    return { ok: true, version: quote.version };
  } catch (error) {
    return { ok: false, error: error instanceof ApiError ? error.message : "Failed to create a revision." };
  }
}
