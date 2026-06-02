import { subscriptionPlans } from "../_data";
import { SubscriptionPlans } from "../_components/subscription-plans";

export default function SubscriptionPage() {
  return <SubscriptionPlans plans={subscriptionPlans} />;
}
