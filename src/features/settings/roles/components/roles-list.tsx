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

import { deleteRole } from "../actions/role-actions";
import type { PermissionOption, RoleRow } from "../lib/get-roles";
import { NoApiData } from "../../components/no-api-data";
import { PermissionBadges } from "./permission-badges";
import { RoleFormSheet } from "./role-form-sheet";

type RolesListProps = {
  roles: RoleRow[];
  permissionOptions: PermissionOption[];
};

export function RolesList({ roles, permissionOptions }: RolesListProps) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<RoleRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RoleRow | null>(null);
  const [isPending, startTransition] = useTransition();

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }
  function openEdit(role: RoleRow) {
    setEditing(role);
    setFormOpen(true);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    startTransition(async () => {
      const res = await deleteRole(target.id);
      if (res.ok) {
        toast.success("Role deleted");
        setDeleteTarget(null);
        router.refresh();
      } else {
        toast.error(res.error ?? "Failed to delete the role.");
      }
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <p className="text-muted-foreground text-sm tabular-nums">
          {roles.length} {roles.length === 1 ? "role" : "roles"}
        </p>
        <Button size="sm" className="h-9" onClick={openAdd}>
          <Plus className="size-4" />
          Add Role
        </Button>
      </div>

      <div className="bg-card overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="pl-4 font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Permissions</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="pr-4 text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground h-24 text-center"
                >
                  No roles yet.
                </TableCell>
              </TableRow>
            ) : (
              roles.map((role, index) => (
                <MotionTableRow key={role.id} index={index}>
                  <TableCell className="text-foreground py-3 pl-4 font-medium">
                    {role.name}
                  </TableCell>
                  <TableCell>
                    <PermissionBadges permissions={role.permissions} max={3} />
                  </TableCell>
                  <TableCell>
                    <NoApiData />
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          aria-label={`Actions for ${role.name}`}
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-40">
                        <DropdownMenuItem onSelect={() => openEdit(role)}>
                          <Pencil />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={() => setDeleteTarget(role)}
                        >
                          <Trash2 />
                          Delete
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

      <RoleFormSheet
        open={formOpen}
        onOpenChange={setFormOpen}
        role={editing}
        permissionOptions={permissionOptions}
        onSaved={() => router.refresh()}
      />

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this role?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? `${deleteTarget.name} will be removed. This fails if it's still assigned to users.`
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
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
