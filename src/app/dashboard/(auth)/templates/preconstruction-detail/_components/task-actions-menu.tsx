"use client";

import {
  CalendarClock,
  MessageSquarePlus,
  MoreVertical,
  Pencil,
  Trash2,
  UserPlus
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
  className?: string;
};

export function TaskActionsMenu({ className }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("text-muted-foreground size-8 shrink-0", className)}
          aria-label="Task actions"
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuItem>
          <Pencil />
          Edit task
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserPlus />
          Reassign staff
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CalendarClock />
          Change due date
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquarePlus />
          Add comment
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 />
          Delete task
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
