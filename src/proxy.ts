import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/dashboard/login/v1";
const APP_HOME = "/design-library";

// Paths a logged-out visitor is allowed to reach. Authenticated users are bounced away from these.
const GUEST_PREFIXES = ["/dashboard/login", "/dashboard/register", "/dashboard/forgot-password"];
// Always reachable regardless of auth state (error screens, etc.).
const PUBLIC_PREFIXES = ["/dashboard/pages/error"];

function hasPrefix(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

// Edge guard for the BFF: presence of the httpOnly access-token cookie is the auth signal.
// Token validity is enforced downstream when SSR/data calls hit the API (401).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = Boolean(request.cookies.get("ba_access_token")?.value);

  if (hasPrefix(pathname, PUBLIC_PREFIXES)) {
    return NextResponse.next();
  }

  // Entry points: send users to the right place based on auth state.
  if (pathname === "/" || pathname === "/dashboard") {
    return NextResponse.redirect(new URL(isAuthed ? APP_HOME : LOGIN_PATH, request.url));
  }

  const isGuestPath = hasPrefix(pathname, GUEST_PREFIXES);

  if (isGuestPath) {
    // Already signed in — no reason to see the login/register screens.
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

  return NextResponse.next();
}

export const config = {
  // Root, all dashboard routes, and the real product routes; skip Next internals, the API, and static assets.
  matcher: ["/", "/dashboard/:path*", "/design-library/:path*"]
};
