"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

export type DeleteBrochureResult = { ok: boolean; error?: string };

// Server Action: deletes a brochure + its blob mapping (DELETE /api/Brochures/Delete?id).
export async function deleteBrochure(
  id: string,
): Promise<DeleteBrochureResult> {
  try {
    await apiFetch(`/api/Brochures/Delete?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      auth: true,
    });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to delete the brochure.",
    };
  }
}
