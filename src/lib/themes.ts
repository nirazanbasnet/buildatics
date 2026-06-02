export const DEFAULT_THEME = {
  preset: "default",
  radius: "default",
  scale: "none",
  contentLayout: "full",
  font: "default",
  sidebarMode: "inset"
} as const;

export type ThemeType = {
  preset: string;
  radius: string;
  scale: string;
  contentLayout: string;
  font: string;
  sidebarMode: string;
};

export const FONTS = [
  { name: "Default", value: "default" },
  { name: "Inter", value: "inter" },
  { name: "Geist", value: "geist" },
  { name: "Roboto", value: "roboto" },
  { name: "Poppins", value: "poppins" },
  { name: "Montserrat", value: "montserrat" },
  { name: "Outfit", value: "outfit" },
  { name: "Plus Jakarta Sans", value: "plus-jakarta-sans" },
  { name: "PT Sans", value: "pt-sans" },
  { name: "Kumbh Sans", value: "kumbh-sans" },
  { name: "Overpass Mono", value: "overpass-mono" }
];

export const SIDEBAR_MODES = [
  { name: "Inset", value: "inset" },
  { name: "Floating", value: "floating" },
  { name: "Icon", value: "icon" }
];

export const THEMES = [
  {
    name: "Default",
    value: "default",
    colors: ["oklch(0.33 0 0)"]
  },
  {
    name: "Underground",
    value: "underground",
    colors: ["oklch(0.5315 0.0694 156.19)"]
  },
  {
    name: "Rose Garden",
    value: "rose-garden",
    colors: ["oklch(0.5827 0.2418 12.23)"]
  },
  {
    name: "Lake View",
    value: "lake-view",
    colors: ["oklch(0.765 0.177 163.22)"]
  },
  {
    name: "Sunset Glow",
    value: "sunset-glow",
    colors: ["oklch(0.5827 0.2187 36.98)"]
  },
  {
    name: "Forest Whisper",
    value: "forest-whisper",
    colors: ["oklch(0.5276 0.1072 182.22)"]
  },
  {
    name: "Ocean Breeze",
    value: "ocean-breeze",
    colors: ["oklch(0.59 0.20 277.12)"]
  },
  {
    name: "Lavender Dream",
    value: "lavender-dream",
    colors: ["oklch(0.71 0.16 293.54)"]
  }
];
