import { Skeleton } from "@/components/ui/skeleton";

const HEADERS = ["Name", "Available", "Note", "Created", ""];

export function BrochureTemplatesTableSkeleton({
  rows = 6,
}: {
  rows?: number;
}) {
  return (
    <div
      className="bg-card overflow-hidden rounded-lg border"
      data-slot="brochure-templates-skeleton"
    >
      <div className="bg-muted/50 grid grid-cols-5 gap-4 border-b px-4 py-3">
        {HEADERS.map((h, i) => (
          <Skeleton key={i} className="h-4 w-16" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid grid-cols-5 items-center gap-4 border-b px-4 py-3 last:border-0"
        >
          {Array.from({ length: 5 }).map((_, c) => (
            <Skeleton key={c} className="h-4 w-20" />
          ))}
        </div>
      ))}
    </div>
  );
}
