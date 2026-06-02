import { Toolbar } from "../_components/toolbar";
import { Variant6Layout } from "../_components/variant-layouts";

export default async function DisplayCenterVariant6({
  searchParams
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const view = (await searchParams).view === "floor" ? "floor" : "facade";
  return (
    <div>
      <Toolbar activeVariant={6} />
      <Variant6Layout view={view} />
    </div>
  );
}
