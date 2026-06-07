"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MotionTableRow } from "@src/components/ui/motion-table-row";

import { deleteStaff } from "../actions/staff-actions";
import type { DesignationOption, StaffRow } from "../lib/get-staff";
import { NoApiData } from "../../components/no-api-data";
import { PermissionBadges } from "../../roles/components/permission-badges";
import { StaffFormSheet } from "./staff-form-sheet";

type Props = {
  staff: StaffRow[];
  designations: DesignationOption[];
};

export function UserPermissionsList({ staff, designations }: Props) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<StaffRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StaffRow | null>(null);
  const [isPending, startTransition] = useTransition();

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(s: StaffRow) {
    setEditing(s);
    setFormOpen(true);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    startTransition(async () => {
      const res = await deleteStaff(target.id);
      if (res.ok) {
        toast.success("User removed");
        setDeleteTarget(null);
        router.refresh();
      } else {
        toast.error(res.error ?? "Failed to remove the user.");
      }
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <p className="text-muted-foreground text-sm tabular-nums">
          {staff.length} {staff.length === 1 ? "user" : "users"}
        </p>
        <Button size="sm" className="h-9" onClick={openAdd}>
          <Plus className="size-4" />
          Add User
        </Button>
      </div>

      <div className="bg-card overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="pl-4 font-semibold">User</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Permissions</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="pr-4 text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground h-24 text-center"
                >
                  No users yet.
                </TableCell>
              </TableRow>
            ) : (
              staff.map((user, index) => (
                <MotionTableRow key={user.id} index={index}>
                  <TableCell className="text-foreground py-3 pl-4 font-medium">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.roles.length ? (
                      user.roles.join(", ")
                    ) : (
                      <NoApiData label="No role" />
                    )}
                  </TableCell>
                  <TableCell>
                    <PermissionBadges permissions={user.permissions} max={2} />
                  </TableCell>
                  <TableCell>
                    {user.emailConfirmed ? (
                      <Badge variant="secondary">Confirmed</Badge>
                    ) : (
                      <Badge variant="outline">Invited</Badge>
                    )}
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={`Actions for ${user.name}`}
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-40">
                        <DropdownMenuItem onSelect={() => openEdit(user)}>
                          <Pencil />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={() => setDeleteTarget(user)}
                        >
                          <Trash2 />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </MotionTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <StaffFormSheet
        open={formOpen}
        onOpenChange={setFormOpen}
        staff={editing}
        designations={designations}
        onSaved={() => router.refresh()}
      />

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this user?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `${deleteTarget.name} will be removed from the company.`
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={isPending}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
