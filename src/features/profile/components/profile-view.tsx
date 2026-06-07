"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateAvatarFallback } from "@/lib/utils";

import type { UserProfileRes } from "../lib/dto";
import { ProfileDetailsForm } from "./profile-details-form";
import { SecuritySection } from "./security-section";

type ProfileViewProps = {
  profile: UserProfileRes;
};

export function ProfileView({ profile }: ProfileViewProps) {
  const name =
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    profile.email ||
    "Your profile";
  const initials =
    generateAvatarFallback(name) ||
    (profile.email?.charAt(0).toUpperCase() ?? "U");
  const roles = profile.roles ?? [];

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar className="size-14">
          <AvatarFallback className="rounded-lg text-lg">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{name}</h1>
          <p className="text-muted-foreground text-sm">{profile.email}</p>
          {roles.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {roles.map((role) => (
                <Badge key={role} variant="secondary">
                  {role}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <Tabs defaultValue="personal">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal details</CardTitle>
              <CardDescription>
                Update your name, contact number and address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileDetailsForm
                profile={profile}
                emailOtp2FAEnabled={profile.emailOtp2FAEnabled ?? false}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="mt-6">
          <SecuritySection profile={profile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
