// Maps the admin UserDetailedRes (docs/api/schemas.md#userdetailedres) to the flat UserRow the table renders.
//
// Direct map:
//   id                 → id
//   firstName+lastName → name (falls back to userName/email)
//   email              → email
//   emailConfirmed     → emailConfirmed
//   emailOtp2FAEnabled → twoFactorEnabled
//   roles[]            → roles
//   deletedOnUtc       → isDeleted (non-null ⇒ soft-deleted)
//   lockoutEnd         → isLocked (future date ⇒ locked)
//   termsAndConditionsAcceptedOnUtc → termsAccepted (non-null ⇒ accepted)
//
// Gaps: none for display — every column maps from a provided field. `lockoutEnd` is interpreted as
// "locked when it is a date in the future"; the API does not expose a precomputed boolean.
import type { UserDetailedRes } from "./dto";
import type { UserRow } from "../types";

function isLockedNow(lockoutEnd: string | null | undefined): boolean {
  if (!lockoutEnd) return false;
  const end = Date.parse(lockoutEnd);
  return Number.isFinite(end) && end > Date.now();
}

export function mapUserToRow(user: UserDetailedRes): UserRow {
  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.userName || user.email || "—";

  return {
    id: user.id ?? "",
    name,
    email: user.email ?? "—",
    emailConfirmed: user.emailConfirmed ?? false,
    twoFactorEnabled: user.emailOtp2FAEnabled ?? false,
    roles: user.roles ?? [],
    isDeleted: user.deletedOnUtc != null,
    isLocked: isLockedNow(user.lockoutEnd),
    termsAccepted: user.termsAndConditionsAcceptedOnUtc != null
  };
}
