import { statusLabel } from "@/features/leads/lib/map-lead";

import type { AddressRes, PreconLeadRes } from "./dto";
import type { PreconstructionProject } from "../types";

/**
 * API → UI field map for the Preconstruction table (see agent/api.md: document the map + gaps).
 * The list is backed by the Leads API, so this maps LeadRes → PreconstructionProject.
 *
 * DIRECT MAP  PreconLeadRes → PreconstructionProject:
 *   `#PR{sequenceNumber}`                          → projectNo
 *   siteAddress (+ lotNo)                          → address (composed)
 *   status (enum)                                  → status (label, via leads statusLabel)
 *   leadStageId (+ stageNames)                     → stage (name)  [join: LeadStages/GetAll]
 *   developer                                      → developer
 *
 * GAPS — UI fields with NO clean API source (for the backend team):
 *   1. council  — LeadRes has NO council field (the detail view models Council as a contact role,
 *                 not present on the list payload). INTERIM: "—".
 *   2. progress — LeadRes has NO completion field. INTERIM: derived from the lead's stage position
 *                 in the pipeline (stage index ÷ total stages) via `stageProgress`.
 */

export type ProjectMapContext = {
  stageNames: Map<string, string>;
  // stageId → progress percent (0-100) derived from pipeline position.
  stageProgress: Map<string, number>;
};

const DASH = "—";

function composeAddress(
  addr: AddressRes | null | undefined,
  lotNo?: string | null,
): string {
  const parts = [
    lotNo,
    addr?.street,
    addr?.suburb,
    addr?.city,
    addr?.areaCode,
  ].filter((p): p is string => Boolean(p && p.trim()));
  return parts.length ? parts.join(", ") : DASH;
}

export function mapLeadToProject(
  lead: PreconLeadRes,
  ctx: ProjectMapContext,
): PreconstructionProject {
  const stageId = lead.leadStageId ?? "";
  const statusValue = lead.status ?? 0;

  return {
    id: lead.id ?? "",
    projectNo: `#PR${lead.sequenceNumber ?? 0}`,
    address: composeAddress(lead.siteAddress, lead.lotNo),
    status: statusLabel(statusValue),
    statusValue,
    stageId,
    stage: ctx.stageNames.get(stageId) ?? DASH,
    council: DASH, // GAP #1
    developer: lead.developer?.trim() || DASH,
    progress: ctx.stageProgress.get(stageId) ?? 0, // GAP #2
  };
}
