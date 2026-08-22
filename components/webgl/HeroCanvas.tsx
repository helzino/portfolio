"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { HeroPlane } from "@/components/webgl/HeroPlane";
import { optimizedTextureUrl } from "@/lib/imageUrl";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Hosts the hero shader.
 *
 * The canvas is only ever rendering while it is on screen, sits behind a
 * plain <Image> that carries the LCP, and fades in once the texture has
 * decoded — so a failed or slow WebGL start degrades to a still photograph.
 */
export function HeroCanvas({ src }: { src: string }) {
  const reduced = useReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = wrapper.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      className="hero-canvas"
      data-ready={ready}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          // Photographs are already graded — no filmic curve on top of them.
          toneMapping: THREE.NoToneMapping,
        }}
        frameloop={reduced || !onScreen ? "demand" : "always"}
        camera={{ position: [0, 0, 1], fov: 50 }}
      >
        <Suspense fallback={null}>
          <HeroPlane
            url={optimizedTextureUrl(src, 1920)}
            reduced={reduced}
            onReady={() => setReady(true)}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
