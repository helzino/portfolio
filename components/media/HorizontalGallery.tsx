"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Frame } from "@/components/media/Frame";
import { PhotoViewer } from "@/components/photography/PhotoViewer";
import { useMediaQuery, useReducedMotion } from "@/lib/hooks";
import type { Photo } from "@/config/types";

/**
 * A sequence of photographs read left to right.
 *
 * On a wide screen the section pins and vertical scrolling drives horizontal
 * movement. Anywhere else — narrow viewport, reduced motion — it becomes a
 * native swipeable track, which is the better touch interaction anyway.
 *
 * A frame opens the viewer over the page it is already on. It used to link to
 * /photography?photo=n, which meant leaving the home page to look at one
 * photograph and losing your place in the strip on the way back.
 */
export function HorizontalGallery({ photos }: { photos: Photo[] }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const wide = useMediaQuery("(min-width: 900px)");
  const reduced = useReducedMotion();
  const pinned = wide && !reduced;

  useEffect(() => {
    if (!pinned) return;
    const sectionEl = section.current;
    const trackEl = track.current;
    if (!sectionEl || !trackEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const distance = () => trackEl.scrollWidth - window.innerWidth;

      gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionEl);

    return () => context.revert();
  }, [pinned]);

  return (
    <>
      <div
        ref={section}
        className="hgallery"
        data-pinned={pinned}
        data-cursor={pinned ? undefined : "drag"}
      >
        <div ref={track} className="hgallery-track no-scrollbar">
          {photos.map((photo, index) => (
            <figure key={photo.id} className="hgallery-item">
              <button
                type="button"
                className="group hgallery-open"
                data-cursor="view"
                onClick={() => setActive(index)}
                aria-label={`View ${photo.title}`}
              >
                {/* Every frame in the sequence is square, so the row reads as one
                    even rhythm whatever shape the photograph was shot in. */}
                <Frame
                  src={photo.src}
                  alt={photo.caption || photo.title}
                  ratio={1}
                  sizes="(max-width: 900px) 72vw, 30vw"
                />
              </button>
              <figcaption className="hgallery-caption">
                <span className="meta numeral meta-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="hgallery-title">{photo.title}</span>
                <span className="meta meta-dim">{photo.location}</span>
              </figcaption>
            </figure>
          ))}

          <div className="hgallery-end">
            <Link
              href="/photography"
              className="display display-md link-underline"
              data-cursor="enter"
            >
              All photography
            </Link>
          </div>
        </div>
      </div>

      {/* Outside the pinned section on purpose: ScrollTrigger positions what it
          pins, and a fixed overlay inside it would be placed against it rather
          than the viewport. */}
      <PhotoViewer
        photos={photos}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={(next) => setActive(next)}
      />
    </>
  );
}
