import type { LeadQuoteStatus } from "./lib/dto";

export const QUOTES_PAGE_SIZE = 10;

// Row consumed by the quotation table. Carries both leadId + id because every LeadQuotes API call is
// scoped to a lead. `amount` is a display string ("—" in the list — see map-quote.ts gap).
export type QuotationRow = {
  id: string;
  leadId: string;
  ref: string; // quote title (no ref-number field in the API)
  version: number;
  client: string;
  siteAddress: string;
  attachedDesign: string;
  amount: string;
  quoteDate: string;
  expiryDate: string;
  statusValue: LeadQuoteStatus;
  statusLabel: string;
};

export type QuotationsFilterState = {
  search: string;
  status: string; // "all" or a status value (as string)
};

export type QuotationsResult = {
  items: QuotationRow[];
  total: number;
};

// ---- Detail page ----

// A single line item on the detail builder (flattened from LeadQuoteLineItemRes).
export type QuoteLineItem = {
  id: string;
  category: string;
  description: string;
  qty: number;
  unitPrice: number;
  isVisible: boolean;
  sortOrder: number;
};

// The detail model the quote builder consumes (LeadQuoteRes + line items + joined lead context).
export type QuoteDetailModel = {
  id: string;
  leadId: string;
  title: string;
  description: string;
  statusValue: LeadQuoteStatus;
  version: number;
  validUntil: string; // yyyy-mm-dd (for <input type="date">) or ""
  createdOn: string; // formatted for display
  client: string;
  siteAddress: string;
  lineItems: QuoteLineItem[];
};

// Display-only constant — the API has no GST field (see map-detail.ts gap). Used for the summary card.
export const GST_RATE = 10;
