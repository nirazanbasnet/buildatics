"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { CompanyDesignRes } from "../lib/dto";

export type ImportCompanyDesignResult = {
  ok: boolean;
  error?: string;
  id?: string;
};

// Server Action: imports a system design (and its blobs) into the company library via
// POST /api/CompanyDesigns/ImportDesign?designId. This is the path that yields a design WITH images.
export async function importCompanyDesign(designId: string): Promise<ImportCompanyDesignResult> {
  if (!designId.trim()) return { ok: false, error: "Missing design to import." };

  try {
    const created = await apiFetch<CompanyDesignRes>(
      `/api/CompanyDesigns/ImportDesign?designId=${encodeURIComponent(designId)}`,
      { method: "POST", auth: true }
    );
    return { ok: true, id: created.id };
  } catch (error) {
    const message =
      error instanceof ApiError ? error.message : "Failed to import the design. Please try again.";
    return { ok: false, error: message };
  }
}
