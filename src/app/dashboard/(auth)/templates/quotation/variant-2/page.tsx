import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { quotations } from "../_data";
import { QuotationLayoutV2 } from "../_components/quotation-layout-v2";
import { quotationVariantLinks, parseQuotationVariant } from "../_components/variants";

export default async function QuotationVariant2Page() {
  const cookieStore = await cookies();
  const promoted = parseQuotationVariant(cookieStore.get("quotation_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Quotation List"
        variant="V2"
        subtitle="Row cards with status stripe, prominent amount and inline actions"
        variants={quotationVariantLinks}
        activeVariant="v2"
        promotedVariant={promoted}
      />
      <QuotationLayoutV2 quotations={quotations} />
    </div>
  );
}
