import { AccessDenied } from "@src/components/access-denied";
import { loadGuarded } from "@/features/auth/lib/guard";
import { SubscriptionPlans, getSubscription } from "@/features/settings";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Settings — Subscription",
    description: "View and manage your company subscription.",
    canonical: "/settings/subscription",
  });
}

export default async function SubscriptionPage() {
  const result = await loadGuarded(() => getSubscription());
  if (!result.ok) {
    return (
      <AccessDenied
        title="No access to subscription"
        description="Your account doesn't have permission to manage the subscription. Contact an administrator if you need access."
      />
    );
  }
  return <SubscriptionPlans plans={result.data.plans} />;
}
