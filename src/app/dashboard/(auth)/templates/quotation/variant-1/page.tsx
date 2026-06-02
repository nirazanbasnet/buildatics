import { cookies } from "next/headers";

import { VariantHeader } from "../../_shared/variant-header";
import { quotations } from "../_data";
import { QuotationLayout } from "../_components/quotation-layout";
import { quotationVariantLinks, parseQuotationVariant } from "../_components/variants";

export default async function QuotationVariant1Page() {
  const cookieStore = await cookies();
  const promoted = parseQuotationVariant(cookieStore.get("quotation_variant")?.value);

  return (
    <div>
      <VariantHeader
        designName="Quotation List"
        variant="V1"
        subtitle="Dense table with status pills and per-row actions menu"
        variants={quotationVariantLinks}
        activeVariant="v1"
        promotedVariant={promoted}
      />
      <QuotationLayout quotations={quotations} />
    </div>
  );
}
