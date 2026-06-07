"use client";

import { useEffect, useState, useTransition } from "react";
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
import { Label } from "@/components/ui/label";

import { forceAcceptTerms } from "../actions/terms";
import type { UserRow } from "../types";

type ForceTermsDialogProps = {
  user: UserRow | null;
  onOpenChange: (open: boolean) => void;
  onChanged: () => void;
};

// Accepts the Terms & Conditions on a user's behalf. The API requires the public T&C URL being
// accepted, so the admin supplies it here.
export function ForceTermsDialog({
  user,
  onOpenChange,
  onChanged,
}: ForceTermsDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (user) setUrl("");
  }, [user]);

  function onSubmit() {
    if (!user || !url.trim()) return;
    startTransition(async () => {
      const res = await forceAcceptTerms(user.email, url.trim());
      if (res.ok) {
        toast.success(res.message ?? "Terms accepted");
        onOpenChange(false);
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to accept the terms.");
      }
    });
  }

  return (
    <Dialog open={user !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Accept terms on behalf of user</DialogTitle>
          <DialogDescription>
            Record that {user?.name} has accepted the Terms &amp; Conditions at
            the URL below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="terms-url">Terms &amp; Conditions URL</Label>
          <Input
            id="terms-url"
            type="url"
            placeholder="https://…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isPending || !url.trim()}
          >
            {isPending ? "Saving…" : "Accept terms"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
