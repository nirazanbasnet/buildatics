import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { leads } from "../_data";
import { LeadsLayoutV2 } from "../_components/leads-layout-v2";
import { leadsVariantLinks, parseLeadsVariant } from "../_components/variants";

export default async function LeadsVariant2Page() {
  const cookieStore = await cookies();
  const promoted = parseLeadsVariant(cookieStore.get("leads_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Leads"
        variant="V2"
        subtitle="Row card list + kanban board matching the theme kanban UI with leads data"
        variants={leadsVariantLinks}
        activeVariant="v2"
        promotedVariant={promoted}
      />
      <LeadsLayoutV2 leads={leads} />
    </div>
  );
}
