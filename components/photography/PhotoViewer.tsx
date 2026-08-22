"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getMedia } from "@/lib/media";
import { useReducedMotion } from "@/lib/hooks";
import type { Photo } from "@/config/types";

const PhotoViewerCanvas = dynamic(
  () => import("@/components/webgl/PhotoViewerCanvas").then((m) => m.PhotoViewerCanvas),
  { ssr: false }
);

const EASE = [0.76, 0, 0.24, 1] as const;

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

/**
 * Full-screen viewer.
 *
 * Where WebGL is available and motion is welcome, moving between photographs
 * is a shader transition; otherwise it is a clean cross-fade. Keyboard,
 * swipe and click all drive the same index.
 */
export function PhotoViewer({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number, direction: number) => void;
}) {
  const reduced = useReducedMotion();
  const [webgl] = useState(
    () => typeof document !== "undefined" && webglAvailable()
  );
  const [direction, setDirection] = useState(1);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;

  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      const next = (index + step + photos.length) % photos.length;
      setDirection(step);
      onNavigate(next, step);
    },
    [index, photos.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("is-locked");

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("is-locked");
    };
  }, [open, onClose, go]);

  const photo = useMemo(() => (index === null ? null : photos[index]), [index, photos]);
  const useShader = webgl && !reduced;

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          className="viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${photo.title}, photograph ${index + 1} of ${photos.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          onPointerDown={(event) => {
            swipe.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerUp={(event) => {
            const start = swipe.current;
            swipe.current = null;
            if (!start) return;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
          }}
        >
          {useShader ? (
            <PhotoViewerCanvas photos={photos} index={index} direction={direction} />
          ) : (
            <div className="viewer-still">
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.caption || photo.title}
                fill
                sizes="92vw"
                quality={85}
                placeholder={getMedia(photo.src) ? "blur" : "empty"}
                blurDataURL={getMedia(photo.src)?.blurDataURL}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          )}

          {/* Click zones sit above the canvas but below the controls. */}
          <button
            type="button"
            className="viewer-zone viewer-zone-prev"
            onClick={() => go(-1)}
            data-cursor="prev"
            aria-label="Previous photograph"
          />
          <button
            type="button"
            className="viewer-zone viewer-zone-next"
            onClick={() => go(1)}
            data-cursor="next"
            aria-label="Next photograph"
          />

          <div className="viewer-chrome shell">
            <div className="viewer-top">
              <span className="meta numeral">
                {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
              </span>
              <button type="button" className="meta viewer-close" onClick={onClose}>
                Close
              </button>
            </div>

            <motion.div
              key={photo.id}
              className="viewer-caption"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
            >
              <h2 className="display display-sm">{photo.title}</h2>
              <p className="meta meta-dim">
                {[photo.location, photo.year].filter(Boolean).join(" · ")}
              </p>
              {photo.caption && <p className="body viewer-note">{photo.caption}</p>}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
