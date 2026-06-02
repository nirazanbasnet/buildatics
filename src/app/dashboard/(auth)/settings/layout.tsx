import { SettingsNav } from "./_components/settings-nav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col space-y-6 overflow-auto">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and set preferences.</p>
      </div>
      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="shrink-0 lg:w-56">
          <SettingsNav />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
