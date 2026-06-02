import { FONTS, THEMES } from "@/lib/themes";

import type { VariantId } from "../../display-center/_components/variant-layouts";

export type ShareConfig = {
  font: string;
  style: VariantId;
  color: string;
};

export const DEFAULT_SHARE_CONFIG: ShareConfig = {
  font: "default",
  style: 7,
  color: "default"
};

export const FONT_OPTIONS = FONTS;
export const COLOR_OPTIONS = THEMES;

export const STYLE_OPTIONS: { name: string; value: VariantId }[] = [
  { name: "Spec grid", value: 7 },
  { name: "3-column grid", value: 1 },
  { name: "Showcase", value: 6 },
  { name: "Compact list", value: 5 }
];

export function buildEmbedSrc(config: ShareConfig): string {
  const params = new URLSearchParams({
    layout: String(config.style),
    font: config.font,
    theme: config.color
  });
  return `https://buildatics-frontend.vercel.app/embed/display-center?${params.toString()}`;
}

export function buildIframeCode(config: ShareConfig): string {
  return `<iframe
  src="${buildEmbedSrc(config)}"
  width="100%"
  height="900"
  style="border:0;border-radius:12px"
  loading="lazy"
  title="Buildatics Display Center"
></iframe>`;
}
