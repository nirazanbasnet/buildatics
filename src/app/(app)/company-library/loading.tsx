import { Skeleton } from "@/components/ui/skeleton";

import { DesignGridSkeleton } from "@/features/designs";

// Shown while the page server-fetches the full company design set (Next streams this instantly).
export default function CompanyLibraryLoading() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <Skeleton className="h-5 w-24" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-44" />
        </div>
      </div>
      <DesignGridSkeleton count={9} />
    </div>
  );
}
