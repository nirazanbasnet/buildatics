"use client";

import { ArrowUp, Check, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { SubscriptionPlan } from "../_data";

const badgeTone: Record<SubscriptionPlan["badgeTone"], string> = {
  current: "border-green-600/40 text-green-700 dark:text-green-400",
  popular: "border-blue-600/40 text-blue-700 dark:text-blue-400",
  premium: "border-orange-500/40 text-orange-600 dark:text-orange-400"
};

type Props = {
  plans: SubscriptionPlan[];
  className?: string;
};

export function SubscriptionPlans({ plans, className }: Props) {
  return (
    <div
      className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}
      data-slot="subscription-plans"
    >
      {plans.map((plan) => {
        const isCurrent = plan.cta === "cancel";
        return (
          <section
            key={plan.id}
            className={cn(
              "bg-card flex flex-col rounded-xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg",
              isCurrent && "border-foreground/20 ring-foreground/5 ring-1"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
                  badgeTone[plan.badgeTone]
                )}
              >
                {plan.badge}
              </span>
              {plan.validTill ? (
                <span className="text-muted-foreground text-xs">Valid till: {plan.validTill}</span>
              ) : null}
            </div>

            <h3 className="text-foreground mt-4 text-lg font-semibold">{plan.name}</h3>

            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-foreground text-3xl font-bold tracking-tight">
                {plan.price}
              </span>
              <span className="text-muted-foreground text-sm">{plan.cadence}</span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">{plan.note}</p>

            <ul className="mt-4 flex flex-col gap-2">
              {plan.features.map((feature) => (
                <li key={feature} className="text-foreground flex items-center gap-2 text-sm">
                  <Check className="text-foreground size-4 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {isCurrent ? (
              <Button
                variant="secondary"
                className="mt-5 h-11 w-full justify-center gap-2"
                onClick={() => toast.error("Subscription cancellation requested")}
              >
                <X className="size-4" />
                Cancel Subscription
              </Button>
            ) : (
              <Button
                className="mt-5 h-11 w-full justify-center gap-2"
                onClick={() => toast.success(`Upgrading to ${plan.name}…`)}
              >
                <ArrowUp className="size-4" />
                Upgrade Plan
              </Button>
            )}
          </section>
        );
      })}
    </div>
  );
}
