"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { MessageResponseDto } from "../lib/dto";
import type { UserActionResult } from "../types";

// Soft-deletes a user (sets DeletedOnUtc + anonymizes email). DELETE /api/UsersA/SoftDelete?userId=…
// (Bearer, Admin).
export async function softDeleteUser(
  userId: string,
): Promise<UserActionResult> {
  try {
    const res = await apiFetch<MessageResponseDto>(
      `/api/UsersA/SoftDelete?userId=${encodeURIComponent(userId)}`,
      { method: "DELETE", auth: true },
    );
    return { ok: true, message: res.message ?? "User deleted." };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to delete the user.",
    };
  }
}
