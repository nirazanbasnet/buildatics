"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type {
  BrochureTemplateARes,
  UpdateBrochureTemplateAReq,
} from "../lib/dto";
import type { TemplateMutationResult } from "./create-template";

export type UpdateTemplateInput = {
  name: string;
  note?: string;
  jsonConfig?: string;
  isAvailable: boolean;
};

// Server Action (Admin): updates template metadata (POST /api/BrochureTemplatesA/Update?id).
// Per the API, replacing the attachment file requires delete + re-create — not handled here.
export async function updateTemplate(
  id: string,
  input: UpdateTemplateInput,
): Promise<TemplateMutationResult> {
  const name = input.name.trim();
  if (!name) return { ok: false, error: "Name is required." };

  const body: UpdateBrochureTemplateAReq = {
    name,
    note: input.note?.trim() || undefined,
    jsonConfig: input.jsonConfig?.trim() || undefined,
    isAvailable: input.isAvailable,
  };

  try {
    const updated = await apiFetch<BrochureTemplateARes>(
      `/api/BrochureTemplatesA/Update?id=${encodeURIComponent(id)}`,
      { method: "POST", auth: true, body },
    );
    return { ok: true, id: updated.id ?? id };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to update the template.",
    };
  }
}
