import type { VariantLink } from "../../_shared/variant-header";

export type PreconstructionListVariantId = "v1" | "v2";

export const preconstructionListVariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/preconstruction-list/variant-1" },
  { id: "v2", label: "V2", href: "/dashboard/templates/preconstruction-list/variant-2" }
];

export function parsePreconstructionListVariant(
  raw: string | undefined
): PreconstructionListVariantId {
  return raw === "v2" ? "v2" : "v1";
}
