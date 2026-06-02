import { VariantHeader } from "../../_shared/variant-header";
import { preconstructionDetailMock } from "../_data";
import { PreconstructionDetailLayout } from "../_components/preconstruction-detail-layout";
import { preconstructionDetailVariantLinks } from "../_components/variants";

export default function PreconstructionDetailVariant1Page() {
  return (
    <div>
      <VariantHeader
        designName="Preconstruction Detail"
        variant="V1"
        subtitle="Two-column overview with stat cards, owner tabs, and category sidebar"
        variants={preconstructionDetailVariantLinks}
        activeVariant="v1"
        promotedVariant="v1"
      />
      <PreconstructionDetailLayout project={preconstructionDetailMock} />
    </div>
  );
}
