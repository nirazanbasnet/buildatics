import { getAllLeads, getLeadOptions, LeadsList, LEADS_PAGE_SIZE } from "@/features/leads";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Leads",
    description: "Manage sales leads through the pipeline.",
    canonical: "/leads"
  });
}

export default async function LeadsPage() {
  // Initial render: fetch the full set (for client-side filtering) plus the form/filter options.
  const [leads, options] = await Promise.all([getAllLeads(), getLeadOptions()]);

  return (
    <LeadsList
      initialItems={leads.slice(0, LEADS_PAGE_SIZE)}
      initialTotal={leads.length}
      options={options}
      pageSize={LEADS_PAGE_SIZE}
    />
  );
}
