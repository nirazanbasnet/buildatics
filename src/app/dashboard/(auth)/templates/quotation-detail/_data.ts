import { Calculator, Eye, History, type LucideIcon } from "lucide-react";

export type QuotationDetailStatus = "draft" | "sent" | "signed" | "declined";

export type QuotationLineItem = {
  id: string;
  name: string;
  cost: number;
  visible: boolean;
};

export type QuotationCategory = {
  id: string;
  name: string;
  collapsed: boolean;
  items: QuotationLineItem[];
};

export type QuotationDetail = {
  id: string;
  title: string;
  client: string;
  design: string;
  siteAddress: string;
  gstRate: number;
  status: QuotationDetailStatus;
  version: string;
  dateCreated: string;
  validUntil: string;
  estimatedCost: number;
  categories: QuotationCategory[];
  internalNotes: string;
  scope: string;
  terms: string;
};

export const quotationDetailTabs = ["Quote Builder", "Preview", "History"] as const;
export type QuotationDetailTab = (typeof quotationDetailTabs)[number];

const quotationDetailTabIcons: Record<QuotationDetailTab, LucideIcon> = {
  "Quote Builder": Calculator,
  Preview: Eye,
  History: History
};

export const quotationDetailTabItems = quotationDetailTabs.map((value) => ({
  value,
  icon: quotationDetailTabIcons[value]
}));

export const quotationDetailStatusLabels: Record<QuotationDetailStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  signed: "Signed",
  declined: "Declined"
};

export function formatCurrency(amount: number): string {
  return `$ ${Math.round(amount).toLocaleString("en-US")}`;
}

export function categoryTotal(category: QuotationCategory): number {
  return category.items.reduce((sum, item) => (item.visible ? sum + item.cost : sum), 0);
}

export function quotedCost(detail: QuotationDetail): number {
  return detail.categories.reduce((sum, category) => sum + categoryTotal(category), 0);
}

export function gstAmount(detail: QuotationDetail): number {
  return (quotedCost(detail) * detail.gstRate) / 100;
}

export function totalCost(detail: QuotationDetail): number {
  return quotedCost(detail) + gstAmount(detail);
}

export function grossMargin(detail: QuotationDetail): number {
  return quotedCost(detail) - detail.estimatedCost;
}

export type QuotationBuilderHandlers = {
  addCategory: () => void;
  moveCategory: (categoryId: string, direction: -1 | 1) => void;
  renameCategory: (categoryId: string, name: string) => void;
  duplicateCategory: (categoryId: string) => void;
  toggleCategoryCollapsed: (categoryId: string) => void;
  deleteCategory: (categoryId: string) => void;
  addLineItem: (categoryId: string) => void;
  updateLineItem: (categoryId: string, itemId: string, patch: Partial<QuotationLineItem>) => void;
  toggleLineItemVisibility: (categoryId: string, itemId: string) => void;
  moveLineItem: (categoryId: string, itemId: string, direction: -1 | 1) => void;
  reorderLineItems: (categoryId: string, activeId: string, overId: string) => void;
  duplicateLineItem: (categoryId: string, itemId: string) => void;
  deleteLineItem: (categoryId: string, itemId: string) => void;
};

function item(id: string, name: string, cost: number): QuotationLineItem {
  return { id, name, cost, visible: true };
}

export const quotationDetailMock: QuotationDetail = {
  id: "qn-001",
  title: "Double Storey Custom Home",
  client: "client_name",
  design: "design_name",
  siteAddress: "lotNo, streetNo streetName, suburb postCode",
  gstRate: 10,
  status: "sent",
  version: "V1",
  dateCreated: "25 April 2026",
  validUntil: "2026-12-06",
  estimatedCost: 165000,
  internalNotes: "",
  scope: "",
  terms: "",
  categories: [
    {
      id: "cat-1",
      name: "Site Works",
      collapsed: false,
      items: [item("li-1", "Site cut & fill", 32000), item("li-2", "Soil testing & survey", 18000)]
    },
    {
      id: "cat-2",
      name: "Structure",
      collapsed: false,
      items: [item("li-3", "Concrete slab", 28000), item("li-4", "Frame & trusses", 22000)]
    },
    {
      id: "cat-3",
      name: "Lock-up",
      collapsed: false,
      items: [item("li-5", "Roofing", 26000), item("li-6", "Brickwork & cladding", 24000)]
    },
    {
      id: "cat-4",
      name: "Fit-out",
      collapsed: false,
      items: [item("li-7", "Plumbing & electrical", 30000), item("li-8", "Plaster & paint", 20000)]
    }
  ]
};
