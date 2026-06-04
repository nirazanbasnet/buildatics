"use server";

import { getTeamMembers } from "../lib/get-team";
import type { TeamMemberRow } from "../types";

// Server Action (BFF): the team list calls this to re-fetch members after a mutation.
export async function queryTeam(): Promise<TeamMemberRow[]> {
  return getTeamMembers();
}
