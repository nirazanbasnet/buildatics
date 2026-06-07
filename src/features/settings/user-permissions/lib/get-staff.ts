import { apiFetch } from "@/features/auth/lib/api-client";

import type { DesignationResPage, StaffRes } from "../../lib/dto";

export type StaffRow = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  emailConfirmed: boolean;
  // Designation names assigned to the staff (the "role").
  roles: string[];
  // Distinct module names from the staff's module roles (permissions).
  permissions: string[];
  designationIds: string[];
};

export type DesignationOption = { id: string; name: string };

function mapStaff(s: StaffRes): StaffRow {
  const designations = s.designationToAppUserMaps ?? [];
  return {
    id: s.id ?? "",
    name:
      [s.firstName, s.lastName].filter(Boolean).join(" ") || (s.email ?? "—"),
    firstName: s.firstName ?? "",
    lastName: s.lastName ?? "",
    phoneNumber: s.phoneNumber ?? "",
    email: s.email ?? "—",
    emailConfirmed: Boolean(s.emailConfirmed),
    roles: Array.from(
      new Set(
        designations
          .map((d) => d.designation?.name)
          .filter((n): n is string => Boolean(n)),
      ),
    ),
    permissions: Array.from(
      new Set(
        (s.moduleRoles ?? [])
          .map((m) => m.moduleType)
          .filter((t): t is string => Boolean(t)),
      ),
    ),
    designationIds: designations
      .map((d) => d.designation?.id)
      .filter((id): id is string => Boolean(id)),
  };
}

export async function getStaff(): Promise<StaffRow[]> {
  const staff = await apiFetch<StaffRes[]>("/api/Staff/All", {
    method: "POST",
    auth: true,
    body: {},
  });
  return (staff ?? []).filter((s) => !s.deletedOnUtc).map(mapStaff);
}

const ALL_PAGE_SIZE = 100;

// Designations for the role/designation select in the staff form.
export async function getDesignationOptions(): Promise<DesignationOption[]> {
  const res = await apiFetch<DesignationResPage>("/api/Designations/Page", {
    method: "POST",
    auth: true,
    body: { pageNumber: 1, pageSize: ALL_PAGE_SIZE },
  });
  return (res.items ?? []).map((d) => ({
    id: d.id ?? "",
    name: d.name ?? "Untitled",
  }));
}
