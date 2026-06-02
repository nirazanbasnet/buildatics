import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { parseShareToSiteVariant } from "./_components/variants";

export default async function ShareToSiteIndex() {
  const cookieStore = await cookies();
  const variant = parseShareToSiteVariant(cookieStore.get("share_to_site_variant")?.value);
  const n = variant === "v2" ? 2 : 1;
  redirect(`/dashboard/templates/share-to-site/variant-${n}`);
}
