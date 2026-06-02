import { Toolbar } from "../_components/toolbar";
import { Variant5Layout } from "../_components/variant-layouts";

export default async function DisplayCenterVariant5({
  searchParams
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const view = (await searchParams).view === "floor" ? "floor" : "facade";
  return (
    <div>
      <Toolbar activeVariant={5} />
      <Variant5Layout view={view} />
    </div>
  );
}
