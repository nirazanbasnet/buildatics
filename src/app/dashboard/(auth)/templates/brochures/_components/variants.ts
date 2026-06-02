import type { VariantLink } from "../../_shared/variant-header";

export type BrochuresVariantId = "v1" | "v2";

export const brochuresVariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/brochures/variant-1" },
  { id: "v2", label: "V2", href: "/dashboard/templates/brochures/variant-2" }
];

export function parseBrochuresVariant(raw: string | undefined): BrochuresVariantId {
  return raw === "v2" ? "v2" : "v1";
}
