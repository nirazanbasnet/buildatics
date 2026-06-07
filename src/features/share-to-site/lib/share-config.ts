import { FONTS, THEMES } from "@/lib/themes";

// Layout presets for the preview grid. `gridClassName` overrides DesignGrid's default column count
// (tailwind-merge lets the later class win), so the live preview re-flows per selection.
export const LAYOUT_OPTIONS = [
  { name: "3-column grid", value: "grid-3", gridClassName: "lg:grid-cols-3" },
  { name: "2-column grid", value: "grid-2", gridClassName: "lg:grid-cols-2" },
  {
    name: "Compact list",
    value: "list",
    gridClassName: "grid-cols-1 sm:grid-cols-1 lg:grid-cols-1",
  },
] as const;

export type LayoutId = (typeof LAYOUT_OPTIONS)[number]["value"];

// Re-exported so the controls and any consumer share one source of truth (src/lib/themes.ts).
export const FONT_OPTIONS = FONTS;
export const COLOR_OPTIONS = THEMES;

export type ShareConfig = {
  font: string;
  theme: string;
  layout: LayoutId;
};

export const DEFAULT_SHARE_CONFIG: ShareConfig = {
  font: "default",
  theme: "default",
  layout: "grid-3",
};

const LAYOUT_VALUES = new Set<string>(LAYOUT_OPTIONS.map((l) => l.value));
const FONT_VALUES = new Set<string>(FONT_OPTIONS.map((f) => f.value));
const THEME_VALUES = new Set<string>(COLOR_OPTIONS.map((t) => t.value));

export function gridClassNameFor(layout: LayoutId): string {
  return LAYOUT_OPTIONS.find((l) => l.value === layout)?.gridClassName ?? "";
}

// The Company's publicCompanyDesignStyle field is an opaque string; we store our config as JSON.
export function encodeShareConfig(config: ShareConfig): string {
  return JSON.stringify(config);
}

// Defensive decode: unknown/legacy/non-JSON values fall back to defaults (per field).
export function decodeShareConfig(raw: string | undefined | null): ShareConfig {
  if (!raw) return { ...DEFAULT_SHARE_CONFIG };
  try {
    const parsed = JSON.parse(raw) as Partial<ShareConfig>;
    return {
      font:
        parsed.font && FONT_VALUES.has(parsed.font)
          ? parsed.font
          : DEFAULT_SHARE_CONFIG.font,
      theme:
        parsed.theme && THEME_VALUES.has(parsed.theme)
          ? parsed.theme
          : DEFAULT_SHARE_CONFIG.theme,
      layout:
        parsed.layout && LAYOUT_VALUES.has(parsed.layout)
          ? (parsed.layout as LayoutId)
          : DEFAULT_SHARE_CONFIG.layout,
    };
  } catch {
    return { ...DEFAULT_SHARE_CONFIG };
  }
}
