import { settingsUsers } from "../_data";
import { SettingsToolbar } from "../_components/settings-toolbar";
import { UserPermissionsTable } from "../_components/user-permissions-table";

export default function UserPermissionsPage() {
  return (
    <div>
      <SettingsToolbar addLabel="Add User" />
      <UserPermissionsTable users={settingsUsers} />
    </div>
  );
}
