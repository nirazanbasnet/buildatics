"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadRes } from "../lib/dto";
import {
  ASSIGNEE_UNASSIGNED,
  DESIGN_NONE,
  STAGE_AUTO,
  type CreateLeadInput,
} from "../lib/lead-form-schema";

export type LeadForEdit = {
  contactId: string;
  values: CreateLeadInput;
};

export type GetLeadForEditResult =
  | { ok: true; data: LeadForEdit }
  | { ok: false; error: string };

// Fetches a lead (GET /api/Leads/Get?id=) and maps it back into the edit form's shape (with sentinels),
// returning the linked contactId needed for the update.
export async function getLeadForEdit(
  id: string,
): Promise<GetLeadForEditResult> {
  try {
    const lead = await apiFetch<LeadRes>(
      `/api/Leads/Get?id=${encodeURIComponent(id)}`,
      {
        auth: true,
      },
    );
    const contact = lead.leadContacts?.[0]?.contact;
    const contactId = lead.leadContacts?.[0]?.contactId ?? contact?.id ?? "";
    if (!contactId)
      return { ok: false, error: "This lead has no linked contact to edit." };

    const values: CreateLeadInput = {
      firstName: contact?.firstName ?? "",
      lastName: contact?.lastName ?? "",
      phone: contact?.primaryPhone ?? "",
      email: contact?.primaryEmail ?? "",
      lotAddress: lead.lotNo ?? "",
      leadStageId: lead.leadStageId ?? STAGE_AUTO,
      assignedUserId: lead.assignedUserId ?? ASSIGNEE_UNASSIGNED,
      companyDesignId: lead.leadDesigns?.[0]?.companyDesignId ?? DESIGN_NONE,
    };

    return { ok: true, data: { contactId, values } };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError ? error.message : "Failed to load the lead.",
    };
  }
}
