// DTOs for the admin BrochureTemplatesA API, mirroring docs/api/schemas.md. No `any`.

export type BlobModelRes = {
  id?: string;
  fileName?: string;
  updatedOnUtc?: string;
  sasUrl?: string;
  inlineOpenSasUrl?: string;
};

// docs/api/schemas.md#brochuretemplateares
export type BrochureTemplateARes = {
  id?: string;
  createdOnUtc?: string;
  updatedOnUtc?: string;
  name?: string;
  note?: string | null;
  jsonConfig?: string | null;
  isAvailable?: boolean;
  blobModelId?: string | null;
  blobModel?: BlobModelRes;
};

// docs/api/schemas.md#brochuretemplatearespage
export type BrochureTemplateAResPage = {
  items?: BrochureTemplateARes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// docs/api/schemas.md#updatebrochuretemplateareq
export type UpdateBrochureTemplateAReq = {
  name: string;
  note?: string;
  jsonConfig?: string;
  isAvailable?: boolean;
};
