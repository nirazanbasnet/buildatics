// DTOs for the Brochures API, mirroring docs/api/schemas.md. Only the fields the UI uses are typed. No `any`.

// docs/api/schemas.md#blobmodelres — `inlineOpenSasUrl` renders the HTML inline; `sasUrl` downloads.
export type BlobModelRes = {
  id?: string;
  fileName?: string;
  updatedOnUtc?: string;
  sasUrl?: string;
  inlineOpenSasUrl?: string;
};

// docs/api/schemas.md#blobmapres
export type BlobMapRes = {
  id?: string;
  blobModelId?: string;
  blobModel?: BlobModelRes;
};

// docs/api/schemas.md#brochureres
export type BrochureRes = {
  id?: string;
  createdOnUtc?: string;
  updatedOnUtc?: string;
  name?: string;
  note?: string | null;
  jsonConfig?: string | null;
  brochureTemplateId?: string | null;
  blobMapId?: string | null;
  blobMap?: BlobMapRes | null;
};

// docs/api/schemas.md#brochurerespage
export type BrochureResPage = {
  items?: BrochureRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// docs/api/schemas.md#brochuretemplateres
export type BrochureTemplateRes = {
  id?: string;
  name?: string;
  note?: string | null;
  jsonConfig?: string | null;
  blobModel?: BlobModelRes;
};

// docs/api/schemas.md#brochuretemplaterespage
export type BrochureTemplateResPage = {
  items?: BrochureTemplateRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// docs/api/schemas.md#pdfservicetype — integer enum 0-2 (converter type for the PDF service).
export type PdfServiceType = 0 | 1 | 2;
