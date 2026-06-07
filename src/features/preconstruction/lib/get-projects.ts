import { apiFetch } from "@/features/auth/lib/api-client";
import { getLeadStages } from "@/features/leads/lib/get-lead-options";

import type { PreconLeadResPage } from "./dto";
import { mapLeadToProject, type ProjectMapContext } from "./map-project";
import type { PreconstructionProject } from "../types";

const ALL_PAGE_SIZE = 100;
const ALL_MAX_PAGES = 20;

// Fetches every lead as a preconstruction project. Leads/Page has no server-side filter, so we page
// through everything and resolve stage names + a stage-position progress % via LeadStages/GetAll.
export async function getAllPreconstructionProjects(): Promise<
  PreconstructionProject[]
> {
  const stages = await getLeadStages(); // already ordered by sortOrder
  const stageCount = stages.length;

  const ctx: ProjectMapContext = {
    stageNames: new Map(stages.map((s) => [s.id ?? "", s.name ?? "—"])),
    stageProgress: new Map(
      stages.map((s, index) => [
        s.id ?? "",
        stageCount > 0 ? Math.round(((index + 1) / stageCount) * 100) : 0,
      ]),
    ),
  };

  const projects: PreconstructionProject[] = [];
  let pageNumber = 1;

  while (pageNumber <= ALL_MAX_PAGES) {
    const res = await apiFetch<PreconLeadResPage>("/api/Leads/Page", {
      method: "POST",
      auth: true,
      body: { pageNumber, pageSize: ALL_PAGE_SIZE },
    });
    const items = res.items ?? [];
    projects.push(...items.map((lead) => mapLeadToProject(lead, ctx)));

    const total = res.totalCount ?? projects.length;
    if (projects.length >= total || items.length < ALL_PAGE_SIZE) break;
    pageNumber += 1;
  }

  return projects;
}
