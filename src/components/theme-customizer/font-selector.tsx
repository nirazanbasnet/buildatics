"use client";

import { FONTS } from "@/lib/themes";
import { useThemeConfig } from "@src/components/active-theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FONT_CLASS: Record<string, string> = {
  default: "font-sans",
  inter: "font-[var(--font-inter)]",
  geist: "font-[var(--font-geist)]",
  roboto: "font-[var(--font-roboto)]",
  poppins: "font-[var(--font-poppins)]",
  montserrat: "font-[var(--font-montserrat)]",
  outfit: "font-[var(--font-outfit)]",
  "plus-jakarta-sans": "font-[var(--font-plus-jakarta-sans)]",
  "pt-sans": "font-[var(--font-pt-sans)]",
  "kumbh-sans": "font-[var(--font-kumbh-sans)]",
  "overpass-mono": "font-[var(--font-overpass-mono)]"
};

export function FontSelector() {
  const { theme, setTheme } = useThemeConfig();

  return (
    <div className="flex flex-col gap-3">
      <Label>Font:</Label>
      <Select value={theme.font} onValueChange={(value) => setTheme({ ...theme, font: value })}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent align="end">
          {FONTS.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              <span className={FONT_CLASS[font.value] ?? "font-sans"}>{font.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
