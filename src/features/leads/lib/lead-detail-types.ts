// UI shapes for the rich Lead detail sheet (mapped from Lead* DTOs in map-lead-detail.ts).

export type LeadOwner = {
  id: string;
  label: string;
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type LeadOverview = {
  id: string;
  leadNo: string;
  address: string;
  status: string;
  statusValue: number;
  stage: string;
  progress: number;
  budget: string;
  developer: string;
  notes: string;
  owners: LeadOwner[];
};

export type LeadTask = {
  id: string;
  title: string;
  description: string;
  status: number;
  statusLabel: string;
  dueDate: string;
};

export type LeadQuoteRow = {
  id: string;
  ref: string;
  version: number;
  amount: string;
  validUntil: string;
  status: number;
  statusLabel: string;
};

export type LeadActivityEntry = {
  id: string;
  summary: string;
  details: string;
  occurredOn: string;
  performedBy: string;
};

export type LeadDesignItem = {
  id: string; // LeadDesign mapping id (used to unlink)
  companyDesignId: string;
  title: string;
  image: string;
};

// A company design option for the "Link design" picker.
export type DesignOption = { id: string; title: string; image: string };

export type LeadDetail = {
  overview: LeadOverview;
  tasks: LeadTask[];
  quotes: LeadQuoteRow[];
  activity: LeadActivityEntry[];
  designs: LeadDesignItem[];
  // Company designs not yet linked — drives the picker.
  designOptions: DesignOption[];
};

// docs/api/schemas.md#leadtaskstatus — int enum 0-2, no labels in spec. Tentative.
export const TASK_STATUS_OPTIONS: Array<{ value: number; label: string }> = [
  { value: 0, label: "Pending" },
  { value: 1, label: "In Progress" },
  { value: 2, label: "Completed" },
];
export function taskStatusLabel(value: number | null | undefined): string {
  return (
    TASK_STATUS_OPTIONS.find((o) => o.value === value)?.label ??
    `Status ${value ?? 0}`
  );
}

// docs/api/schemas.md#leadquotestatus — documented enum.
export const QUOTE_STATUS_OPTIONS: Array<{ value: number; label: string }> = [
  { value: 0, label: "Draft" },
  { value: 1, label: "Sent" },
  { value: 2, label: "Accepted" },
  { value: 3, label: "Rejected" },
];
export function quoteStatusLabel(value: number | null | undefined): string {
  return (
    QUOTE_STATUS_OPTIONS.find((o) => o.value === value)?.label ??
    `Status ${value ?? 0}`
  );
}

// docs/api/schemas.md#leadstatus — int enum 0-6, no labels in spec (mirrors leads map-lead.ts). Tentative.
export const LEAD_STATUS_OPTIONS: Array<{ value: number; label: string }> = [
  { value: 0, label: "New" },
  { value: 1, label: "In Progress" },
  { value: 2, label: "Qualified" },
  { value: 3, label: "Won" },
  { value: 4, label: "Lost" },
  { value: 5, label: "On Hold" },
  { value: 6, label: "Archived" },
];

// Default activity type for manual logs (LeadActivityLogType 1-9, unlabeled — tentative).
export const MANUAL_ACTIVITY_TYPE = 1;
