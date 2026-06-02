// Server-only session layer for the BFF: tokens live in httpOnly cookies, never in JS-readable storage.
// `next/headers` is server-only by nature, so importing this from a client component will fail the build.
import { cookies } from "next/headers";

import type { ResourceOwnerTokenRes } from "./dto";
import type { SessionUser } from "../types";

const ACCESS_COOKIE = "ba_access_token";
const REFRESH_COOKIE = "ba_refresh_token";
const USER_COOKIE = "ba_user";

// Refresh tokens outlive the short access token; cap their cookie lifetime here (30 days).
const REFRESH_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function baseCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/"
  };
}

function toSessionUser(res: ResourceOwnerTokenRes): SessionUser {
  return {
    id: res.user?.id ?? "",
    email: res.user?.email ?? res.userName ?? "",
    firstName: res.user?.firstName ?? "",
    lastName: res.user?.lastName ?? "",
    companyId: res.company?.id ?? "",
    companyName: res.company?.name ?? ""
  };
}

// Persists a successful login response as httpOnly cookies. The refresh cookie is only
// written when the API returned one (i.e. rememberMe was requested).
export async function setSession(res: ResourceOwnerTokenRes, rememberMe: boolean): Promise<void> {
  const store = await cookies();
  const accessMaxAge = res.expiresIn && res.expiresIn > 0 ? res.expiresIn : undefined;

  store.set(ACCESS_COOKIE, res.accessToken ?? "", { ...baseCookieOptions(), maxAge: accessMaxAge });
  store.set(USER_COOKIE, JSON.stringify(toSessionUser(res)), {
    ...baseCookieOptions(),
    maxAge: accessMaxAge
  });

  if (rememberMe && res.refreshToken) {
    store.set(REFRESH_COOKIE, res.refreshToken, {
      ...baseCookieOptions(),
      maxAge: REFRESH_MAX_AGE_SECONDS
    });
  }
}

export async function getAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value ?? null;
}

// Reads the current session for SSR. Returns null when not logged in.
export async function getSession(): Promise<{ accessToken: string; user: SessionUser } | null> {
  const store = await cookies();
  const accessToken = store.get(ACCESS_COOKIE)?.value;
  if (!accessToken) return null;

  const raw = store.get(USER_COOKIE)?.value;
  let user: SessionUser;
  try {
    user = raw ? (JSON.parse(raw) as SessionUser) : ({} as SessionUser);
  } catch {
    user = {} as SessionUser;
  }

  return { accessToken, user };
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
  store.delete(USER_COOKIE);
}
