"use client";

import dynamic from "next/dynamic";

/** Keeps three.js out of the initial bundle and off the server. */
export const LazyHeroCanvas = dynamic(
  () => import("@/components/webgl/HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
);
