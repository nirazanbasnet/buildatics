"use client";

import { ArrowDown, ArrowUp, Copy, Eye, EyeOff, MoreVertical, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Props = {
  visible: boolean;
  onRename: () => void;
  onToggleVisibility: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  className?: string;
};

export function QuotationLineItemActionsMenu({
  visible,
  onRename,
  onToggleVisibility,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onDelete,
  className
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("text-muted-foreground size-8 shrink-0", className)}
          aria-label="Line item actions"
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuItem onSelect={onRename}>
          <Pencil />
          Rename item
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onToggleVisibility}>
          {visible ? <EyeOff /> : <Eye />}
          {visible ? "Hide from quote" : "Show in quote"}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onDuplicate}>
          <Copy />
          Duplicate item
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={onMoveUp}>
          <ArrowUp />
          Move up
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onMoveDown}>
          <ArrowDown />
          Move down
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={onDelete}>
          <Trash2 />
          Delete item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
