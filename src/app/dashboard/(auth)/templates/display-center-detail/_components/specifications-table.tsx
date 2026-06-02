import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { detailSpecs } from "../_data";

export function SpecificationsTable({
  className,
  headerClassName
}: {
  className?: string;
  headerClassName?: string;
}) {
  return (
    <Card className={cn("gap-0 p-0", className)}>
      <div
        className={cn(
          "bg-muted/40 flex items-center justify-between border-b px-4 py-2.5",
          headerClassName
        )}
      >
        <h3 className="font-display text-base">Specifications</h3>
      </div>
      <div className="divide-y">
        {detailSpecs.map((spec) => (
          <div
            key={spec.label}
            className="hover:bg-accent/30 flex items-center justify-between px-4 py-2 text-sm transition-colors"
          >
            <span>{spec.label}</span>
            <span className="text-muted-foreground font-display text-sm">{spec.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
