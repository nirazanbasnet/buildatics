"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import type { UserRow } from "../types";
import { UserRowActions } from "./user-row-actions";

type UsersTableProps = {
  users: UserRow[];
  onChanged: () => void;
};

export function UsersTable({ users, onChanged }: UsersTableProps) {
  return (
    <div className="bg-card overflow-hidden rounded-lg border" data-slot="users-table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>2FA</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className={user.isDeleted ? "opacity-60" : undefined}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{user.email}</span>
                  {user.emailConfirmed ? (
                    <Badge variant="success">Confirmed</Badge>
                  ) : (
                    <Badge variant="warning">Unconfirmed</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {user.roles.length > 0 ? (
                    user.roles.map((role) => (
                      <Badge key={role} variant="secondary">
                        {role}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {user.twoFactorEnabled ? (
                  <Badge variant="info">On</Badge>
                ) : (
                  <span className="text-muted-foreground">Off</span>
                )}
              </TableCell>
              <TableCell>
                {user.isDeleted ? (
                  <Badge variant="destructive">Deleted</Badge>
                ) : user.isLocked ? (
                  <Badge variant="warning">Locked</Badge>
                ) : (
                  <Badge variant="outline">Active</Badge>
                )}
              </TableCell>
              <TableCell>
                <UserRowActions user={user} onChanged={onChanged} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
