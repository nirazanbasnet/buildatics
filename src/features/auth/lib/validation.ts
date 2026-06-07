import { z } from "zod";

// The design uses an email field; the API maps it to `userName` at the action boundary.
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().optional().default(true),
  // When true, the login sends termsAndConditionsUrl so the backend records acceptance.
  acceptTerms: z.boolean().optional().default(false),
  // Email-OTP code, entered on the second step when 2FA is required.
  emailOtpCode: z.string().trim().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
