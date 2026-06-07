import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { DetailActions } from "./detail-actions";
import type { LeadOverview } from "../../lib/lead-detail-types";

type TabLayoutProps = {
  overview: LeadOverview;
  children: ReactNode;
  className?: string;
};

// Two-column wrapper (preconstruction template): tab content (left) + quick Actions sidebar (right).
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
        <DetailActions owner={overview.owners[0]} />
      </aside>
    </div>
  );
}
