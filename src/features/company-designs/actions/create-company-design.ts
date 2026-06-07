"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { CompanyDesignReq, CompanyDesignRes } from "../lib/dto";
import {
  parseCompanyDesignForm,
  type CreateCompanyDesignInput,
} from "../lib/create-company-design-schema";

export type CreateCompanyDesignResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof CreateCompanyDesignInput, string>>;
  id?: string;
};

const undef = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

// Server Action: creates a company design from scratch via POST /api/CompanyDesigns/Create.
// Note: this endpoint does not accept blobs — the new design has no images until uploaded later.
export async function createCompanyDesign(
  input: CreateCompanyDesignInput,
): Promise<CreateCompanyDesignResult> {
  const parsed = parseCompanyDesignForm.safeParse(input);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return { ok: false, fieldErrors: { name: fe.name?.[0] } };
  }
  const data = parsed.data;

  const body: CompanyDesignReq = {
    name: data.name,
    code: undef(data.code),
    description: undef(data.description),
    minimumLotWidthInMeters: data.minimumLotWidthInMeters,
    minimumLotDepthInMeters: data.minimumLotDepthInMeters,
    areaInSquares: data.areaInSquares,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    livingRooms: data.livingRooms,
    maximumCarsInGarage: data.maximumCarsInGarage,
    storeys: data.storeys,
    visibleOnWebsite: data.visibleOnWebsite,
  };

  try {
    const created = await apiFetch<CompanyDesignRes>(
      "/api/CompanyDesigns/Create",
      {
        method: "POST",
        auth: true,
        body,
      },
    );
    return { ok: true, id: created.id };
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : "Failed to create the design. Please try again.";
    return { ok: false, error: message };
  }
}
