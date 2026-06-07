"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { ChangeEmailReq } from "../lib/dto";
import { changeEmailSchema } from "../lib/users-form-schema";
import type { CreateUserResult } from "../types";

// Changes a user's email. PATCH /api/UsersA/ChangeEmail (Bearer, Admin).
export async function changeEmail(
  userId: string,
  email: string,
): Promise<CreateUserResult> {
  const parsed = changeEmailSchema.safeParse({ email });
  if (!parsed.success) {
    return {
      ok: false,
      fieldErrors: { email: parsed.error.flatten().fieldErrors.email?.[0] },
    };
  }

  const body: ChangeEmailReq = { userId, email: parsed.data.email };
  try {
    await apiFetch("/api/UsersA/ChangeEmail", {
      method: "PATCH",
      auth: true,
      body,
    });
    return { ok: true, message: "Email updated." };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to change the email.",
    };
  }
}
