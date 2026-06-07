"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { MessageResponseDto } from "../lib/dto";
import type { UserActionResult } from "../types";

// Confirms a user's email on their behalf. POST /api/UsersA/ConfirmEmail?email=… (Bearer, Admin).
export async function confirmEmail(email: string): Promise<UserActionResult> {
  try {
    const res = await apiFetch<MessageResponseDto>(
      `/api/UsersA/ConfirmEmail?email=${encodeURIComponent(email)}`,
      { method: "POST", auth: true },
    );
    return { ok: true, message: res.message ?? "Email confirmed." };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to confirm the email.",
    };
  }
}
