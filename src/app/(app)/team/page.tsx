import { getRoleOptions, getTeamMembers, TeamList } from "@/features/team";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Team & Roles",
    description: "Manage team members, roles and invites.",
    canonical: "/team"
  });
}

export default async function TeamPage() {
  const [members, roles] = await Promise.all([getTeamMembers(), getRoleOptions()]);

  return <TeamList initialMembers={members} roles={roles} />;
}
