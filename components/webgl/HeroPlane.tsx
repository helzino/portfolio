"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { baseVertexShader, heroFragmentShader } from "@/shaders/hero";
import { scrollState } from "@/lib/scroll";

const damp = (current: number, target: number, rate: number, delta: number) =>
  current + (target - current) * (1 - Math.exp(-rate * delta));

export function HeroPlane({
  url,
  reduced,
  onReady,
}: {
  url: string;
  reduced: boolean;
  onReady?: () => void;
}) {
  const texture = useTexture(url);
  const { viewport, invalidate } = useThree();
  const material = useRef<THREE.ShaderMaterial>(null);
  const hover = useRef(0);
  const velocity = useRef(0);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uPlaneSize: { value: new THREE.Vector2(1, 1) },
      uImageSize: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uVelocity: { value: 0 },
      uReveal: { value: 0 },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    // Write through the live material: three copies the uniforms object when
    // the material is constructed, so the memo is only the seed.
    const u = material.current?.uniforms ?? uniforms;
    u.uTexture.value = texture;
    const image = texture.image as { width: number; height: number } | undefined;
    if (image?.width) {
      u.uImageSize.value.set(image.width, image.height);
    }
    onReady?.();
    invalidate();
  }, [texture, uniforms, onReady, invalidate]);

  useFrame((state, delta) => {
    const u = material.current?.uniforms;
    if (!u) return;

    const step = Math.min(delta, 0.05);
    u.uTime.value += step;
    u.uPlaneSize.value.set(viewport.width, viewport.height);

    // Entrance wipe, then the ambient behaviour takes over.
    u.uReveal.value = damp(u.uReveal.value, 1, reduced ? 40 : 2.6, step);

    if (reduced) {
      u.uVelocity.value = 0;
      u.uHover.value = 0;
      return;
    }

    mouse.current.set((state.pointer.x + 1) / 2, (state.pointer.y + 1) / 2);
    u.uMouse.value.lerp(mouse.current, 0.08);

    const raw = THREE.MathUtils.clamp(scrollState.velocity / 45, -1, 1);
    velocity.current = damp(velocity.current, raw, 6, step);
    u.uVelocity.value = velocity.current;
    u.uHover.value = damp(u.uHover.value, hover.current, 5, step);
  });

  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      onPointerOver={() => {
        hover.current = 1;
      }}
      onPointerOut={() => {
        hover.current = 0;
      }}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={material}
        transparent
        uniforms={uniforms}
        vertexShader={baseVertexShader}
        fragmentShader={heroFragmentShader}
      />
    </mesh>
  );
}
