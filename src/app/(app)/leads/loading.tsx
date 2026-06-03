import { Skeleton } from "@/components/ui/skeleton";

import { LeadsTableSkeleton } from "@/features/leads";

export default function LeadsLoading() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <Skeleton className="h-5 w-20" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
      <LeadsTableSkeleton rows={8} />
    </div>
  );
}
