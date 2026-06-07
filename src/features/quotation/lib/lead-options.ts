import { getAllLeads } from "@/features/leads";

export type QuoteLeadOption = { id: string; label: string };

// Lead choices for the "Add quotation" form. A quote is always created against a lead, so the form
// must pick one. Label combines the lead number and client for recognisability.
export async function getQuoteLeadOptions(): Promise<QuoteLeadOption[]> {
  const leads = await getAllLeads();
  return leads.map((lead) => ({
    id: lead.id,
    label:
      [lead.leadNo, lead.client].filter((p) => p && p !== "—").join(" · ") ||
      lead.leadNo,
  }));
}
