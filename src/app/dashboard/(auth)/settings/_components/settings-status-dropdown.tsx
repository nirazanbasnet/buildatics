"use client";

import { Check, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { settingsStatusConfig, settingsStatusOrder, type SettingsStatus } from "../_data";

type Props = {
  status: SettingsStatus;
  onStatusChange: (status: SettingsStatus) => void;
  className?: string;
};

export function SettingsStatusDropdown({ status, onStatusChange, className }: Props) {
  const active = settingsStatusConfig[status];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-slot="settings-status-trigger"
        className={cn(
          "focus-visible:ring-ring inline-flex min-w-24 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          active.trigger,
          className
        )}
      >
        {active.label}
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-36">
        {settingsStatusOrder.map((value) => (
          <DropdownMenuItem key={value} onSelect={() => onStatusChange(value)} className="gap-2">
            <span className={cn("size-2 rounded-full", settingsStatusConfig[value].dot)} />
            <span className="flex-1">{settingsStatusConfig[value].label}</span>
            {value === status ? <Check className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
