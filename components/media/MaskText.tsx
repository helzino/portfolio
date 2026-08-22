"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/hooks";

/**
 * Lines of type clipped by their own box and lifted into place. Lines are
 * passed explicitly rather than measured, so the animation never depends on
 * where the browser happens to break a paragraph.
 */
export function MaskText({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 90,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const { ref, visible } = useInView<HTMLSpanElement>({ threshold: 0.2 });

  // A <span> so the component is valid inside headings and paragraphs.
  return (
    <span ref={ref} className={className} style={{ display: "block" }}>
      {lines.map((line, index) => (
        <span
          key={index}
          className={`mask-line ${lineClassName}`.trim()}
          data-visible={visible}
        >
          <span style={{ transitionDelay: `${delay + index * stagger}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
