/**
 * Turns a YouTube or Vimeo link into an embeddable player URL, so content can
 * hold the address you would actually paste from the browser bar rather than a
 * hand-built /embed/ path.
 */

export interface VideoSource {
  provider: "youtube" | "vimeo";
  id: string;
  embed: string;
}

/**
 * Both players are asked for as little chrome as possible: no related grid, no
 * annotations, no subtitles.
 *
 * YouTube keeps its control bar, because the settings menu — and with it the
 * quality picker — lives there and cannot be shown on its own. It cannot be
 * made bare in any case: its title and share overlay appear on hover whatever
 * is asked for, and `modestbranding` no longer does anything since YouTube
 * deprecated it. Vimeo has no such constraint, so it stays chromeless.
 */
function youtubeEmbed(id: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    // The settings menu, and so the quality picker, is part of the control bar
    // and has no parameter of its own — showing one means showing all of it.
    controls: "1",
    rel: "0",
    iv_load_policy: "3",
    // Captions off, and no automatic track selection from the viewer's locale.
    cc_load_policy: "0",
    cc_lang_pref: "",
    // Both follow the controls: a visible bar with a dead fullscreen button and
    // no keyboard support would be a stranger thing than either extreme.
    disablekb: "0",
    fs: "1",
    playsinline: "1",
    color: "white",
    // Lets the page send pause/play over postMessage when the reel scrolls out
    // of view. Without it the player ignores commands.
    enablejsapi: "1",
    // Unofficial and often ignored — YouTube picks the rendition itself from
    // bandwidth and player size. Kept because it costs nothing when honoured.
    vq: "hd1080",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}

function vimeoEmbed(id: string, hash?: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    controls: "0",
    title: "0",
    byline: "0",
    portrait: "0",
    badge: "0",
    autopause: "0",
    dnt: "1",
    // Unlike YouTube, Vimeo honours both of these.
    quality: "1080p",
    texttrack: "false",
  });
  // Unlisted videos carry a privacy hash: vimeo.com/1234567/abc123.
  if (hash) params.set("h", hash);
  return `https://player.vimeo.com/video/${id}?${params}`;
}

export function parseVideoUrl(url: string): VideoSource | null {
  if (!url) return null;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "");
  const segments = parsed.pathname.split("/").filter(Boolean);

  if (host === "youtu.be") {
    const id = segments[0];
    return id ? { provider: "youtube", id, embed: youtubeEmbed(id) } : null;
  }

  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    // /watch?v=ID, and the /embed/ID, /shorts/ID and /live/ID forms.
    const id =
      parsed.searchParams.get("v") ??
      (["embed", "shorts", "live", "v"].includes(segments[0]) ? segments[1] : undefined);
    return id ? { provider: "youtube", id, embed: youtubeEmbed(id) } : null;
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    // vimeo.com/ID, vimeo.com/ID/HASH, and player.vimeo.com/video/ID.
    const path = segments[0] === "video" ? segments.slice(1) : segments;
    const id = path.find((segment) => /^\d+$/.test(segment));
    if (!id) return null;
    const hash = parsed.searchParams.get("h") ?? path[path.indexOf(id) + 1];
    return { provider: "vimeo", id, embed: vimeoEmbed(id, hash) };
  }

  return null;
}
