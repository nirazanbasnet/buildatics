"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { changeEmail } from "../actions/change-email";
import { changeEmailSchema, type ChangeEmailInput } from "../lib/users-form-schema";
import type { UserRow } from "../types";

type ChangeEmailDialogProps = {
  user: UserRow | null;
  onOpenChange: (open: boolean) => void;
  onChanged: () => void;
};

export function ChangeEmailDialog({ user, onOpenChange, onChanged }: ChangeEmailDialogProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ChangeEmailInput>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { email: "" }
  });

  useEffect(() => {
    if (user) form.reset({ email: user.email === "—" ? "" : user.email });
  }, [user]);

  function onSubmit(values: ChangeEmailInput) {
    if (!user) return;
    startTransition(async () => {
      const res = await changeEmail(user.id, values.email);
      if (res.ok) {
        toast.success(res.message ?? "Email updated");
        onOpenChange(false);
        onChanged();
        return;
      }
      if (res.fieldErrors?.email) form.setError("email", { message: res.fieldErrors.email });
      if (res.error) toast.error(res.error);
    });
  }

  return (
    <Dialog open={user !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change email</DialogTitle>
          <DialogDescription>
            Set a new email address for {user?.name}. They may need to confirm it before signing in.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving…" : "Change email"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
