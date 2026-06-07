import { apiFetch } from "@/features/auth/lib/api-client";
import { getAllLeads, type LeadRow } from "@/features/leads";

import type {
  LeadQuoteLineItemRes,
  LeadQuoteRes,
  LeadQuoteResPage,
} from "./dto";
import { mapQuoteToRow } from "./map-quote";
import type { QuotationRow } from "../types";

const QUOTES_PAGE = 100;
const QUOTES_MAX_PAGES = 10;
const LEAD_CONCURRENCY = 6;

// Runs `task` over `items` with a fixed-size worker pool (the API has no bulk endpoint, so the global
// list fans out one Page call per lead — cap concurrency to avoid hammering the gateway).
async function pooled<T, R>(
  items: T[],
  limit: number,
  task: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (cursor < items.length) {
        const index = cursor++;
        results[index] = await task(items[index]);
      }
    },
  );
  await Promise.all(workers);
  return results;
}

async function getQuotesForLead(leadId: string): Promise<LeadQuoteRes[]> {
  const quotes: LeadQuoteRes[] = [];
  let pageNumber = 1;
  while (pageNumber <= QUOTES_MAX_PAGES) {
    const res = await apiFetch<LeadQuoteResPage>(
      `/api/LeadQuotes/Page?leadId=${encodeURIComponent(leadId)}`,
      {
        method: "POST",
        auth: true,
        body: { pageNumber, pageSize: QUOTES_PAGE },
      },
    );
    const items = res.items ?? [];
    quotes.push(...items);
    const total = res.totalCount ?? quotes.length;
    if (quotes.length >= total || items.length < QUOTES_PAGE) break;
    pageNumber += 1;
  }
  return quotes;
}

// Builds the global quotation list. There is no "all quotes" endpoint — LeadQuotes/Page is per-lead —
// so we fetch every lead (reusing the leads feature) then aggregate quotes per lead and flatten.
export async function getAllQuotes(): Promise<QuotationRow[]> {
  const leads = await getAllLeads();
  const leadById = new Map<string, LeadRow>(leads.map((l) => [l.id, l]));

  const perLead = await pooled(leads, LEAD_CONCURRENCY, (lead) =>
    getQuotesForLead(lead.id),
  );

  return perLead
    .flat()
    .map((quote) => mapQuoteToRow(quote, leadById.get(quote.leadId ?? "")));
}

// Loads a single quote (includes its line items). GET /api/LeadQuotes/Get?leadId&id (Bearer).
export function getQuote(leadId: string, id: string): Promise<LeadQuoteRes> {
  return apiFetch<LeadQuoteRes>(
    `/api/LeadQuotes/Get?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(id)}`,
    { auth: true },
  );
}

// Loads all line items for a quote. GET /api/LeadQuoteLineItems/GetByQuotation?leadId&leadQuoteId.
export function getLineItems(
  leadId: string,
  leadQuoteId: string,
): Promise<LeadQuoteLineItemRes[]> {
  return apiFetch<LeadQuoteLineItemRes[]>(
    `/api/LeadQuoteLineItems/GetByQuotation?leadId=${encodeURIComponent(leadId)}&leadQuoteId=${encodeURIComponent(leadQuoteId)}`,
    { auth: true },
  );
}

// Minimal shape of GET /api/Leads/Get used to label the quote detail (client + composed site address).
type LeadContextRes = {
  siteAddress?: {
    street?: string;
    suburb?: string;
    city?: string;
    areaCode?: string;
  } | null;
  lotNo?: string | null;
  leadContacts?: Array<{ contact?: { firstName?: string; lastName?: string } }>;
};

// Best-effort lead context (client name + site address) for the quote detail header. Returns undefined
// on failure so the detail still renders ("—" for the missing fields).
export async function getQuoteLeadContext(
  leadId: string,
): Promise<{ client: string; address: string } | undefined> {
  try {
    const lead = await apiFetch<LeadContextRes>(
      `/api/Leads/Get?id=${encodeURIComponent(leadId)}`,
      {
        auth: true,
      },
    );
    const contact = lead.leadContacts?.[0]?.contact;
    const client =
      [contact?.firstName, contact?.lastName].filter(Boolean).join(" ") || "—";
    const a = lead.siteAddress;
    const address =
      [lead.lotNo, a?.street, a?.suburb, a?.city, a?.areaCode]
        .filter((p): p is string => Boolean(p && p.trim()))
        .join(", ") || "—";
    return { client, address };
  } catch {
    return undefined;
  }
}
