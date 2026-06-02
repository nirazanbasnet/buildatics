"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { SheetMobileBar } from "@src/components/ui/sheet-mobile-bar";

import type { QuotationDetail } from "../_data";

import { QuotationDetailLayout } from "./quotation-detail-layout";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  detail: QuotationDetail;
};

export function QuotationDetailSheet({ open, onOpenChange, detail }: Props) {
  const close = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full overflow-y-auto p-0 sm:max-w-3xl lg:max-w-5xl"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Quotation Detail — {detail.title}</SheetTitle>
            <SheetDescription>Quotation builder and summary</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <SheetMobileBar onClose={close} title="Quotation" />
        <div className="p-4 sm:p-6">
          <QuotationDetailLayout detail={detail} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
