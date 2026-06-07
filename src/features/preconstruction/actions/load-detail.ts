"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";
import { getLeadStages } from "@/features/leads/lib/get-lead-options";

import type {
  LeadActivityLogResPage,
  LeadBlobMapRes,
  LeadTaskResPage,
  PreconLeadRes,
} from "../lib/dto";
import {
  mapDocument,
  mapOverview,
  mapTask,
  mapTimelineEntry,
} from "../lib/map-detail";
import type { ProjectDetail } from "../lib/detail-types";

export type LoadProjectDetailResult =
  | { ok: true; data: ProjectDetail }
  | { ok: false; error: string };

const LIST_REQ = { pageNumber: 1, pageSize: 100 };

// Server Action: loads everything the detail sheet needs for a project (lead) in one round-trip.
// Re-run after any mutation to refresh the sheet.
export async function loadProjectDetail(
  leadId: string,
): Promise<LoadProjectDetailResult> {
  try {
    const [lead, stages, tasksPage, documents, timelinePage] =
      await Promise.all([
        apiFetch<PreconLeadRes>(
          `/api/Leads/Get?id=${encodeURIComponent(leadId)}`,
          { auth: true },
        ),
        getLeadStages(),
        apiFetch<LeadTaskResPage>(
          `/api/LeadTasks/Page?leadId=${encodeURIComponent(leadId)}`,
          {
            method: "POST",
            auth: true,
            body: LIST_REQ,
          },
        ),
        apiFetch<LeadBlobMapRes[]>(
          `/api/LeadBlobMaps/All?leadId=${encodeURIComponent(leadId)}`,
          {
            method: "POST",
            auth: true,
          },
        ),
        apiFetch<LeadActivityLogResPage>(
          `/api/LeadActivityLogs/Page?leadId=${encodeURIComponent(leadId)}`,
          { method: "POST", auth: true, body: LIST_REQ },
        ),
      ]);

    const stageIndex = stages.findIndex((s) => s.id === lead.leadStageId);
    const progress =
      stages.length > 0 && stageIndex >= 0
        ? Math.round(((stageIndex + 1) / stages.length) * 100)
        : 0;
    const stageName = stageIndex >= 0 ? (stages[stageIndex].name ?? "") : "";

    return {
      ok: true,
      data: {
        overview: mapOverview(lead, { stageName, progress }),
        tasks: (tasksPage.items ?? []).map(mapTask),
        documents: (documents ?? []).map(mapDocument),
        timeline: (timelinePage.items ?? []).map(mapTimelineEntry),
      },
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to load the project.",
    };
  }
}
