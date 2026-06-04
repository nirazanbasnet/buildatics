"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { updateProfile } from "../actions/update-profile";
import type { UserProfileRes } from "../lib/dto";
import { ChangePasswordForm } from "./change-password-form";

type SecuritySectionProps = {
  profile: UserProfileRes;
};

// Persisting the 2FA toggle reuses UserProfile/Update (no dedicated endpoint), so we resend the
// current name/phone alongside the new flag to avoid clobbering them.
export function SecuritySection({ profile }: SecuritySectionProps) {
  const [twoFactor, setTwoFactor] = useState(profile.emailOtp2FAEnabled ?? false);
  const [isPending, startTransition] = useTransition();

  function onToggle(next: boolean) {
    const previous = twoFactor;
    setTwoFactor(next);
    startTransition(async () => {
      const res = await updateProfile(
        {
          firstName: profile.firstName ?? "",
          middleName: profile.middleName ?? "",
          lastName: profile.lastName ?? "",
          phoneNumber: profile.phoneNumber ?? "",
          street: profile.address?.street ?? "",
          suburb: profile.address?.suburb ?? "",
          city: profile.address?.city ?? "",
          areaCode: profile.address?.areaCode ?? "",
          state: profile.address?.state != null ? String(profile.address.state) : undefined
        },
        next
      );
      if (res.ok) {
        toast.success(next ? "Two-factor authentication enabled" : "Two-factor authentication disabled");
      } else {
        setTwoFactor(previous);
        toast.error(res.error ?? "Failed to update two-factor authentication.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Two-factor authentication</CardTitle>
          <CardDescription>
            Require a one-time code sent to your email when signing in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="email-otp-2fa">Email OTP</Label>
              <p className="text-muted-foreground text-sm">
                Send a verification code to {profile.email ?? "your email"} on login.
              </p>
            </div>
            <Switch
              id="email-otp-2fa"
              checked={twoFactor}
              onCheckedChange={onToggle}
              disabled={isPending}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>Update the password you use to sign in.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
