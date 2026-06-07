import { Skeleton } from "@/components/ui/skeleton";

import { BrochureTemplatesTableSkeleton } from "@/features/brochure-templates";

export default function BrochureTemplatesLoading() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
      <BrochureTemplatesTableSkeleton rows={6} />
    </div>
  );
}
