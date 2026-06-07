// Server-only session layer for the BFF: tokens live in httpOnly cookies, never in JS-readable storage.
// `next/headers` is server-only by nature, so importing this from a client component will fail the build.
import { cookies } from "next/headers";

import type { ResourceOwnerTokenRes } from "./dto";
import type { SessionUser } from "../types";
import {
  ACCESS_COOKIE,
  ACCESS_EXPIRES_COOKIE,
  REFRESH_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  USER_COOKIE,
  baseCookieOptions,
} from "./cookies";

function toSessionUser(res: ResourceOwnerTokenRes): SessionUser {
  return {
    id: res.user?.id ?? "",
    email: res.user?.email ?? res.userName ?? "",
    firstName: res.user?.firstName ?? "",
    lastName: res.user?.lastName ?? "",
    companyId: res.company?.id ?? "",
    companyName: res.company?.name ?? "",
  };
}

// Persists a login (or refresh) response as httpOnly cookies. Cookies live for the refresh window;
// the access token's real expiry is recorded in ACCESS_EXPIRES_COOKIE so middleware can refresh it
// transparently (and still has the expired token to exchange). The refresh cookie is written when the
// API returned one (rememberMe).
export async function setSession(
  res: ResourceOwnerTokenRes,
  rememberMe: boolean,
): Promise<void> {
  const store = await cookies();
  const opts = { ...baseCookieOptions(), maxAge: SESSION_MAX_AGE_SECONDS };

  store.set(ACCESS_COOKIE, res.accessToken ?? "", opts);
  store.set(USER_COOKIE, JSON.stringify(toSessionUser(res)), opts);

  if (res.expiresIn && res.expiresIn > 0) {
    store.set(
      ACCESS_EXPIRES_COOKIE,
      String(Date.now() + res.expiresIn * 1000),
      opts,
    );
  }

  if (rememberMe && res.refreshToken) {
    store.set(REFRESH_COOKIE, res.refreshToken, opts);
  }
}

export async function getAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value ?? null;
}

// Reads the current session for SSR. Returns null when not logged in.
export async function getSession(): Promise<{
  accessToken: string;
  user: SessionUser;
} | null> {
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
  store.delete(ACCESS_EXPIRES_COOKIE);
}
