import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { brochures } from "../_data";
import { BrochuresLayoutV2 } from "../_components/brochures-layout-v2";
import { brochuresVariantLinks, parseBrochuresVariant } from "../_components/variants";

export default async function BrochuresVariant2Page() {
  const cookieStore = await cookies();
  const promoted = parseBrochuresVariant(cookieStore.get("brochures_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Brochure List"
        variant="V2"
        subtitle="Row cards with status stripe and inline actions"
        variants={brochuresVariantLinks}
        activeVariant="v2"
        promotedVariant={promoted}
      />
      <BrochuresLayoutV2 brochures={brochures} />
    </div>
  );
}
