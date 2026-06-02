"use client";

import { Check, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import {
  brochureDetailStatusConfig,
  brochureDetailStatusOrder,
  type BrochureDetailStatus
} from "../_data";

type Props = {
  status: BrochureDetailStatus;
  onStatusChange: (status: BrochureDetailStatus) => void;
  className?: string;
};

export function BrochureStatusDropdown({ status, onStatusChange, className }: Props) {
  const active = brochureDetailStatusConfig[status];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-slot="brochure-status-trigger"
        className={cn(
          "focus-visible:ring-ring inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          active.trigger,
          className
        )}
      >
        {active.label}
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {brochureDetailStatusOrder.map((value) => (
          <DropdownMenuItem key={value} onSelect={() => onStatusChange(value)} className="gap-2">
            <span className={cn("size-2 rounded-full", brochureDetailStatusConfig[value].dot)} />
            <span className="flex-1">{brochureDetailStatusConfig[value].label}</span>
            {value === status ? <Check className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
