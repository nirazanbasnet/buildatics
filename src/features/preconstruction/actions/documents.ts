"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

export type DocumentActionResult = { ok: boolean; error?: string };

// Server Action: uploads a file and associates it with the lead (POST /api/LeadBlobMaps/Create?leadId).
// The endpoint is multipart; the spec does not name the form field, so we send it as `file` — adjust
// here if the API expects a different field name.
export async function uploadDocument(
  leadId: string,
  file: File,
): Promise<DocumentActionResult> {
  if (!file || file.size === 0)
    return { ok: false, error: "Choose a file to upload." };

  const form = new FormData();
  form.append("file", file, file.name);

  try {
    await apiFetch(
      `/api/LeadBlobMaps/Create?leadId=${encodeURIComponent(leadId)}`,
      {
        method: "POST",
        auth: true,
        body: form,
      },
    );
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to upload the file.",
    };
  }
}

// Server Action: deletes a document (DELETE /api/LeadBlobMaps/Delete?leadId&blobId).
export async function deleteDocument(
  leadId: string,
  blobId: string,
): Promise<DocumentActionResult> {
  try {
    await apiFetch(
      `/api/LeadBlobMaps/Delete?leadId=${encodeURIComponent(leadId)}&blobId=${encodeURIComponent(blobId)}`,
      { method: "DELETE", auth: true },
    );
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to delete the file.",
    };
  }
}
