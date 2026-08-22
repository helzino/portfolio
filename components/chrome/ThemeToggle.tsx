"use client";

import { useEffect } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Switches the site between night and daylight.
 *
 * The active theme lives on <html> from before the first paint (see the inline
 * script in app/layout.tsx), and this button reads and writes it there. It
 * holds no React state of its own: the knob and the label are driven by CSS
 * from `:root[data-theme]`, which keeps the server and client markup identical
 * and means the control can never disagree with the page around it.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  useEffect(() => {
    // Colour crossfades are enabled only after the first paint, so the initial
    // render is never animated.
    document.documentElement.dataset.themeReady = "true";
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing: the choice simply lasts for this page view.
    }
  };

  return (
    <button
      type="button"
      className={`meta theme-toggle ${className}`.trim()}
      onClick={toggle}
      aria-label="Switch between the light and dark theme"
    >
      <span className="theme-toggle-track" aria-hidden>
        <span className="theme-toggle-thumb" />
      </span>
      <span className="theme-toggle-label" aria-hidden>
        <span data-when="dark">Light</span>
        <span data-when="light">Dark</span>
      </span>
    </button>
  );
}
