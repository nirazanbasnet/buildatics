"use server";

import { redirect } from "next/navigation";

import { apiFetch, ApiError } from "../lib/api-client";
import { setSession } from "../lib/session";
import { loginSchema } from "../lib/validation";
import type { ResourceOwnerTokenReq, ResourceOwnerTokenRes } from "../lib/dto";
import type { LoginFormState } from "../types";

const DASHBOARD_HOME = "/design-library";

// Server Action invoked by the login form via useActionState. Validates input, calls the API
// through the BFF gateway, persists the session as httpOnly cookies, then redirects.
export async function loginAction(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === null ? true : formData.get("rememberMe") === "on"
  });

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      fieldErrors: {
        email: flat.email?.[0],
        password: flat.password?.[0]
      }
    };
  }

  const { email, password, rememberMe } = parsed.data;
  const body: ResourceOwnerTokenReq = { userName: email, password, rememberMe };

  let res: ResourceOwnerTokenRes;
  try {
    res = await apiFetch<ResourceOwnerTokenRes>("/api/Token/Login", { method: "POST", body });
  } catch (error) {
    const message = error instanceof ApiError ? error.message : "Something went wrong. Please try again.";
    return { ok: false, error: message };
  }

  // Email-OTP 2FA is not wired up yet — surface a clear message rather than silently failing.
  if (res.requiresTwoFactor) {
    return {
      ok: false,
      requiresTwoFactor: true,
      error: res.message ?? "Two-factor authentication is required but not yet supported here."
    };
  }

  if (!res.accessToken) {
    return { ok: false, error: res.message ?? "Login failed. Please try again." };
  }

  await setSession(res, rememberMe);

  // redirect() throws NEXT_REDIRECT, so it must run outside the try/catch above.
  redirect(DASHBOARD_HOME);
}
