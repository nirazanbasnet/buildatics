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
  // Per-field validation messages keyed by form field name.
  fieldErrors?: Partial<Record<"email" | "password", string>>;
  // True when the API signalled email-OTP 2FA is required (handled in a later pass).
  requiresTwoFactor?: boolean;
};
