"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import { ROLE_NONE } from "../lib/team-form-schema";
import type { TeamActionResult } from "../types";

// Sets a staff member's role to a single designation (or none), reconciling against their current
// assignments: unassign any designation that isn't the target, then assign the target if missing.
// Uses Staff/AssignDesignation + Staff/UnassignDesignation (the API has no "replace" endpoint).
export async function changeRole(
  staffId: string,
  newRoleId: string,
  currentRoleIds: string[],
): Promise<TeamActionResult> {
  const target = newRoleId && newRoleId !== ROLE_NONE ? newRoleId : null;

  try {
    for (const roleId of currentRoleIds) {
      if (roleId === target) continue;
      await apiFetch(
        `/api/Staff/UnassignDesignation?staffId=${encodeURIComponent(staffId)}&designationId=${encodeURIComponent(roleId)}`,
        { method: "DELETE", auth: true },
      );
    }

    if (target && !currentRoleIds.includes(target)) {
      await apiFetch(
        `/api/Staff/AssignDesignation?staffId=${encodeURIComponent(staffId)}&designationId=${encodeURIComponent(target)}`,
        { method: "POST", auth: true },
      );
    }

    return { ok: true, message: target ? "Role updated." : "Role removed." };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to update the role.",
    };
  }
}
