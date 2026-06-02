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

import type { Property } from "../../display-center/_data";

import { DetailLayout } from "./detail-layout";
import { DetailLayoutV2 } from "./detail-layout-v2";
import type { DetailVariantId } from "./variants";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property;
  variant?: DetailVariantId;
};

export function DetailSheet({ open, onOpenChange, property, variant = "v1" }: Props) {
  const Layout = variant === "v2" ? DetailLayoutV2 : DetailLayout;
  const close = () => onOpenChange(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full overflow-y-auto p-0 sm:max-w-3xl lg:max-w-234"
      >
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>{property.title} details</SheetTitle>
            <SheetDescription>Detail view for {property.title}</SheetDescription>
          </SheetHeader>
        </VisuallyHidden>
        <SheetMobileBar onClose={close} title={property.title} />
        <div className="p-4 sm:p-6">
          <Layout property={property} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
