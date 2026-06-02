import type { VariantLink } from "../../_shared/variant-header";

export type LeadsVariantId = "v1" | "v2";

export const leadsVariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/leads/variant-1" },
  { id: "v2", label: "V2", href: "/dashboard/templates/leads/variant-2" }
];

export function parseLeadsVariant(raw: string | undefined): LeadsVariantId {
  return raw === "v2" ? "v2" : "v1";
}
