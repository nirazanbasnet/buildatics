"use client";

import { Check, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import type { PreconstructionTaskStatus } from "../_data";

type Props = {
  status: PreconstructionTaskStatus;
  onStatusChange: (status: PreconstructionTaskStatus) => void;
  className?: string;
};

const statusOptions: { value: PreconstructionTaskStatus; label: string }[] = [
  { value: "completed", label: "Completed" },
  { value: "in-progress", label: "In Progress" },
  { value: "pending", label: "Pending" }
];

const triggerStyles: Record<PreconstructionTaskStatus, string> = {
  completed: "bg-emerald-600 text-white hover:bg-emerald-600/90",
  "in-progress": "bg-blue-600 text-white hover:bg-blue-600/90",
  pending: "bg-amber-600 text-white hover:bg-amber-600/90"
};

const dotStyles: Record<PreconstructionTaskStatus, string> = {
  completed: "bg-emerald-500",
  "in-progress": "bg-blue-500",
  pending: "bg-amber-500"
};

export function TaskStatusDropdown({ status, onStatusChange, className }: Props) {
  const active = statusOptions.find((option) => option.value === status) ?? statusOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        data-slot="task-status-trigger"
        className={cn(
          "focus-visible:ring-ring inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          triggerStyles[status],
          className
        )}
      >
        {active.label}
        <ChevronDown className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-40">
        {statusOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onStatusChange(option.value)}
            className="gap-2"
          >
            <span className={cn("size-2 rounded-full", dotStyles[option.value])} />
            <span className="flex-1">{option.label}</span>
            {option.value === status ? <Check className="size-4" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
