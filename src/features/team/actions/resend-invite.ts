"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { TeamActionResult } from "../types";

// Resends the email-confirmation link to an invited member. POST /api/Staff/InviteReminder?staffId=…
// (Bearer).
export async function resendInvite(staffId: string): Promise<TeamActionResult> {
  try {
    await apiFetch(
      `/api/Staff/InviteReminder?staffId=${encodeURIComponent(staffId)}`,
      {
        method: "POST",
        auth: true,
      },
    );
    return { ok: true, message: "Invite reminder sent." };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to resend the invite.",
    };
  }
}
