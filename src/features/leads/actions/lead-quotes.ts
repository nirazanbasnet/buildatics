"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadQuoteReq } from "../lib/lead-detail-dto";

export type LeadQuoteResult = { ok: boolean; error?: string };

export type CreateLeadQuoteInput = {
  title: string;
  description?: string;
  validUntil?: string; // yyyy-mm-dd from the date input
};

function fail(error: unknown, fallback: string): LeadQuoteResult {
  return {
    ok: false,
    error: error instanceof ApiError ? error.message : fallback,
  };
}

export async function createLeadQuote(
  leadId: string,
  input: CreateLeadQuoteInput,
): Promise<LeadQuoteResult> {
  const title = input.title.trim();
  if (!title) return { ok: false, error: "Title is required." };

  const body: LeadQuoteReq = {
    title,
    description: input.description?.trim() || undefined,
    validUntilUtc: input.validUntil
      ? new Date(input.validUntil).toISOString()
      : undefined,
  };
  try {
    await apiFetch(
      `/api/LeadQuotes/Create?leadId=${encodeURIComponent(leadId)}`,
      {
        method: "POST",
        auth: true,
        body,
      },
    );
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to create the quote.");
  }
}

export async function updateLeadQuoteStatus(
  leadId: string,
  quoteId: string,
  status: number,
): Promise<LeadQuoteResult> {
  try {
    await apiFetch(
      `/api/LeadQuotes/UpdateStatus?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(quoteId)}`,
      { method: "POST", auth: true, body: { status } },
    );
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to update the quote.");
  }
}

export async function deleteLeadQuote(
  leadId: string,
  quoteId: string,
): Promise<LeadQuoteResult> {
  try {
    await apiFetch(
      `/api/LeadQuotes/Delete?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(quoteId)}`,
      { method: "DELETE", auth: true },
    );
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to delete the quote.");
  }
}
