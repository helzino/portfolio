"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/hooks";

const EASE = [0.76, 0, 0.24, 1] as const;
const KEY = "hw:entered";

/**
 * The opening. A counter runs while the first images decode, then the panel
 * lifts. It plays once per session — returning within the same visit goes
 * straight to the site — and is skipped entirely under reduced motion.
 */
export function Preloader({ name, role }: { name: string; role: string }) {
  const reduced = useReducedMotion();
  // Rendered on the server too, so the panel is already covering the page on
  // the first paint rather than flashing in over it.
  const [active, setActive] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const seen = (() => {
      try {
        return Boolean(sessionStorage.getItem(KEY));
      } catch {
        return false;
      }
    })();

    // Returning within the same visit, or asking for reduced motion, lifts the
    // panel on the next frame instead of playing the sequence.
    if (reduced || seen) {
      const id = requestAnimationFrame(() => setActive(false));
      return () => cancelAnimationFrame(id);
    }

    document.body.classList.add("is-locked");

    const started = performance.now();
    const duration = 1700;
    let frame = 0;

    const tick = () => {
      const elapsed = performance.now() - started;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out so the count decelerates into 100 rather than ticking evenly.
      setCount(Math.round((1 - Math.pow(1 - progress, 2.4)) * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setActive(false);
          document.body.classList.remove("is-locked");
          sessionStorage.setItem(KEY, "1");
        }, 260);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("is-locked");
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: reduced ? 0 : 1, ease: EASE }}
          aria-hidden
        >
          <div className="preloader-inner shell">
            <div className="preloader-name">
              <motion.span
                className="display display-md"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              >
                {name}
              </motion.span>
            </div>
            <div className="preloader-foot">
              <span className="meta meta-dim">{role}</span>
              <span className="meta numeral preloader-count">
                {String(count).padStart(3, "0")}
              </span>
            </div>
            <motion.div
              className="preloader-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ duration: 0.2, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
