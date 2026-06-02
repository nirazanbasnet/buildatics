import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parseFilterVariant } from "./_components/variants";

export default async function DisplayCenterFilterIndex() {
  const cookieStore = await cookies();
  const variant = parseFilterVariant(cookieStore.get("display_center_filter_variant")?.value);
  const n = variant === "v2" ? 2 : 1;
  redirect(`/dashboard/templates/display-center-filter/variant-${n}`);
}
