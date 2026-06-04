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
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { changeRole } from "../actions/change-role";
import { ROLE_NONE } from "../lib/team-form-schema";
import type { RoleOption, TeamMemberRow } from "../types";

type ChangeRoleDialogProps = {
  member: TeamMemberRow | null;
  roles: RoleOption[];
  onOpenChange: (open: boolean) => void;
  onChanged: () => void;
};

export function ChangeRoleDialog({ member, roles, onOpenChange, onChanged }: ChangeRoleDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [roleId, setRoleId] = useState(ROLE_NONE);

  useEffect(() => {
    if (member) setRoleId(member.designationIds[0] ?? ROLE_NONE);
  }, [member]);

  function onSave() {
    if (!member) return;
    startTransition(async () => {
      const res = await changeRole(member.id, roleId, member.designationIds);
      if (res.ok) {
        toast.success(res.message ?? "Role updated");
        onOpenChange(false);
        onChanged();
      } else {
        toast.error(res.error ?? "Failed to update the role.");
      }
    });
  }

  return (
    <Dialog open={member !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change role</DialogTitle>
          <DialogDescription>Set the company role for {member?.name}.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="role-select">Role</Label>
          <Select value={roleId} onValueChange={setRoleId}>
            <SelectTrigger id="role-select" className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ROLE_NONE}>— No role —</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {roles.length === 0 ? (
            <p className="text-muted-foreground text-xs">
              No roles defined yet. Create designations to assign roles to members.
            </p>
          ) : null}
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
          <Button type="button" onClick={onSave} disabled={isPending}>
            {isPending ? "Saving…" : "Save role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
