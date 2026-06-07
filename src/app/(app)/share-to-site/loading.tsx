import { Skeleton } from "@/components/ui/skeleton";

import { DesignGridSkeleton } from "@/features/designs";

// Shown while the page server-fetches the embed iframe + public preview (Next streams this instantly).
export default function ShareToSiteLoading() {
  return (
    <div className="grid h-full gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <div className="bg-card flex h-fit flex-col gap-4 rounded-2xl border p-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div>
        <div className="flex items-center justify-between gap-3 pb-4">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-44" />
        </div>
        <DesignGridSkeleton count={6} />
      </div>
    </div>
  );
}
