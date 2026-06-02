import type { VariantLink } from "../../_shared/variant-header";

export type DetailVariantId = "v1" | "v2";

export const detailVariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/display-center-detail/variant-1" },
  { id: "v2", label: "V2", href: "/dashboard/templates/display-center-detail/variant-2" }
];

export function parseDetailVariant(raw: string | undefined): DetailVariantId {
  return raw === "v2" ? "v2" : "v1";
}
