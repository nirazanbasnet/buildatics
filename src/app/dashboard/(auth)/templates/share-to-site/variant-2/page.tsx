import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { ShareToSiteLayout } from "../_components/share-to-site-layout";
import { UseThisButton } from "../_components/use-this-button";
import { parseShareToSiteVariant, shareToSiteVariantLinks } from "../_components/variants";

export default async function ShareToSiteVariant2Page() {
  const cookieStore = await cookies();
  const promoted = parseShareToSiteVariant(cookieStore.get("share_to_site_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Share to Site"
        variant="V2"
        subtitle="V2 — design pending"
        variants={shareToSiteVariantLinks}
        activeVariant="v2"
        promotedVariant={promoted}
        action={<UseThisButton variant="v2" />}
      />
      <ShareToSiteLayout />
    </div>
  );
}
