import { VariantHeader } from "../../_shared/variant-header";
import { preconstructionListProjects } from "../_data";
import { PreconstructionListLayoutV2 } from "../_components/preconstruction-list-layout-v2";
import { preconstructionListVariantLinks } from "../_components/variants";

export default function PreconstructionListVariant2Page() {
  return (
    <div>
      <VariantHeader
        designName="Preconstruction List"
        variant="V2"
        subtitle="Card grid with status pill, icon rows, and progress bar"
        variants={preconstructionListVariantLinks}
        activeVariant="v2"
        promotedVariant="v1"
      />
      <PreconstructionListLayoutV2 projects={preconstructionListProjects} />
    </div>
  );
}
