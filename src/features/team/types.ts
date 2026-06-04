// "Invited" = the staff record exists but the member hasn't confirmed their email yet.
export type TeamMemberStatus = "active" | "invited";

// Row shape consumed by the team table (flattened from StaffRes + designation maps).
export type TeamMemberRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  // System roles (e.g. "Owner") that aren't editable here, kept for display.
  systemRoles: string[];
  // The member's current designation ("role") ids + display names.
  designationIds: string[];
  designationNames: string[];
  status: TeamMemberStatus;
};

// A selectable company role (designation) for the change-role / invite controls.
export type RoleOption = { id: string; name: string };

export type TeamActionResult = {
  ok: boolean;
  message?: string;
  error?: string;
};

export type InviteResult = TeamActionResult & {
  fieldErrors?: Partial<Record<"firstName" | "email", string>>;
};
