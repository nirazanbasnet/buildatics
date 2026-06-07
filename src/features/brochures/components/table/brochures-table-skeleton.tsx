import { Skeleton } from "@/components/ui/skeleton";

const HEADERS = [
  "Ref",
  "Client",
  "Site Address",
  "Design",
  "Created",
  "Status",
  "",
];

export function BrochuresTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div
      className="bg-card overflow-hidden rounded-lg border"
      data-slot="brochures-table-skeleton"
    >
      <div className="bg-muted/50 grid grid-cols-7 gap-4 border-b px-4 py-3">
        {HEADERS.map((h, i) => (
          <Skeleton key={i} className="h-4 w-16" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid grid-cols-7 items-center gap-4 border-b px-4 py-3 last:border-0"
        >
          {Array.from({ length: 7 }).map((_, c) => (
            <Skeleton key={c} className="h-4 w-20" />
          ))}
        </div>
      ))}
    </div>
  );
}
