"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { AddressReq, UserProfileReq, UserProfileRes } from "../lib/dto";
import { profileDetailsSchema, type ProfileDetailsInput } from "../lib/profile-form-schema";
import { STATE_UNSET } from "../lib/state-options";
import type { ProfileActionResult } from "../types";

const undef = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

// Builds the optional AddressReq. The API requires `areaCode` when an address is sent, so we only
// include the address block when areaCode is present; other fields ride along when filled.
function toAddress(input: ProfileDetailsInput): AddressReq | undefined {
  const areaCode = undef(input.areaCode);
  if (!areaCode) return undefined;
  const state = input.state && input.state !== STATE_UNSET ? Number(input.state) : undefined;
  return {
    areaCode,
    street: undef(input.street),
    suburb: undef(input.suburb),
    city: undef(input.city),
    state
  };
}

// Updates the current user's profile. PATCH /api/UserProfile/Update (Bearer). `emailOtp2FAEnabled`
// is passed through so the Security toggle can reuse this action without dropping its value.
export async function updateProfile(
  input: ProfileDetailsInput,
  emailOtp2FAEnabled?: boolean
): Promise<ProfileActionResult> {
  const parsed = profileDetailsSchema.safeParse(input);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return { ok: false, fieldErrors: { firstName: fe.firstName?.[0] } };
  }
  const data = parsed.data;

  const body: UserProfileReq = {
    firstName: data.firstName,
    middleName: undef(data.middleName),
    lastName: undef(data.lastName),
    phoneNumber: undef(data.phoneNumber),
    address: toAddress(data)
  };
  if (emailOtp2FAEnabled !== undefined) body.emailOtp2FAEnabled = emailOtp2FAEnabled;

  try {
    await apiFetch<UserProfileRes>("/api/UserProfile/Update", { method: "PATCH", auth: true, body });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof ApiError ? error.message : "Failed to update your profile."
    };
  }
}
