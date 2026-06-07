export type ParsedIframe = {
  // The embed URL the iframe points at (used for the "Visit site" link).
  src: string;
  // The public data access token carried in the embed URL (powers the preview fetch).
  token: string;
};

// Extracts the embed src + public token from the iframe HTML returned by GetCompanyDesignsIFrame.
// Pure string parsing — no DOM, no innerHTML (the value is rendered as text, never as markup).
export function parseIframe(
  html: string | undefined | null,
): ParsedIframe | null {
  if (!html) return null;

  const srcMatch = html.match(/src\s*=\s*["']([^"']+)["']/i);
  const src = srcMatch?.[1];
  if (!src) return null;

  // The src may be relative or use HTML-encoded ampersands (&amp;) — normalise before parsing.
  const normalized = src.replace(/&amp;/g, "&");

  let token = "";
  try {
    const url = new URL(normalized, "https://placeholder.invalid");
    token = url.searchParams.get("token") ?? "";
  } catch {
    const tokenMatch = normalized.match(/[?&]token=([^&]+)/i);
    token = tokenMatch ? decodeURIComponent(tokenMatch[1]) : "";
  }

  return { src: normalized, token };
}
