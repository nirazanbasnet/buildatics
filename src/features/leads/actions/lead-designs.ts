"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

export type LeadDesignResult = { ok: boolean; error?: string };

function fail(error: unknown, fallback: string): LeadDesignResult {
  return {
    ok: false,
    error: error instanceof ApiError ? error.message : fallback,
  };
}

// Links a company design to the lead (POST /api/LeadDesigns/Add).
export async function linkDesign(
  leadId: string,
  companyDesignId: string,
): Promise<LeadDesignResult> {
  if (!companyDesignId) return { ok: false, error: "Choose a design to link." };
  try {
    await apiFetch("/api/LeadDesigns/Add", {
      method: "POST",
      auth: true,
      body: { leadId, companyDesignId },
    });
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to link the design.");
  }
}

// Unlinks a design (DELETE /api/LeadDesigns/Delete?leadId&id) where id is the LeadDesign mapping id.
export async function unlinkDesign(
  leadId: string,
  id: string,
): Promise<LeadDesignResult> {
  try {
    await apiFetch(
      `/api/LeadDesigns/Delete?leadId=${encodeURIComponent(leadId)}&id=${encodeURIComponent(id)}`,
      { method: "DELETE", auth: true },
    );
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to unlink the design.");
  }
}
