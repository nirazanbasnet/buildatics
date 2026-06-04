// DTOs for the LeadQuotes + LeadQuoteLineItems APIs, mirroring docs/api/schemas.md. No `any`.

// docs/api/schemas.md#leadquotestatus — integer enum (0–3). Terminal: Accepted, Rejected.
export type LeadQuoteStatus = 0 | 1 | 2 | 3;

// docs/api/schemas.md#leadquotelineitemres
export type LeadQuoteLineItemRes = {
  id?: string;
  leadQuoteId?: string;
  category?: string;
  description?: string;
  qty?: number;
  unitPrice?: number;
  sortOrder?: number;
  isVisible?: boolean;
};

// docs/api/schemas.md#leadquotelineitemreq
export type LeadQuoteLineItemReq = {
  leadQuoteId: string;
  category: string;
  description: string;
  qty?: number;
  unitPrice?: number;
  sortOrder?: number;
  isVisible?: boolean;
};

// docs/api/schemas.md#leadquotevariantres
export type LeadQuoteVariantRes = {
  id?: string;
  leadId?: string;
  title?: string;
  status?: LeadQuoteStatus;
  version?: number;
  isVariantOfLeadQuoteId?: string | null;
  variantOrder?: number | null;
  validUntilUtc?: string | null;
};

// docs/api/schemas.md#leadquoteres
export type LeadQuoteRes = {
  id?: string;
  createdOnUtc?: string;
  updatedOnUtc?: string;
  deletedOnUtc?: string | null;
  leadId?: string;
  title?: string;
  description?: string | null;
  status?: LeadQuoteStatus;
  version?: number;
  isVariantOfLeadQuoteId?: string | null;
  variantOrder?: number | null;
  validUntilUtc?: string | null;
  variants?: LeadQuoteVariantRes[];
  lineItems?: LeadQuoteLineItemRes[];
};

// docs/api/schemas.md#leadquoterespage
export type LeadQuoteResPage = {
  items?: LeadQuoteRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// docs/api/schemas.md#leadquotepagereq
export type LeadQuotePageReq = {
  pageNumber: number;
  pageSize: number;
};

// docs/api/schemas.md#leadquotereq
export type LeadQuoteReq = {
  title: string; // required
  description?: string;
  isVariantOfLeadQuoteId?: string | null;
  variantOrder?: number | null;
  validUntilUtc?: string | null;
};

// docs/api/schemas.md#leadquotestatusreq
export type LeadQuoteStatusReq = {
  status: LeadQuoteStatus;
};
