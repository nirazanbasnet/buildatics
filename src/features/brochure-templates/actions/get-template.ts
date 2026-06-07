"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { BrochureTemplateARes } from "../lib/dto";
import type { BrochureTemplateEdit } from "../lib/types";

export type GetTemplateResult =
  | { ok: true; data: BrochureTemplateEdit }
  | { ok: false; error: string };

// Server Action (Admin): fetches a single template (BrochureTemplatesA/Get) for the edit form.
export async function getTemplateForEdit(
  id: string,
): Promise<GetTemplateResult> {
  try {
    const t = await apiFetch<BrochureTemplateARes>(
      `/api/BrochureTemplatesA/Get?id=${encodeURIComponent(id)}`,
      { auth: true },
    );
    return {
      ok: true,
      data: {
        id: t.id ?? id,
        name: t.name ?? "",
        note: t.note ?? "",
        jsonConfig: t.jsonConfig ?? "",
        isAvailable: Boolean(t.isAvailable),
      },
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to load the template.",
    };
  }
}
