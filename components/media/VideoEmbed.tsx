"use client";

import { useState } from "react";
import { Frame } from "@/components/media/Frame";
import type { VideoSource } from "@/lib/video";

/**
 * A poster frame that becomes a player on click.
 *
 * The iframe is only mounted once somebody asks for it, so an embed that would
 * otherwise pull a megabyte of third-party player code on every page load costs
 * nothing until it is wanted — and nothing is requested from YouTube or Vimeo
 * before then either.
 */
export function VideoEmbed({
  source,
  poster,
  title,
  ratio = 16 / 9,
}: {
  source: VideoSource;
  poster: string;
  title: string;
  ratio?: number;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="video-embed" style={{ aspectRatio: String(ratio) }}>
        <iframe
          src={source.embed}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="video-embed video-embed-poster group"
      style={{ aspectRatio: String(ratio) }}
      onClick={() => setPlaying(true)}
      data-cursor="play"
      aria-label={`Play ${title}`}
    >
      {poster && (
        <Frame src={poster} alt="" ratio={ratio} sizes="100vw" zoom={false} priority />
      )}
      <span className="video-embed-scrim" aria-hidden />
      <span className="video-embed-play" aria-hidden>
        <svg viewBox="0 0 24 24" width="28" height="28" focusable="false">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}
