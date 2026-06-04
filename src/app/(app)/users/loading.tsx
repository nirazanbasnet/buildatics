import { Skeleton } from "@/components/ui/skeleton";

import { UsersTableSkeleton } from "@/features/users";

export default function UsersLoading() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-28" />
      </div>
      <UsersTableSkeleton rows={8} />
    </div>
  );
}
