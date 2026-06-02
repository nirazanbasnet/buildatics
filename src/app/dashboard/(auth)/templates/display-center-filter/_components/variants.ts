import type { VariantLink } from "../../_shared/variant-header";

export type FilterVariantId = "v1" | "v2";

export const filterVariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/display-center-filter/variant-1" },
  { id: "v2", label: "V2", href: "/dashboard/templates/display-center-filter/variant-2" }
];

export function parseFilterVariant(raw: string | undefined): FilterVariantId {
  return raw === "v2" ? "v2" : "v1";
}
