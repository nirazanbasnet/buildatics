// eslint-disable-next-line no-restricted-imports -- importing from src/app/.../templates/ route segment (not the top-level /templates playground). Until shared components are promoted to src/components/, the production display-center page sources its layouts and toolbar from this iteration location.
import { Toolbar } from "../templates/display-center/_components/toolbar";
// eslint-disable-next-line no-restricted-imports -- see note above
import { Variant7Layout } from "../templates/display-center/_components/variant-layouts";
import { PaginationNav } from "@src/components/pagination-nav";

export default async function DisplayCenterPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const view = (await searchParams).view === "floor" ? "floor" : "facade";

  return (
    <div className="">
      <Toolbar mode="production" filterEnabled filterVariant="v1" />
      <Variant7Layout view={view} detailEnabled detailVariant="v1" />
      <PaginationNav />
    </div>
  );
}
