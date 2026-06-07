import { Skeleton } from "@/components/ui/skeleton";

const COLS = 8;

export function QuotationTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div
      className="bg-card overflow-hidden rounded-lg border"
      data-slot="quotation-table-skeleton"
    >
      <div className="bg-muted/50 grid grid-cols-8 gap-4 border-b px-4 py-3">
        {Array.from({ length: COLS }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-16" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid grid-cols-8 items-center gap-4 border-b px-4 py-3 last:border-0"
        >
          {Array.from({ length: COLS }).map((_, c) => (
            <Skeleton key={c} className="h-4 w-20" />
          ))}
        </div>
      ))}
    </div>
  );
}
