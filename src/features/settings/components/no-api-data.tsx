import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

type NoApiDataProps = {
  label?: string;
  className?: string;
};

// Marks fields/sections with no backend so a gap reads as intentional (per product decision).
export function NoApiData({
  label = "No data in API",
  className,
}: NoApiDataProps) {
  return (
    <span
      className={cn(
        "text-muted-foreground/70 inline-flex items-center gap-1 text-xs italic",
        className,
      )}
      data-slot="no-api-data"
    >
      <Info className="size-3.5" />
      {label}
    </span>
  );
}

export function NoApiDataBlock({ label, className }: NoApiDataProps) {
  return (
    <div
      className={cn(
        "text-muted-foreground/80 flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-12 text-center text-sm",
        className,
      )}
      data-slot="no-api-data-block"
    >
      <Info className="size-5" />
      {label ?? "No data in API"}
    </div>
  );
}
