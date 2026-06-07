import { z } from "zod";

// Create-user form (Admin/DesignAdmin) — shared by the sheet and the createUser server action.
export const createUserSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["Admin", "DesignAdmin"]),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

// Change-email form — shared by the dialog and the changeEmail server action.
export const changeEmailSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export type ChangeEmailInput = z.infer<typeof changeEmailSchema>;
