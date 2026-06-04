import { apiFetch } from "@/features/auth/lib/api-client";

import type { UserProfileRes } from "./dto";

// Reads the signed-in user's profile (incl. roles). GET /api/UserProfile/Get (Bearer).
// 401 → ApiError; callers (Server Components / Actions) handle or redirect. See agent/api.md §7.
export function getProfile(): Promise<UserProfileRes> {
  return apiFetch<UserProfileRes>("/api/UserProfile/Get", { auth: true });
}
