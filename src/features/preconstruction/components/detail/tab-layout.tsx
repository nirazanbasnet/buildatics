import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { DetailActions } from "./detail-actions";
import { DetailCategoryProgress } from "./detail-category-progress";
import type { ProjectOverview } from "../../lib/detail-types";

type TabLayoutProps = {
  overview: ProjectOverview;
  children: ReactNode;
  className?: string;
};

// V1 two-column wrapper (matches the design): tab content (left) + sidebar with Category Progress +
// quick Actions (right).
export function TabLayout({ overview, children, className }: TabLayoutProps) {
  return (
    <div
      className={cn(
        "grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]",
        className,
      )}
    >
      <div className="min-w-0">{children}</div>
      <aside className="flex flex-col gap-3">
        <DetailCategoryProgress />
        <DetailActions owner={overview.owners[0]} />
      </aside>
    </div>
  );
}
