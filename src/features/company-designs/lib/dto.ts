// DTOs for the CompanyDesigns API, mirroring docs/api/schemas.md
// (CompanyDesignRes / CompanyDesignResPage and nested blob/facade types).
// Only the fields the UI consumes are strongly typed; the rest are kept for fidelity. No `any`.

// Reuse the shared blob model shape — identical to the Designs API (docs/api/schemas.md#blobmodelres).
import type { BlobModelRes } from "@/features/designs/lib/dto";

export type { BlobModelRes };

// docs/api/schemas.md#blobmapres — CompanyDesign images come back as BlobMapRes (not the
// Design API's DesignBlobMapARes). There is no designBlobType/facadeBlobType here; the blob
// kind is encoded in `blobMapOwnerEntitySubType` (integer enum, undocumented labels — see map gap).
export type BlobMapRes = {
  id?: string;
  blobModelId?: string;
  blobModel?: BlobModelRes;
  blobMapOwnerEntityType?: number;
  blobOwnerEntityId?: string;
  blobMapOwnerEntitySubType?: number;
};

// docs/api/schemas.md#companyfacaderes
export type CompanyFacadeRes = {
  id?: string;
  name?: string;
  code?: string;
  description?: string | null;
  state?: number;
  blobMaps?: BlobMapRes[];
  companyFacadeBlobMaps?: BlobMapRes[];
};

// docs/api/schemas.md#companydesignfacademapres
export type CompanyDesignFacadeMapRes = {
  companyDesignId?: string;
  companyFacadeId?: string;
  companyFacade?: CompanyFacadeRes;
};

// docs/api/schemas.md#companydesigncustomfieldres — `group` (e.g. "Room Dimensions") groups values for detail views.
export type CompanyDesignCustomFieldRes = {
  id?: string;
  companyDesignId?: string;
  name?: string;
  value?: string | null;
  group?: string | null;
};

// docs/api/schemas.md#companydesignres
export type CompanyDesignRes = {
  id?: string;
  companyId?: string;
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
  companyDesignStatus?: number;
  baseCompanyDesignId?: string | null;
  version?: number;
  visibleOnWebsite?: boolean;
  designId?: string | null;
  blobMaps?: BlobMapRes[];
  companyDesignBlobMaps?: BlobMapRes[];
  companyDesignCustomFields?: CompanyDesignCustomFieldRes[];
  companyDesignFacadeMaps?: CompanyDesignFacadeMapRes[];
};

// docs/api/schemas.md#companydesignrespage
export type CompanyDesignResPage = {
  items?: CompanyDesignRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};

// docs/api/schemas.md#companydesignreq — request body for Create/Update.
export type CompanyDesignReq = {
  name: string;
  code?: string;
  description?: string;
  features?: string;
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
  companyDesignStatus?: number;
  baseCompanyDesignId?: string;
  version?: number;
  visibleOnWebsite?: boolean;
  designId?: string;
};
