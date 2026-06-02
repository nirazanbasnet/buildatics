import type { VariantLink } from "../../_shared/variant-header";

export type QuotationDetailVariantId = "v1" | "v2";

export const quotationDetailVariantLinks: VariantLink[] = [
  { id: "v1", label: "V1", href: "/dashboard/templates/quotation-detail/variant-1" }
];

export function parseQuotationDetailVariant(raw: string | undefined): QuotationDetailVariantId {
  return raw === "v2" ? "v2" : "v1";
}
