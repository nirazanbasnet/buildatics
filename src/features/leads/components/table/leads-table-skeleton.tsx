import { Skeleton } from "@/components/ui/skeleton";

const HEADERS = [
  "",
  "Lead No",
  "Address",
  "Status",
  "Stage",
  "Budget",
  "Client",
  "Progress",
];

export function LeadsTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div
      className="bg-card overflow-hidden rounded-lg border"
      data-slot="leads-table-skeleton"
    >
      <div className="bg-muted/50 grid grid-cols-8 gap-4 border-b px-4 py-3">
        {HEADERS.map((h, i) => (
          <Skeleton key={i} className="h-4 w-16" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid grid-cols-8 items-center gap-4 border-b px-4 py-3 last:border-0"
        >
          {Array.from({ length: 8 }).map((_, c) => (
            <Skeleton
              key={c}
              className={c === 7 ? "h-2 w-full rounded-full" : "h-4 w-20"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
