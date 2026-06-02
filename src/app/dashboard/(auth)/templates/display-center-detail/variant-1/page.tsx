import { properties } from "../../display-center/_data";
import { VariantHeader } from "../../_shared/variant-header";
import { DetailLayout } from "../_components/detail-layout";
import { detailVariantLinks } from "../_components/variants";

export default function DisplayCenterDetailVariant1Page() {
  return (
    <div>
      <VariantHeader
        designName="Display Center Detail"
        variant="V1"
        subtitle="Two-column inline preview"
        variants={detailVariantLinks}
        activeVariant="v1"
        promotedVariant="v1"
      />
      <DetailLayout property={properties[0]} />
    </div>
  );
}
