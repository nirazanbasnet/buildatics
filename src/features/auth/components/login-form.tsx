"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import { ArrowLeft, GithubIcon, MailCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { loginAction } from "../actions/login";
import { TERMS_URL } from "../lib/terms";
import type { LoginFormState } from "../types";

const initialState: LoginFormState = { ok: false };

const OTP_LENGTH = 6;

function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return email;
  const head = user.slice(0, 2);
  return `${head}${"•".repeat(Math.max(1, user.length - head.length))}@${domain}`;
}

type LoginFormProps = {
  className?: string;
};

export function LoginForm({ className }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Credentials are held in state so they can be submitted as hidden fields on the OTP step.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [code, setCode] = useState("");

  // Local step mirrors the API's 2FA signal but lets the user go back to credentials.
  const [step, setStep] = useState<"credentials" | "otp">("credentials");

  useEffect(() => {
    if (state.requiresTwoFactor) setStep("otp");
  }, [state.requiresTwoFactor]);

  const isOtp = step === "otp";

  function backToCredentials() {
    setStep("credentials");
    setCode("");
  }

  // Resend = submit again without a code so the API issues a fresh one.
  function resend() {
    flushSync(() => setCode(""));
    formRef.current?.requestSubmit();
  }

  return (
    <div
      className={cn("w-full max-w-md space-y-8 px-4", className)}
      data-slot="login-form"
    >
      {!isOtp ? (
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Please sign in to your account
          </p>
        </div>
      ) : null}

      <form
        ref={formRef}
        action={formAction}
        className="mt-8 space-y-6"
        noValidate
      >
        {state.error ? (
          <p
            role="alert"
            className="border-destructive/50 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm"
          >
            {state.error}
          </p>
        ) : null}

        {isOtp ? (
          // ---------- Step 2: verification code ----------
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <span className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-full">
                <MailCheck className="size-6" />
              </span>
              <h2 className="text-2xl font-bold">Check your email</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                We&apos;ve sent a verification code to
                <br />
                <span className="text-foreground font-medium">
                  {maskEmail(email)}
                </span>
              </p>
            </div>

            {state.notice ? (
              <p
                role="status"
                className="border-primary/30 bg-primary/10 text-foreground rounded-md border px-3 py-2 text-center text-sm"
              >
                {state.notice}
              </p>
            ) : null}

            {/* Hidden carry-over so the API still receives credentials + accepted terms. */}
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="password" value={password} />
            <input
              type="hidden"
              name="acceptTerms"
              value={acceptTerms ? "on" : ""}
            />

            <div className="flex flex-col items-center gap-2">
              <Label htmlFor="emailOtpCode" className="sr-only">
                Verification code
              </Label>
              <InputOTP
                id="emailOtpCode"
                name="emailOtpCode"
                maxLength={OTP_LENGTH}
                value={code}
                onChange={setCode}
                containerClassName="justify-center"
                aria-invalid={Boolean(state.fieldErrors?.emailOtpCode)}
              >
                <InputOTPGroup>
                  {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="size-11 text-base"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              {state.fieldErrors?.emailOtpCode ? (
                <p className="text-destructive text-sm">
                  {state.fieldErrors.emailOtpCode}
                </p>
              ) : null}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isPending || code.length < OTP_LENGTH}
            >
              {isPending ? "Verifying…" : "Verify & sign in"}
            </Button>

            <div className="text-muted-foreground text-center text-sm">
              Didn&apos;t receive the code?{" "}
              <button
                type="button"
                onClick={resend}
                disabled={isPending}
                className="text-foreground font-medium underline underline-offset-2 disabled:opacity-50"
              >
                Resend code
              </button>
            </div>

            <button
              type="button"
              onClick={backToCredentials}
              className="text-muted-foreground hover:text-foreground mx-auto flex items-center gap-1.5 text-sm"
            >
              <ArrowLeft className="size-4" />
              Use a different email
            </button>
          </div>
        ) : (
          // ---------- Step 1: credentials ----------
          <>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(state.fieldErrors?.email)}
                  className="w-full"
                  placeholder="Email address"
                />
                {state.fieldErrors?.email ? (
                  <p className="text-destructive text-sm">
                    {state.fieldErrors.email}
                  </p>
                ) : null}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={Boolean(state.fieldErrors?.password)}
                  className="w-full"
                  placeholder="Password"
                />
                {state.fieldErrors?.password ? (
                  <p className="text-destructive text-sm">
                    {state.fieldErrors.password}
                  </p>
                ) : null}
              </div>
              <div className="text-end">
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <label className="text-muted-foreground flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="accent-primary mt-0.5 size-4"
                />
                <span>
                  I accept the{" "}
                  <a
                    href={TERMS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground underline"
                  >
                    Terms &amp; Conditions
                  </a>
                </span>
              </label>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing in…" : "Sign in"}
              </Button>
            </div>
          </>
        )}
      </form>

      {!isOtp ? (
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <div className="w-full border-t" />
            <span className="text-muted-foreground shrink-0 text-sm">
              or continue with
            </span>
            <div className="w-full border-t" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full"
              disabled
              title="Coming soon"
            >
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              disabled
              title="Coming soon"
            >
              <GithubIcon />
              GitHub
            </Button>
          </div>

          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/dashboard/register/v1" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
