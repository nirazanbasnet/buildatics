import { NextResponse, type NextRequest } from "next/server";

import {
  ACCESS_COOKIE,
  ACCESS_EXPIRES_COOKIE,
  REFRESH_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  USER_COOKIE,
  baseCookieOptions,
} from "@/features/auth/lib/cookies";

const LOGIN_PATH = "/login";
const APP_HOME = "/design-library";

// Refresh slightly before the access token actually expires to avoid edge races.
const REFRESH_SKEW_MS = 60_000;

// Paths a logged-out visitor is allowed to reach. Authenticated users are bounced away from these.
const GUEST_PREFIXES = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/confirm-email",
  "/dashboard/login",
  "/dashboard/register",
  "/dashboard/forgot-password",
];
// Always reachable regardless of auth state (error screens, etc.).
const PUBLIC_PREFIXES = ["/dashboard/pages/error"];

function hasPrefix(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

type RefreshRes = {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
};

// Silent session refresh: when the access token is at/near expiry, exchange it (+ the refresh token)
// for a fresh set via /api/Token/Refresh and update the cookies — so a user is never bounced to login
// (or shown "no access") just because a short-lived token lapsed. The edge is the only place cookies
// can be written ahead of a Server Component render. Falls back to /login only if refresh truly fails.
async function refreshIfNeeded(request: NextRequest): Promise<NextResponse> {
  const access = request.cookies.get(ACCESS_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  const expires = Number(
    request.cookies.get(ACCESS_EXPIRES_COOKIE)?.value ?? 0,
  );
  const base = process.env.BUILDATICS_API_BASE_URL;

  // Can't refresh (no refresh token / unconfigured) or token still valid → continue.
  if (!access || !refresh || !base) return NextResponse.next();
  if (expires && Date.now() < expires - REFRESH_SKEW_MS)
    return NextResponse.next();

  let data: RefreshRes | null = null;
  try {
    const r = await fetch(`${base.replace(/\/$/, "")}/api/Token/Refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ accessToken: access, refreshToken: refresh }),
      cache: "no-store",
    });
    if (r.ok) data = (await r.json()) as RefreshRes;
  } catch {
    data = null;
  }

  // Refresh failed → the session is truly dead; clear cookies and send to login.
  if (!data?.accessToken) {
    const res = NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    res.cookies.delete(ACCESS_COOKIE);
    res.cookies.delete(REFRESH_COOKIE);
    res.cookies.delete(USER_COOKIE);
    res.cookies.delete(ACCESS_EXPIRES_COOKIE);
    return res;
  }

  const newExpires =
    data.expiresIn && data.expiresIn > 0
      ? String(Date.now() + data.expiresIn * 1000)
      : "";

  // Expose the new token to THIS request's Server Components…
  request.cookies.set(ACCESS_COOKIE, data.accessToken);
  if (data.refreshToken) request.cookies.set(REFRESH_COOKIE, data.refreshToken);
  if (newExpires) request.cookies.set(ACCESS_EXPIRES_COOKIE, newExpires);

  // …and persist it on the response for the browser.
  const res = NextResponse.next({ request: { headers: request.headers } });
  const opts = { ...baseCookieOptions(), maxAge: SESSION_MAX_AGE_SECONDS };
  res.cookies.set(ACCESS_COOKIE, data.accessToken, opts);
  if (data.refreshToken)
    res.cookies.set(REFRESH_COOKIE, data.refreshToken, opts);
  if (newExpires) res.cookies.set(ACCESS_EXPIRES_COOKIE, newExpires, opts);
  return res;
}

// Edge guard for the BFF: presence of the httpOnly access-token cookie is the auth signal. On protected
// routes the access token is also refreshed transparently (see refreshIfNeeded).
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = Boolean(request.cookies.get(ACCESS_COOKIE)?.value);

  if (hasPrefix(pathname, PUBLIC_PREFIXES)) {
    return NextResponse.next();
  }

  // Entry points: send users to the right place based on auth state.
  if (pathname === "/" || pathname === "/dashboard") {
    return NextResponse.redirect(
      new URL(isAuthed ? APP_HOME : LOGIN_PATH, request.url),
    );
  }

  const isGuestPath = hasPrefix(pathname, GUEST_PREFIXES);

  if (isGuestPath) {
    // Already signed in — no reason to see the login/register/recovery screens.
    return isAuthed
      ? NextResponse.redirect(new URL(APP_HOME, request.url))
      : NextResponse.next();
  }

  // Everything else (product routes + the rest of /dashboard) is protected.
  if (!isAuthed) {
    const url = new URL(LOGIN_PATH, request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return refreshIfNeeded(request);
}

export const config = {
  // Root, auth screens, all dashboard routes, and the real product routes; skip Next internals,
  // the API (route handlers manage their own auth), and static assets.
  matcher: [
    "/",
    "/login",
    "/forgot-password/:path*",
    "/reset-password/:path*",
    "/confirm-email/:path*",
    "/dashboard/:path*",
    "/design-library/:path*",
    "/company-library/:path*",
    "/share-to-site/:path*",
    "/preconstruction/:path*",
    "/leads/:path*",
    "/quotation/:path*",
    "/brochures/:path*",
    "/brochure-templates/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/users/:path*",
    "/team/:path*",
  ],
};
