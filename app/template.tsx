"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Page transition. `template.tsx` remounts on every navigation, so a panel
 * sweeps off the top of the new page while its content settles in underneath.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        className="page-veil"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: EASE }}
        style={{ transformOrigin: "top" }}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
