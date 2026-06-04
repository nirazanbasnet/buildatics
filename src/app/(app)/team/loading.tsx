import { Skeleton } from "@/components/ui/skeleton";

import { TeamTableSkeleton } from "@/features/team";

export default function TeamLoading() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
      <TeamTableSkeleton rows={6} />
    </div>
  );
}
