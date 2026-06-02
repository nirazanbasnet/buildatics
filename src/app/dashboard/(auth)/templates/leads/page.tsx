import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parseLeadsVariant } from "./_components/variants";

export default async function LeadsIndex() {
  const cookieStore = await cookies();
  const variant = parseLeadsVariant(cookieStore.get("leads_variant")?.value);
  const n = variant === "v2" ? 2 : 1;
  redirect(`/dashboard/templates/leads/variant-${n}`);
}
