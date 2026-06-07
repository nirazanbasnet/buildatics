"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { BrochureRes } from "../lib/dto";

export type BrochureMutationResult = {
  ok: boolean;
  error?: string;
  id?: string;
};

export type CreateBrochureInput = {
  name: string;
  note?: string;
  brochureTemplateId?: string;
  file: File;
};

// Server Action: creates a brochure and uploads its HTML file (multipart POST /api/Brochures/Create).
// The API binds the file from the `Attachment` form field (per its validation message) + name/note/
// brochureTemplateId as form fields.
export async function createBrochure(
  input: CreateBrochureInput,
): Promise<BrochureMutationResult> {
  const name = input.name.trim();
  if (!name) return { ok: false, error: "Name is required." };
  if (!input.file || input.file.size === 0)
    return { ok: false, error: "Choose an HTML file." };

  const form = new FormData();
  form.append("name", name);
  if (input.note?.trim()) form.append("note", input.note.trim());
  if (input.brochureTemplateId)
    form.append("brochureTemplateId", input.brochureTemplateId);
  form.append("Attachment", input.file, input.file.name);

  try {
    const created = await apiFetch<BrochureRes>("/api/Brochures/Create", {
      method: "POST",
      auth: true,
      body: form,
    });
    return { ok: true, id: created.id };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to create the brochure.",
    };
  }
}
