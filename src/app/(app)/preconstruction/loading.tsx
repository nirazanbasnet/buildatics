import { Skeleton } from "@/components/ui/skeleton";

import { PreconstructionTableSkeleton } from "@/features/preconstruction";

export default function PreconstructionLoading() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <PreconstructionTableSkeleton rows={8} />
    </div>
  );
}
