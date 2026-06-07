"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { BrochureRes } from "../lib/dto";
import type { BrochureMutationResult } from "./create-brochure";

export type UpdateBrochureInput = {
  name: string;
  note?: string;
  brochureTemplateId?: string;
  // Optional new HTML file. NOTE: the Update endpoint replaces the brochure HTML blob, so omitting a
  // file may clear/replace it depending on the API — surface this in the UI.
  file?: File;
};

// Server Action: updates brochure metadata + (optionally) replaces its HTML blob (multipart POST
// /api/Brochures/Update?id). The file binds from the `Attachment` form field (matching create).
export async function updateBrochure(
  id: string,
  input: UpdateBrochureInput,
): Promise<BrochureMutationResult> {
  const name = input.name.trim();
  if (!name) return { ok: false, error: "Name is required." };

  const form = new FormData();
  form.append("name", name);
  if (input.note?.trim()) form.append("note", input.note.trim());
  if (input.brochureTemplateId)
    form.append("brochureTemplateId", input.brochureTemplateId);
  if (input.file && input.file.size > 0)
    form.append("Attachment", input.file, input.file.name);

  try {
    const updated = await apiFetch<BrochureRes>(
      `/api/Brochures/Update?id=${encodeURIComponent(id)}`,
      { method: "POST", auth: true, body: form },
    );
    return { ok: true, id: updated.id ?? id };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to update the brochure.",
    };
  }
}
