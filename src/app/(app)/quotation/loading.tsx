import { Skeleton } from "@/components/ui/skeleton";

import { QuotationTableSkeleton } from "@/features/quotation";

export default function QuotationLoading() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-9 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
      <QuotationTableSkeleton rows={8} />
    </div>
  );
}
