"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";
// Import the server fetch from the lib path (not the feature barrel, which also re-exports the
// CompanyLibrary client component) to keep this server action's module graph free of client code.
import { getAllCompanyDesigns } from "@/features/company-designs/lib/get-company-designs-page";
import type { DesignProperty } from "@/features/designs/types";

import { getLeadStages } from "../lib/get-lead-options";
import type {
  LeadActivityLogResPage,
  LeadDesignRes,
  LeadDetailRes,
  LeadQuoteResPage,
  LeadTaskResPage,
} from "../lib/lead-detail-dto";
import {
  mapLeadActivity,
  mapLeadDesign,
  mapLeadOverview,
  mapLeadQuote,
  mapLeadTask,
} from "../lib/map-lead-detail";
import type { DesignOption, LeadDetail } from "../lib/lead-detail-types";

export type LoadLeadDetailResult =
  | { ok: true; data: LeadDetail }
  | { ok: false; error: string };

const LIST_REQ = { pageNumber: 1, pageSize: 100 };

// Server Action: loads everything the lead detail sheet needs in one round-trip. Re-run after mutations.
export async function loadLeadDetail(
  leadId: string,
): Promise<LoadLeadDetailResult> {
  try {
    const id = encodeURIComponent(leadId);
    const [
      lead,
      stages,
      tasksPage,
      activityPage,
      quotesPage,
      designLinks,
      companyDesigns,
    ] = await Promise.all([
      apiFetch<LeadDetailRes>(`/api/Leads/Get?id=${id}`, { auth: true }),
      getLeadStages(),
      apiFetch<LeadTaskResPage>(`/api/LeadTasks/Page?leadId=${id}`, {
        method: "POST",
        auth: true,
        body: LIST_REQ,
      }),
      apiFetch<LeadActivityLogResPage>(
        `/api/LeadActivityLogs/Page?leadId=${id}`,
        {
          method: "POST",
          auth: true,
          body: LIST_REQ,
        },
      ),
      apiFetch<LeadQuoteResPage>(`/api/LeadQuotes/Page?leadId=${id}`, {
        method: "POST",
        auth: true,
        body: LIST_REQ,
      }),
      apiFetch<LeadDesignRes[]>(`/api/LeadDesigns/All?leadId=${id}`, {
        auth: true,
      }),
      getAllCompanyDesigns(),
    ]);

    const stageIndex = stages.findIndex((s) => s.id === lead.leadStageId);
    const progress =
      stages.length > 0 && stageIndex >= 0
        ? Math.round(((stageIndex + 1) / stages.length) * 100)
        : 0;
    const stageName = stageIndex >= 0 ? (stages[stageIndex].name ?? "") : "";

    const designsById = new Map<string, DesignProperty>(
      companyDesigns.map((d) => [d.id, d]),
    );
    const links = designLinks ?? [];
    const linkedIds = new Set(links.map((l) => l.companyDesignId));
    const designOptions: DesignOption[] = companyDesigns
      .filter((d) => !linkedIds.has(d.id))
      .map((d) => ({ id: d.id, title: d.title, image: d.facade }));

    return {
      ok: true,
      data: {
        overview: mapLeadOverview(lead, { stageName, progress }),
        tasks: (tasksPage.items ?? []).map(mapLeadTask),
        quotes: (quotesPage.items ?? []).map(mapLeadQuote),
        activity: (activityPage.items ?? []).map(mapLeadActivity),
        designs: links.map((l) => mapLeadDesign(l, designsById)),
        designOptions,
      },
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError ? error.message : "Failed to load the lead.",
    };
  }
}
