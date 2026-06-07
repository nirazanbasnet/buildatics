"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { MessageResponseDto } from "../lib/dto";
import type { UserActionResult } from "../types";

// Accepts the T&C on behalf of a user. PATCH /api/UsersA/ForceAcceptTermsAndConditions
// ?email=…&termsAndConditionsUrl=… (Bearer, Admin).
export async function forceAcceptTerms(
  email: string,
  termsAndConditionsUrl: string,
): Promise<UserActionResult> {
  const qs = new URLSearchParams({ email, termsAndConditionsUrl }).toString();
  try {
    const res = await apiFetch<MessageResponseDto>(
      `/api/UsersA/ForceAcceptTermsAndConditions?${qs}`,
      { method: "PATCH", auth: true },
    );
    return {
      ok: true,
      message: res.message ?? "Terms accepted on behalf of the user.",
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to accept the terms.",
    };
  }
}

// Resets a user's T&C acceptance, forcing re-acceptance on next login. PATCH
// /api/UsersA/ResetTermsAndConditionsAcceptance (Bearer, Admin).
//
// Gap: the spec lists neither a request body nor query parameters for this endpoint, yet the summary
// says it acts on "the specified users". We send the userId as the request body as a best guess;
// confirm the real payload shape (likely a list of userIds or emails) with the API owners and adjust.
export async function resetTermsAcceptance(
  userId: string,
): Promise<UserActionResult> {
  try {
    const res = await apiFetch<MessageResponseDto>(
      "/api/UsersA/ResetTermsAndConditionsAcceptance",
      {
        method: "PATCH",
        auth: true,
        body: { userIds: [userId] },
      },
    );
    return { ok: true, message: res.message ?? "Terms acceptance reset." };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to reset terms acceptance.",
    };
  }
}
