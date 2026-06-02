import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parseBrochuresVariant } from "./_components/variants";

export default async function BrochuresIndex() {
  const cookieStore = await cookies();
  const variant = parseBrochuresVariant(cookieStore.get("brochures_variant")?.value);
  const n = variant === "v2" ? 2 : 1;
  redirect(`/dashboard/templates/brochures/variant-${n}`);
}
