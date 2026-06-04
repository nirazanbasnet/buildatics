"use client";

import { useState, useTransition } from "react";
import { MailPlus, MoreHorizontal, ShieldEllipsis, UserMinus } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { removeStaff } from "../actions/remove-staff";
import { resendInvite } from "../actions/resend-invite";
import type { TeamMemberRow } from "../types";

type TeamMemberActionsProps = {
  member: TeamMemberRow;
  onChangeRole: (member: TeamMemberRow) => void;
  onChanged: () => void;
};

export function TeamMemberActions({ member, onChangeRole, onChanged }: TeamMemberActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [removeOpen, setRemoveOpen] = useState(false);

  function onResend() {
    startTransition(async () => {
      const res = await resendInvite(member.id);
      if (res.ok) toast.success(res.message ?? "Invite reminder sent");
      else toast.error(res.error ?? "Failed to resend the invite.");
    });
  }

  function onRemove() {
    startTransition(async () => {
      const res = await removeStaff(member.id);
      if (res.ok) {
        toast.success(res.message ?? "Member removed");
        setRemoveOpen(false);
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to remove the member.");
      }
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8" disabled={isPending}>
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Member actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Manage member</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onChangeRole(member)}>
            <ShieldEllipsis className="size-4" />
            Change role
          </DropdownMenuItem>
          {member.status === "invited" ? (
            <DropdownMenuItem onClick={onResend}>
              <MailPlus className="size-4" />
              Resend invite
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setRemoveOpen(true)}>
            <UserMinus className="size-4" />
            Remove member
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={removeOpen} onOpenChange={setRemoveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {member.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              They will lose access to this workspace. This can be restored by an admin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                onRemove();
              }}
              disabled={isPending}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
