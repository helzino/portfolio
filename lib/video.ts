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

/** YouTube's no-cookie host, and Vimeo's player, both set to autoplay. */
function youtubeEmbed(id: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}

function vimeoEmbed(id: string, hash?: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    title: "0",
    byline: "0",
    portrait: "0",
    dnt: "1",
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
