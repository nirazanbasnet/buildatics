"use server";

import { apiFetch, ApiError } from "../lib/api-client";
import type { AuthFormState } from "../types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(error: unknown, fallback: string): AuthFormState {
  return {
    ok: false,
    error: error instanceof ApiError ? error.message : fallback,
  };
}

// POST /api/Account/ForgotPassword — emails a reset link if the (confirmed) account exists.
export async function forgotPasswordAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return {
      ok: false,
      fieldErrors: { email: "Enter a valid email address." },
    };
  }
  try {
    await apiFetch("/api/Account/ForgotPassword", {
      method: "POST",
      auth: false,
      body: { email },
    });
    return {
      ok: true,
      message:
        "If an account exists for that email, we've sent a password reset link.",
    };
  } catch (error) {
    return fail(error, "Couldn't send the reset link. Please try again.");
  }
}

// POST /api/Account/ResetPassword — sets a new password using the token from the email.
export async function resetPasswordAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const passwordResetToken = String(formData.get("token") ?? "").trim();
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

  const fieldErrors: Record<string, string> = {};
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (!passwordResetToken)
    fieldErrors.token = "Reset token is missing. Use the link from your email.";
  if (newPassword.length < 6)
    fieldErrors.newPassword = "Use at least 6 characters.";
  if (newPassword !== confirm)
    fieldErrors.confirmPassword = "Passwords don't match.";
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

  try {
    await apiFetch("/api/Account/ResetPassword", {
      method: "POST",
      auth: false,
      body: { email, newPassword, passwordResetToken },
    });
    return {
      ok: true,
      message: "Your password has been reset. You can now sign in.",
    };
  } catch (error) {
    return fail(
      error,
      "Couldn't reset your password. The link may have expired.",
    );
  }
}

// POST /api/Account/ConfirmEmail — confirms the email using the code from the email.
export async function confirmEmailAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (!code)
    fieldErrors.code =
      "Confirmation code is missing. Use the link from your email.";
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

  try {
    await apiFetch("/api/Account/ConfirmEmail", {
      method: "POST",
      auth: false,
      body: { email, code },
    });
    return {
      ok: true,
      message: "Your email has been confirmed. You can now sign in.",
    };
  } catch (error) {
    return fail(
      error,
      "Couldn't confirm your email. The link may have expired.",
    );
  }
}

// POST /api/Account/SendConfirmEmailToken — resends the confirmation link.
export async function resendConfirmEmailAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return {
      ok: false,
      fieldErrors: { email: "Enter a valid email address." },
    };
  }
  try {
    await apiFetch("/api/Account/SendConfirmEmailToken", {
      method: "POST",
      auth: false,
      body: { email },
    });
    return {
      ok: true,
      message: "A new confirmation link has been sent to your email.",
    };
  } catch (error) {
    return fail(
      error,
      "Couldn't resend the confirmation link. Please try again.",
    );
  }
}
