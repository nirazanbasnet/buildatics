"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadQuoteLineItemReq, LeadQuoteLineItemRes } from "../lib/dto";
import { getLineItems } from "../lib/get-quotes";
import type { QuoteLineItem } from "../types";

type ItemResult = { ok: boolean; error?: string; item?: LeadQuoteLineItemRes };
type Result = { ok: boolean; error?: string };

// Re-fetches and normalizes a quote's line items so the detail builder can refresh after a mutation.
export async function listLineItems(
  leadId: string,
  leadQuoteId: string
): Promise<QuoteLineItem[]> {
  const items = await getLineItems(leadId, leadQuoteId);
  return items
    .map((li) => ({
      id: li.id ?? "",
      category: li.category?.trim() || "Uncategorised",
      description: li.description ?? "",
      qty: li.qty ?? 0,
      unitPrice: li.unitPrice ?? 0,
      isVisible: li.isVisible ?? true,
      sortOrder: li.sortOrder ?? 0
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

// Creates a line item. POST /api/LeadQuoteLineItems/Create?leadId (Bearer).
export async function createLineItem(
  leadId: string,
  body: LeadQuoteLineItemReq
): Promise<ItemResult> {
  try {
    const item = await apiFetch<LeadQuoteLineItemRes>(
      `/api/LeadQuoteLineItems/Create?leadId=${encodeURIComponent(leadId)}`,
      { method: "POST", auth: true, body }
    );
    return { ok: true, item };
  } catch (error) {
    return { ok: false, error: error instanceof ApiError ? error.message : "Failed to add the line item." };
  }
}

// Updates a line item. POST /api/LeadQuoteLineItems/Update?leadId&id (Bearer).
export async function updateLineItem(
  leadId: string,
  id: string,
  body: LeadQuoteLineItemReq
): Promise<ItemResult> {
  try {
    const item = await apiFetch<LeadQuoteLineItemRes>(
      `/api/LeadQuoteLineItems/Update?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(id)}`,
      { method: "POST", auth: true, body }
    );
    return { ok: true, item };
  } catch (error) {
    return { ok: false, error: error instanceof ApiError ? error.message : "Failed to update the line item." };
  }
}

// Deletes a line item. DELETE /api/LeadQuoteLineItems/Delete?leadId&id (Bearer).
export async function deleteLineItem(leadId: string, id: string): Promise<Result> {
  try {
    await apiFetch(
      `/api/LeadQuoteLineItems/Delete?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(id)}`,
      { method: "DELETE", auth: true }
    );
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error instanceof ApiError ? error.message : "Failed to delete the line item." };
  }
}
