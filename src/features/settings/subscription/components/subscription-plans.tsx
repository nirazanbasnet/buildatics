"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, Check, X } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  cancelSubscription,
  getCheckoutUrl,
} from "../actions/subscription-actions";
import type { PlanCard } from "../lib/get-subscription";
import { NoApiDataBlock } from "../../components/no-api-data";

type Props = {
  plans: PlanCard[];
};

export function SubscriptionPlans({ plans }: Props) {
  const router = useRouter();
  const [cancelOpen, setCancelOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function upgrade(plan: PlanCard) {
    setPendingId(plan.id);
    startTransition(async () => {
      const res = await getCheckoutUrl(plan.id);
      setPendingId(null);
      if (res.ok && res.url) {
        window.location.href = res.url;
      } else {
        toast.error(res.error ?? "Couldn't start checkout.");
      }
    });
  }

  function cancel() {
    startTransition(async () => {
      const res = await cancelSubscription();
      if (res.ok) {
        toast.success("Subscription cancellation requested");
        setCancelOpen(false);
        router.refresh();
      } else {
        toast.error(res.error ?? "Failed to cancel.");
      }
    });
  }

  if (plans.length === 0) {
    return <NoApiDataBlock label="No subscription plans available" />;
  }

  return (
    <>
      <div
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        data-slot="subscription-plans"
      >
        {plans.map((plan) => (
          <section
            key={plan.id}
            className={cn(
              "bg-card flex flex-col rounded-xl border p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg",
              plan.isCurrent && "border-foreground/20 ring-foreground/5 ring-1",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              {plan.isCurrent ? (
                <Badge variant="secondary">Current Plan</Badge>
              ) : (
                <span className="text-muted-foreground text-xs">Available</span>
              )}
            </div>

            <h3 className="text-foreground mt-4 text-lg font-semibold">
              {plan.name}
            </h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-foreground text-3xl font-bold tracking-tight">
                {plan.price}
              </span>
              {plan.cadence ? (
                <span className="text-muted-foreground text-sm">
                  {plan.cadence}
                </span>
              ) : null}
            </div>
            {plan.description ? (
              <p className="text-muted-foreground mt-1 text-sm">
                {plan.description}
              </p>
            ) : null}

            <ul className="mt-4 flex flex-1 flex-col gap-2">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="text-foreground flex items-center gap-2 text-sm"
                >
                  <Check className="text-foreground size-4 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {plan.isCurrent ? (
              <Button
                variant="secondary"
                className="mt-5 h-11 w-full justify-center gap-2"
                onClick={() => setCancelOpen(true)}
                disabled={isPending}
              >
                <X className="size-4" />
                Cancel Subscription
              </Button>
            ) : (
              <Button
                className="mt-5 h-11 w-full justify-center gap-2"
                onClick={() => upgrade(plan)}
                disabled={isPending}
              >
                <ArrowUp className="size-4" />
                {isPending && pendingId === plan.id
                  ? "Redirecting…"
                  : "Upgrade Plan"}
              </Button>
            )}
          </section>
        ))}
      </div>

      <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel subscription?</AlertDialogTitle>
            <AlertDialogDescription>
              Your company will be locked when the current subscription expires
              and will need a new plan to regain access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>
              Keep plan
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                cancel();
              }}
              disabled={isPending}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Cancel subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
