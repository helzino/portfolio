"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

/**
 * Pulls its child a few pixels towards the pointer while it is nearby, then
 * releases it. Desktop only, and inert under prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.35,
  radius = 90,
  className,
}: {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !fine || reduced) return;

    let frame = 0;
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);
      const reach = Math.max(rect.width, rect.height) / 2 + radius;

      if (distance < reach) {
        target.x = dx * strength;
        target.y = dy * strength;
      } else {
        target.x = 0;
        target.y = 0;
      }
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      node.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      node.style.transform = "";
    };
  }, [fine, reduced, strength, radius]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-block", willChange: "transform" }}>
      {children}
    </span>
  );
}
