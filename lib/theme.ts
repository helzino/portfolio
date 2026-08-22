import type { ThemePreference } from "@/config/types";

export const THEME_STORAGE_KEY = "hw:theme";

/**
 * The script that runs before anything is painted.
 *
 * It resolves the theme from (1) the visitor's saved choice, (2) their
 * operating system if the site is configured to follow it, or (3) the
 * configured default, and stamps it on <html>. Doing this synchronously in the
 * document is what stops a dark page flashing before a light one.
 */
export function themeScript(preference: ThemePreference): string {
  return `(function(){try{
var d=document.documentElement;
var saved=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
var theme=saved==="light"||saved==="dark"?saved:${JSON.stringify(preference)};
if(theme==="system"){theme=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}
d.dataset.theme=theme;
}catch(e){document.documentElement.dataset.theme=${JSON.stringify(
    preference === "light" ? "light" : "dark"
  )};}})();`;
}
