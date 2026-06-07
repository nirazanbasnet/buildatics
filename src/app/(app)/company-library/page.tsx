import { CompanyLibrary, getAllCompanyDesigns } from "@/features/company-designs";
import { getAreaBounds } from "@/features/designs/lib/filter";
import { DESIGNS_PAGE_SIZE } from "@/features/designs/types";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Company Library",
    description: "Browse and manage your company's house designs and facades.",
    canonical: "/company-library"
  });
}

export default async function CompanyLibraryPage() {
  // Initial render: fetch the full set once to derive the area-filter bounds and the first page.
  // Subsequent filter/page changes go through the queryCompanyDesigns server action (see CompanyLibrary).
  const all = await getAllCompanyDesigns();
  const areaBounds = getAreaBounds(all);

  return (
    <CompanyLibrary
      initialItems={all.slice(0, DESIGNS_PAGE_SIZE)}
      initialTotal={all.length}
      areaBounds={areaBounds}
      pageSize={DESIGNS_PAGE_SIZE}
    />
  );
}
