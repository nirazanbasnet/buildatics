import { VariantHeader } from "../../_shared/variant-header";
import { brochureDetailMock } from "../_data";
import { BrochureDetailLayout } from "../_components/brochure-detail-layout";
import { brochureDetailVariantLinks } from "../_components/variants";

export default function BrochureDetailVariant1Page() {
  return (
    <div>
      <VariantHeader
        designName="Brochure Detail"
        variant="V1"
        subtitle="Tabbed brochure builder with owners, property info, designs, preview, and history"
        variants={brochureDetailVariantLinks}
        activeVariant="v1"
        promotedVariant="v1"
      />
      <BrochureDetailLayout detail={brochureDetailMock} />
    </div>
  );
}
