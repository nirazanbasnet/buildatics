"use client";

import { useState } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  PresetSelector,
  SidebarModeSelector,
  ThemeScaleSelector,
  ColorModeSelector,
  ContentLayoutSelector,
  ThemeRadiusSelector,
  ResetThemeButton,
  FontSelector,
  CustomThemeDialog
} from "@src/components/theme-customizer/index";
import { useIsMobile } from "@/hooks/use-mobile";

export function ThemeCustomizerPanel() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [customThemeOpen, setCustomThemeOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon-sm" variant="ghost">
            <Palette />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="me-4 w-80 p-4 shadow-xl lg:me-0"
          align={isMobile ? "center" : "end"}
        >
          <div className="grid space-y-4">
            <PresetSelector />
            <FontSelector />
            <ThemeScaleSelector />
            <ThemeRadiusSelector />
            <ColorModeSelector />
            <ContentLayoutSelector />
            <SidebarModeSelector />
            <Button
              variant="outline"
              size="sm"
              className="w-full dark:hover:text-white"
              onClick={() => {
                setMenuOpen(false);
                setCustomThemeOpen(true);
              }}
            >
              <Palette />
              Custom theme
            </Button>
          </div>
          <ResetThemeButton />
        </DropdownMenuContent>
      </DropdownMenu>
      <CustomThemeDialog open={customThemeOpen} onOpenChange={setCustomThemeOpen} />
    </>
  );
}
