import type { VariantLink } from "../../_shared/variant-header";

export type PreconstructionDetailVariantId = "v1" | "v2";

export const preconstructionDetailVariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/preconstruction-detail/variant-1" },
  { id: "v2", label: "V2", href: "/dashboard/templates/preconstruction-detail/variant-2" }
];

export function parsePreconstructionDetailVariant(
  raw: string | undefined
): PreconstructionDetailVariantId {
  return raw === "v2" ? "v2" : "v1";
}
