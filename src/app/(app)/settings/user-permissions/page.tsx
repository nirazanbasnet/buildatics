import { AccessDenied } from "@src/components/access-denied";
import { loadGuarded } from "@/features/auth/lib/guard";
import {
  UserPermissionsList,
  getDesignationOptions,
  getStaff,
} from "@/features/settings";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Settings — User Permissions",
    description: "Manage staff users, their roles and permissions.",
    canonical: "/settings/user-permissions",
  });
}

export default async function UserPermissionsPage() {
  const result = await loadGuarded(() =>
    Promise.all([getStaff(), getDesignationOptions()]),
  );
  if (!result.ok) {
    return (
      <AccessDenied
        title="No access to user permissions"
        description="Your account doesn't have permission to manage staff. Contact an administrator if you need access."
      />
    );
  }
  const [staff, designations] = result.data;
  return <UserPermissionsList staff={staff} designations={designations} />;
}
