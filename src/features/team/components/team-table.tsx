"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { generateAvatarFallback } from "@/lib/utils";

import type { TeamMemberRow } from "../types";
import { TeamMemberActions } from "./team-member-actions";

type TeamTableProps = {
  members: TeamMemberRow[];
  onChangeRole: (member: TeamMemberRow) => void;
  onChanged: () => void;
};

export function TeamTable({ members, onChangeRole, onChanged }: TeamTableProps) {
  return (
    <div className="bg-card overflow-hidden rounded-lg border" data-slot="team-table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="rounded-full text-xs">
                      {generateAvatarFallback(member.name) || member.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{member.name}</p>
                    <p className="text-muted-foreground truncate text-sm">{member.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {member.systemRoles.map((role) => (
                    <Badge key={`sys-${role}`} variant="default">
                      {role}
                    </Badge>
                  ))}
                  {member.designationNames.map((role) => (
                    <Badge key={`des-${role}`} variant="secondary">
                      {role}
                    </Badge>
                  ))}
                  {member.systemRoles.length === 0 && member.designationNames.length === 0 ? (
                    <span className="text-muted-foreground">No role</span>
                  ) : null}
                </div>
              </TableCell>
              <TableCell>
                {member.status === "active" ? (
                  <Badge variant="success">Active</Badge>
                ) : (
                  <Badge variant="warning">Invited</Badge>
                )}
              </TableCell>
              <TableCell>
                <TeamMemberActions
                  member={member}
                  onChangeRole={onChangeRole}
                  onChanged={onChanged}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
