import type { DesignProperty } from "@/features/designs";

import type {
  PublicCompanyDesignBlobMapRes,
  PublicCompanyDesignRes,
  PublicCompanyFacadeBlobMapRes,
} from "./dto";

/**
 * API → UI field map for the Share to Site preview. Reuses the Design Library's `DesignProperty`
 * shape so the same grid/card render the public preview.
 *
 * Convention (agent/api.md): document (a) the direct field map and (b) the UI fields the API lacks.
 *
 * DIRECT MAP  PublicCompanyDesignRes → DesignProperty (UI):
 *   id → id, name → title, minimumLotWidthInMeters → width, minimumLotDepthInMeters → depth,
 *   areaInSquares → squareFootage, bedrooms → beds, bathrooms → baths, livingRooms → living,
 *   maximumCarsInGarage → garage,
 *   companyDesignBlobMaps[].blobModel.previewSasUrl (designBlobType 1/2)                → floorPlan
 *   companyDesignFacadeMaps[].companyFacade.companyFacadeBlobMaps[]...previewSasUrl (1/2) → facade
 *
 * GAPS — UI fields with NO clean API source:
 *   1. brand   — no brand field; INTERIM derive from `code`.
 *   2. version — the PUBLIC res omits `version` entirely → default "0".
 *
 * Image SAS URLs expire ~15 min, so this mapping must run server-side per request (never cached).
 */

const PLACEHOLDER_FACADE =
  "/images/display-center/facade/RENDER_DF01_12.5M_RIGHT_VN01.jpg";
const PLACEHOLDER_PLAN =
  "/images/display-center/plans/PLAN_DP01_12.5M BY 28M_RIGHT_VN01.png";

// Picks a blob's preview by preferred type order, falling back to the first available preview.
function pickPreview<T extends { blobModel?: { previewSasUrl?: string } }>(
  blobs: T[],
  getType: (blob: T) => number | undefined,
  preferredTypes: number[],
): string | undefined {
  for (const type of preferredTypes) {
    const match = blobs.find(
      (b) => getType(b) === type && b.blobModel?.previewSasUrl,
    );
    if (match?.blobModel?.previewSasUrl) return match.blobModel.previewSasUrl;
  }
  return blobs
    .map((b) => b.blobModel?.previewSasUrl)
    .find((u): u is string => Boolean(u));
}

export function mapPublicDesignToProperty(
  design: PublicCompanyDesignRes,
  index: number,
): DesignProperty {
  const floorPlan = pickPreview<PublicCompanyDesignBlobMapRes>(
    design.companyDesignBlobMaps ?? design.blobMaps ?? [],
    (b) => b.designBlobType,
    [1, 2],
  );

  const facadeBlobs: PublicCompanyFacadeBlobMapRes[] = (
    design.companyDesignFacadeMaps ?? []
  ).flatMap(
    (m) =>
      m.companyFacade?.companyFacadeBlobMaps ?? m.companyFacade?.blobMaps ?? [],
  );
  const facade = pickPreview<PublicCompanyFacadeBlobMapRes>(
    facadeBlobs,
    (b) => b.facadeBlobType,
    [1, 2],
  );

  const id = design.id ?? design.code ?? `public-design-${index}`;

  return {
    id,
    title: design.name ?? design.code ?? "Untitled design",
    brand: design.code ?? "", // GAP #1
    version: "0", // GAP #2 — public res has no version
    width: design.minimumLotWidthInMeters ?? 0,
    depth: design.minimumLotDepthInMeters ?? 0,
    squareFootage: design.areaInSquares ?? 0,
    beds: design.bedrooms ?? 0,
    baths: design.bathrooms ?? 0,
    living: design.livingRooms ?? 0,
    garage: design.maximumCarsInGarage ?? 0,
    facade: facade ?? floorPlan ?? PLACEHOLDER_FACADE,
    floorPlan: floorPlan ?? facade ?? PLACEHOLDER_PLAN,
  };
}
