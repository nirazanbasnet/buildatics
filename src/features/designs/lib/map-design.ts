import type { DesignBlobMapARes, DesignRes, FacadeBlobMapRes } from "./dto";
import type { DesignProperty } from "../types";

/**
 * API → UI field map for the Design Library (display-center) cards.
 *
 * Convention (see agent/api.md): every API→UI mapper documents (a) the direct field map and
 * (b) the UI fields the API does NOT supply, so the same gap analysis is repeatable elsewhere.
 *
 * DIRECT MAP  DesignRes → DesignProperty (UI):
 *   name                      → title
 *   minimumLotWidthInMeters   → width
 *   minimumLotDepthInMeters   → depth
 *   areaInSquares             → squareFootage   (AU "squares")
 *   bedrooms                  → beds
 *   bathrooms                 → baths
 *   livingRooms               → living
 *   maximumCarsInGarage       → garage
 *   version (int)             → version (string)
 *   designBlobMaps[].blobModel.previewSasUrl                       → floorPlan (JPG preview of plan PDF)
 *   designFacadeMaps[].facade.facadeBlobMaps[].blobModel.previewSasUrl → facade (preview)
 *
 * GAPS — UI fields with NO clean API source (decisions needed with the backend):
 *   1. brand        — DesignRes has no brand/builder field. INTERIM: derive from `code`.
 *                     Options: drop the brand tag, use company.name, or add a field to the API.
 *   2. blob type    — facadeBlobType 1/2 = renders (left/right), 3/4 = elevations;
 *                     designBlobType 1/2 = plan pages. We pick the render for the facade view and the
 *                     plan for the floor view (confirmed against the reference app), with a fallback
 *                     to the first available preview when those types are missing.
 *   3. id           — top-level DesignRes.id is absent in the /Page response; INTERIM: derive from
 *                     designBlobMaps[].designId, then `code`, then index.
 *   4. detail sub-sections (room dimensions, description, available facades) are out of this pass:
 *        - room dimensions ARE supported via designCustomFields (group "Room Dimensions") but are empty in data.
 *        - description / features exist (features currently null); facades exist via designFacadeMaps.
 *
 * Image SAS URLs expire ~15 min, so this mapping must run server-side per request (never cached/persisted).
 */

// Defensive only: live data always carries previews. Local kit assets guarantee next/image never gets "".
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

export function mapDesignToProperty(
  design: DesignRes,
  index: number,
): DesignProperty {
  // Floor plan: prefer plan pages (designBlobType 1 then 2).
  const floorPlan = pickPreview<DesignBlobMapARes>(
    design.designBlobMaps ?? [],
    (b) => b.designBlobType,
    [1, 2],
  );

  // Facade: prefer the rendered facade (facadeBlobType 1 then 2) over elevations (3/4).
  const facadeBlobs: FacadeBlobMapRes[] = (
    design.designFacadeMaps ?? []
  ).flatMap((m) => m.facade?.facadeBlobMaps ?? []);
  const facade = pickPreview<FacadeBlobMapRes>(
    facadeBlobs,
    (b) => b.facadeBlobType,
    [1, 2],
  );

  const id =
    design.id ??
    design.designBlobMaps?.[0]?.designId ??
    design.code ??
    `design-${index}`;

  return {
    id,
    title: design.name ?? design.code ?? "Untitled design",
    brand: design.code ?? "", // GAP #1
    version: String(design.version ?? 0),
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
