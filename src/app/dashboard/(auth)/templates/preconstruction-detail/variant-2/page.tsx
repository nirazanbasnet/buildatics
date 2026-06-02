import { VariantHeader } from "../../_shared/variant-header";
import { preconstructionDetailMock } from "../_data";
import { PreconstructionDetailLayoutV2 } from "../_components/preconstruction-detail-layout-v2";
import { preconstructionDetailVariantLinks } from "../_components/variants";

export default function PreconstructionDetailVariant2Page() {
  return (
    <div>
      <VariantHeader
        designName="Preconstruction Detail"
        variant="V2"
        subtitle="Single column with hero actions, KPI strip, and segmented category progress"
        variants={preconstructionDetailVariantLinks}
        activeVariant="v2"
        promotedVariant="v1"
      />
      <PreconstructionDetailLayoutV2 project={preconstructionDetailMock} />
    </div>
  );
}
