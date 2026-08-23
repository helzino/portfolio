"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";

/**
 * A context-aware cursor.
 *
 * Any element can declare what the cursor should say while it is hovered:
 *
 *   <a data-cursor="view">      → a filled disc reading VIEW
 *   <a data-cursor="open">      → OPEN
 *   <div data-cursor="drag">    → DRAG
 *   <nav data-cursor="hide">    → the disc shrinks to a dot
 *
 * It only mounts for fine pointers, so touch devices keep native behaviour,
 * and it is decorative — every target it reacts to is still a real link.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!fine) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const disc = discRef.current;
    const label = labelRef.current;
    if (!dot || !disc || !label) return;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...pointer };
    let frame = 0;
    let visible = false;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        disc.style.opacity = "1";
      }

      const target = event.target as Element | null;
      const holder = target?.closest?.("[data-cursor]") as HTMLElement | null;
      const mode = holder?.dataset.cursor ?? "";
      const text = holder?.dataset.cursorLabel ?? mode;

      if (mode && mode !== "hide") {
        disc.dataset.state = "labelled";
        label.textContent = text.toUpperCase();
      } else if (mode === "hide") {
        disc.dataset.state = "hidden";
        label.textContent = "";
      } else {
        disc.dataset.state = "idle";
        label.textContent = "";
      }

      // The dot sits above the disc, so hide it once the disc opens into a
      // label: there, the disc is the cursor and a dot would land mid-word.
      dot.style.opacity = disc.dataset.state === "labelled" ? "0" : "1";
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      disc.style.opacity = "0";
    };

    const render = () => {
      // The dot tracks exactly; the disc trails, which is what reads as weight.
      const lerp = reduced ? 1 : 0.16;
      eased.x += (pointer.x - eased.x) * lerp;
      eased.y += (pointer.y - eased.y) * lerp;
      dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      disc.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-custom-cursor");
    };
  }, [fine, reduced]);

  if (!fine) return null;

  return (
    <div aria-hidden className="cursor-root">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={discRef} className="cursor-disc" data-state="idle">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  );
}
