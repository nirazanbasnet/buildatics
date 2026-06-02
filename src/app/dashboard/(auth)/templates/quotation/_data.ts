export type QuotationStatus = "signed" | "draft";

export type Quotation = {
  id: string;
  ref: string;
  client: string;
  siteAddress: string;
  attachedDesign: string;
  amount: string;
  quoteDate: string;
  expiryDate: string;
  status: QuotationStatus;
};

export const quotationStatusConfig: Record<
  QuotationStatus,
  { label: string; solid: string; dot: string; stripe: string }
> = {
  signed: {
    label: "Signed",
    solid: "bg-emerald-500 text-white dark:bg-emerald-600",
    dot: "bg-emerald-500",
    stripe: "bg-emerald-500"
  },
  draft: {
    label: "Draft",
    solid: "bg-blue-500 text-white dark:bg-blue-600",
    dot: "bg-blue-500",
    stripe: "bg-blue-500"
  }
};

export const quotations: Quotation[] = Array.from({ length: 14 }, (_, i) => ({
  id: `qn-${String(i + 1).padStart(3, "0")}`,
  ref: "#QN1000",
  client: "client_name",
  siteAddress: "LotNo, streetNo streetName, suburb postCode",
  attachedDesign: "Design_name",
  amount: "$ 125,656",
  quoteDate: "May 20 2026",
  expiryDate: "May 20 2026",
  status: i % 2 === 0 ? "signed" : "draft"
}));
