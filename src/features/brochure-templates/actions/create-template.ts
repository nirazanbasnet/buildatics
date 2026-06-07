"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { BrochureTemplateARes } from "../lib/dto";

export type TemplateMutationResult = {
  ok: boolean;
  error?: string;
  id?: string;
};

export type CreateTemplateInput = {
  name: string;
  note?: string;
  jsonConfig?: string;
  isAvailable: boolean;
  file: File;
};

// Server Action (Admin): creates a brochure template + uploads its attachment (multipart POST
// /api/BrochureTemplatesA/Create). The file binds from the `Attachment` field (matching Brochures/Create).
export async function createTemplate(
  input: CreateTemplateInput,
): Promise<TemplateMutationResult> {
  const name = input.name.trim();
  if (!name) return { ok: false, error: "Name is required." };
  if (!input.file || input.file.size === 0)
    return { ok: false, error: "Choose an attachment." };

  const form = new FormData();
  form.append("name", name);
  if (input.note?.trim()) form.append("note", input.note.trim());
  if (input.jsonConfig?.trim())
    form.append("jsonConfig", input.jsonConfig.trim());
  form.append("isAvailable", String(input.isAvailable));
  form.append("Attachment", input.file, input.file.name);

  try {
    const created = await apiFetch<BrochureTemplateARes>(
      "/api/BrochureTemplatesA/Create",
      {
        method: "POST",
        auth: true,
        body: form,
      },
    );
    return { ok: true, id: created.id };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to create the template.",
    };
  }
}
