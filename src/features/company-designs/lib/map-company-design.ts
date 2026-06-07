import type { DesignProperty } from "@/features/designs";

import type { BlobMapRes, CompanyDesignRes } from "./dto";

/**
 * API → UI field map for the Company Library cards. Reuses the Design Library's `DesignProperty`
 * UI shape so the same grid/card/filter/detail components render both libraries.
 *
 * Convention (see agent/api.md): every API→UI mapper documents (a) the direct field map and
 * (b) the UI fields the API does NOT supply, so the gap analysis is repeatable.
 *
 * DIRECT MAP  CompanyDesignRes → DesignProperty (UI):
 *   id                        → id   (CompanyDesignRes has a real top-level PK, unlike DesignRes)
 *   name                      → title
 *   minimumLotWidthInMeters   → width
 *   minimumLotDepthInMeters   → depth
 *   areaInSquares             → squareFootage   (AU "squares")
 *   bedrooms                  → beds
 *   bathrooms                 → baths
 *   livingRooms               → living
 *   maximumCarsInGarage       → garage
 *   version (int)             → version (string)
 *   companyDesignBlobMaps[].blobModel.previewSasUrl                              → floorPlan
 *   companyDesignFacadeMaps[].companyFacade.companyFacadeBlobMaps[].blobModel.previewSasUrl → facade
 *
 * GAPS — UI fields with NO clean API source:
 *   1. brand     — CompanyDesignRes has no brand/builder field. INTERIM: derive from `code`.
 *   2. blob kind — CompanyDesign blobs carry no labelled type (the Design API's designBlobType/
 *                  facadeBlobType don't exist here; kind is in `blobMapOwnerEntitySubType` whose
 *                  enum labels are undocumented). INTERIM: pick the first available preview.
 *   3. images    — Designs created via Create have no blobs yet (Create doesn't accept files), so
 *                  those cards fall back to the kit placeholder until images are uploaded.
 *
 * Image SAS URLs expire ~15 min, so this mapping must run server-side per request (never cached).
 */

// Defensive only: imported designs carry previews. Local kit assets guarantee next/image never gets "".
const PLACEHOLDER_FACADE =
  "/images/display-center/facade/RENDER_DF01_12.5M_RIGHT_VN01.jpg";
const PLACEHOLDER_PLAN =
  "/images/display-center/plans/PLAN_DP01_12.5M BY 28M_RIGHT_VN01.png";

// First available preview URL across a set of blob maps.
function firstPreview(blobs: BlobMapRes[]): string | undefined {
  return blobs
    .map((b) => b.blobModel?.previewSasUrl)
    .find((u): u is string => Boolean(u));
}

export function mapCompanyDesignToProperty(
  cd: CompanyDesignRes,
  index: number,
): DesignProperty {
  const designBlobs = cd.companyDesignBlobMaps ?? cd.blobMaps ?? [];
  const floorPlan = firstPreview(designBlobs);

  const facadeBlobs: BlobMapRes[] = (cd.companyDesignFacadeMaps ?? []).flatMap(
    (m) =>
      m.companyFacade?.companyFacadeBlobMaps ?? m.companyFacade?.blobMaps ?? [],
  );
  const facade = firstPreview(facadeBlobs);

  const id = cd.id ?? cd.code ?? `company-design-${index}`;

  return {
    id,
    title: cd.name ?? cd.code ?? "Untitled design",
    brand: cd.code ?? "", // GAP #1
    version: String(cd.version ?? 0),
    width: cd.minimumLotWidthInMeters ?? 0,
    depth: cd.minimumLotDepthInMeters ?? 0,
    squareFootage: cd.areaInSquares ?? 0,
    beds: cd.bedrooms ?? 0,
    baths: cd.bathrooms ?? 0,
    living: cd.livingRooms ?? 0,
    garage: cd.maximumCarsInGarage ?? 0,
    facade: facade ?? floorPlan ?? PLACEHOLDER_FACADE,
    floorPlan: floorPlan ?? facade ?? PLACEHOLDER_PLAN,
  };
}
