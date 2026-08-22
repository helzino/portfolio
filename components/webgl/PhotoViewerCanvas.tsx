"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { baseVertexShader, transitionFragmentShader } from "@/shaders/transition";
import { optimizedTextureUrl } from "@/lib/imageUrl";
import type { Photo } from "@/config/types";

const cache = new Map<string, THREE.Texture>();
const loader = new THREE.TextureLoader();
loader.setCrossOrigin("anonymous");

function loadTexture(url: string): Promise<THREE.Texture> {
  const cached = cache.get(url);
  if (cached) return Promise.resolve(cached);

  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        cache.set(url, texture);
        resolve(texture);
      },
      undefined,
      reject
    );
  });
}

function sizeOf(texture: THREE.Texture): THREE.Vector2 {
  const image = texture.image as { width: number; height: number } | undefined;
  return new THREE.Vector2(image?.width ?? 1, image?.height ?? 1);
}

/**
 * The plane the photographs live on inside the viewer.
 *
 * Changing photograph does not swap an <img>: the outgoing texture is pushed
 * out along a displacement field while the incoming one arrives against it,
 * with the plane resizing to the new frame's proportions as it goes.
 */
function ViewerPlane({
  photos,
  index,
  direction,
  onReady,
}: {
  photos: Photo[];
  index: number;
  direction: number;
  onReady: () => void;
}) {
  const { viewport, invalidate } = useThree();
  const material = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const aspect = useRef(1.5);
  const targetAspect = useRef(1.5);
  const pointer = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTextureA: { value: null as THREE.Texture | null },
      uTextureB: { value: null as THREE.Texture | null },
      uPlaneSize: { value: new THREE.Vector2(1, 1) },
      uImageSizeA: { value: new THREE.Vector2(1, 1) },
      uImageSizeB: { value: new THREE.Vector2(1, 1) },
      uProgress: { value: 1 },
      uDirection: { value: 1 },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  // Swap textures whenever the visible photograph changes.
  useEffect(() => {
    let cancelled = false;
    const photo = photos[index];
    if (!photo) return;

    loadTexture(optimizedTextureUrl(photo.src, 1920))
      .then((texture) => {
        if (cancelled) return;
        // Write through the live material: three copies the uniforms object
        // when the material is constructed, so the memo is only the seed.
        const u = material.current?.uniforms ?? uniforms;
        u.uTextureA.value = u.uTextureB.value ?? texture;
        u.uImageSizeA.value.copy(u.uImageSizeB.value);
        u.uTextureB.value = texture;
        u.uImageSizeB.value.copy(sizeOf(texture));
        u.uDirection.value = direction >= 0 ? 1 : -1;

        const size = sizeOf(texture);
        targetAspect.current = size.x / size.y;

        const first = !u.uTextureA.value || u.uTextureA.value === texture;
        gsap.fromTo(
          u.uProgress,
          { value: first ? 0.6 : 0 },
          { value: 1, duration: first ? 0.9 : 1.05, ease: "power2.inOut" }
        );
        onReady();
        invalidate();
      })
      .catch(() => onReady());

    // Warm the neighbours so the next move is instant.
    [index + 1, index - 1].forEach((i) => {
      const neighbour = photos[(i + photos.length) % photos.length];
      if (neighbour) void loadTexture(optimizedTextureUrl(neighbour.src, 1920));
    });

    return () => {
      cancelled = true;
    };
  }, [index, direction, photos, uniforms, onReady, invalidate]);

  useFrame((state, delta) => {
    const u = material.current?.uniforms;
    const node = mesh.current;
    if (!u || !node) return;

    u.uTime.value += Math.min(delta, 0.05);

    // Fit the frame inside the viewport, leaving margin for the captions.
    aspect.current += (targetAspect.current - aspect.current) * 0.08;
    const maxWidth = viewport.width * 0.82;
    const maxHeight = viewport.height * 0.76;
    let width = maxWidth;
    let height = width / aspect.current;
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspect.current;
    }
    node.scale.set(width, height, 1);
    u.uPlaneSize.value.set(width, height);

    pointer.current.set((state.pointer.x + 1) / 2, (state.pointer.y + 1) / 2);
    u.uMouse.value.lerp(pointer.current, 0.06);
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={baseVertexShader}
        fragmentShader={transitionFragmentShader}
      />
    </mesh>
  );
}

export function PhotoViewerCanvas({
  photos,
  index,
  direction,
}: {
  photos: Photo[];
  index: number;
  direction: number;
}) {
  const [ready, setReady] = useState(false);

  return (
    <div className="viewer-canvas" data-ready={ready} aria-hidden>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, toneMapping: THREE.NoToneMapping }}
        camera={{ position: [0, 0, 1], fov: 50 }}
      >
        <ViewerPlane
          photos={photos}
          index={index}
          direction={direction}
          onReady={() => setReady(true)}
        />
      </Canvas>
    </div>
  );
}
