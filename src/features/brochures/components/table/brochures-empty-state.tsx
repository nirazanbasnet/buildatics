import { BookOpen, SearchX } from "lucide-react";

import { cn } from "@/lib/utils";

type BrochuresEmptyStateProps = {
  filtered?: boolean;
  className?: string;
};

export function BrochuresEmptyState({
  filtered,
  className,
}: BrochuresEmptyStateProps) {
  const Icon = filtered ? SearchX : BookOpen;
  return (
    <div
      className={cn(
        "bg-card flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-20 text-center",
        className,
      )}
      data-slot="brochures-empty-state"
    >
      <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-full">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-4 text-base font-semibold">
        {filtered ? "No matching brochures" : "No brochures yet"}
      </h3>
      <p className="text-muted-foreground mt-1 max-w-sm text-sm">
        {filtered
          ? "No brochures match your search. Try a different term."
          : "Create your first brochure with the Add Brochure button."}
      </p>
    </div>
  );
}
