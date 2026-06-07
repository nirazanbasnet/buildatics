import { apiFetch } from "@/features/auth/lib/api-client";

import type {
  DesignationResPage,
  ModuleAppRoleRes,
  ModuleAppRoleResPage,
} from "../../lib/dto";

export type RoleRow = {
  id: string;
  name: string;
  description: string;
  // Distinct module names for the permission badges.
  permissions: string[];
  // The moduleAppRole ids currently mapped to this designation (for the edit form + diffing).
  moduleAppRoleIds: string[];
};

export type PermissionOption = {
  id: string;
  moduleType: string;
  label: string;
};

const ALL_PAGE_SIZE = 100;
const ALL_MAX_PAGES = 20;

// Human label for a module app role, e.g. "Construction · Read · Own".
function permissionLabel(r: ModuleAppRoleRes): string {
  return [r.moduleType, r.modulePermissionType, r.modulePermissionModifier]
    .filter((p) => p && p.trim())
    .join(" · ");
}

export async function getRoles(): Promise<RoleRow[]> {
  const rows: RoleRow[] = [];
  let pageNumber = 1;
  while (pageNumber <= ALL_MAX_PAGES) {
    const res = await apiFetch<DesignationResPage>("/api/Designations/Page", {
      method: "POST",
      auth: true,
      body: { pageNumber, pageSize: ALL_PAGE_SIZE },
    });
    const items = res.items ?? [];
    for (const d of items) {
      const maps = d.designationToModuleAppRoleMaps ?? [];
      const moduleAppRoleIds = maps
        .map((m) => m.moduleAppRole?.id)
        .filter((id): id is string => Boolean(id));
      const permissions = Array.from(
        new Set(
          maps
            .map((m) => m.moduleAppRole?.moduleType)
            .filter((t): t is string => Boolean(t)),
        ),
      );
      rows.push({
        id: d.id ?? "",
        name: d.name ?? "Untitled role",
        description: d.description ?? "",
        permissions,
        moduleAppRoleIds,
      });
    }
    const total = res.totalCount ?? rows.length;
    if (rows.length >= total || items.length < ALL_PAGE_SIZE) break;
    pageNumber += 1;
  }
  return rows;
}

// The catalog of assignable permissions (available module app roles).
export async function getPermissionOptions(): Promise<PermissionOption[]> {
  const options: PermissionOption[] = [];
  let pageNumber = 1;
  while (pageNumber <= ALL_MAX_PAGES) {
    const res = await apiFetch<ModuleAppRoleResPage>(
      "/api/ModuleAppRoles/Page",
      {
        method: "POST",
        auth: true,
        body: { pageNumber, pageSize: ALL_PAGE_SIZE },
      },
    );
    const items = res.items ?? [];
    options.push(
      ...items
        .filter((r) => r.id)
        .map((r) => ({
          id: r.id ?? "",
          moduleType: r.moduleType ?? "Other",
          label: permissionLabel(r),
        })),
    );
    const total = res.totalCount ?? options.length;
    if (options.length >= total || items.length < ALL_PAGE_SIZE) break;
    pageNumber += 1;
  }
  return options;
}
