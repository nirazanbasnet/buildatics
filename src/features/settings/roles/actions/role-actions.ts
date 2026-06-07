"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

import type { DesignationRes } from "../../lib/dto";

export type RoleActionResult = { ok: boolean; error?: string; id?: string };

function fail(error: unknown, fallback: string): RoleActionResult {
  return {
    ok: false,
    error: error instanceof ApiError ? error.message : fallback,
  };
}

async function addMap(designationId: string, moduleAppRoleId: string) {
  await apiFetch("/api/DesignationToModuleAppRoleMap/Create", {
    method: "POST",
    auth: true,
    body: { designationId, moduleAppRoleId },
  });
}

async function removeMap(designationId: string, moduleAppRoleId: string) {
  // Delete params are not documented; sending both ids matches the Create body shape. Adjust if it 4xx's.
  await apiFetch(
    `/api/DesignationToModuleAppRoleMap/Delete?designationId=${encodeURIComponent(designationId)}&moduleAppRoleId=${encodeURIComponent(moduleAppRoleId)}`,
    { method: "DELETE", auth: true },
  );
}

// Creates a role (Designation) then maps the selected permissions (ModuleAppRoles).
export async function createRole(input: {
  name: string;
  description?: string;
  moduleAppRoleIds: string[];
}): Promise<RoleActionResult> {
  const name = input.name.trim();
  if (!name) return { ok: false, error: "Name is required." };

  try {
    const designation = await apiFetch<DesignationRes>(
      "/api/Designations/Create",
      {
        method: "POST",
        auth: true,
        body: { name, description: input.description?.trim() || undefined },
      },
    );
    const id = designation.id;
    if (!id) return { ok: false, error: "Failed to create the role." };

    for (const roleId of input.moduleAppRoleIds) {
      await addMap(id, roleId);
    }
    return { ok: true, id };
  } catch (error) {
    return fail(error, "Failed to create the role.");
  }
}

// Updates a role's name + diffs its permission mappings (add new, remove deselected).
export async function updateRole(
  id: string,
  input: {
    name: string;
    description?: string;
    moduleAppRoleIds: string[];
    currentIds: string[];
  },
): Promise<RoleActionResult> {
  const name = input.name.trim();
  if (!name) return { ok: false, error: "Name is required." };

  try {
    await apiFetch(`/api/Designations/Update?id=${encodeURIComponent(id)}`, {
      method: "POST",
      auth: true,
      body: { name, description: input.description?.trim() || undefined },
    });

    const next = new Set(input.moduleAppRoleIds);
    const current = new Set(input.currentIds);
    for (const roleId of input.moduleAppRoleIds) {
      if (!current.has(roleId)) await addMap(id, roleId);
    }
    for (const roleId of input.currentIds) {
      if (!next.has(roleId)) await removeMap(id, roleId);
    }
    return { ok: true, id };
  } catch (error) {
    return fail(error, "Failed to update the role.");
  }
}

export async function deleteRole(id: string): Promise<RoleActionResult> {
  try {
    await apiFetch(`/api/Designations/Delete?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      auth: true,
    });
    return { ok: true };
  } catch (error) {
    return fail(
      error,
      "Failed to delete the role. It may still be assigned to users.",
    );
  }
}
