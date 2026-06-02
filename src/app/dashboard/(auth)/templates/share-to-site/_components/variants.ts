import type { VariantLink } from "../../_shared/variant-header";

export type ShareToSiteVariantId = "v1" | "v2";

export const shareToSiteVariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/share-to-site/variant-1" },
  { id: "v2", label: "V2", href: "/dashboard/templates/share-to-site/variant-2" }
];

export function parseShareToSiteVariant(raw: string | undefined): ShareToSiteVariantId {
  return raw === "v2" ? "v2" : "v1";
}
