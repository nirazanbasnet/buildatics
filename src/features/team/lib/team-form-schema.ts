import { z } from "zod";

// Invite form — shared by the invite sheet and the inviteStaff server action.
// `roleId` is the optional designation to assign right after the invite (sentinel ROLE_NONE = no role).
export const inviteStaffSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().optional(),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional(),
  roleId: z.string().optional()
});

export type InviteStaffInput = z.infer<typeof inviteStaffSchema>;

// Radix Select can't use an empty-string value; this sentinel maps to "assign no role".
export const ROLE_NONE = "none";
