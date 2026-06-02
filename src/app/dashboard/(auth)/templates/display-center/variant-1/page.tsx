import { Toolbar } from "../_components/toolbar";
import { Variant1Layout } from "../_components/variant-layouts";

export default async function DisplayCenterVariant1({
  searchParams
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const view = (await searchParams).view === "floor" ? "floor" : "facade";
  return (
    <div>
      <Toolbar activeVariant={1} />
      <Variant1Layout view={view} />
    </div>
  );
}
