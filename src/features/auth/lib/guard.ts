import { ApiError } from "./api-client";

export type Guarded<T> = { ok: true; data: T } | { ok: false };

// Wraps a Server Component data load so auth/permission failures degrade gracefully instead of crashing.
// 401/403 → { ok: false } so the page can render a friendly "No access" UI.
//   - We don't redirect or clear cookies here: that's not allowed inside a Server Component (cookies can
//     only be mutated in a Server Action / Route Handler), and some endpoints return 401 for *permission*
//     denial (lacking an Auth role), so a redirect would bounce a logged-in user in a loop.
//   - A genuinely missing session is already handled by the (app) layout, which redirects to /login.
// Anything else → rethrow (handled by the route error boundary).
export async function loadGuarded<T>(
  loader: () => Promise<T>,
): Promise<Guarded<T>> {
  try {
    return { ok: true, data: await loader() };
  } catch (error) {
    if (
      error instanceof ApiError &&
      (error.status === 401 || error.status === 403)
    ) {
      return { ok: false };
    }
    throw error;
  }
}
