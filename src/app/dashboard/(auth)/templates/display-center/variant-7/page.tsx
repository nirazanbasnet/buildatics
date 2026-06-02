import { Toolbar } from "../_components/toolbar";
import { Variant7Layout } from "../_components/variant-layouts";

export default async function DisplayCenterVariant7({
  searchParams
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const view = (await searchParams).view === "floor" ? "floor" : "facade";
  return (
    <div>
      <Toolbar activeVariant={7} />
      <Variant7Layout view={view} />
    </div>
  );
}
