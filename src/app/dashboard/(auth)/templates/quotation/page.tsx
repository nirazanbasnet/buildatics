import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parseQuotationVariant } from "./_components/variants";

export default async function QuotationIndex() {
  const cookieStore = await cookies();
  const variant = parseQuotationVariant(cookieStore.get("quotation_variant")?.value);
  const n = variant === "v2" ? 2 : 1;
  redirect(`/dashboard/templates/quotation/variant-${n}`);
}
