import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { leads } from "../_data";
import { LeadsLayout } from "../_components/leads-layout";
import { leadsVariantLinks, parseLeadsVariant } from "../_components/variants";

export default async function LeadsVariant1Page() {
  const cookieStore = await cookies();
  const promoted = parseLeadsVariant(cookieStore.get("leads_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Leads"
        variant="V1"
        subtitle="Table list view + kanban board card view with drag-and-drop stages"
        variants={leadsVariantLinks}
        activeVariant="v1"
        promotedVariant={promoted}
      />
      <LeadsLayout leads={leads} />
    </div>
  );
}
