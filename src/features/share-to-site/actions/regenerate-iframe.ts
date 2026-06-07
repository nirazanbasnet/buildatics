"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";
import type { DesignProperty } from "@/features/designs";

import type { CompanyDesignsIFrameRes } from "../lib/dto";
import { getAllPublicDesigns } from "../lib/get-share-data";
import { parseIframe } from "../lib/parse-iframe";

export type RegenerateIframeResult = {
  ok: boolean;
  error?: string;
  iframe?: string;
  embedSrc?: string;
  designs?: DesignProperty[];
};

// Server Action: rotates the company's public data access token and returns the fresh embed iframe.
// Also used to create the first link. Re-fetches the public catalogue with the new token for preview.
export async function regenerateIframe(): Promise<RegenerateIframeResult> {
  try {
    const res = await apiFetch<CompanyDesignsIFrameRes>(
      "/api/Company/RegenerateCompanyDesignsIFrame",
      { method: "PATCH", auth: true },
    );

    const iframe = res.iFrame ?? "";
    const parsed = parseIframe(iframe);
    const designs = parsed?.token
      ? await getAllPublicDesigns(parsed.token)
      : [];

    return { ok: true, iframe, embedSrc: parsed?.src ?? "", designs };
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : "Failed to regenerate the link. Please try again.";
    return { ok: false, error: message };
  }
}
