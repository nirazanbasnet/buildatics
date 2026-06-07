"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { createRole, updateRole } from "../actions/role-actions";
import type { PermissionOption, RoleRow } from "../lib/get-roles";

type RoleFormSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: RoleRow | null; // null = create
  permissionOptions: PermissionOption[];
  onSaved?: () => void;
};

export function RoleFormSheet({
  open,
  onOpenChange,
  role,
  permissionOptions,
  onSaved,
}: RoleFormSheetProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    setName(role?.name ?? "");
    setDescription(role?.description ?? "");
    setSelected(new Set(role?.moduleAppRoleIds ?? []));
  }, [open, role]);

  // Group the permission catalog by module for a readable picker.
  const groups = useMemo(() => {
    const byModule = new Map<string, PermissionOption[]>();
    for (const opt of permissionOptions) {
      const list = byModule.get(opt.moduleType) ?? [];
      list.push(opt);
      byModule.set(opt.moduleType, list);
    }
    return Array.from(byModule.entries());
  }, [permissionOptions]);

  function toggle(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function submit() {
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    const moduleAppRoleIds = Array.from(selected);
    startTransition(async () => {
      const res = role
        ? await updateRole(role.id, {
            name,
            description,
            moduleAppRoleIds,
            currentIds: role.moduleAppRoleIds,
          })
        : await createRole({ name, description, moduleAppRoleIds });
      if (res.ok) {
        toast.success(role ? "Role updated" : "Role created");
        onOpenChange(false);
        onSaved?.();
      } else {
        toast.error(res.error ?? "Failed to save the role.");
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
          <SheetTitle>{role ? "Edit role" : "Add role"}</SheetTitle>
          <SheetDescription className="sr-only">
            Set the role name and its module permissions.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
          <div className="space-y-1.5">
            <Label htmlFor="role-name">Name</Label>
            <Input
              id="role-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Project Manager"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="role-desc">Description</Label>
            <Textarea
              id="role-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </div>

          <div className="space-y-2">
            <Label>Permissions</Label>
            {groups.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No permissions available.
              </p>
            ) : (
              <div className="space-y-4">
                {groups.map(([moduleType, opts]) => (
                  <div key={moduleType} className="space-y-1.5">
                    <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                      {moduleType}
                    </p>
                    {opts.map((opt) => (
                      <label
                        key={opt.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Checkbox
                          checked={selected.has(opt.id)}
                          onCheckedChange={(v) => toggle(opt.id, v === true)}
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            )}
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
            {isPending ? "Saving…" : role ? "Save changes" : "Create role"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
