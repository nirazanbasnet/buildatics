// Maps LeadQuoteRes (+ its line items + lead context) to the QuoteDetailModel the detail builder uses.
//
// DIRECT MAP:
//   id, leadId, title, version           → same
//   description                          → description (also surfaced as "Scope")
//   status                               → statusValue
//   createdOnUtc                         → createdOn (formatted)
//   validUntilUtc                        → validUntil (yyyy-mm-dd for the date input)
//   lineItems[] {category,description,qty,unitPrice,isVisible,sortOrder,id} → lineItems[]
//
// GAPS — detail UI fields with NO API field (kept local / display-only, cannot persist):
//   gstRate (constant 10%), estimatedCost / gross margin, internal notes, terms & conditions.
//   "Scope" reuses the quote `description`.
import type { LeadQuoteRes } from "./dto";
import type { QuoteDetailModel, QuoteLineItem } from "../types";
import { formatDate } from "./format";

function toDateInput(iso: string | null | undefined): string {
  if (!iso) return "";
  const ms = Date.parse(iso);
  if (!Number.isFinite(ms)) return "";
  return new Date(ms).toISOString().slice(0, 10);
}

function toLineItem(li: NonNullable<LeadQuoteRes["lineItems"]>[number]): QuoteLineItem {
  return {
    id: li.id ?? "",
    category: li.category?.trim() || "Uncategorised",
    description: li.description ?? "",
    qty: li.qty ?? 0,
    unitPrice: li.unitPrice ?? 0,
    isVisible: li.isVisible ?? true,
    sortOrder: li.sortOrder ?? 0
  };
}

export function mapToDetail(
  quote: LeadQuoteRes,
  lineItems: LeadQuoteRes["lineItems"],
  lead: { client: string; address: string } | undefined
): QuoteDetailModel {
  const items = (lineItems ?? quote.lineItems ?? [])
    .map(toLineItem)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return {
    id: quote.id ?? "",
    leadId: quote.leadId ?? "",
    title: quote.title?.trim() || "Untitled quote",
    description: quote.description ?? "",
    statusValue: quote.status ?? 0,
    version: quote.version ?? 1,
    validUntil: toDateInput(quote.validUntilUtc),
    createdOn: formatDate(quote.createdOnUtc),
    client: lead?.client ?? "—",
    siteAddress: lead?.address ?? "—",
    lineItems: items
  };
}
