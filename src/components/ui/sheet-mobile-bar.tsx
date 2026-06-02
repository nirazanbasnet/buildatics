"use client";

import { ChevronLeft, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  onClose: () => void;
  title?: string;
  className?: string;
};

export function SheetMobileBar({ onClose, title, className }: Props) {
  return (
    <div
      className={cn(
        "bg-background sticky top-0 z-20 flex items-center justify-between gap-2 border-b px-4 py-3 md:hidden",
        className
      )}
      data-slot="sheet-mobile-bar"
    >
      <Button variant="ghost" size="sm" onClick={onClose} className="-ml-2 gap-1">
        <ChevronLeft className="size-5" />
        Back
      </Button>
      {title ? <span className="text-foreground text-base font-semibold">{title}</span> : null}
      <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
        <X className="size-5" />
      </Button>
    </div>
  );
}
