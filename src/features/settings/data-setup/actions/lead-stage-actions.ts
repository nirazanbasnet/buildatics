"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { LeadStageReq } from "../../lib/dto";

export type LeadStageActionResult = { ok: boolean; error?: string };

function fail(error: unknown, fallback: string): LeadStageActionResult {
  return {
    ok: false,
    error: error instanceof ApiError ? error.message : fallback,
  };
}

export async function createLeadStage(input: {
  name: string;
  colour?: string;
}): Promise<LeadStageActionResult> {
  if (!input.name.trim()) return { ok: false, error: "Name is required." };
  const body: LeadStageReq = {
    name: input.name.trim(),
    colour: input.colour?.trim() || undefined,
  };
  try {
    await apiFetch("/api/LeadStages/Create", {
      method: "POST",
      auth: true,
      body,
    });
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to create the stage.");
  }
}

export async function updateLeadStage(
  id: string,
  input: { name: string; colour?: string },
): Promise<LeadStageActionResult> {
  if (!input.name.trim()) return { ok: false, error: "Name is required." };
  const body: LeadStageReq = {
    name: input.name.trim(),
    colour: input.colour?.trim() || undefined,
  };
  try {
    await apiFetch(`/api/LeadStages/Update?id=${encodeURIComponent(id)}`, {
      method: "POST",
      auth: true,
      body,
    });
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to update the stage.");
  }
}

export async function deleteLeadStage(
  id: string,
): Promise<LeadStageActionResult> {
  try {
    await apiFetch(`/api/LeadStages/Delete?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      auth: true,
    });
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to delete the stage.");
  }
}
