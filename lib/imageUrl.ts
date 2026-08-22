/** Widths Next.js is configured to serve — see next.config.ts deviceSizes. */
const DEVICE_SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

/**
 * Routes a texture through the Next.js image optimiser so WebGL gets the same
 * AVIF/WebP treatment as the rest of the page instead of a full-size JPEG.
 */
export function optimizedTextureUrl(src: string, width = 1920, quality = 72): string {
  if (!src) return src;
  if (src.startsWith("data:") || src.endsWith(".svg")) return src;

  const target = DEVICE_SIZES.find((size) => size >= width) ?? DEVICE_SIZES.at(-1)!;
  return `/_next/image?url=${encodeURIComponent(src)}&w=${target}&q=${quality}`;
}
