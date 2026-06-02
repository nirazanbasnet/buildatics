"use client";

import {
  ArrowDown,
  ArrowUp,
  Copy,
  FileDown,
  MoreVertical,
  Pencil,
  Plus,
  Trash2
} from "lucide-react";

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
  onRename: () => void;
  onAddLineItem: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  className?: string;
};

export function QuotationCategoryActionsMenu({
  onRename,
  onAddLineItem,
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
          aria-label="Category actions"
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuItem onSelect={onRename}>
          <Pencil />
          Rename category
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onAddLineItem}>
          <Plus />
          Add line item
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onDuplicate}>
          <Copy />
          Duplicate category
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
        <DropdownMenuItem>
          <FileDown />
          Export category
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={onDelete}>
          <Trash2 />
          Delete category
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
