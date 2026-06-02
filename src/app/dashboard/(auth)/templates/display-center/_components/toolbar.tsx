"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Home, LayoutGrid, ListFilter, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SegmentedNav } from "@src/components/ui/segmented-nav";
import { cn } from "@/lib/utils";

import { FilterSheet } from "./filter-sheet";
import type { FilterVariantId } from "../../display-center-filter/_components/variants";
import type { PropertyView } from "../_data";
import type { VariantId } from "./variant-layouts";

const VIEW_ITEMS = [
  { value: "facade" as const, label: "Facade View", icon: Home },
  { value: "floor" as const, label: "Floor Plan View", icon: LayoutGrid }
];

type Props = {
  activeVariant?: VariantId;
  mode?: "iteration" | "production";
  /** Only honored when mode === "production". Hides the Filter button until the filter design is promoted. */
  filterEnabled?: boolean;
  /** Which filter variant the FilterSheet should render. */
  filterVariant?: FilterVariantId;
};

const variantLabels: Record<number, string> = {
  1: "3-col grid",
  5: "Compact list",
  6: "Showcase",
  7: "Spec grid"
};

export function Toolbar({
  activeVariant,
  mode = "iteration",
  filterEnabled,
  filterVariant
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view: PropertyView = searchParams.get("view") === "floor" ? "floor" : "facade";
  const [filterOpen, setFilterOpen] = useState(false);

  const showFilter = mode === "iteration" || filterEnabled;

  function setView(next: PropertyView) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "facade") params.delete("view");
    else params.set("view", next);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="space-y-3 pb-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Beds</span>
          <Badge variant="default" className="h-7 gap-1 rounded-full py-1 pr-1 pl-3">
            2 Beds
            <Button variant="ghost" size="icon" className="size-5 rounded-full hover:bg-white/20">
              <X className="size-3" />
            </Button>
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {showFilter ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => setFilterOpen(true)}
              >
                <ListFilter className="size-4" />
                Filter
              </Button>
              <FilterSheet open={filterOpen} onOpenChange={setFilterOpen} variant={filterVariant} />
            </>
          ) : null}
          <SegmentedNav<PropertyView>
            items={VIEW_ITEMS}
            value={view}
            onValueChange={setView}
            ariaLabel="View"
            className="h-9 w-auto"
          />
        </div>
      </div>

      {mode === "iteration" && activeVariant ? (
        <div className="border-border bg-muted/40 flex flex-wrap items-center gap-1 rounded-md border p-1">
          <span className="text-muted-foreground px-2 text-xs font-medium uppercase">Layout</span>
          {([1, 5, 6, 7] as const).map((n) => (
            <Button
              key={n}
              asChild
              variant={n === activeVariant ? "default" : "ghost"}
              size="sm"
              className={cn("h-7", n !== activeVariant && "text-muted-foreground")}
            >
              <Link href={`/dashboard/templates/display-center/variant-${n}`}>
                V{n} · {variantLabels[n]}
              </Link>
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
