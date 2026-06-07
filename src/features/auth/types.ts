// Minimal, non-sensitive user identity stored in the `ba_user` cookie for cheap SSR reads.
export type SessionUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyId: string;
  companyName: string;
};

// Return shape of `loginAction`, consumed by the login form via `useActionState`.
export type LoginFormState = {
  ok: boolean;
  // General, form-level error message (e.g. invalid credentials, network error).
  error?: string;
  // Informational (non-error) message, e.g. "A verification code has been sent to your email".
  notice?: string;
  // Per-field validation messages keyed by form field name.
  fieldErrors?: Partial<Record<"email" | "password" | "emailOtpCode", string>>;
  // True when the API signalled email-OTP 2FA is required — the form shows the code input.
  requiresTwoFactor?: boolean;
};

// Shared return shape for the account flows (forgot/reset password, confirm email).
export type AuthFormState = {
  ok: boolean;
  error?: string;
  // Success/info message shown after a successful submit.
  message?: string;
  fieldErrors?: Record<string, string>;
};
