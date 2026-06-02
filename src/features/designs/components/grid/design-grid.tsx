import { cn } from "@/lib/utils";

import { DesignCard } from "../card/design-card";
import type { DesignProperty, DesignView } from "../../types";

type DesignGridProps = {
  designs: DesignProperty[];
  view?: DesignView;
  detailEnabled?: boolean;
  className?: string;
};

export function DesignGrid({ designs, view, detailEnabled, className }: DesignGridProps) {
  return (
    <div
      key={view ?? "facade"}
      className={cn("grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}
    >
      {designs.map((design, index) => (
        <DesignCard
          key={design.id}
          design={design}
          view={view}
          index={index}
          detailEnabled={detailEnabled}
        />
      ))}
    </div>
  );
}
