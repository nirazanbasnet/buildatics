"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { UpdateUserEmailOtp2FAReq } from "../lib/dto";
import type { UserActionResult } from "../types";

// Enables/disables email-OTP 2FA for a user. PATCH /api/UsersA/UpdateEmailOtpTwoFactor (Bearer, Admin).
export async function toggleUserTwoFactor(
  userId: string,
  emailOtp2FAEnabled: boolean,
): Promise<UserActionResult> {
  const body: UpdateUserEmailOtp2FAReq = { userId, emailOtp2FAEnabled };
  try {
    await apiFetch("/api/UsersA/UpdateEmailOtpTwoFactor", {
      method: "PATCH",
      auth: true,
      body,
    });
    return {
      ok: true,
      message: emailOtp2FAEnabled
        ? "Two-factor enabled."
        : "Two-factor disabled.",
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to update two-factor.",
    };
  }
}
