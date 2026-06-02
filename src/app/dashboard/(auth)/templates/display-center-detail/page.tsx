import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parseDetailVariant } from "./_components/variants";

export default async function DisplayCenterDetailIndex() {
  const cookieStore = await cookies();
  const variant = parseDetailVariant(cookieStore.get("display_center_detail_variant")?.value);
  const n = variant === "v2" ? 2 : 1;
  redirect(`/dashboard/templates/display-center-detail/variant-${n}`);
}
