// DTOs for the Leads API, mirroring docs/api/schemas.md. Only fields we use are strongly typed. No `any`.

// docs/api/schemas.md#addressreq / #addressres
export type AddressReq = {
  street?: string;
  areaCode: string; // required by the API
  suburb?: string;
  city?: string;
  state?: number;
};

export type AddressRes = {
  id?: string;
  street?: string;
  areaCode?: string;
  suburb?: string;
  city?: string;
  state?: number | null;
};

// docs/api/schemas.md#contactreq / #contactminres
export type ContactReq = {
  firstName: string; // required
  lastName?: string;
  middleName?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  notes?: string;
  address?: AddressReq;
};

export type ContactRes = {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  primaryEmail?: string | null;
  primaryPhone?: string | null;
  address?: AddressRes | null;
};

export type LeadContactRes = {
  id?: string;
  contactId?: string;
  contact?: ContactRes;
};

export type LeadDesignRes = {
  id?: string;
  leadId?: string;
  companyDesignId?: string;
};

// docs/api/schemas.md#leadreq
export type LeadReq = {
  contactIds: string[]; // required — at least one company contact
  notes?: string;
  status?: number;
  leadStageId?: string;
  assignedUserId?: string;
  priority?: number;
  clientBudget?: number;
  siteAddressId?: string;
  siteAddress?: AddressReq;
  lotNo?: string;
};

// docs/api/schemas.md#leadres
export type LeadRes = {
  id?: string;
  sequenceNumber?: number;
  leadContacts?: LeadContactRes[];
  notes?: string | null;
  status?: number | null;
  leadStageId?: string | null;
  assignedUserId?: string | null;
  priority?: number | null;
  clientBudget?: number | null;
  siteAddress?: AddressRes | null;
  lotNo?: string | null;
  leadDesigns?: LeadDesignRes[];
  createdOnUtc?: string;
};

export type LeadResPage = {
  items?: LeadRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// docs/api/schemas.md#leadstageres
export type LeadStageRes = {
  id?: string;
  name?: string;
  colour?: string;
  sortOrder?: number;
};

// docs/api/schemas.md#staffres
export type StaffRes = {
  id?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
};

export type LeadDesignReq = {
  leadId: string;
  companyDesignId: string;
};
