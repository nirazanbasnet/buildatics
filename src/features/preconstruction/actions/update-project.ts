"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";
import type { LeadRes } from "@/features/leads/lib/dto";

import type { PreconLeadReq } from "../lib/dto";
import {
  createProjectSchema,
  type CreateProjectInput,
} from "../lib/project-form-schema";
import type { ProjectMutationResult } from "./create-project";

const undef = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

// Server Action: updates the linked contact (Contacts/Update) + the lead (Leads/Update, incl. developer).
export async function updateProject(
  leadId: string,
  contactId: string,
  input: CreateProjectInput,
): Promise<ProjectMutationResult> {
  const parsed = createProjectSchema.safeParse(input);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      fieldErrors: { firstName: fe.firstName?.[0], email: fe.email?.[0] },
    };
  }
  const data = parsed.data;

  try {
    await apiFetch(`/api/Contacts/Update?id=${encodeURIComponent(contactId)}`, {
      method: "POST",
      auth: true,
      body: {
        firstName: data.firstName,
        lastName: undef(data.lastName),
        primaryEmail: undef(data.email),
        primaryPhone: undef(data.phone),
      },
    });

    const leadBody: PreconLeadReq = {
      contactIds: [contactId],
      leadStageId: undef(data.leadStageId),
      assignedUserId: undef(data.assignedUserId),
      lotNo: undef(data.lotAddress),
      developer: undef(data.developer),
    };
    const lead = await apiFetch<LeadRes>(
      `/api/Leads/Update?id=${encodeURIComponent(leadId)}`,
      {
        method: "POST",
        auth: true,
        body: leadBody,
      },
    );

    return { ok: true, leadId: lead.id ?? leadId };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to update the project.",
    };
  }
}
