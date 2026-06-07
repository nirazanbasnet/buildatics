"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { inviteStaff, updateStaff } from "../actions/staff-actions";
import type { DesignationOption, StaffRow } from "../lib/get-staff";

const DESIGNATION_NONE = "none";

type StaffFormSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: StaffRow | null; // null = invite
  designations: DesignationOption[];
  onSaved?: () => void;
};

export function StaffFormSheet({
  open,
  onOpenChange,
  staff,
  designations,
  onSaved,
}: StaffFormSheetProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designationId, setDesignationId] = useState(DESIGNATION_NONE);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    setFirstName(staff?.firstName ?? "");
    setLastName(staff?.lastName ?? "");
    setEmail(staff?.email === "—" ? "" : (staff?.email ?? ""));
    setPhone(staff?.phoneNumber ?? "");
    setDesignationId(staff?.designationIds[0] ?? DESIGNATION_NONE);
  }, [open, staff]);

  function submit() {
    if (!firstName.trim()) {
      toast.error("First name is required.");
      return;
    }
    const chosen =
      designationId === DESIGNATION_NONE ? undefined : designationId;
    startTransition(async () => {
      let res;
      if (staff) {
        const current = new Set(staff.designationIds);
        const add = chosen && !current.has(chosen) ? [chosen] : [];
        // Replace single designation: remove others not chosen.
        const remove = staff.designationIds.filter((id) => id !== chosen);
        res = await updateStaff(staff.id, {
          firstName,
          lastName,
          phoneNumber: phone,
          email,
          addDesignationIds: add,
          removeDesignationIds: remove,
        });
      } else {
        if (!email.trim()) {
          toast.error("Email is required.");
          return;
        }
        res = await inviteStaff({
          firstName,
          lastName,
          phoneNumber: phone,
          email,
          designationId: chosen,
        });
      }
      if (res.ok) {
        toast.success(staff ? "User updated" : "Invitation sent");
        onOpenChange(false);
        onSaved?.();
      } else {
        toast.error(res.error ?? "Failed to save the user.");
      }
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b">
          <SheetTitle>{staff ? "Edit user" : "Add user"}</SheetTitle>
          <SheetDescription className="sr-only">
            {staff
              ? "Update the user and their role."
              : "Invite a new staff user and assign a role."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="sf-first">First name</Label>
              <Input
                id="sf-first"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sf-last">Last name</Label>
              <Input
                id="sf-last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sf-email">Email</Label>
            <Input
              id="sf-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={Boolean(staff?.emailConfirmed)}
            />
            {staff?.emailConfirmed ? (
              <p className="text-muted-foreground text-xs">
                Email can&apos;t be changed once the user has confirmed it.
              </p>
            ) : null}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sf-phone">Phone</Label>
            <Input
              id="sf-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Role (designation)</Label>
            <Select value={designationId} onValueChange={setDesignationId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={DESIGNATION_NONE}>— None —</SelectItem>
                {designations.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t px-4 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={submit} disabled={isPending}>
            {isPending ? "Saving…" : staff ? "Save changes" : "Send invite"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
