import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Subtle loading placeholder matching the DesignCard shape (image banner + title/specs).
export function DesignCardSkeleton() {
  return (
    <Card
      className="relative h-full gap-0 overflow-hidden p-0"
      data-slot="design-card-skeleton"
    >
      <Skeleton className="h-72 w-full rounded-none" />
      <div className="gap-4 p-4 sm:grid sm:grid-cols-5">
        <div className="col-span-2 mb-4 flex justify-between gap-3 sm:mb-0 sm:flex-col">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-6 w-12" />
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-md" />
          ))}
        </div>
      </div>
      {/* Shimmer sweep over the pulsing blocks for a richer loading feel. */}
      <div
        aria-hidden
        className="animate-shimmer pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-foreground/10 to-transparent"
      />
    </Card>
  );
}

export function DesignGridSkeleton({
  count = 9,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <DesignCardSkeleton key={i} />
      ))}
    </div>
  );
}
