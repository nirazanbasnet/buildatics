"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { PreconLeadRes } from "../lib/dto";
import {
  ASSIGNEE_UNASSIGNED,
  DESIGN_NONE,
  STAGE_AUTO,
  type CreateProjectInput,
} from "../lib/project-form-schema";

export type ProjectForEdit = {
  contactId: string;
  values: CreateProjectInput;
};

export type GetProjectForEditResult =
  | { ok: true; data: ProjectForEdit }
  | { ok: false; error: string };

// Fetches a project (GET /api/Leads/Get?id=) and maps it into the edit form's shape (with sentinels).
export async function getProjectForEdit(
  id: string,
): Promise<GetProjectForEditResult> {
  try {
    const lead = await apiFetch<PreconLeadRes>(
      `/api/Leads/Get?id=${encodeURIComponent(id)}`,
      {
        auth: true,
      },
    );
    const contact = lead.leadContacts?.[0]?.contact;
    const contactId = lead.leadContacts?.[0]?.contactId ?? contact?.id ?? "";
    if (!contactId)
      return {
        ok: false,
        error: "This project has no linked contact to edit.",
      };

    const values: CreateProjectInput = {
      firstName: contact?.firstName ?? "",
      lastName: contact?.lastName ?? "",
      phone: contact?.primaryPhone ?? "",
      email: contact?.primaryEmail ?? "",
      lotAddress: lead.lotNo ?? "",
      leadStageId: lead.leadStageId ?? STAGE_AUTO,
      assignedUserId: lead.assignedUserId ?? ASSIGNEE_UNASSIGNED,
      companyDesignId: lead.leadDesigns?.[0]?.companyDesignId ?? DESIGN_NONE,
      developer: lead.developer ?? "",
    };

    return { ok: true, data: { contactId, values } };
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
