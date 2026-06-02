import type { VariantLink } from "../../_shared/variant-header";

export type QuotationVariantId = "v1" | "v2";

export const quotationVariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/quotation/variant-1" },
  { id: "v2", label: "V2", href: "/dashboard/templates/quotation/variant-2" }
];

export function parseQuotationVariant(raw: string | undefined): QuotationVariantId {
  return raw === "v2" ? "v2" : "v1";
}
