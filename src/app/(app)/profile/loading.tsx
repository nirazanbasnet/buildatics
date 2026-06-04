import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="size-14 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <Skeleton className="h-9 w-56" />
      <Skeleton className="h-80 w-full rounded-xl" />
    </div>
  );
}
