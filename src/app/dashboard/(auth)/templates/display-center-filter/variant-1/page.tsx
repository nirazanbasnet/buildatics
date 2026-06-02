import { FilterContent } from "../../display-center/_components/filter-sheet";
import { VariantHeader } from "../../_shared/variant-header";
import { filterVariantLinks } from "../_components/variants";

export default function DisplayCenterFilterVariant1Page() {
  return (
    <div>
      <VariantHeader
        designName="Display Center Filter"
        variant="V1"
        subtitle="Inline preview of the Sheet in open state"
        variants={filterVariantLinks}
        activeVariant="v1"
        promotedVariant="v1"
      />
      <div className="bg-card mx-auto h-[calc(100vh-12rem)] w-full max-w-md overflow-hidden rounded-lg border shadow-sm">
        <FilterContent />
      </div>
    </div>
  );
}
