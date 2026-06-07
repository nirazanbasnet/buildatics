import { z } from "zod";

// Shared by the profile details form (client validation) and the updateProfile server action.
// `state` is the AU-state select value as a string (sentinel STATE_UNSET for "no state"); see state-options.ts.
export const profileDetailsSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  phoneNumber: z.string().trim().optional(),
  street: z.string().trim().optional(),
  suburb: z.string().trim().optional(),
  city: z.string().trim().optional(),
  areaCode: z.string().trim().optional(),
  state: z.string().optional(),
});

export type ProfileDetailsInput = z.infer<typeof profileDetailsSchema>;

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Enter your current password."),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
