"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";
import type { ContactRes, LeadRes } from "@/features/leads/lib/dto";

import type { PreconLeadReq } from "../lib/dto";
import {
  createProjectSchema,
  type CreateProjectInput,
} from "../lib/project-form-schema";

export type ProjectMutationResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof CreateProjectInput, string>>;
  leadId?: string;
};

const undef = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

// Server Action: creates a preconstruction project (Contact → Lead with developer → optional design).
// Mirrors the leads create flow (src/features/leads/actions/create-lead.ts).
export async function createProject(
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
    const contact = await apiFetch<ContactRes>("/api/Contacts/Create", {
      method: "POST",
      auth: true,
      body: {
        firstName: data.firstName,
        lastName: undef(data.lastName),
        primaryEmail: undef(data.email),
        primaryPhone: undef(data.phone),
      },
    });
    if (!contact.id)
      return { ok: false, error: "Failed to create the contact." };

    const leadBody: PreconLeadReq = {
      contactIds: [contact.id],
      leadStageId: undef(data.leadStageId),
      assignedUserId: undef(data.assignedUserId),
      lotNo: undef(data.lotAddress),
      developer: undef(data.developer),
    };
    const lead = await apiFetch<LeadRes>("/api/Leads/Create", {
      method: "POST",
      auth: true,
      body: leadBody,
    });
    if (!lead.id) return { ok: false, error: "Failed to create the project." };

    const designId = undef(data.companyDesignId);
    if (designId) {
      await apiFetch("/api/LeadDesigns/Add", {
        method: "POST",
        auth: true,
        body: { leadId: lead.id, companyDesignId: designId },
      });
    }

    return { ok: true, leadId: lead.id };
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : "Something went wrong. Please try again.";
    return { ok: false, error: message };
  }
}
