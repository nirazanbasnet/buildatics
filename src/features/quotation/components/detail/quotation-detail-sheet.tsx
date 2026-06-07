"use client";

import { useEffect, useState, useTransition } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { SheetMobileBar } from "@src/components/ui/sheet-mobile-bar";

import { loadQuoteDetail } from "../../actions/load-detail";
import type { QuoteDetailModel } from "../../types";
import { QuotationDetail } from "./quotation-detail";

type QuotationDetailSheetProps = {
  // The quote to show, or null when the sheet is closed.
  target: { leadId: string; id: string } | null;
  onOpenChange: (open: boolean) => void;
  // Called after a change that affects the list (status, revision, delete) so it can re-query.
  onChanged: () => void;
};

// Slide-over quotation detail — same sheet layer as the sample list page detail. Loads the quote +
// line items on open, then renders the builder inside the sheet.
export function QuotationDetailSheet({
  target,
  onOpenChange,
  onChanged,
}: QuotationDetailSheetProps) {
  const [detail, setDetail] = useState<QuoteDetailModel | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (!target) {
      setDetail(null);
      return;
    }
    setDetail(null);
    startTransition(async () => {
      const res = await loadQuoteDetail(target.leadId, target.id);
      if (res.ok) {
        setDetail(res.detail);
      } else {
        toast.error(res.error);
        onOpenChange(false);
      }
    });
  }, [target?.leadId, target?.id]);

  const close = () => onOpenChange(false);

  return (
    <Sheet open={target !== null} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full overflow-y-auto p-0 sm:max-w-3xl lg:max-w-5xl"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>
              Quotation Detail — {detail?.title ?? "Loading"}
            </SheetTitle>
            <SheetDescription>Quotation builder and summary</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <SheetMobileBar onClose={close} title="Quotation" />
        <div className="p-4 sm:p-6">
          {detail ? (
            <QuotationDetail detail={detail} onChanged={onChanged} />
          ) : (
            <DetailSkeleton />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DetailSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-56 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
