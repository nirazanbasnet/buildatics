"use client";

import { cn } from "@/lib/utils";

import type { PropertyView } from "../_data";
import { PaginationNav } from "@src/components/pagination-nav";
import { Toolbar } from "./toolbar";
import { VARIANT_LAYOUTS, type VariantId } from "./variant-layouts";

type Props = {
  style: VariantId;
  font?: string;
  theme?: string;
  view?: PropertyView;
  className?: string;
};

export function DisplayCenterShowcase({
  style,
  font,
  theme,
  view = "facade",
  className,
}: Props) {
  const Layout = VARIANT_LAYOUTS[style];

  return (
    <div
      data-theme-preset={theme && theme !== "default" ? theme : undefined}
      data-theme-font={font && font !== "default" ? font : undefined}
      className={cn("", className)}
      data-slot="share-preview"
    >
      <Toolbar mode="production" filterEnabled filterVariant="v1" />
      <Layout view={view} gridClassName="min-[100rem]:grid-cols-3" />
      <PaginationNav />
    </div>
  );
}

// 1600px to rem
