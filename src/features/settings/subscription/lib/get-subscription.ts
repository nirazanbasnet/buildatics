import { apiFetch } from "@/features/auth/lib/api-client";

import type { SubscriptionPlanRes } from "../../lib/dto";

export type PlanCard = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  isCurrent: boolean;
};

function formatPrice(value: number | undefined): string {
  if (value == null) return "—";
  if (value === 0) return "Free";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 2,
  }).format(value);
}

function cadence(days: number | undefined): string {
  if (!days) return "";
  if (days >= 360) return "/year";
  if (days >= 28 && days <= 31) return "/month";
  return `/${days} days`;
}

function features(plan: SubscriptionPlanRes): string[] {
  const list: string[] = [];
  if (plan.maxUsers != null) list.push(`Up to ${plan.maxUsers} users`);
  if (plan.maxBrochures != null)
    list.push(`Up to ${plan.maxBrochures} brochures`);
  if (plan.maxBlobStorageInBytes != null) {
    const gb = plan.maxBlobStorageInBytes / 1024 ** 3;
    list.push(`Up to ${gb % 1 === 0 ? gb : gb.toFixed(1)} GB storage`);
  }
  return list;
}

function toCard(
  plan: SubscriptionPlanRes,
  currentId: string | undefined,
): PlanCard {
  return {
    id: plan.id ?? "",
    name: plan.name ?? "Plan",
    price: formatPrice(plan.price),
    cadence: cadence(plan.billingPeriodDays),
    description: plan.description ?? "",
    features: features(plan),
    isCurrent: Boolean(currentId && plan.id === currentId),
  };
}

export type SubscriptionData = {
  plans: PlanCard[];
  currentPlanName: string;
};

export async function getSubscription(): Promise<SubscriptionData> {
  const [available, current] = await Promise.all([
    apiFetch<SubscriptionPlanRes[]>(
      "/api/Subscription/AllAvaliableSubscriptionPlans",
      { auth: true },
    ),
    apiFetch<SubscriptionPlanRes>(
      "/api/Subscription/GetCurrentSubscriptionPlan",
      { auth: true },
    ).catch(() => null),
  ]);

  const currentId = current?.id;
  const plans = (available ?? []).map((p) => toCard(p, currentId));
  // Ensure the current plan is represented even if it's not in the available list.
  if (currentId && !plans.some((p) => p.id === currentId) && current) {
    plans.unshift(toCard(current, currentId));
  }

  return { plans, currentPlanName: current?.name ?? "" };
}
