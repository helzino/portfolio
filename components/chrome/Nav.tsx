"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/content";
import { Magnetic } from "@/components/ui/Magnetic";
import { MenuOverlay } from "@/components/chrome/MenuOverlay";
import { ThemeToggle } from "@/components/chrome/ThemeToggle";
import { scrollState } from "@/lib/scroll";
import { NAV_LINKS } from "@/config/nav";

/**
 * Typography-led navigation: no box, no background until the page has moved,
 * and a monogram that always returns home.
 */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Retract while reading downward, return the moment the visitor scrolls back
  // up — so the header never sits on top of the work.
  useEffect(() => {
    let frame = 0;
    let last = 0;

    const check = () => {
      const y = scrollState.y || window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
      frame = requestAnimationFrame(check);
    };

    frame = requestAnimationFrame(check);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Navigating anywhere closes the menu. Comparing the route during render is
  // React's recommended way to reset state from a prop, and avoids a second
  // render pass after the effect.
  const [menuRoute, setMenuRoute] = useState(pathname);
  if (pathname !== menuRoute) {
    setMenuRoute(pathname);
    setMenuOpen(false);
  }

  const initials = site.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <>
      <header
        className="nav"
        data-scrolled={scrolled}
        data-hidden={hidden && !menuOpen}
        data-cursor="hide"
      >
        <div className="nav-inner shell">
          <Link href="/" className="nav-mark" aria-label={`${site.name}, home`}>
            <Magnetic strength={0.28}>
              <span className="display display-sm">{initials}</span>
            </Magnetic>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Magnetic key={link.href} strength={0.22} radius={40}>
                  <Link
                    href={link.href}
                    className="nav-link meta"
                    data-active={active}
                  >
                    <span className="nav-link-text">
                      <span>{link.label}</span>
                      <span aria-hidden>{link.label}</span>
                    </span>
                  </Link>
                </Magnetic>
              );
            })}
          </nav>

          <div className="nav-tail">
            <ThemeToggle className="nav-theme" />

            <Magnetic strength={0.22} radius={40}>
              <a
                href={`mailto:${site.email}`}
                className="nav-link meta nav-contact"
                data-cursor="write"
                data-cursor-label="Email"
              >
                <span className="nav-link-text">
                  <span>Contact</span>
                  <span aria-hidden>Contact</span>
                </span>
              </a>
            </Magnetic>

            <button
              type="button"
              className="nav-burger meta"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
