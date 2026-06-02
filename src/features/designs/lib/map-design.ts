import type { DesignRes } from "./dto";
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
 *   2. blob type    — designBlobType / facadeBlobType are unlabeled int enums (0-4); we cannot tell
 *                     "render vs elevation vs plan-left/right" apart. INTERIM: first available previewSasUrl.
 *   3. id           — top-level DesignRes.id is absent in the /Page response; INTERIM: derive from
 *                     designBlobMaps[].designId, then `code`, then index.
 *   4. detail sub-sections (room dimensions, description, available facades) are out of this pass:
 *        - room dimensions ARE supported via designCustomFields (group "Room Dimensions") but are empty in data.
 *        - description / features exist (features currently null); facades exist via designFacadeMaps.
 *
 * Image SAS URLs expire ~15 min, so this mapping must run server-side per request (never cached/persisted).
 */

// Defensive only: live data always carries previews. Local kit assets guarantee next/image never gets "".
const PLACEHOLDER_FACADE = "/images/display-center/facade/RENDER_DF01_12.5M_RIGHT_VN01.jpg";
const PLACEHOLDER_PLAN = "/images/display-center/plans/PLAN_DP01_12.5M BY 28M_RIGHT_VN01.png";

function firstPreview(urls: Array<string | undefined>): string | undefined {
  return urls.find((u): u is string => Boolean(u));
}

export function mapDesignToProperty(design: DesignRes, index: number): DesignProperty {
  const floorPlan = firstPreview(
    (design.designBlobMaps ?? []).map((b) => b.blobModel?.previewSasUrl)
  );

  const facade = firstPreview(
    (design.designFacadeMaps ?? []).flatMap((m) =>
      (m.facade?.facadeBlobMaps ?? []).map((b) => b.blobModel?.previewSasUrl)
    )
  );

  const id =
    design.id ?? design.designBlobMaps?.[0]?.designId ?? design.code ?? `design-${index}`;

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
    floorPlan: floorPlan ?? facade ?? PLACEHOLDER_PLAN
  };
}
