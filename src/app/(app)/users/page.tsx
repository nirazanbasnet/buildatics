import { ShieldAlert } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty";
import { getProfile } from "@/features/profile";
import { getUsersPage, UsersList, USERS_PAGE_SIZE } from "@/features/users";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Users",
    description: "Manage user accounts and access.",
    canonical: "/users"
  });
}

export default async function UsersPage() {
  // Defense in depth: the UsersA API enforces the Admin role (403 otherwise), and we also gate the
  // page here so non-admins get a clear message instead of a failed data fetch.
  const profile = await getProfile();
  const isAdmin = (profile.roles ?? []).includes("Admin");

  if (!isAdmin) {
    return (
      <Empty className="h-full">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShieldAlert />
          </EmptyMedia>
          <EmptyTitle>Admins only</EmptyTitle>
          <EmptyDescription>
            You need the Admin role to manage users. Contact an administrator if you need access.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const initial = await getUsersPage(1, USERS_PAGE_SIZE);

  return <UsersList initial={initial} pageSize={USERS_PAGE_SIZE} />;
}
