"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { resetPasswordAction } from "../actions/account";
import type { AuthFormState } from "../types";

const initialState: AuthFormState = { ok: false };

type ResetPasswordFormProps = {
  defaultEmail?: string;
  token?: string;
};

export function ResetPasswordForm({
  defaultEmail = "",
  token = "",
}: ResetPasswordFormProps) {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  if (state.ok) {
    return (
      <div className="w-full max-w-md space-y-6 px-4 text-center">
        <span className="bg-primary/10 text-primary mx-auto flex size-12 items-center justify-center rounded-full">
          <CheckCircle2 className="size-6" />
        </span>
        <div>
          <h2 className="text-2xl font-bold">Password reset</h2>
          <p className="text-muted-foreground mt-2 text-sm">{state.message}</p>
        </div>
        <Button asChild className="w-full">
          <Link href="/login">Continue to sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md space-y-8 px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Set a new password</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Choose a strong password for your account.
        </p>
      </div>

      <form action={formAction} className="space-y-6" noValidate>
        {state.error ? (
          <p
            role="alert"
            className="border-destructive/50 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm"
          >
            {state.error}
          </p>
        ) : null}

        <input type="hidden" name="token" defaultValue={token} />

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={defaultEmail}
            readOnly={Boolean(defaultEmail)}
            placeholder="Email address"
            aria-invalid={Boolean(state.fieldErrors?.email)}
          />
          {state.fieldErrors?.email ? (
            <p className="text-destructive text-sm">
              {state.fieldErrors.email}
            </p>
          ) : null}
        </div>

        {!token ? (
          <div className="space-y-1">
            <Label htmlFor="token-input">Reset token</Label>
            <Input
              id="token-input"
              name="token"
              required
              placeholder="Paste the token from your email"
              aria-invalid={Boolean(state.fieldErrors?.token)}
            />
            {state.fieldErrors?.token ? (
              <p className="text-destructive text-sm">
                {state.fieldErrors.token}
              </p>
            ) : null}
          </div>
        ) : state.fieldErrors?.token ? (
          <p className="text-destructive text-sm">{state.fieldErrors.token}</p>
        ) : null}

        <div className="space-y-1">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            required
            placeholder="New password"
            aria-invalid={Boolean(state.fieldErrors?.newPassword)}
          />
          {state.fieldErrors?.newPassword ? (
            <p className="text-destructive text-sm">
              {state.fieldErrors.newPassword}
            </p>
          ) : null}
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Confirm password"
            aria-invalid={Boolean(state.fieldErrors?.confirmPassword)}
          />
          {state.fieldErrors?.confirmPassword ? (
            <p className="text-destructive text-sm">
              {state.fieldErrors.confirmPassword}
            </p>
          ) : null}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Resetting…" : "Reset password"}
        </Button>

        <div className="text-center text-sm">
          <Link href="/login" className="underline">
            Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
