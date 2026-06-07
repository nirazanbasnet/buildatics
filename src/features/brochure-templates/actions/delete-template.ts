"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

export type DeleteTemplateResult = { ok: boolean; error?: string };

// Server Action (Admin): permanently deletes a template + its blob (DELETE /api/BrochureTemplatesA/Delete?id).
export async function deleteTemplate(
  id: string,
): Promise<DeleteTemplateResult> {
  try {
    await apiFetch(
      `/api/BrochureTemplatesA/Delete?id=${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        auth: true,
      },
    );
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to delete the template.",
    };
  }
}
