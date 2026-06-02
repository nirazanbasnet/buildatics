import { FilterContentV2 } from "../../display-center/_components/filter-content-v2";
import { VariantHeader } from "../../_shared/variant-header";
import { filterVariantLinks } from "../_components/variants";

export default function DisplayCenterFilterVariant2Page() {
  return (
    <div>
      <VariantHeader
        designName="Display Center Filter"
        variant="V2"
        subtitle="Accordion sections with inline summaries"
        variants={filterVariantLinks}
        activeVariant="v2"
        promotedVariant="v1"
      />
      <div className="bg-card mx-auto h-[calc(100vh-12rem)] w-full max-w-md overflow-hidden rounded-lg border shadow-sm">
        <FilterContentV2 />
      </div>
    </div>
  );
}
