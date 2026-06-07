"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { StaffReq, StaffRes } from "../../lib/dto";

type InviteStaffResLike = { staffUser?: StaffRes };

export type StaffActionResult = { ok: boolean; error?: string; id?: string };

function fail(error: unknown, fallback: string): StaffActionResult {
  return {
    ok: false,
    error: error instanceof ApiError ? error.message : fallback,
  };
}

const q = encodeURIComponent;

export type InviteStaffInput = {
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  email: string;
  designationId?: string;
};

// Invites a staff user, then optionally assigns a designation (role).
export async function inviteStaff(
  input: InviteStaffInput,
): Promise<StaffActionResult> {
  if (!input.firstName.trim())
    return { ok: false, error: "First name is required." };
  if (!input.email.trim()) return { ok: false, error: "Email is required." };

  const body: StaffReq = {
    firstName: input.firstName.trim(),
    lastName: input.lastName?.trim() || undefined,
    phoneNumber: input.phoneNumber?.trim() || undefined,
    email: input.email.trim(),
  };

  try {
    const res = await apiFetch<InviteStaffResLike>("/api/Staff/Invite", {
      method: "POST",
      auth: true,
      body,
    });
    const staffId = res.staffUser?.id;
    if (staffId && input.designationId) {
      await apiFetch(
        `/api/Staff/AssignDesignation?staffId=${q(staffId)}&designationId=${q(input.designationId)}`,
        {
          method: "POST",
          auth: true,
        },
      );
    }
    return { ok: true, id: staffId };
  } catch (error) {
    return fail(error, "Failed to invite the staff member.");
  }
}

export type UpdateStaffInput = {
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  email: string;
  // Designation diff (added/removed).
  addDesignationIds: string[];
  removeDesignationIds: string[];
};

// Updates staff details + reconciles designation assignments.
export async function updateStaff(
  staffId: string,
  input: UpdateStaffInput,
): Promise<StaffActionResult> {
  if (!input.firstName.trim())
    return { ok: false, error: "First name is required." };

  const body: StaffReq = {
    firstName: input.firstName.trim(),
    lastName: input.lastName?.trim() || undefined,
    phoneNumber: input.phoneNumber?.trim() || undefined,
    email: input.email.trim(),
  };

  try {
    await apiFetch(`/api/Staff/Update?staffId=${q(staffId)}`, {
      method: "POST",
      auth: true,
      body,
    });
    for (const id of input.addDesignationIds) {
      await apiFetch(
        `/api/Staff/AssignDesignation?staffId=${q(staffId)}&designationId=${q(id)}`,
        {
          method: "POST",
          auth: true,
        },
      );
    }
    for (const id of input.removeDesignationIds) {
      await apiFetch(
        `/api/Staff/UnassignDesignation?staffId=${q(staffId)}&designationId=${q(id)}`,
        {
          method: "DELETE",
          auth: true,
        },
      );
    }
    return { ok: true, id: staffId };
  } catch (error) {
    return fail(error, "Failed to update the staff member.");
  }
}

export async function deleteStaff(staffId: string): Promise<StaffActionResult> {
  try {
    await apiFetch(`/api/Staff/SoftDelete?staffId=${q(staffId)}`, {
      method: "DELETE",
      auth: true,
    });
    return { ok: true };
  } catch (error) {
    return fail(error, "Failed to remove the staff member.");
  }
}
