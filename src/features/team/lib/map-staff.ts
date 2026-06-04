// Maps StaffRes (docs/api/schemas.md#staffres) to the flat TeamMemberRow the table renders.
//
// Direct map:
//   id                          → id
//   firstName + lastName        → name (falls back to email)
//   email                       → email
//   phoneNumber                 → phone
//   roles[]                     → systemRoles (e.g. "Owner" — shown, not editable here)
//   designationToAppUserMaps[]  → designationIds / designationNames (the editable "role")
//   emailConfirmed              → status ("active" when confirmed, else "invited")
//
// Gaps: the Staff API models a member's "role" as a Designation (a named company role like Supervisor/
// Tradie/PM), so the Role column shows designations; system roles such as Owner are surfaced separately
// as read-only badges. There is no explicit status field — we derive it from `emailConfirmed`.
import type { StaffRes } from "./dto";
import type { TeamMemberRow } from "../types";

export function mapStaffToRow(staff: StaffRes): TeamMemberRow {
  const name =
    [staff.firstName, staff.lastName].filter(Boolean).join(" ") || staff.email || "—";

  const maps = staff.designationToAppUserMaps ?? [];
  const designationIds = maps.map((m) => m.designation?.id ?? "").filter(Boolean);
  const designationNames = maps.map((m) => m.designation?.name ?? "").filter(Boolean);

  return {
    id: staff.id ?? "",
    name,
    email: staff.email ?? "—",
    phone: staff.phoneNumber ?? "",
    systemRoles: staff.roles ?? [],
    designationIds,
    designationNames,
    status: staff.emailConfirmed ? "active" : "invited"
  };
}
