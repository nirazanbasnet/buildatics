"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateProfile } from "../actions/update-profile";
import type { UserProfileRes } from "../lib/dto";
import {
  profileDetailsSchema,
  type ProfileDetailsInput,
} from "../lib/profile-form-schema";
import { STATE_OPTIONS, STATE_UNSET } from "../lib/state-options";

type ProfileDetailsFormProps = {
  profile: UserProfileRes;
  // Current 2FA state is owned by the Security section; pass it through so a details save preserves it.
  emailOtp2FAEnabled: boolean;
};

function toDefaults(profile: UserProfileRes): ProfileDetailsInput {
  const address = profile.address ?? undefined;
  return {
    firstName: profile.firstName ?? "",
    middleName: profile.middleName ?? "",
    lastName: profile.lastName ?? "",
    phoneNumber: profile.phoneNumber ?? "",
    street: address?.street ?? "",
    suburb: address?.suburb ?? "",
    city: address?.city ?? "",
    areaCode: address?.areaCode ?? "",
    state: address?.state != null ? String(address.state) : STATE_UNSET,
  };
}

export function ProfileDetailsForm({
  profile,
  emailOtp2FAEnabled,
}: ProfileDetailsFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ProfileDetailsInput>({
    resolver: zodResolver(profileDetailsSchema),
    defaultValues: toDefaults(profile),
  });

  function onSubmit(values: ProfileDetailsInput) {
    startTransition(async () => {
      const res = await updateProfile(values, emailOtp2FAEnabled);
      if (res.ok) {
        toast.success("Profile updated");
        form.reset(values);
        return;
      }
      if (res.fieldErrors?.firstName) {
        form.setError("firstName", { message: res.fieldErrors.firstName });
      }
      if (res.error) toast.error(res.error);
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle name</FormLabel>
                <FormControl>
                  <Input placeholder="Middle name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input value={profile.email ?? ""} disabled readOnly />
            </FormControl>
          </FormItem>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Address</h3>
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="Street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FormField
              control={form.control}
              name="suburb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suburb</FormLabel>
                  <FormControl>
                    <Input placeholder="Suburb" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={STATE_UNSET}>— None —</SelectItem>
                      {STATE_OPTIONS.map((s) => (
                        <SelectItem key={s.value} value={String(s.value)}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="areaCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode</FormLabel>
                  <FormControl>
                    <Input placeholder="Postcode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            A postcode is required to save an address.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset(toDefaults(profile))}
            disabled={isPending || !form.formState.isDirty}
          >
            Reset
          </Button>
          <Button type="submit" disabled={isPending || !form.formState.isDirty}>
            {isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
