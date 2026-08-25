/**
 * Scans /public/images and writes content/media.json — intrinsic dimensions plus
 * a tiny base64 blur placeholder for every local image. Run `npm run blur`
 * after adding images to /public/images.
 */
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_DIR = path.join(process.cwd(), "public", "images");
const OUT = path.join(process.cwd(), "content", "media.json");
const EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

/** Walks /public/images and its subfolders, returning paths relative to it. */
async function collect(dir = IMAGE_DIR) {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await collect(abs)));
    else if (EXT.has(path.extname(entry.name).toLowerCase()))
      found.push(path.relative(IMAGE_DIR, abs));
  }
  return found;
}

const files = await collect();

const media = {};
for (const file of files.sort()) {
  const abs = path.join(IMAGE_DIR, file);
  const image = sharp(abs);
  const { width, height } = await image.metadata();
  const blur = await image
    .clone()
    .resize(20, null, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  media[`/images/${file.split(path.sep).join("/")}`] = {
    width,
    height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  console.log(`${file} — ${width}x${height}`);
}

await writeFile(OUT, `${JSON.stringify(media, null, 2)}\n`);
console.log(`\nWrote ${Object.keys(media).length} entries to content/media.json`);
