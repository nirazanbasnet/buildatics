import { cookies } from "next/headers";

// eslint-disable-next-line no-restricted-imports -- importing from src/app/.../templates/ route segment (not the top-level /templates playground). Until shared components are promoted to src/components/, the production leads page sources its layout from this iteration location.
import { leads } from "../templates/leads/_data";
// eslint-disable-next-line no-restricted-imports -- see note above
import { LeadsLayout } from "../templates/leads/_components/leads-layout";
// eslint-disable-next-line no-restricted-imports -- see note above
import { LeadsLayoutV2 } from "../templates/leads/_components/leads-layout-v2";
// eslint-disable-next-line no-restricted-imports -- see note above
import { parseLeadsVariant } from "../templates/leads/_components/variants";

export default async function LeadsPage() {
  const cookieStore = await cookies();
  const leadsVariant = parseLeadsVariant(cookieStore.get("leads_variant")?.value);

  const Layout = leadsVariant === "v2" ? LeadsLayoutV2 : LeadsLayout;

  return <Layout leads={leads} />;
}
