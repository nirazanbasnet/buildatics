"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { ForgotPasswordReq, ForgotPasswordRes } from "../lib/dto";
import type { ForgotPasswordLinkResult } from "../types";

// Generates a password-reset link for a user who can't receive emails. POST
// /api/UsersA/GetForgotPasswordLink (Bearer, Admin). The link is returned to the admin to share manually.
export async function getForgotPasswordLink(
  email: string,
): Promise<ForgotPasswordLinkResult> {
  const body: ForgotPasswordReq = { email };
  try {
    const res = await apiFetch<ForgotPasswordRes>(
      "/api/UsersA/GetForgotPasswordLink",
      {
        method: "POST",
        auth: true,
        body,
      },
    );
    return { ok: true, resetPasswordUrl: res.resetPasswordUrl };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to generate the reset link.",
    };
  }
}
