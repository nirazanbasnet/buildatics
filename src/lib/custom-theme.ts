export const CUSTOM_THEME_STORAGE_KEY = "tweakcn-custom-css";
export const CUSTOM_THEME_STYLE_ID = "tweakcn-custom-theme";

/**
 * Injects raw theme CSS (e.g. the `:root` / `.dark` block copied from
 * tweakcn.com/community) into a dedicated <style> appended last to <head>, so
 * its custom-property overrides win over the build-time tokens.
 */
export function applyCustomTheme(css: string) {
  if (typeof document === "undefined") return;

  let style = document.getElementById(CUSTOM_THEME_STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = CUSTOM_THEME_STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = css;
}

export function clearCustomTheme() {
  if (typeof document === "undefined") return;
  document.getElementById(CUSTOM_THEME_STYLE_ID)?.remove();
}

export function loadCustomTheme(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
}

export function saveCustomTheme(css: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, css);
}

export function removeCustomTheme() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CUSTOM_THEME_STORAGE_KEY);
}
