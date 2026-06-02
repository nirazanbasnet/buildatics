"use client";

import { Fragment } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Check } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { SheetMobileBar } from "@src/components/ui/sheet-mobile-bar";
import { cn } from "@/lib/utils";

import type { ClaimDetail } from "../_data";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: ClaimDetail;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 space-y-0.5">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-foreground text-sm font-medium">{value}</p>
    </div>
  );
}

export function ClaimDetailSheet({ open, onOpenChange, detail }: Props) {
  const close = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full overflow-y-auto p-0 sm:max-w-md lg:max-w-lg"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Claim {detail.claimId}</SheetTitle>
            <SheetDescription>Claim invoice detail</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <SheetMobileBar onClose={close} title={`Claim ${detail.claimId}`} />

        <div className="flex flex-col gap-6 p-4 sm:p-6" data-slot="claim-detail">
          <div className="flex items-start">
            {detail.steps.map((step, i) => (
              <div key={step.label} className="flex flex-1 flex-col items-center text-center">
                <div className="flex w-full items-center">
                  <span
                    className={cn(
                      "h-0.5 flex-1",
                      i === 0 ? "bg-transparent" : step.done ? "bg-foreground" : "bg-border"
                    )}
                  />
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                      step.done ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step.done ? <Check className="size-4" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "h-0.5 flex-1",
                      i === detail.steps.length - 1
                        ? "bg-transparent"
                        : detail.steps[i + 1].done
                          ? "bg-foreground"
                          : "bg-border"
                    )}
                  />
                </div>
                <span className="text-foreground mt-2 text-sm font-medium">{step.label}</span>
                <span className="text-muted-foreground text-xs">{step.date}</span>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl border p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-foreground text-base font-bold">{detail.company}</p>
                <p className="text-muted-foreground text-xs">{detail.companyAbn}</p>
              </div>
              <div className="text-right">
                <p className="text-muted-foreground text-xs">Claim ID</p>
                <p className="text-foreground text-sm font-bold">{detail.claimId}</p>
              </div>
            </div>

            <div className="mt-5 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-muted-foreground text-xs">Bill To</p>
                <p className="text-foreground text-base font-bold">{detail.billToName}</p>
                <p className="text-muted-foreground text-sm">{detail.billToAddress}</p>
              </div>
              <div className="space-y-0.5 text-right text-sm">
                <p>
                  <span className="text-foreground font-semibold">Issued :</span>{" "}
                  <span className="text-muted-foreground">{detail.issued}</span>
                </p>
                <p>
                  <span className="text-foreground font-semibold">Due :</span>{" "}
                  <span className="text-muted-foreground">{detail.due}</span>
                </p>
              </div>
            </div>

            <div className="bg-muted/40 mt-5 rounded-xl p-4">
              {detail.lineItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 py-1.5">
                  <span className="text-muted-foreground text-sm">{item.label}</span>
                  <span className="text-foreground text-sm font-semibold">{item.amount}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-3 py-1.5">
                <span className="text-muted-foreground text-sm">{detail.gstLabel}</span>
                <span className="text-foreground text-sm font-semibold">{detail.gstAmount}</span>
              </div>
              <div className="border-border mt-2 flex items-center justify-between gap-3 border-t pt-3">
                <span className="text-foreground text-base font-bold">Total (incl. GST)</span>
                <span className="text-foreground text-base font-bold">{detail.total}</span>
              </div>
            </div>

            <div className="mt-5 rounded-xl border p-4">
              <p className="text-foreground text-sm font-semibold">Payment Details</p>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <Row label="Bank" value={detail.payment.bank} />
                <Row label="Account no." value={detail.payment.accountNo} />
                <Row label="BSB" value={detail.payment.bsb} />
                <Row label="Reference" value={detail.payment.reference} />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
