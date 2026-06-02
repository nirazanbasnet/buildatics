import { properties } from "../../display-center/_data";
import { VariantHeader } from "../../_shared/variant-header";
import { DetailLayoutV2 } from "../_components/detail-layout-v2";
import { detailVariantLinks } from "../_components/variants";

export default function DisplayCenterDetailVariant2Page() {
  return (
    <div>
      <VariantHeader
        designName="Display Center Detail"
        variant="V2"
        subtitle="Vertical tabs sidebar"
        variants={detailVariantLinks}
        activeVariant="v2"
        promotedVariant="v1"
      />
      <DetailLayoutV2 property={properties[0]} />
    </div>
  );
}
