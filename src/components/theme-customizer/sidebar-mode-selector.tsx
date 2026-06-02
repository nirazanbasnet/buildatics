"use client";

import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SIDEBAR_MODES } from "@/lib/themes";
import { useThemeConfig } from "@src/components/active-theme";

export function SidebarModeSelector() {
  const { theme, setTheme } = useThemeConfig();

  return (
    <div className="hidden flex-col gap-3 lg:flex">
      <Label>Sidebar mode:</Label>
      <ToggleGroup
        className="w-full"
        type="single"
        value={theme.sidebarMode}
        onValueChange={(value) => {
          if (!value) return;
          setTheme({ ...theme, sidebarMode: value });
        }}
      >
        {SIDEBAR_MODES.map((mode) => (
          <ToggleGroupItem key={mode.value} variant="outline" className="grow" value={mode.value}>
            {mode.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
