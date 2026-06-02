import { VariantHeader } from "../../_shared/variant-header";
import { preconstructionListProjects } from "../_data";
import { PreconstructionListLayout } from "../_components/preconstruction-list-layout";
import { preconstructionListVariantLinks } from "../_components/variants";

export default function PreconstructionListVariant1Page() {
  return (
    <div>
      <VariantHeader
        designName="Preconstruction List"
        variant="V1"
        subtitle="Table view with status filter, view toggle, and pagination"
        variants={preconstructionListVariantLinks}
        activeVariant="v1"
        promotedVariant="v1"
      />
      <PreconstructionListLayout projects={preconstructionListProjects} />
    </div>
  );
}
