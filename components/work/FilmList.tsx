"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getMedia } from "@/lib/media";
import { useFinePointer, useReducedMotion } from "@/lib/hooks";
import type { Film } from "@/config/types";

/**
 * The film index as an editorial list rather than a grid of cards.
 *
 * On desktop, hovering a row floats that project's frame beside the cursor —
 * the imagery stays the subject without every row carrying a thumbnail. On
 * touch, each row shows its own still instead.
 */
export function FilmList({ films }: { films: Film[] }) {
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const showFloating = fine && !reduced;

  useEffect(() => {
    if (!showFloating) return;
    const node = preview.current;
    if (!node) return;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { ...pointer };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const render = () => {
      eased.x += (pointer.x - eased.x) * 0.11;
      eased.y += (pointer.y - eased.y) * 0.11;
      // Tilt follows the lag between pointer and frame — motion, not decoration.
      const tilt = (pointer.x - eased.x) * 0.04;
      node.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0) translate(-50%, -50%) rotate(${tilt.toFixed(2)}deg)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [showFloating]);

  return (
    <div className="film-list" onPointerLeave={() => setActive(null)}>
      <ol className="film-rows">
        {films.map((film, index) => (
          <li key={film.slug}>
            <Link
              href={`/film/${film.slug}`}
              className="film-row"
              data-active={active === index}
              data-dimmed={active !== null && active !== index}
              data-cursor="view"
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span className="meta meta-dim numeral film-row-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="film-row-main">
                <span className="display display-md film-row-title">{film.title}</span>
                <span className="meta meta-dim film-row-role">{film.role}</span>
              </span>

              <span className="meta meta-dim film-row-format">{film.format}</span>
              <span className="meta meta-dim numeral film-row-year">{film.year}</span>

              {!showFloating && film.poster && (
                <span className="film-row-still">
                  <Image
                    src={film.poster}
                    alt=""
                    width={640}
                    height={400}
                    sizes="90vw"
                    placeholder={getMedia(film.poster) ? "blur" : "empty"}
                    blurDataURL={getMedia(film.poster)?.blurDataURL}
                  />
                </span>
              )}
            </Link>
          </li>
        ))}
      </ol>

      {showFloating && (
        <div ref={preview} className="film-preview" data-visible={active !== null} aria-hidden>
          {films.map((film, index) => (
            <div key={film.slug} className="film-preview-frame" data-shown={active === index}>
              {film.poster && (
                <Image
                  src={film.poster}
                  alt=""
                  fill
                  sizes="30vw"
                  placeholder={getMedia(film.poster) ? "blur" : "empty"}
                  blurDataURL={getMedia(film.poster)?.blurDataURL}
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
