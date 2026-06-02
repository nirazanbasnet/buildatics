import { roles } from "./_data";
import { RolesTable } from "./_components/roles-table";
import { SettingsToolbar } from "./_components/settings-toolbar";

export default function SettingsRolesPage() {
  return (
    <div>
      <SettingsToolbar addLabel="Add Role" />
      <RolesTable roles={roles} />
    </div>
  );
}
