"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import { encodeShareConfig, type ShareConfig } from "../lib/share-config";

export type UpdateStyleResult = {
  ok: boolean;
  error?: string;
};

// Server Action: persists the public-design style (font/theme/layout) onto the company record via
// PATCH /api/Company/UpdatePublicCompanyDesignStyle. The embed reads this to style the public site.
export async function updatePublicDesignStyle(
  config: ShareConfig,
): Promise<UpdateStyleResult> {
  const style = encodeShareConfig(config);

  try {
    await apiFetch(
      `/api/Company/UpdatePublicCompanyDesignStyle?publicCompanyDesignStyle=${encodeURIComponent(style)}`,
      { method: "PATCH", auth: true },
    );
    return { ok: true };
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : "Failed to save the style. Please try again.";
    return { ok: false, error: message };
  }
}
