"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setScrollState } from "@/lib/scroll";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Smooth scrolling, driven by Lenis and tied into the GSAP ticker so
 * ScrollTrigger stays in sync with the interpolated position.
 *
 * Under prefers-reduced-motion Lenis never starts: the page scrolls natively
 * and ScrollTrigger reads the real scroll position instead.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (reduced) {
      const onScroll = () => {
        setScrollState({ velocity: 0, y: window.scrollY });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    lenis.on("scroll", (instance: Lenis) => {
      setScrollState({
        velocity: instance.velocity,
        progress: instance.progress,
        y: instance.scroll,
      });
      ScrollTrigger.update();
    });

    lenisRef.current = lenis;

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  // Every route change starts at the top and re-measures pinned sections.
  // The reset goes through Lenis where it is running, otherwise its internal
  // position would drift away from the real one and everything reading scroll
  // (the header, the scroll cue, the shaders) would be told the wrong thing.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    setScrollState({ y: 0, velocity: 0, progress: 0 });

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
