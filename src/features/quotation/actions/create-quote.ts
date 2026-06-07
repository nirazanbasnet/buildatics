"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadQuoteReq, LeadQuoteRes } from "../lib/dto";
import {
  addQuoteSchema,
  toUtcIso,
  type AddQuoteInput,
} from "../lib/quote-form-schema";

export type CreateQuoteResult = {
  ok: boolean;
  error?: string;
  leadId?: string;
  id?: string;
  fieldErrors?: Partial<Record<"title" | "leadId", string>>;
};

// Creates a quote for a lead. POST /api/LeadQuotes/Create?leadId (Bearer). Returns ids so the caller
// can jump to the new quote's detail page.
export async function createQuote(
  input: AddQuoteInput,
): Promise<CreateQuoteResult> {
  const parsed = addQuoteSchema.safeParse(input);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      fieldErrors: { title: fe.title?.[0], leadId: fe.leadId?.[0] },
    };
  }
  const data = parsed.data;

  const body: LeadQuoteReq = {
    title: data.title,
    description: data.description?.trim() || undefined,
    validUntilUtc: toUtcIso(data.validUntil),
  };

  try {
    const quote = await apiFetch<LeadQuoteRes>(
      `/api/LeadQuotes/Create?leadId=${encodeURIComponent(data.leadId)}`,
      { method: "POST", auth: true, body },
    );
    return { ok: true, leadId: data.leadId, id: quote.id };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to create the quote.",
    };
  }
}
