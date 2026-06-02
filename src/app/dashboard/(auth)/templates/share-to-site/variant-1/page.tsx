import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { ShareToSiteLayout } from "../_components/share-to-site-layout";
import { UseThisButton } from "../_components/use-this-button";
import { parseShareToSiteVariant, shareToSiteVariantLinks } from "../_components/variants";

export default async function ShareToSiteVariant1Page() {
  const cookieStore = await cookies();
  const promoted = parseShareToSiteVariant(cookieStore.get("share_to_site_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Share to Site"
        variant="V1"
        subtitle="Embed configurator with live Display Center preview"
        variants={shareToSiteVariantLinks}
        activeVariant="v1"
        promotedVariant={promoted}
        action={<UseThisButton variant="v1" />}
      />
      <ShareToSiteLayout />
    </div>
  );
}
