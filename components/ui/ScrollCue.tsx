"use client";

import { useEffect, useState } from "react";
import { scrollState } from "@/lib/scroll";

/** A hairline that retracts as soon as the page starts moving. */
export function ScrollCue() {
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      const y = scrollState.y || window.scrollY;
      setMoved(y > 40);
      frame = requestAnimationFrame(check);
    };
    frame = requestAnimationFrame(check);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="scroll-cue" data-moved={moved} aria-hidden>
      <span className="meta">Scroll</span>
      <span className="scroll-cue-line" />
    </div>
  );
}
