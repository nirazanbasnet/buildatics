"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadReq, LeadRes } from "../lib/dto";
import {
  createLeadSchema,
  type CreateLeadInput,
} from "../lib/lead-form-schema";
import type { CreateLeadResult } from "./create-lead";

const undef = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

// Updates a lead: the linked contact (Contacts/Update) + the lead itself (Leads/Update). The input is
// already normalized (sentinels → undefined) by the form. Design changes on edit are out of scope.
export async function updateLead(
  leadId: string,
  contactId: string,
  input: CreateLeadInput,
): Promise<CreateLeadResult> {
  const parsed = createLeadSchema.safeParse(input);
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

    const leadBody: LeadReq = {
      contactIds: [contactId],
      leadStageId: undef(data.leadStageId),
      assignedUserId: undef(data.assignedUserId),
      lotNo: undef(data.lotAddress),
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
          : "Failed to update the lead.",
    };
  }
}
