import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import type { PreconstructionCategory } from "../_data";

import { PreconstructionDetailActions } from "./preconstruction-detail-actions";
import { PreconstructionDetailCategoryProgress } from "./preconstruction-detail-category-progress";

type Props = {
  categories: PreconstructionCategory[];
  children: ReactNode;
  className?: string;
};

export function PreconstructionTabLayout({ categories, children, className }: Props) {
  return (
    <div className={cn("grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]", className)}>
      <div className="min-w-0">{children}</div>
      <aside className="flex flex-col gap-3">
        <PreconstructionDetailCategoryProgress categories={categories} />
        <PreconstructionDetailActions />
      </aside>
    </div>
  );
}
