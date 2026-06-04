"use server";

import { ApiError } from "@/features/auth/lib/api-client";

import { getLineItems, getQuote, getQuoteLeadContext } from "../lib/get-quotes";
import { mapToDetail } from "../lib/map-detail";
import type { QuoteDetailModel } from "../types";

export type LoadDetailResult =
  | { ok: true; detail: QuoteDetailModel }
  | { ok: false; error: string };

// Loads everything the detail sheet needs (quote + line items + lead context) in one call.
export async function loadQuoteDetail(leadId: string, id: string): Promise<LoadDetailResult> {
  try {
    const quote = await getQuote(leadId, id);
    const [lineItems, lead] = await Promise.all([
      getLineItems(leadId, id).catch(() => quote.lineItems ?? []),
      getQuoteLeadContext(leadId)
    ]);
    return { ok: true, detail: mapToDetail(quote, lineItems, lead) };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof ApiError ? error.message : "Failed to load the quotation."
    };
  }
}
