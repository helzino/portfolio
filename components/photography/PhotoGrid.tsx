"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Frame } from "@/components/media/Frame";
import { Reveal } from "@/components/media/Reveal";
import { PhotoViewer } from "@/components/photography/PhotoViewer";
import { orientationOf } from "@/lib/media";
import type { Photo } from "@/config/types";

/**
 * An editorial wall rather than a grid: six repeating positions across twelve
 * columns, so no two neighbouring frames share a size or a baseline.
 */
const POSITIONS = [
  { column: "1 / span 6", offset: "0" },
  { column: "8 / span 4", offset: "16vh" },
  { column: "3 / span 4", offset: "4vh" },
  { column: "8 / span 5", offset: "0" },
  { column: "1 / span 5", offset: "12vh" },
  { column: "7 / span 6", offset: "-2vh" },
] as const;

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);

  // Deep link: /photography?photo=3 opens straight into the viewer. Reacting
  // to the parameter during render keeps the viewer and the URL in step
  // without an extra render pass.
  const photoParam = params.get("photo");
  const [seenParam, setSeenParam] = useState<string | null>(photoParam);
  if (photoParam !== seenParam) {
    setSeenParam(photoParam);
    if (photoParam) {
      const index = photos.findIndex((photo) => photo.id === photoParam);
      if (index >= 0) {
        setFilter("All");
        setActive(index);
      }
    }
  }

  const locations = useMemo(() => {
    const unique = Array.from(
      new Set(photos.map((photo) => photo.location).filter(Boolean))
    );
    return ["All", ...unique];
  }, [photos]);

  const visible = useMemo(
    () => (filter === "All" ? photos : photos.filter((p) => p.location === filter)),
    [photos, filter]
  );

  const close = () => {
    setActive(null);
    router.replace("/photography", { scroll: false });
  };

  return (
    <>
      <div className="filters shell" role="group" aria-label="Filter by location">
        {locations.map((location) => (
          <button
            key={location}
            type="button"
            className="meta filter"
            data-active={filter === location}
            onClick={() => setFilter(location)}
          >
            {location}
            {location === "All" && (
              <span className="numeral filter-count"> ({photos.length})</span>
            )}
          </button>
        ))}
      </div>

      <div className="photo-wall shell grid-12">
        {visible.map((photo, index) => {
          const position = POSITIONS[index % POSITIONS.length];
          const openIndex = photos.findIndex((p) => p.id === photo.id);
          return (
            <figure
              key={photo.id}
              className="photo-cell"
              style={{ gridColumn: position.column, marginTop: position.offset }}
            >
              <Reveal>
                <button
                  type="button"
                  className="photo-button group"
                  onClick={() => setActive(openIndex)}
                  data-cursor="view"
                  aria-label={`Open ${photo.title}`}
                >
                  <Frame
                    src={photo.src}
                    alt={photo.caption || photo.title}
                    ratio={orientationOf(photo.src) === "portrait" ? 4 / 5 : 3 / 2}
                    sizes="(max-width: 900px) 90vw, 45vw"
                  />
                </button>
                <figcaption className="photo-caption">
                  <span className="photo-title">{photo.title}</span>
                  <span className="meta meta-dim">
                    {[photo.location, photo.year].filter(Boolean).join(" · ")}
                  </span>
                </figcaption>
              </Reveal>
            </figure>
          );
        })}
      </div>

      <PhotoViewer
        photos={photos}
        index={active}
        onClose={close}
        onNavigate={(next) => setActive(next)}
      />
    </>
  );
}
