"use client";

import { useCallback, useEffect, useRef } from "react";
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

  // Scrolling has to go through Lenis wherever it is running, otherwise its
  // internal position drifts away from the real one and everything reading
  // scroll (the header, the scroll cue, the shaders) is told the wrong thing.
  const scrollTo = useCallback((target: HTMLElement | 0) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { immediate: true });
    } else if (target === 0) {
      window.scrollTo(0, 0);
    } else {
      target.scrollIntoView();
    }
  }, []);

  const targetOf = (hash: string) =>
    hash.length > 1 ? document.getElementById(hash.slice(1)) : null;

  // A route change starts at the top, unless it carries a hash: /#showreel from
  // another page used to land at the top, because this reset ran after the
  // router had already dealt with the hash and undid it. Pinned sections are
  // re-measured either way, and an anchor is only scrolled to afterwards, since
  // pinning changes where everything below it sits.
  useEffect(() => {
    const hash = window.location.hash;
    if (!targetOf(hash)) {
      scrollTo(0);
      setScrollState({ y: 0, velocity: 0, progress: 0 });
    }

    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const target = targetOf(window.location.hash);
      if (target) scrollTo(target);
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname, scrollTo]);

  // Same-page anchors change the hash without changing the route, and Lenis
  // does not follow the browser's own jump.
  useEffect(() => {
    const onHashChange = () => {
      const target = targetOf(window.location.hash);
      if (target) scrollTo(target);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [scrollTo]);

  return null;
}
