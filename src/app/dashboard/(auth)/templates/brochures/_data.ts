export type BrochureStatus = "draft" | "sent";

export type Brochure = {
  id: string;
  ref: string;
  client: string;
  siteAddress: string;
  design: string;
  createdDate: string;
  status: BrochureStatus;
};

export const brochureStatusConfig: Record<
  BrochureStatus,
  { label: string; solid: string; dot: string; stripe: string }
> = {
  draft: {
    label: "Draft",
    solid: "bg-blue-500 text-white dark:bg-blue-600",
    dot: "bg-blue-500",
    stripe: "bg-blue-500"
  },
  sent: {
    label: "Sent",
    solid: "bg-emerald-500 text-white dark:bg-emerald-600",
    dot: "bg-emerald-500",
    stripe: "bg-emerald-500"
  }
};

export const brochures: Brochure[] = Array.from({ length: 14 }, (_, i) => ({
  id: `br-${String(i + 1).padStart(3, "0")}`,
  ref: "#BR1000",
  client: "client_name",
  siteAddress: "LotNo, streetNo streetName, suburb postCode",
  design: "Design_name",
  createdDate: "May 20 2026",
  status: i % 2 === 0 ? "draft" : "sent"
}));
