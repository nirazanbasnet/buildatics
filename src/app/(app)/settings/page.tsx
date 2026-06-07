import { AccessDenied } from "@src/components/access-denied";
import { loadGuarded } from "@/features/auth/lib/guard";
import { RolesList, getPermissionOptions, getRoles } from "@/features/settings";
import { generateMeta } from "@/lib/utils";

export function generateMetadata() {
  return generateMeta({
    title: "Settings — Roles",
    description: "Manage roles and their module permissions.",
    canonical: "/settings",
  });
}

export default async function SettingsRolesPage() {
  const result = await loadGuarded(() =>
    Promise.all([getRoles(), getPermissionOptions()]),
  );
  if (!result.ok) {
    return (
      <AccessDenied
        title="No access to roles"
        description="Your account doesn't have permission to manage roles. Contact an administrator if you need access."
      />
    );
  }
  const [roles, permissionOptions] = result.data;
  return <RolesList roles={roles} permissionOptions={permissionOptions} />;
}
