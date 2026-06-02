import {
  ArrowLeftRight,
  LayoutDashboard,
  Receipt,
  TrendingUp,
  Wallet,
  type LucideIcon
} from "lucide-react";

export const financeTabs = ["Overview", "Claims", "Payables", "Project P & L", "Cashflow"] as const;
export type FinanceTab = (typeof financeTabs)[number];

const financeTabIcons: Record<FinanceTab, LucideIcon> = {
  Overview: LayoutDashboard,
  Claims: Receipt,
  Payables: Wallet,
  "Project P & L": TrendingUp,
  Cashflow: ArrowLeftRight
};

export const financeTabItems = financeTabs.map((value) => ({
  value,
  icon: financeTabIcons[value]
}));

export type FinanceStat = {
  id: string;
  label: string;
  value: string;
  valueClass: string;
  accentClass: string;
  subtext?: string;
};

export const financeStats: FinanceStat[] = [
  {
    id: "receivable",
    label: "Outstanding Receivable",
    value: "$ 492,250",
    valueClass: "text-blue-600",
    accentClass: "text-blue-600 border-blue-300",
    subtext: "4 sent Claims"
  },
  {
    id: "payable",
    label: "Total Payable",
    value: "$ 215,998",
    valueClass: "text-orange-500",
    accentClass: "text-orange-500 border-orange-300"
  },
  {
    id: "revenue",
    label: "Monthly Revenue",
    value: "$ 547,256",
    valueClass: "text-green-600",
    accentClass: "text-green-600 border-green-300",
    subtext: "Month - April"
  },
  {
    id: "overdue",
    label: "Overdue to Trades",
    value: "$ 16,544",
    valueClass: "text-red-500",
    accentClass: "text-red-500 border-red-300"
  }
];

export type ClaimStatus = "sent" | "paid";

export const claimStatusConfig: Record<ClaimStatus, { label: string; badge: string }> = {
  sent: {
    label: "Sent",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
  },
  paid: {
    label: "Paid",
    badge: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300"
  }
};

export type Claim = {
  id: string;
  ref: string;
  client: string;
  projectAddress: string;
  stage: string;
  status: ClaimStatus;
  issuedDate: string;
  dueDate: string;
  amount: string;
};

export const claims: Claim[] = Array.from({ length: 10 }, (_, i) => ({
  id: `claim-${i + 1}`,
  ref: "claim_id",
  client: "Sarah Johnson",
  projectAddress: "Project Address",
  stage: "stage_name",
  status: i % 2 === 0 ? "sent" : "paid",
  issuedDate: "issued_date",
  dueDate: "due_date",
  amount: "$ 16,544"
}));

export type ClaimDetailStep = {
  label: string;
  date: string;
  done: boolean;
};

export type ClaimDetail = {
  id: string;
  claimId: string;
  company: string;
  companyAbn: string;
  billToName: string;
  billToAddress: string;
  issued: string;
  due: string;
  lineItems: { label: string; amount: string }[];
  gstLabel: string;
  gstAmount: string;
  total: string;
  payment: { bank: string; accountNo: string; bsb: string; reference: string };
  steps: ClaimDetailStep[];
};

export const claimDetailMock: ClaimDetail = {
  id: "claim-1",
  claimId: "CLM 25456",
  company: "Buildatics",
  companyAbn: "Machelle Home Pty Ltd ABN 123 456 789",
  billToName: "Client_Name",
  billToAddress: "Hadley 280",
  issued: "20 April 2026",
  due: "28 April 2026",
  lineItems: [{ label: "Frame Hardley - 280", amount: "$6,592.00" }],
  gstLabel: "GST 13%",
  gstAmount: "$799",
  total: "$1198.00",
  payment: {
    bank: "bank_name",
    accountNo: "8520256321111",
    bsb: "5642",
    reference: "CLM25456"
  },
  steps: [
    { label: "Created", date: "10 April 2026", done: true },
    { label: "Sent", date: "15 April 2026", done: true },
    { label: "Paid", date: "20 April 2026", done: false }
  ]
};

export type PayableStatus = "sent";

export type Payable = {
  id: string;
  invoice: string;
  vendor: string;
  project: string;
  stage: string;
  status: PayableStatus;
  dueDate: string;
};

export const payables: Payable[] = Array.from({ length: 10 }, (_, i) => ({
  id: `payable-${i + 1}`,
  invoice: "#IN1000",
  vendor: "vendor_name",
  project: "project_name",
  stage: "stage_name",
  status: "sent",
  dueDate: "May 20 2026"
}));

export type ProjectPL = {
  id: string;
  project: string;
  clientAddress: string;
  profit: string;
  margin: number;
  stage: string;
  contract: string;
  estCost: string;
  received: string;
  outstanding: string;
};

export const projectPL: ProjectPL[] = Array.from({ length: 10 }, (_, i) => ({
  id: `project-${i + 1}`,
  project: "Sarah Johnson - Frame",
  clientAddress: "client_address",
  profit: "$17,000",
  margin: 50,
  stage: "stage_name",
  contract: "$ 16,544",
  estCost: "$ 16,544",
  received: "$ 16,544",
  outstanding: "$ 16,544"
}));

export type OutstandingClaim = {
  id: string;
  client: string;
  meta: string;
  warning?: { text: string; tone: "danger" | "warning" };
  amount: string;
};

export const outstandingClaims: OutstandingClaim[] = [
  {
    id: "oc-1",
    client: "Sarah Johnson",
    meta: "CLM-2026-014 · Due 14 May 2026",
    warning: {
      text: "4 days past due. Pay immediately to maintain trade relationship.",
      tone: "danger"
    },
    amount: "$ 16,544"
  },
  {
    id: "oc-2",
    client: "Sarah Johnson",
    meta: "CLM-2026-014 · Due 14 May 2026",
    warning: {
      text: "4 days past due. Pay immediately to maintain trade relationship.",
      tone: "danger"
    },
    amount: "$ 16,544"
  },
  {
    id: "oc-3",
    client: "Sarah Johnson - Frame",
    meta: "CLM-2026-014 · Due 14 May 2026",
    warning: {
      text: "2 days for due date. Pay asap to maintain trade relationship.",
      tone: "warning"
    },
    amount: "$ 16,544"
  },
  {
    id: "oc-4",
    client: "Sarah Johnson - Frame",
    meta: "CLM-2026-014 · Due 14 May 2026",
    amount: "$ 16,544"
  },
  {
    id: "oc-5",
    client: "Sarah Johnson - Frame",
    meta: "CLM-2026-014 · Due 14 May 2026",
    amount: "$ 16,544"
  }
];

export type CashflowPoint = {
  month: string;
  revenue: number;
  tradeCost: number;
};

export const cashflowData: CashflowPoint[] = [
  { month: "Jan", revenue: 320, tradeCost: 160 },
  { month: "Feb", revenue: 480, tradeCost: 300 },
  { month: "Mar", revenue: 400, tradeCost: 220 },
  { month: "Apr", revenue: 180, tradeCost: 320 },
  { month: "May", revenue: 360, tradeCost: 240 },
  { month: "Jun", revenue: 360, tradeCost: 250 },
  { month: "July", revenue: 320, tradeCost: 180 },
  { month: "Aug", revenue: 480, tradeCost: 320 },
  { month: "Sep", revenue: 380, tradeCost: 240 },
  { month: "Oct", revenue: 160, tradeCost: 320 },
  { month: "Nov", revenue: 320, tradeCost: 240 },
  { month: "Dec", revenue: 320, tradeCost: 280 }
];
