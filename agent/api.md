# API Interaction Rules — talking to the Buildatics Platform API

How **all** server↔API communication MUST work in this repo. The architecture is a **BFF (Backend-for-Frontend)**: the browser talks only to the Next.js server; the Next.js server talks to the Platform API and holds the tokens. If a rule here conflicts with a request, ask before deviating (per `CLAUDE.md`).

Reference: API docs live in [`docs/api/`](../docs/api/) (`README.md`, `endpoints/*.md`, `schemas.md`). Treat `schemas.md` as the source of truth for DTO shapes.

---

## 1. The BFF boundary (non-negotiable)

```
Client Component ──► Server Action / Route Handler ──► apiFetch() ──► Platform API
   (browser)            (server, "use server")        (server-only)      (Azure)
```

1. **The browser NEVER calls the Platform API directly.** No `fetch("https://…azurecontainerapps.io/…")` in client code, ever.
2. **Tokens never reach JS.** Access/refresh tokens live in **httpOnly cookies** set by the server. No `localStorage`, no `document.cookie`, no `NEXT_PUBLIC_` token.
3. The **only** code allowed to call the API is [`apiFetch`](../src/features/auth/lib/api-client.ts). Everything else goes through a Server Action (default) or a Route Handler.
4. The base URL comes from `process.env.BUILDATICS_API_BASE_URL` (server-only — **no** `NEXT_PUBLIC_` prefix). See [`env.example`](../env.example).

## 2. The `apiFetch` contract

`apiFetch<T>(path, { method?, body?, auth?, cache? }): Promise<T>` — in [`src/features/auth/lib/api-client.ts`](../src/features/auth/lib/api-client.ts).

- `path` is the API path starting at `/api/...` (base URL is prepended).
- `body` is a plain object; it is JSON-serialised and the JSON `Content-Type` is set automatically.
- `auth: true` attaches the caller's Bearer token from the session cookie; throws `ApiError(401)` if absent.
- Non-2xx responses throw `ApiError { status, message }`, with `message` taken from the API body (`message`/`error`/`title`) when present.
- Defaults to `cache: "no-store"` — these are dynamic, per-user calls.

**Never** swallow an `ApiError` silently. In a Server Action, catch it and return a typed form/result state carrying `error.message`. Let `redirect()` run **outside** the try/catch (it throws `NEXT_REDIRECT`).

## 3. Auth & session

- Login/refresh/logout are owned by `src/features/auth/`.
- Session cookies (httpOnly, `secure` in prod, `sameSite: lax`): `ba_access_token`, `ba_refresh_token`, `ba_user`. Managed only through [`session.ts`](../src/features/auth/lib/session.ts) (`setSession` / `getSession` / `getAccessToken` / `clearSession`).
- For SSR that needs the current user, call `getSession()` from a Server Component — do not decode JWTs by hand elsewhere.
- Route protection is a **presence** check on `ba_access_token` in [`src/proxy.ts`](../src/proxy.ts) (edge). Real validity is enforced when an authed `apiFetch` returns `401`.

## 4. DTOs

- Mirror request/response shapes from `docs/api/schemas.md` as TS types (see [`dto.ts`](../src/features/auth/lib/dto.ts)). Optional API fields are optional in TS.
- **No `any`.** If the spec marks a field nullable, model it as `T | null`.
- Co-locate DTOs with the feature that owns the endpoint; promote to `src/types/` only when shared across features.

## 5. Mapping API responses to UI shapes (document the gaps)

When an endpoint feeds an existing UI, write a **mapper** (`map-<entity>.ts`) that converts the API DTO to the shape the UI consumes, and document two things in a doc-comment at the top:

- **Direct map** — `apiField → uiField`, one line each.
- **Gaps** — UI fields the API does NOT provide, each with the interim choice and the real options/decision needed.

This makes missing-data decisions explicit and repeatable across endpoints instead of being silently faked. Reference example: [src/features/designs/lib/map-design.ts](../src/features/designs/lib/map-design.ts) (maps `DesignRes` → the display-center card; flags `brand`, unlabeled blob-type enums, and the absent top-level `id`). Time-limited values (e.g. SAS URLs that expire) must be mapped **server-side per request**, never cached.

## 6. Server Action vs Route Handler

- **Default: Server Action** (`"use server"`) — for form submissions and user-initiated mutations. Type-safe, less wiring, progressive enhancement.
- **Route Handler** (`src/app/api/.../route.ts`) — only when you need a callable HTTP endpoint (webhooks, client-side `fetch` from non-form code, third-party callbacks). Still goes through `apiFetch`.

## 7. Worked example — adding a new authed call

Goal: load the current user's profile (`GET /api/UserProfile/Get`, Bearer).

```ts
// src/features/profile/lib/dto.ts  — mirror docs/api/schemas.md#userprofileres
export type UserProfileRes = { id?: string; email?: string; /* … */ };

// src/features/profile/lib/get-profile.ts
import { apiFetch } from "@/features/auth/lib/api-client";
import type { UserProfileRes } from "./dto";

export function getProfile() {
  return apiFetch<UserProfileRes>("/api/UserProfile/Get", { auth: true });
}

// usage in a Server Component
const profile = await getProfile(); // 401 → ApiError; handle/redirect as needed
```

Rules recap for the example: server-only file, goes through `apiFetch`, `auth: true`, typed DTO from the spec, no token handling, no client fetch.
