// API → UI map for the Quotation table (see agent/api.md §5: document the map + gaps).
//
// DIRECT MAP  LeadQuoteRes (+ lead context) → QuotationRow:
//   title                 → ref         (no ref-number field — see GAP #1)
//   version               → version
//   leadId                → leadId      (every quote API call needs leadId + id)
//   lead.client           → client      (joined from getAllLeads — quote has no client)
//   lead.address          → siteAddress (joined)
//   createdOnUtc          → quoteDate
//   validUntilUtc         → expiryDate
//   status (enum 0–3)     → statusValue / statusLabel (see status.ts gap)
//
// GAPS — UI columns with no clean API source:
//   1. ref      — no quote reference number; using `title`.
//   2. amount   — LeadQuotes/Page does NOT return line items; totals are only available per-quote via
//                 Get/GetByQuotation. INTERIM: "—" in the list (computed on the detail page).
//   3. attachedDesign — not on the quote, and the lead→design link isn't exposed by getAllLeads
//                 (LeadRow). INTERIM: "—".
import { formatDate } from "./format";
import { statusMeta } from "./status";
import type { LeadQuoteRes } from "./dto";
import type { LeadRow } from "@/features/leads";
import type { QuotationRow } from "../types";

export function mapQuoteToRow(
  quote: LeadQuoteRes,
  lead: LeadRow | undefined,
): QuotationRow {
  const meta = statusMeta(quote.status);
  return {
    id: quote.id ?? "",
    leadId: quote.leadId ?? lead?.id ?? "",
    ref: quote.title?.trim() || "Untitled quote",
    version: quote.version ?? 1,
    client: lead?.client ?? "—",
    siteAddress: lead?.address ?? "—",
    attachedDesign: "—", // GAP #3
    amount: "—", // GAP #2
    quoteDate: formatDate(quote.createdOnUtc),
    expiryDate: formatDate(quote.validUntilUtc),
    statusValue: meta.value,
    statusLabel: meta.label,
  };
}
