"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { ContactRes, LeadReq, LeadRes } from "../lib/dto";
import { createLeadSchema, type CreateLeadInput } from "../lib/lead-form-schema";

export type CreateLeadResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof CreateLeadInput, string>>;
  leadId?: string;
};

const undef = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

// Server Action: creates a lead from the Add Lead form. Because the API has no combined endpoint,
// this orchestrates 3 calls — Contact → Lead → (optional) LeadDesign. See map-lead.ts gap notes.
export async function createLead(input: CreateLeadInput): Promise<CreateLeadResult> {
  const parsed = createLeadSchema.safeParse(input);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      fieldErrors: {
        firstName: fe.firstName?.[0],
        email: fe.email?.[0]
      }
    };
  }
  const data = parsed.data;

  try {
    // 1. Create the contact (holds the person's name/phone/email).
    const contact = await apiFetch<ContactRes>("/api/Contacts/Create", {
      method: "POST",
      auth: true,
      body: {
        firstName: data.firstName,
        lastName: undef(data.lastName),
        primaryEmail: undef(data.email),
        primaryPhone: undef(data.phone)
      }
    });
    if (!contact.id) return { ok: false, error: "Failed to create the contact." };

    // 2. Create the lead linked to that contact. The single "Lot / site address" maps to lotNo.
    const leadBody: LeadReq = {
      contactIds: [contact.id],
      leadStageId: undef(data.leadStageId),
      assignedUserId: undef(data.assignedUserId),
      lotNo: undef(data.lotAddress)
    };
    const lead = await apiFetch<LeadRes>("/api/Leads/Create", {
      method: "POST",
      auth: true,
      body: leadBody
    });
    if (!lead.id) return { ok: false, error: "Failed to create the lead." };

    // 3. Optionally link a design.
    const designId = undef(data.companyDesignId);
    if (designId) {
      await apiFetch("/api/LeadDesigns/Add", {
        method: "POST",
        auth: true,
        body: { leadId: lead.id, companyDesignId: designId }
      });
    }

    return { ok: true, leadId: lead.id };
  } catch (error) {
    const message = error instanceof ApiError ? error.message : "Something went wrong. Please try again.";
    return { ok: false, error: message };
  }
}
