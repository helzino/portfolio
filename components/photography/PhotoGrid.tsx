"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Frame } from "@/components/media/Frame";
import { Reveal } from "@/components/media/Reveal";
import { PhotoViewer } from "@/components/photography/PhotoViewer";
import { orientationOf } from "@/lib/media";
import type { Photo, PhotoCategory } from "@/config/types";

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

/** Fisher-Yates, so every order is equally likely. */
function shuffled<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [filter, setFilter] = useState<string>("All");
  // Which photograph is open, by id rather than position: the wall reshuffles
  // under it, and an index would then point at a different photograph.
  const [activeId, setActiveId] = useState<string | null>(null);
  // Server order first, so the markup matches on hydration; the shuffle happens
  // once mounted. Shuffling during render would put the two out of step.
  const [order, setOrder] = useState<Photo[]>(photos);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(shuffled(photos));
  }, [photos]);

  // Deep link: /photography?photo=3 opens straight into the viewer. Reacting
  // to the parameter during render keeps the viewer and the URL in step
  // without an extra render pass.
  const photoParam = params.get("photo");
  const [seenParam, setSeenParam] = useState<string | null>(photoParam);
  if (photoParam !== seenParam) {
    setSeenParam(photoParam);
    if (photoParam) {
      if (photos.some((photo) => photo.id === photoParam)) {
        setFilter("All");
        setActiveId(photoParam);
      }
    }
  }

  // Only offer a category once something actually carries it, so the filter
  // never shows an empty Events or People tab.
  const categories = useMemo(() => {
    const order: PhotoCategory[] = ["Nature", "Events", "People"];
    const present = new Set(photos.map((photo) => photo.category));
    return ["All", ...order.filter((category) => present.has(category))];
  }, [photos]);

  const visible = useMemo(
    () => (filter === "All" ? order : photos.filter((p) => p.category === filter)),
    [photos, order, filter]
  );

  // The viewer walks the wall as it is shown, so its index is a position in
  // `visible` and is recomputed whenever that changes.
  const activeIndex = useMemo(() => {
    if (!activeId) return null;
    const index = visible.findIndex((photo) => photo.id === activeId);
    return index >= 0 ? index : null;
  }, [visible, activeId]);

  const choose = useCallback(
    (category: string) => {
      // Clicking All reshuffles, so the set reads differently every time.
      if (category === "All") setOrder(shuffled(photos));
      setFilter(category);
    },
    [photos]
  );

  const close = () => {
    setActiveId(null);
    router.replace("/photography", { scroll: false });
  };

  return (
    <>
      <div className="filters shell" role="group" aria-label="Filter by subject">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className="meta filter"
            data-active={filter === category}
            onClick={() => choose(category)}
          >
            {category}
            {category === "All" && (
              <span className="numeral filter-count"> ({photos.length})</span>
            )}
          </button>
        ))}
      </div>

      <div className="photo-wall shell grid-12">
        {visible.map((photo, index) => {
          const position = POSITIONS[index % POSITIONS.length];
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
                  onClick={() => setActiveId(photo.id)}
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
        photos={visible}
        index={activeIndex}
        onClose={close}
        onNavigate={(next) => setActiveId(visible[next]?.id ?? null)}
      />
    </>
  );
}
