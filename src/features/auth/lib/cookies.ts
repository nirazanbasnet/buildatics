// Shared session-cookie names + options. No `next/headers` import here, so this is safe to use from
// both the server session layer and the Edge middleware.

export const ACCESS_COOKIE = "ba_access_token";
export const REFRESH_COOKIE = "ba_refresh_token";
export const USER_COOKIE = "ba_user";
// UTC epoch (ms, as a string) when the access token expires — drives the middleware refresh.
export const ACCESS_EXPIRES_COOKIE = "ba_access_expires";

// Cookies live for the refresh-token window (30 days). The access token's real validity is tracked
// separately via ACCESS_EXPIRES_COOKIE, so the (expired) token is still available to refresh.
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export function baseCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}
