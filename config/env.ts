/**
 * Environment variable registry.
 *
 * Next.js inlines `NEXT_PUBLIC_*` values at build time by matching the literal
 * text `process.env.NEXT_PUBLIC_FOO`, so every supported variable has to be
 * written out here rather than looked up dynamically. This table is the single
 * place the rest of the app learns what the environment said; config/content.ts
 * turns it into structured data.
 *
 * Slot counts (change here and in .env.example if more are ever needed):
 *   FILM 1–8 · PHOTO 1–30 · CAPABILITY 1–8
 */

export const env: Record<string, string | undefined> = {
  // ── Identity ──────────────────────────────────────────────────────────────
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SITE_ROLE: process.env.NEXT_PUBLIC_SITE_ROLE,
  NEXT_PUBLIC_SITE_TAGLINE: process.env.NEXT_PUBLIC_SITE_TAGLINE,
  NEXT_PUBLIC_SITE_LOCATION: process.env.NEXT_PUBLIC_SITE_LOCATION,
  NEXT_PUBLIC_SITE_EMAIL: process.env.NEXT_PUBLIC_SITE_EMAIL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_AVAILABILITY: process.env.NEXT_PUBLIC_SITE_AVAILABILITY,
  NEXT_PUBLIC_DEFAULT_THEME: process.env.NEXT_PUBLIC_DEFAULT_THEME,

  // ── Opening ───────────────────────────────────────────────────────────────
  NEXT_PUBLIC_HERO_HEADLINE: process.env.NEXT_PUBLIC_HERO_HEADLINE,
  NEXT_PUBLIC_HERO_IMAGE: process.env.NEXT_PUBLIC_HERO_IMAGE,

  // ── Social ────────────────────────────────────────────────────────────────
  NEXT_PUBLIC_SOCIAL_INSTAGRAM: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
  NEXT_PUBLIC_SOCIAL_LINKEDIN: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
  NEXT_PUBLIC_SOCIAL_VIMEO: process.env.NEXT_PUBLIC_SOCIAL_VIMEO,
  NEXT_PUBLIC_SOCIAL_YOUTUBE: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE,
  NEXT_PUBLIC_SOCIAL_IMDB: process.env.NEXT_PUBLIC_SOCIAL_IMDB,

  // ── About ─────────────────────────────────────────────────────────────────
  NEXT_PUBLIC_ABOUT_INTRO: process.env.NEXT_PUBLIC_ABOUT_INTRO,
  NEXT_PUBLIC_ABOUT_BODY: process.env.NEXT_PUBLIC_ABOUT_BODY,
  NEXT_PUBLIC_ABOUT_PORTRAIT: process.env.NEXT_PUBLIC_ABOUT_PORTRAIT,
  NEXT_PUBLIC_ABOUT_PREVIEW_IMAGE: process.env.NEXT_PUBLIC_ABOUT_PREVIEW_IMAGE,

  // ── Showreel ──────────────────────────────────────────────────────────────
  NEXT_PUBLIC_SHOWREEL_URL: process.env.NEXT_PUBLIC_SHOWREEL_URL,
  NEXT_PUBLIC_SHOWREEL_TITLE: process.env.NEXT_PUBLIC_SHOWREEL_TITLE,
  NEXT_PUBLIC_SHOWREEL_EYEBROW: process.env.NEXT_PUBLIC_SHOWREEL_EYEBROW,
  NEXT_PUBLIC_SHOWREEL_CAPTION: process.env.NEXT_PUBLIC_SHOWREEL_CAPTION,
  NEXT_PUBLIC_SHOWREEL_POSTER: process.env.NEXT_PUBLIC_SHOWREEL_POSTER,

  // ── Film & TV ─────────────────────────────────────────────────────────────
  NEXT_PUBLIC_FILM_1: process.env.NEXT_PUBLIC_FILM_1,
  NEXT_PUBLIC_FILM_1_STILLS: process.env.NEXT_PUBLIC_FILM_1_STILLS,
  NEXT_PUBLIC_FILM_1_BODY: process.env.NEXT_PUBLIC_FILM_1_BODY,
  NEXT_PUBLIC_FILM_2: process.env.NEXT_PUBLIC_FILM_2,
  NEXT_PUBLIC_FILM_2_STILLS: process.env.NEXT_PUBLIC_FILM_2_STILLS,
  NEXT_PUBLIC_FILM_2_BODY: process.env.NEXT_PUBLIC_FILM_2_BODY,
  NEXT_PUBLIC_FILM_3: process.env.NEXT_PUBLIC_FILM_3,
  NEXT_PUBLIC_FILM_3_STILLS: process.env.NEXT_PUBLIC_FILM_3_STILLS,
  NEXT_PUBLIC_FILM_3_BODY: process.env.NEXT_PUBLIC_FILM_3_BODY,
  NEXT_PUBLIC_FILM_4: process.env.NEXT_PUBLIC_FILM_4,
  NEXT_PUBLIC_FILM_4_STILLS: process.env.NEXT_PUBLIC_FILM_4_STILLS,
  NEXT_PUBLIC_FILM_4_BODY: process.env.NEXT_PUBLIC_FILM_4_BODY,
  NEXT_PUBLIC_FILM_5: process.env.NEXT_PUBLIC_FILM_5,
  NEXT_PUBLIC_FILM_5_STILLS: process.env.NEXT_PUBLIC_FILM_5_STILLS,
  NEXT_PUBLIC_FILM_5_BODY: process.env.NEXT_PUBLIC_FILM_5_BODY,
  NEXT_PUBLIC_FILM_6: process.env.NEXT_PUBLIC_FILM_6,
  NEXT_PUBLIC_FILM_6_STILLS: process.env.NEXT_PUBLIC_FILM_6_STILLS,
  NEXT_PUBLIC_FILM_6_BODY: process.env.NEXT_PUBLIC_FILM_6_BODY,
  NEXT_PUBLIC_FILM_7: process.env.NEXT_PUBLIC_FILM_7,
  NEXT_PUBLIC_FILM_7_STILLS: process.env.NEXT_PUBLIC_FILM_7_STILLS,
  NEXT_PUBLIC_FILM_7_BODY: process.env.NEXT_PUBLIC_FILM_7_BODY,
  NEXT_PUBLIC_FILM_8: process.env.NEXT_PUBLIC_FILM_8,
  NEXT_PUBLIC_FILM_8_STILLS: process.env.NEXT_PUBLIC_FILM_8_STILLS,
  NEXT_PUBLIC_FILM_8_BODY: process.env.NEXT_PUBLIC_FILM_8_BODY,

  // ── Photography ───────────────────────────────────────────────────────────
  NEXT_PUBLIC_PHOTO_1: process.env.NEXT_PUBLIC_PHOTO_1,
  NEXT_PUBLIC_PHOTO_2: process.env.NEXT_PUBLIC_PHOTO_2,
  NEXT_PUBLIC_PHOTO_3: process.env.NEXT_PUBLIC_PHOTO_3,
  NEXT_PUBLIC_PHOTO_4: process.env.NEXT_PUBLIC_PHOTO_4,
  NEXT_PUBLIC_PHOTO_5: process.env.NEXT_PUBLIC_PHOTO_5,
  NEXT_PUBLIC_PHOTO_6: process.env.NEXT_PUBLIC_PHOTO_6,
  NEXT_PUBLIC_PHOTO_7: process.env.NEXT_PUBLIC_PHOTO_7,
  NEXT_PUBLIC_PHOTO_8: process.env.NEXT_PUBLIC_PHOTO_8,
  NEXT_PUBLIC_PHOTO_9: process.env.NEXT_PUBLIC_PHOTO_9,
  NEXT_PUBLIC_PHOTO_10: process.env.NEXT_PUBLIC_PHOTO_10,
  NEXT_PUBLIC_PHOTO_11: process.env.NEXT_PUBLIC_PHOTO_11,
  NEXT_PUBLIC_PHOTO_12: process.env.NEXT_PUBLIC_PHOTO_12,
  NEXT_PUBLIC_PHOTO_13: process.env.NEXT_PUBLIC_PHOTO_13,
  NEXT_PUBLIC_PHOTO_14: process.env.NEXT_PUBLIC_PHOTO_14,
  NEXT_PUBLIC_PHOTO_15: process.env.NEXT_PUBLIC_PHOTO_15,
  NEXT_PUBLIC_PHOTO_16: process.env.NEXT_PUBLIC_PHOTO_16,
  NEXT_PUBLIC_PHOTO_17: process.env.NEXT_PUBLIC_PHOTO_17,
  NEXT_PUBLIC_PHOTO_18: process.env.NEXT_PUBLIC_PHOTO_18,
  NEXT_PUBLIC_PHOTO_19: process.env.NEXT_PUBLIC_PHOTO_19,
  NEXT_PUBLIC_PHOTO_20: process.env.NEXT_PUBLIC_PHOTO_20,
  NEXT_PUBLIC_PHOTO_21: process.env.NEXT_PUBLIC_PHOTO_21,
  NEXT_PUBLIC_PHOTO_22: process.env.NEXT_PUBLIC_PHOTO_22,
  NEXT_PUBLIC_PHOTO_23: process.env.NEXT_PUBLIC_PHOTO_23,
  NEXT_PUBLIC_PHOTO_24: process.env.NEXT_PUBLIC_PHOTO_24,
  NEXT_PUBLIC_PHOTO_25: process.env.NEXT_PUBLIC_PHOTO_25,
  NEXT_PUBLIC_PHOTO_26: process.env.NEXT_PUBLIC_PHOTO_26,
  NEXT_PUBLIC_PHOTO_27: process.env.NEXT_PUBLIC_PHOTO_27,
  NEXT_PUBLIC_PHOTO_28: process.env.NEXT_PUBLIC_PHOTO_28,
  NEXT_PUBLIC_PHOTO_29: process.env.NEXT_PUBLIC_PHOTO_29,
  NEXT_PUBLIC_PHOTO_30: process.env.NEXT_PUBLIC_PHOTO_30,

  // ── Capabilities ──────────────────────────────────────────────────────────
  NEXT_PUBLIC_CAPABILITY_1: process.env.NEXT_PUBLIC_CAPABILITY_1,
  NEXT_PUBLIC_CAPABILITY_2: process.env.NEXT_PUBLIC_CAPABILITY_2,
  NEXT_PUBLIC_CAPABILITY_3: process.env.NEXT_PUBLIC_CAPABILITY_3,
  NEXT_PUBLIC_CAPABILITY_4: process.env.NEXT_PUBLIC_CAPABILITY_4,
  NEXT_PUBLIC_CAPABILITY_5: process.env.NEXT_PUBLIC_CAPABILITY_5,
  NEXT_PUBLIC_CAPABILITY_6: process.env.NEXT_PUBLIC_CAPABILITY_6,
  NEXT_PUBLIC_CAPABILITY_7: process.env.NEXT_PUBLIC_CAPABILITY_7,
  NEXT_PUBLIC_CAPABILITY_8: process.env.NEXT_PUBLIC_CAPABILITY_8,
};

export const SLOTS = {
  film: 8,
  photo: 30,
  capability: 8,
} as const;

/** Reads one variable, returning undefined for unset or whitespace-only values. */
export function read(key: string): string | undefined {
  const value = env[key];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Reads an indexed slot, e.g. slot("PHOTO", 3) → NEXT_PUBLIC_PHOTO_3. */
export function slot(prefix: string, index: number, suffix = ""): string | undefined {
  return read(`NEXT_PUBLIC_${prefix}_${index}${suffix ? `_${suffix}` : ""}`);
}

/** Splits a pipe-delimited record into trimmed fields: "A | B | C". */
export function fields(value: string): string[] {
  return value.split("|").map((part) => part.trim());
}

/** Splits a list written with `||` into paragraphs. */
export function paragraphs(value: string): string[] {
  return value
    .split("||")
    .map((part) => part.trim())
    .filter(Boolean);
}

/** Splits a comma-separated list, tolerating trailing separators. */
export function list(value: string): string[] {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}
