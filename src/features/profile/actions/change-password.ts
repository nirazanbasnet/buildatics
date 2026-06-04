"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { ChangePasswordReq, MessageResponseDto } from "../lib/dto";
import { changePasswordSchema, type ChangePasswordInput } from "../lib/profile-form-schema";
import type { ChangePasswordResult } from "../types";

// Changes the signed-in user's password. POST /api/Account/ChangePassword (Bearer).
export async function changePassword(input: ChangePasswordInput): Promise<ChangePasswordResult> {
  const parsed = changePasswordSchema.safeParse(input);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      fieldErrors: { oldPassword: fe.oldPassword?.[0], newPassword: fe.newPassword?.[0] }
    };
  }

  const body: ChangePasswordReq = {
    oldPassword: parsed.data.oldPassword,
    newPassword: parsed.data.newPassword
  };

  try {
    await apiFetch<MessageResponseDto>("/api/Account/ChangePassword", {
      method: "POST",
      auth: true,
      body
    });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof ApiError ? error.message : "Failed to change your password."
    };
  }
}
