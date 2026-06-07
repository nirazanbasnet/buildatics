import { AccessDenied } from "@src/components/access-denied";
import { loadGuarded } from "@/features/auth/lib/guard";
import { DesignLibrary, getAllDesigns } from "@/features/designs";
import { getAreaBounds } from "@/features/designs/lib/filter";
import { DESIGNS_PAGE_SIZE } from "@/features/designs/types";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Design Library",
    description: "Browse the design library of house plans and facades.",
    canonical: "/design-library",
  });
}

export default async function DesignLibraryPage() {
  // Initial render: fetch the full set once to derive the area-filter bounds and the first page.
  // Subsequent filter/page changes go through the queryDesigns server action (see DesignLibrary).
  const result = await loadGuarded(() => getAllDesigns());
  if (!result.ok) {
    return (
      <AccessDenied
        title="No access to the design library"
        description="Your account doesn't have permission to view designs. Contact an administrator if you need access."
      />
    );
  }
  const all = result.data;
  const areaBounds = getAreaBounds(all);

  return (
    <DesignLibrary
      initialItems={all.slice(0, DESIGNS_PAGE_SIZE)}
      initialTotal={all.length}
      areaBounds={areaBounds}
      pageSize={DESIGNS_PAGE_SIZE}
    />
  );
}
