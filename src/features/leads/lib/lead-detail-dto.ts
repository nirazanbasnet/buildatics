// DTOs for the rich Lead detail (tasks, activity, quotes, designs), mirroring docs/api/schemas.md.
// Reuses the leads LeadRes/AddressRes. No `any`.
import type { AddressRes, LeadRes } from "./dto";

export type { AddressRes, LeadRes };

// The list endpoint omits `developer`; the detail surfaces extra lead fields, so widen here.
export type LeadDetailRes = LeadRes & {
  developer?: string | null;
  notes?: string | null;
  clientBudget?: number | null;
  landWidthInMetres?: number | null;
  landDepthInMetres?: number | null;
  houseAreaInSquareMetres?: number | null;
};

// docs/api/schemas.md#leadtaskres — LeadTaskStatus int enum 0-2 (labels tentative, see lead-detail-types.ts).
export type LeadTaskRes = {
  id?: string;
  leadId?: string;
  title?: string;
  description?: string | null;
  status?: number;
  dueDate?: string | null;
  assignedUserId?: string | null;
};
export type LeadTaskResPage = {
  items?: LeadTaskRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};
export type LeadTaskReq = {
  title: string;
  description?: string;
  status?: number;
  dueDate?: string;
};

// docs/api/schemas.md#leadactivitylogres
export type LeadActivityLogRes = {
  id?: string;
  leadId?: string;
  type?: number;
  source?: number;
  summary?: string;
  details?: string | null;
  occurredOnUtc?: string;
  performedByName?: string | null;
};
export type LeadActivityLogResPage = {
  items?: LeadActivityLogRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};
export type LeadActivityLogReq = {
  type: number;
  summary: string;
  details?: string;
};

// docs/api/schemas.md#leadquotelineitemres
export type LeadQuoteLineItemRes = {
  id?: string;
  qty?: number;
  unitPrice?: number;
};

// docs/api/schemas.md#leadquoteres — LeadQuoteStatus 0 Draft,1 Sent,2 Accepted,3 Rejected.
export type LeadQuoteRes = {
  id?: string;
  leadId?: string;
  title?: string;
  description?: string | null;
  status?: number;
  version?: number;
  validUntilUtc?: string | null;
  createdOnUtc?: string;
  lineItems?: LeadQuoteLineItemRes[];
};
export type LeadQuoteResPage = {
  items?: LeadQuoteRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};
export type LeadQuoteReq = {
  title: string;
  description?: string;
  validUntilUtc?: string;
};
export type LeadQuoteStatusReq = {
  status: number;
};

// docs/api/schemas.md#leaddesignres
export type LeadDesignRes = {
  id?: string;
  leadId?: string;
  companyDesignId?: string;
};
