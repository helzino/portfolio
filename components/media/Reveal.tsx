"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/hooks";

/**
 * Fades and lifts its children the first time they enter the viewport.
 * Always a <div>: where a different element is needed for semantics, use the
 * useInView hook directly and put `.reveal` on that element instead.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  threshold,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>({ threshold });

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
