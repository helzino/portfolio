"use client";

import { useEffect, useRef, useState } from "react";
import { Frame } from "@/components/media/Frame";
import type { VideoSource } from "@/lib/video";

/** Player origins, for targeted postMessage rather than "*". */
const ORIGIN = {
  youtube: "https://www.youtube-nocookie.com",
  vimeo: "https://player.vimeo.com",
} as const;

/** Both players take commands over postMessage, in their own dialects. */
function command(
  iframe: HTMLIFrameElement,
  provider: VideoSource["provider"],
  action: "play" | "pause"
) {
  const target = iframe.contentWindow;
  if (!target) return;

  const message =
    provider === "youtube"
      ? JSON.stringify({
          event: "command",
          func: action === "play" ? "playVideo" : "pauseVideo",
          args: [],
        })
      : JSON.stringify({ method: action });

  target.postMessage(message, ORIGIN[provider]);
}

/**
 * A poster frame that becomes a player on click.
 *
 * The iframe is only mounted once somebody asks for it, so an embed that would
 * otherwise pull a megabyte of third-party player code on every page load costs
 * nothing until it is wanted — and nothing is requested from YouTube or Vimeo
 * before then either.
 *
 * Once it is playing it follows the viewport: scrolling the reel out of frame
 * pauses it, scrolling back resumes. That only ever starts after the first
 * click, so the page never plays anything on its own.
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
  const frameRef = useRef<HTMLIFrameElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  // The player drops anything sent before it loads, so remember what the last
  // instruction was and re-send it once it is ready.
  const wanted = useRef<"play" | "pause">("play");
  const ready = useRef(false);

  useEffect(() => {
    if (!playing) return;

    const holder = holderRef.current;
    if (!holder || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // A little of the frame showing is not watching: ask for most of it.
        wanted.current = entry.isIntersecting ? "play" : "pause";
        const iframe = frameRef.current;
        if (iframe && ready.current) command(iframe, source.provider, wanted.current);
      },
      { threshold: 0.5 }
    );

    observer.observe(holder);
    return () => observer.disconnect();
  }, [playing, source.provider]);

  const onFrameLoad = () => {
    ready.current = true;
    const iframe = frameRef.current;
    // Covers a click followed straight away by scrolling past the reel.
    if (iframe && wanted.current === "pause") command(iframe, source.provider, "pause");
  };

  if (playing) {
    return (
      <div ref={holderRef} className="video-embed" style={{ aspectRatio: String(ratio) }}>
        <iframe
          ref={frameRef}
          src={source.embed}
          title={title}
          onLoad={onFrameLoad}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
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
