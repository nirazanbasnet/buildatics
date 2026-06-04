"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadQuoteReq, LeadQuoteRes } from "../lib/dto";
import { editQuoteSchema, toUtcIso, type EditQuoteInput } from "../lib/quote-form-schema";

export type QuoteFormResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"title", string>>;
};

// Updates a quote's editable fields. POST /api/LeadQuotes/Update?leadId&id (Bearer).
export async function updateQuote(
  leadId: string,
  id: string,
  input: EditQuoteInput
): Promise<QuoteFormResult> {
  const parsed = editQuoteSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: { title: parsed.error.flatten().fieldErrors.title?.[0] } };
  }
  const data = parsed.data;

  const body: LeadQuoteReq = {
    title: data.title,
    description: data.description?.trim() || undefined,
    validUntilUtc: toUtcIso(data.validUntil)
  };

  try {
    await apiFetch<LeadQuoteRes>(
      `/api/LeadQuotes/Update?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(id)}`,
      { method: "POST", auth: true, body }
    );
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof ApiError ? error.message : "Failed to update the quote." };
  }
}
