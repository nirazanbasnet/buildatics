import { Skeleton } from "@/components/ui/skeleton";

const HEADERS = ["Member", "Role", "Status", ""];

export function TeamTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div
      className="bg-card overflow-hidden rounded-lg border"
      data-slot="team-table-skeleton"
    >
      <div className="bg-muted/50 grid grid-cols-4 gap-4 border-b px-4 py-3">
        {HEADERS.map((h, i) => (
          <Skeleton key={i} className="h-4 w-16" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid grid-cols-4 items-center gap-4 border-b px-4 py-3 last:border-0"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-36" />
            </div>
          </div>
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="ml-auto h-8 w-8 rounded-md" />
        </div>
      ))}
    </div>
  );
}
