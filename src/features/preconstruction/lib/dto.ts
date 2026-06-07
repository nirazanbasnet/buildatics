// Preconstruction reuses the Leads API (POST /api/Leads/Page); these DTOs extend the leads ones.
import type { AddressRes, LeadReq, LeadRes } from "@/features/leads/lib/dto";

export type { AddressRes };

// docs/api/schemas.md#blobmodelres — only the fields the Documents tab consumes.
export type BlobModelRes = {
  id?: string;
  fileName?: string;
  description?: string | null;
  updatedOnUtc?: string;
  sasUrl?: string;
  inlineOpenSasUrl?: string;
};

// docs/api/schemas.md#leadres — the leads feature's LeadRes omits `developer`; preconstruction
// surfaces it as a column, so widen the type here ("Name of the land developer or estate").
export type PreconLeadRes = LeadRes & {
  developer?: string | null;
  notes?: string | null;
  clientBudget?: number | null;
  landWidthInMetres?: number | null;
  landDepthInMetres?: number | null;
  houseAreaInSquareMetres?: number | null;
  landSizeInSquareMetres?: number | null;
};

// docs/api/schemas.md#leadreq — widen with `developer` (the leads feature's LeadReq omits it).
export type PreconLeadReq = LeadReq & {
  developer?: string;
};

export type PreconLeadResPage = {
  items?: PreconLeadRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// docs/api/schemas.md#leadtaskres — LeadTaskStatus is an int enum 0-2 (labels: see detail-types.ts).
export type LeadTaskRes = {
  id?: string;
  leadId?: string;
  title?: string;
  description?: string | null;
  status?: number;
  dueDate?: string | null;
  assignedUserId?: string | null;
  createdOnUtc?: string;
};

export type LeadTaskResPage = {
  items?: LeadTaskRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// docs/api/schemas.md#leadtaskreq
export type LeadTaskReq = {
  title: string;
  description?: string;
  status?: number;
  dueDate?: string;
  assignedUserId?: string;
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
  performedByUserId?: string | null;
  performedByName?: string | null;
};

export type LeadActivityLogResPage = {
  items?: LeadActivityLogRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// docs/api/schemas.md#leadactivitylogreq
export type LeadActivityLogReq = {
  type: number;
  summary: string;
  details?: string;
  occurredOnUtc?: string;
  metadataJson?: string;
};

// docs/api/schemas.md#leadblobmapres
export type LeadBlobMapRes = {
  leadId?: string;
  blobModelId?: string;
  blobModel?: BlobModelRes;
  blobMapOwnerEntityType?: number;
  leadBlobType?: number;
};
