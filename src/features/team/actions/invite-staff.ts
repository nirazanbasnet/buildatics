"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { InviteStaffRes, StaffReq } from "../lib/dto";
import {
  inviteStaffSchema,
  ROLE_NONE,
  type InviteStaffInput,
} from "../lib/team-form-schema";
import type { InviteResult } from "../types";

const undef = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

// Invites a new staff member. POST /api/Staff/Invite (Bearer). The invite endpoint takes no role, so
// when a designation is chosen we assign it to the returned staff in a follow-up call.
export async function inviteStaff(
  input: InviteStaffInput,
): Promise<InviteResult> {
  const parsed = inviteStaffSchema.safeParse(input);
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      fieldErrors: { firstName: fe.firstName?.[0], email: fe.email?.[0] },
    };
  }
  const data = parsed.data;

  const body: StaffReq = {
    firstName: data.firstName,
    lastName: undef(data.lastName),
    email: data.email,
    phoneNumber: undef(data.phone),
  };

  try {
    const res = await apiFetch<InviteStaffRes>("/api/Staff/Invite", {
      method: "POST",
      auth: true,
      body,
    });

    const roleId =
      data.roleId && data.roleId !== ROLE_NONE ? data.roleId : undefined;
    const staffId = res.staffUser?.id;
    if (roleId && staffId) {
      // Best-effort role assignment; a failure here shouldn't undo the successful invite.
      try {
        await apiFetch(
          `/api/Staff/AssignDesignation?staffId=${encodeURIComponent(staffId)}&designationId=${encodeURIComponent(roleId)}`,
          { method: "POST", auth: true },
        );
      } catch {
        return {
          ok: true,
          message:
            "Invite sent, but the role could not be assigned. Set it from the member's actions.",
        };
      }
    }

    return { ok: true, message: res.message ?? "Invite sent." };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to send the invite.",
    };
  }
}
