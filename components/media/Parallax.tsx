"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Moves its child against the scroll at a fraction of the page's speed.
 * Runs on requestAnimationFrame only while the element is on screen, and does
 * nothing at all under prefers-reduced-motion.
 */
export function Parallax({
  children,
  speed = 0.12,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    let frame = 0;
    let active = false;
    let current = 0;

    const render = () => {
      const rect = node.getBoundingClientRect();
      const centre = rect.top + rect.height / 2 - window.innerHeight / 2;
      const target = -centre * speed;
      current += (target - current) * 0.12;
      node.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true;
          frame = requestAnimationFrame(render);
        } else if (!entry.isIntersecting && active) {
          active = false;
          cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "20% 0px" }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced, speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
