"use client";

import { Check, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { quotationDetailStatusLabels, type QuotationDetailStatus } from "../_data";

type Props = {
  status: QuotationDetailStatus;
  onStatusChange: (status: QuotationDetailStatus) => void;
  className?: string;
};

const order: QuotationDetailStatus[] = ["draft", "sent", "signed", "declined"];

const triggerStyles: Record<QuotationDetailStatus, string> = {
  draft: "bg-muted text-foreground hover:bg-muted/80",
  sent: "bg-emerald-600 text-white hover:bg-emerald-600/90",
  signed: "bg-blue-600 text-white hover:bg-blue-600/90",
  declined: "bg-destructive text-white hover:bg-destructive/90"
};

const dotStyles: Record<QuotationDetailStatus, string> = {
  draft: "bg-muted-foreground",
  sent: "bg-emerald-500",
  signed: "bg-blue-500",
  declined: "bg-destructive"
};

export function QuotationStatusDropdown({ status, onStatusChange, className }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-slot="quotation-status-trigger"
        className={cn(
          "focus-visible:ring-ring inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          triggerStyles[status],
          className
        )}
      >
        {quotationDetailStatusLabels[status]}
        <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        {order.map((value) => (
          <DropdownMenuItem key={value} onSelect={() => onStatusChange(value)} className="gap-2">
            <span className={cn("size-2 rounded-full", dotStyles[value])} />
            <span className="flex-1">{quotationDetailStatusLabels[value]}</span>
            {value === status ? <Check className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
