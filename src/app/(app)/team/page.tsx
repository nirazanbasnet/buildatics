import { AccessDenied } from "@src/components/access-denied";
import { loadGuarded } from "@/features/auth/lib/guard";
import { getRoleOptions, getTeamMembers, TeamList } from "@/features/team";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Team & Roles",
    description: "Manage team members, roles and invites.",
    canonical: "/team",
  });
}

export default async function TeamPage() {
  const result = await loadGuarded(() =>
    Promise.all([getTeamMembers(), getRoleOptions()]),
  );
  if (!result.ok) {
    return (
      <AccessDenied
        title="No access to team"
        description="Your account doesn't have permission to manage the team. Contact an administrator if you need access."
      />
    );
  }
  const [members, roles] = result.data;

  return <TeamList initialMembers={members} roles={roles} />;
}
