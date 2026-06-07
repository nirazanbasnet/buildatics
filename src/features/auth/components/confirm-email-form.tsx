"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { CheckCircle2, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  confirmEmailAction,
  resendConfirmEmailAction,
} from "../actions/account";
import type { AuthFormState } from "../types";

const initialState: AuthFormState = { ok: false };

type ConfirmEmailFormProps = {
  defaultEmail?: string;
  code?: string;
};

export function ConfirmEmailForm({
  defaultEmail = "",
  code = "",
}: ConfirmEmailFormProps) {
  const [state, formAction, isPending] = useActionState(
    confirmEmailAction,
    initialState,
  );
  const [resendState, resendAction, isResending] = useActionState(
    resendConfirmEmailAction,
    initialState,
  );

  // If we arrived from the email link (code + email present), confirm automatically.
  const formRef = useRef<HTMLFormElement>(null);
  const autoSubmitted = useRef(false);
  useEffect(() => {
    if (!autoSubmitted.current && code && defaultEmail) {
      autoSubmitted.current = true;
      formRef.current?.requestSubmit();
    }
  }, [code, defaultEmail]);

  if (state.ok) {
    return (
      <div className="w-full max-w-md space-y-6 px-4 text-center">
        <span className="bg-primary/10 text-primary mx-auto flex size-12 items-center justify-center rounded-full">
          <CheckCircle2 className="size-6" />
        </span>
        <div>
          <h2 className="text-2xl font-bold">Email confirmed</h2>
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
        <span className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
          <MailCheck className="size-6" />
        </span>
        <h2 className="text-3xl font-bold">Confirm your email</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          {code
            ? "Confirming your email address…"
            : "Enter the code from your confirmation email."}
        </p>
      </div>

      <form ref={formRef} action={formAction} className="space-y-6" noValidate>
        {state.error ? (
          <p
            role="alert"
            className="border-destructive/50 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm"
          >
            {state.error}
          </p>
        ) : null}
        {resendState.message ? (
          <p
            role="status"
            className="border-primary/30 bg-primary/10 text-foreground rounded-md border px-3 py-2 text-sm"
          >
            {resendState.message}
          </p>
        ) : null}

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

        <div className="space-y-1">
          <Label htmlFor="code">Confirmation code</Label>
          <Input
            id="code"
            name="code"
            required
            defaultValue={code}
            placeholder="Paste the code from your email"
            aria-invalid={Boolean(state.fieldErrors?.code)}
          />
          {state.fieldErrors?.code ? (
            <p className="text-destructive text-sm">{state.fieldErrors.code}</p>
          ) : null}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Confirming…" : "Confirm email"}
        </Button>
      </form>

      <form
        action={resendAction}
        className="text-muted-foreground text-center text-sm"
      >
        <input type="hidden" name="email" defaultValue={defaultEmail} />
        Didn&apos;t get the email?{" "}
        <button
          type="submit"
          disabled={isResending || !defaultEmail}
          className="text-foreground font-medium underline underline-offset-2 disabled:opacity-50"
        >
          {isResending ? "Resending…" : "Resend"}
        </button>
        <div className="mt-4">
          <Link href="/login" className="underline">
            Back to sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
