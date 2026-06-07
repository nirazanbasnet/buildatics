// DTOs for the Share to Site feature, mirroring docs/api/schemas.md
// (CompanyDesignsIFrameRes + the Public* company-design types). No `any`.

// Public blob model is the same shape as the authenticated one (docs/api/schemas.md#publicblobmodelres).
import type { BlobModelRes } from "@/features/designs/lib/dto";

export type { BlobModelRes };

// docs/api/schemas.md#companydesignsiframeres
export type CompanyDesignsIFrameRes = {
  iFrame?: string;
};

// docs/api/schemas.md#companyres — only the field the Share to Site style controls round-trip.
export type CompanyStyleRes = {
  publicCompanyDesignStyle?: string | null;
};

// docs/api/schemas.md#publiccompanydesignblobmapres — public blobs DO carry a labelled designBlobType.
export type PublicCompanyDesignBlobMapRes = {
  blobModel?: BlobModelRes;
  blobMapOwnerEntityType?: number;
  designBlobType?: number;
};

// docs/api/schemas.md#publiccompanyfacadeblobmapres
export type PublicCompanyFacadeBlobMapRes = {
  companyFacadeId?: string;
  blobModelId?: string;
  blobModel?: BlobModelRes;
  blobMapOwnerEntityType?: number;
  facadeBlobType?: number;
};

// docs/api/schemas.md#publiccompanyfacaderes
export type PublicCompanyFacadeRes = {
  id?: string;
  name?: string;
  code?: string;
  description?: string | null;
  state?: number;
  blobMaps?: PublicCompanyFacadeBlobMapRes[];
  companyFacadeBlobMaps?: PublicCompanyFacadeBlobMapRes[];
};

// docs/api/schemas.md#publiccompanydesignfacademapres
export type PublicCompanyDesignFacadeMapRes = {
  companyFacadeId?: string;
  companyFacade?: PublicCompanyFacadeRes;
};

// docs/api/schemas.md#publiccompanydesigncustomfieldres
export type PublicCompanyDesignCustomFieldRes = {
  id?: string;
  name?: string;
  value?: string | null;
  group?: string | null;
};

// docs/api/schemas.md#publiccompanydesignres — note: no `version` field on the public shape.
export type PublicCompanyDesignRes = {
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
  companyDesignStatus?: number;
  blobMaps?: PublicCompanyDesignBlobMapRes[];
  companyDesignBlobMaps?: PublicCompanyDesignBlobMapRes[];
  companyDesignCustomFields?: PublicCompanyDesignCustomFieldRes[];
  companyDesignFacadeMaps?: PublicCompanyDesignFacadeMapRes[];
};

// docs/api/schemas.md#publiccompanydesignrespage
export type PublicCompanyDesignResPage = {
  items?: PublicCompanyDesignRes[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
};
