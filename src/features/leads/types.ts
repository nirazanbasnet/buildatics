export const LEADS_PAGE_SIZE = 10;

// Row shape consumed by the (promoted) leads table. Mirrors the kit's `Lead` fields plus the
// id-based fields kept for client-side filtering. `status` is a display label (see map-lead.ts gap).
export type LeadRow = {
  id: string;
  leadNo: string;
  address: string;
  status: string;
  stageId: string;
  stage: string;
  budget: string;
  client: string;
  phone: string;
  progress: number;
  // Kept for filtering (not displayed as columns).
  assignedUserId: string;
  assignee: string;
  statusValue: number;
};

export type LeadOption = { id: string; name: string };

// Options that drive both the Add Lead form selects and the filter sheet.
export type LeadOptions = {
  stages: LeadOption[];
  staff: LeadOption[];
  designs: LeadOption[];
  currentUserId: string;
};

export type LeadsFilterState = {
  search: string;
  stageId: string; // "all" or a stage id
  assignedUserId: string; // "all" or a staff id
  status: string; // "all" or a status value (as string)
};

export type LeadsResult = {
  items: LeadRow[];
  total: number;
};
