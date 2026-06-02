"use client";

import { useThemeConfig } from "@src/components/active-theme";
import { Button } from "@/components/ui/button";
import { clearCustomTheme, removeCustomTheme } from "@/lib/custom-theme";
import { DEFAULT_THEME } from "@/lib/themes";

export function ResetThemeButton() {
  const { setTheme } = useThemeConfig();

  const resetThemeHandle = () => {
    setTheme(DEFAULT_THEME);
    removeCustomTheme();
    clearCustomTheme();
  };

  return (
    <Button className="mt-4 w-full" onClick={resetThemeHandle}>
      Reset to Default
    </Button>
  );
}
