"use client";

import { useState, useTransition } from "react";
import {
  KeyRound,
  MailCheck,
  MoreHorizontal,
  Pencil,
  ShieldCheck,
  ShieldX,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { confirmEmail } from "../actions/confirm-email";
import { softDeleteUser } from "../actions/soft-delete-user";
import { toggleUserTwoFactor } from "../actions/toggle-2fa";
import { resetTermsAcceptance } from "../actions/terms";
import type { UserActionResult, UserRow } from "../types";
import { ChangeEmailDialog } from "./change-email-dialog";
import { ForceTermsDialog } from "./force-terms-dialog";
import { ForgotPasswordLinkDialog } from "./forgot-password-link-dialog";

type UserRowActionsProps = {
  user: UserRow;
  onChanged: () => void;
};

export function UserRowActions({ user, onChanged }: UserRowActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [changeEmailOpen, setChangeEmailOpen] = useState(false);
  const [forgotLinkOpen, setForgotLinkOpen] = useState(false);
  const [forceTermsOpen, setForceTermsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Runs a direct (no-input) action and surfaces the result via toast, refreshing the list on success.
  function run(action: () => Promise<UserActionResult>, fallbackError: string) {
    startTransition(async () => {
      const res = await action();
      if (res.ok) {
        toast.success(res.message ?? "Done");
        onChanged();
      } else {
        toast.error(res.error ?? fallbackError);
      }
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            disabled={isPending}
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">User actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>Manage user</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setChangeEmailOpen(true)}>
            <Pencil className="size-4" />
            Change email
          </DropdownMenuItem>
          {!user.emailConfirmed ? (
            <DropdownMenuItem
              onClick={() =>
                run(
                  () => confirmEmail(user.email),
                  "Failed to confirm the email.",
                )
              }
            >
              <MailCheck className="size-4" />
              Confirm email
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem onClick={() => setForgotLinkOpen(true)}>
            <KeyRound className="size-4" />
            Get reset link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              run(
                () => toggleUserTwoFactor(user.id, !user.twoFactorEnabled),
                "Failed to update two-factor.",
              )
            }
          >
            {user.twoFactorEnabled ? (
              <ShieldX className="size-4" />
            ) : (
              <ShieldCheck className="size-4" />
            )}
            {user.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setForceTermsOpen(true)}>
            <ShieldCheck className="size-4" />
            Accept terms for user
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              run(
                () => resetTermsAcceptance(user.id),
                "Failed to reset terms acceptance.",
              )
            }
          >
            <ShieldX className="size-4" />
            Reset terms acceptance
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setDeleteOpen(true)}
            disabled={user.isDeleted}
          >
            <Trash2 className="size-4" />
            Delete user
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ChangeEmailDialog
        user={changeEmailOpen ? user : null}
        onOpenChange={(o) => setChangeEmailOpen(o)}
        onChanged={onChanged}
      />
      <ForgotPasswordLinkDialog
        user={forgotLinkOpen ? user : null}
        onOpenChange={(o) => setForgotLinkOpen(o)}
      />
      <ForceTermsDialog
        user={forceTermsOpen ? user : null}
        onOpenChange={(o) => setForceTermsOpen(o)}
        onChanged={onChanged}
      />

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {user.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This soft-deletes the user and anonymizes their email. They will
              no longer be able to sign in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                run(
                  () => softDeleteUser(user.id),
                  "Failed to delete the user.",
                );
                setDeleteOpen(false);
              }}
              disabled={isPending}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
