import type { VariantLink } from "../../_shared/variant-header";

export type BrochureDetailVariantId = "v1" | "v2";

export const brochureDetailVariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/brochure-detail/variant-1" }
];

export function parseBrochureDetailVariant(raw: string | undefined): BrochureDetailVariantId {
  return raw === "v2" ? "v2" : "v1";
}
