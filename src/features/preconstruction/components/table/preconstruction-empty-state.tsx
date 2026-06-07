import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

type PreconstructionEmptyStateProps = {
  className?: string;
};

export function PreconstructionEmptyState({
  className,
}: PreconstructionEmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-card flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-20 text-center",
        className,
      )}
      data-slot="preconstruction-empty-state"
    >
      <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
        <Inbox className="size-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold">No projects yet</h3>
      <p className="text-muted-foreground mt-1 max-w-sm text-sm">
        Preconstruction projects appear here once leads are created.
      </p>
    </div>
  );
}
