"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/config/content";
import { NAV_LINKS } from "@/config/nav";
import { ThemeToggle } from "@/components/chrome/ThemeToggle";

const EASE = [0.76, 0, 0.24, 1] as const;

/** Full-screen menu for narrow viewports: large type, staggered entrance. */
export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          ref={panelRef}
          tabIndex={-1}
          className="menu-overlay"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <div className="menu-inner shell">
            <ul className="menu-list">
              {NAV_LINKS.map((link, index) => (
                <li key={link.href} className="menu-item">
                  <motion.span
                    className="menu-item-inner"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%", transition: { duration: 0.35, ease: EASE } }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.12 + index * 0.06 }}
                  >
                    <Link href={link.href} className="display display-lg" onClick={onClose}>
                      {link.label}
                    </Link>
                  </motion.span>
                </li>
              ))}
            </ul>

            <motion.div
              className="menu-foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <a href={`mailto:${site.email}`} className="lede link-underline">
                {site.email}
              </a>
              <div className="menu-socials">
                <ThemeToggle />
                {site.socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="meta meta-dim link-underline"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
