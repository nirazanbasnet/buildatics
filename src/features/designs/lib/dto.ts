// DTOs for the Designs API, mirroring docs/api/schemas.md (DesignRes / DesignResPage and nested blob/facade types).
// Only the fields the UI consumes are strongly typed; the rest are kept for fidelity. No `any`.

// docs/api/schemas.md#blobmodelres — `previewSasUrl` is the inline JPG preview we render.
export type BlobModelRes = {
  id?: string;
  fileName?: string;
  description?: string | null;
  sasUrl?: string;
  inlineOpenSasUrl?: string;
  previewSasUrl?: string;
  previewInlineOpenSasUrl?: string;
  expiresOnUtc?: string;
};

// designBlobType / facadeBlobType are integer enums 0-4; the spec does NOT label them
// (see the gap note in map-design.ts), so we don't model them as named members.
export type DesignBlobMapARes = {
  designId?: string;
  blobModelId?: string;
  blobModel?: BlobModelRes;
  designBlobType?: number;
};

export type FacadeBlobMapRes = {
  facadeId?: string;
  blobModelId?: string;
  blobModel?: BlobModelRes;
  facadeBlobType?: number;
};

export type FacadeRes = {
  id?: string;
  name?: string;
  code?: string;
  description?: string | null;
  state?: number;
  facadeBlobMaps?: FacadeBlobMapRes[];
};

export type DesignFacadeMapRes = {
  designId?: string;
  facadeId?: string;
  facade?: FacadeRes;
};

// docs/api/schemas.md#designcustomfieldares — `group` (e.g. "Room Dimensions") groups key/values for the detail view.
export type DesignCustomFieldARes = {
  designId?: string;
  name?: string;
  value?: string | null;
  group?: string | null;
};

// docs/api/schemas.md#designres
export type DesignRes = {
  id?: string;
  name?: string;
  code?: string;
  description?: string | null;
  features?: string | null;
  minimumLotWidthInMeters?: number;
  minimumLotDepthInMeters?: number;
  areaInSquares?: number;
  storeys?: number;
  maximumCarsInGarage?: number;
  livingRooms?: number;
  bathrooms?: number;
  bedrooms?: number;
  renderCount?: number;
  elevationCount?: number;
  designStatus?: number;
  baseDesignId?: string | null;
  version?: number;
  designBlobMaps?: DesignBlobMapARes[];
  designCustomFields?: DesignCustomFieldARes[];
  designFacadeMaps?: DesignFacadeMapRes[];
};

// docs/api/schemas.md#designrespage
export type DesignResPage = {
  items?: DesignRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};
