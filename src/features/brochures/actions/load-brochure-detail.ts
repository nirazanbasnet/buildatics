"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { BrochureRes } from "../lib/dto";
import { getBrochureTemplates } from "../lib/get-brochures";
import { mapBrochureDetail } from "../lib/map-brochure";
import type { BrochureDetailModel } from "../lib/types";

export type LoadBrochureDetailResult =
  | { ok: true; data: BrochureDetailModel }
  | { ok: false; error: string };

// Server Action: loads a single brochure (Brochures/Get) + resolves its template name.
export async function loadBrochureDetail(
  id: string,
): Promise<LoadBrochureDetailResult> {
  try {
    const [brochure, templates] = await Promise.all([
      apiFetch<BrochureRes>(`/api/Brochures/Get?id=${encodeURIComponent(id)}`, {
        auth: true,
      }),
      getBrochureTemplates(),
    ]);
    const templateNames = new Map(templates.map((t) => [t.id, t.name]));
    return { ok: true, data: mapBrochureDetail(brochure, templateNames) };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to load the brochure.",
    };
  }
}
