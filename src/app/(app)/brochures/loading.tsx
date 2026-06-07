import { Skeleton } from "@/components/ui/skeleton";

import { BrochuresTableSkeleton } from "@/features/brochures";

export default function BrochuresLoading() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
      <BrochuresTableSkeleton rows={8} />
    </div>
  );
}
