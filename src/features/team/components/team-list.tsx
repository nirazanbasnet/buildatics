"use client";

import { useState, useTransition } from "react";
import { UserPlus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

import { queryTeam } from "../actions/query-team";
import type { RoleOption, TeamMemberRow } from "../types";
import { ChangeRoleDialog } from "./change-role-dialog";
import { InviteMemberSheet } from "./invite-member-sheet";
import { TeamTable } from "./team-table";

type TeamListProps = {
  initialMembers: TeamMemberRow[];
  roles: RoleOption[];
};

export function TeamList({ initialMembers, roles }: TeamListProps) {
  const [members, setMembers] = useState(initialMembers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [roleMember, setRoleMember] = useState<TeamMemberRow | null>(null);
  const [isPending, startTransition] = useTransition();

  function refresh() {
    startTransition(async () => {
      setMembers(await queryTeam());
    });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Team &amp; Roles</h1>
          <p className="text-muted-foreground text-sm">
            {members.length} {members.length === 1 ? "member" : "members"}
          </p>
        </div>
        <Button size="sm" className="h-9" onClick={() => setInviteOpen(true)}>
          <UserPlus className="size-4" />
          Invite member
        </Button>
      </div>

      {members.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Users />
            </EmptyMedia>
            <EmptyTitle>No team members yet</EmptyTitle>
            <EmptyDescription>Invite your first member to start building your team.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div
          className={cn(
            "transition-opacity duration-200",
            isPending && "pointer-events-none opacity-50"
          )}
        >
          <TeamTable members={members} onChangeRole={setRoleMember} onChanged={refresh} />
        </div>
      )}

      <InviteMemberSheet
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        roles={roles}
        onInvited={refresh}
      />
      <ChangeRoleDialog
        member={roleMember}
        roles={roles}
        onOpenChange={(o) => !o && setRoleMember(null)}
        onChanged={refresh}
      />
    </div>
  );
}
