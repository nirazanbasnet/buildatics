"use server";

import { apiFetch, ApiError } from "@/features/auth/lib/api-client";

export type CheckoutResult = { ok: boolean; error?: string; url?: string };
export type CancelResult = { ok: boolean; error?: string };

// Returns the Stripe checkout URL for a plan; the client redirects to it.
export async function getCheckoutUrl(
  subscriptionPlanId: string,
  renewsOnExpiry = true,
): Promise<CheckoutResult> {
  try {
    const url = await apiFetch<string>(
      `/api/Subscription/GetCheckoutUrl?subscriptionPlanId=${encodeURIComponent(subscriptionPlanId)}&renewsOnExpiry=${renewsOnExpiry}`,
      { method: "POST", auth: true },
    );
    return { ok: true, url: typeof url === "string" ? url : "" };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError ? error.message : "Failed to start checkout.",
    };
  }
}

export async function cancelSubscription(): Promise<CancelResult> {
  try {
    await apiFetch("/api/Subscription/CancelCurrentSubscription", {
      method: "POST",
      auth: true,
    });
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof ApiError
          ? error.message
          : "Failed to cancel the subscription.",
    };
  }
}
