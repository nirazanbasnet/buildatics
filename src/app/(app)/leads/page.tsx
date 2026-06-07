import { AccessDenied } from "@src/components/access-denied";
import { loadGuarded } from "@/features/auth/lib/guard";
import {
  getAllLeads,
  getLeadOptions,
  LeadsList,
  LEADS_PAGE_SIZE,
} from "@/features/leads";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Leads",
    description: "Manage sales leads through the pipeline.",
    canonical: "/leads",
  });
}

export default async function LeadsPage() {
  // Initial render: fetch the full set (for client-side filtering) plus the form/filter options.
  const result = await loadGuarded(() =>
    Promise.all([getAllLeads(), getLeadOptions()]),
  );
  if (!result.ok) {
    return (
      <AccessDenied
        title="No access to leads"
        description="Your account doesn't have permission to view leads. Contact an administrator if you need access."
      />
    );
  }
  const [leads, options] = result.data;

  return (
    <LeadsList
      initialItems={leads.slice(0, LEADS_PAGE_SIZE)}
      initialTotal={leads.length}
      options={options}
      pageSize={LEADS_PAGE_SIZE}
    />
  );
}
