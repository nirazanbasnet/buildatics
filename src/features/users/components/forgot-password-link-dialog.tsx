"use client";

import { useEffect, useState, useTransition } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { getForgotPasswordLink } from "../actions/get-forgot-password-link";
import type { UserRow } from "../types";

type ForgotPasswordLinkDialogProps = {
  user: UserRow | null;
  onOpenChange: (open: boolean) => void;
};

// Requests a reset link for the user and shows it for the admin to copy and share manually.
export function ForgotPasswordLinkDialog({
  user,
  onOpenChange,
}: ForgotPasswordLinkDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [link, setLink] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLink(null);
      return;
    }
    startTransition(async () => {
      const res = await getForgotPasswordLink(user.email);
      if (res.ok) {
        setLink(res.resetPasswordUrl ?? "");
      } else {
        toast.error(res.error ?? "Failed to generate the reset link.");
        onOpenChange(false);
      }
    });
  }, [user]);

  async function copyLink() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy the link.");
    }
  }

  return (
    <Dialog open={user !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Password reset link</DialogTitle>
          <DialogDescription>
            Share this link with {user?.name} so they can reset their password.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input
            readOnly
            value={isPending ? "Generating…" : (link ?? "")}
            placeholder="No link returned"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={copyLink}
            disabled={!link}
            aria-label="Copy reset link"
          >
            <Copy className="size-4" />
          </Button>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
