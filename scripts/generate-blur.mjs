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

const files = (await readdir(IMAGE_DIR)).filter((f) =>
  EXT.has(path.extname(f).toLowerCase())
);

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
  media[`/images/${file}`] = {
    width,
    height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  console.log(`${file} — ${width}x${height}`);
}

await writeFile(OUT, `${JSON.stringify(media, null, 2)}\n`);
console.log(`\nWrote ${Object.keys(media).length} entries to content/media.json`);
