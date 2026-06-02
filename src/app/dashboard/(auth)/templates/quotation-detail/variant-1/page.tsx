import { VariantHeader } from "../../_shared/variant-header";
import { quotationDetailMock } from "../_data";
import { QuotationDetailLayout } from "../_components/quotation-detail-layout";
import { quotationDetailVariantLinks } from "../_components/variants";

export default function QuotationDetailVariant1Page() {
  return (
    <div>
      <VariantHeader
        designName="Quotation Detail"
        variant="V1"
        subtitle="Tabbed quote builder with editable categories, live totals, and summary sidebar"
        variants={quotationDetailVariantLinks}
        activeVariant="v1"
        promotedVariant="v1"
      />
      <QuotationDetailLayout detail={quotationDetailMock} />
    </div>
  );
}
