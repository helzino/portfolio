/**
 * The content configuration layer.
 *
 *   Environment variables → this file → structured data → components
 *
 * Components never read `process.env`. They import `site` from here, so
 * changing what the site says is a configuration change, not a code change.
 * Anything the environment does not define falls back to content/defaults.ts,
 * which means a missing variable can never break a page.
 *
 * Collections (films, photos, capabilities, timeline, awards, socials) follow
 * one rule: if the environment defines *any* entry, the environment wins
 * outright and the defaults are ignored — so the owner never ends up with a
 * half-replaced list.
 */
import {
  defaultAbout,
  defaultCapabilities,
  defaultFilms,
  defaultPhotos,
  defaultShowreel,
  defaultSite,
  defaultSocials,
} from "@/content/defaults";
import { SLOTS, fields, paragraphs, read, slot } from "@/config/env";
import type {
  Capability,
  Film,
  Photo,
  PhotoCategory,
  SiteContent,
  Social,
  ThemePreference,
} from "@/config/types";

/** Collects every defined slot in a numbered series and maps it to a record. */
function collect<T>(
  prefix: string,
  count: number,
  map: (value: string, index: number) => T | null
): T[] {
  const out: T[] = [];
  for (let i = 1; i <= count; i += 1) {
    const value = slot(prefix, i);
    if (!value) continue;
    const record = map(value, i);
    if (record) out.push(record);
  }
  return out;
}

const at = (parts: string[], index: number): string => parts[index]?.trim() ?? "";

// ── Films ───────────────────────────────────────────────────────────────────
// NEXT_PUBLIC_FILM_n = Title | Role | Year | Format | Poster | Description
const envFilms = collect<Film>("FILM", SLOTS.film, (value) => {
  const parts = fields(value);
  const title = at(parts, 0);
  if (!title) return null;
  return {
    title,
    role: at(parts, 1),
    year: at(parts, 2),
    format: at(parts, 3),
    poster: at(parts, 4),
    description: at(parts, 5),
  };
});

// ── Photographs ─────────────────────────────────────────────────────────────
// NEXT_PUBLIC_PHOTO_n = Title | Category | Location | Year | Image | Caption
const envPhotos = collect<Photo>("PHOTO", SLOTS.photo, (value, index) => {
  const parts = fields(value);
  const src = at(parts, 4);
  if (!src) return null;
  const category = at(parts, 1);
  return {
    id: String(index),
    title: at(parts, 0),
    category: (["Nature", "Events", "People"].includes(category)
      ? category
      : "Nature") as PhotoCategory,
    location: at(parts, 2),
    year: at(parts, 3),
    src,
    caption: at(parts, 5),
  };
});

// ── Capabilities ────────────────────────────────────────────────────────────
// NEXT_PUBLIC_CAPABILITY_n = Title | Description
const envCapabilities = collect<Capability>(
  "CAPABILITY",
  SLOTS.capability,
  (value) => {
    const parts = fields(value);
    const title = at(parts, 0);
    return title ? { title, description: at(parts, 1) } : null;
  }
);

// ── Socials ─────────────────────────────────────────────────────────────────
const socialSources: Social[] = [
  { label: "Instagram", href: read("NEXT_PUBLIC_SOCIAL_INSTAGRAM") ?? "" },
  { label: "LinkedIn", href: read("NEXT_PUBLIC_SOCIAL_LINKEDIN") ?? "" },
  { label: "Vimeo", href: read("NEXT_PUBLIC_SOCIAL_VIMEO") ?? "" },
  { label: "YouTube", href: read("NEXT_PUBLIC_SOCIAL_YOUTUBE") ?? "" },
  { label: "IMDb", href: read("NEXT_PUBLIC_SOCIAL_IMDB") ?? "" },
];
const envSocials = socialSources.filter((social) => social.href.length > 0);

// Which way round the site opens. A visitor's own choice, once they make one,
// always wins over this.
const themeSetting = read("NEXT_PUBLIC_DEFAULT_THEME")?.toLowerCase();
const defaultTheme: ThemePreference =
  themeSetting === "light" || themeSetting === "system" ? themeSetting : "dark";

const heroHeadline = read("NEXT_PUBLIC_HERO_HEADLINE");
const aboutBody = read("NEXT_PUBLIC_ABOUT_BODY");

export const site: SiteContent = {
  name: read("NEXT_PUBLIC_SITE_NAME") ?? defaultSite.name,
  role: read("NEXT_PUBLIC_SITE_ROLE") ?? defaultSite.role,
  tagline: read("NEXT_PUBLIC_SITE_TAGLINE") ?? defaultSite.tagline,
  location: read("NEXT_PUBLIC_SITE_LOCATION") ?? defaultSite.location,
  email: read("NEXT_PUBLIC_SITE_EMAIL") ?? defaultSite.email,
  url: read("NEXT_PUBLIC_SITE_URL") ?? defaultSite.url,
  availability: read("NEXT_PUBLIC_SITE_AVAILABILITY") ?? defaultSite.availability,
  defaultTheme,
  heroHeadline: heroHeadline
    ? heroHeadline
        .split("/")
        .map((part) => part.trim())
        .filter(Boolean)
    : defaultSite.heroHeadline,
  heroImage: read("NEXT_PUBLIC_HERO_IMAGE") ?? defaultSite.heroImage,
  socials: envSocials.length > 0 ? envSocials : defaultSocials,
  about: {
    intro: read("NEXT_PUBLIC_ABOUT_INTRO") ?? defaultAbout.intro,
    body: aboutBody ? paragraphs(aboutBody) : defaultAbout.body,
    portrait: read("NEXT_PUBLIC_ABOUT_PORTRAIT") ?? defaultAbout.portrait,
    previewImage:
      read("NEXT_PUBLIC_ABOUT_PREVIEW_IMAGE") ?? defaultAbout.previewImage,
  },
  capabilities: envCapabilities.length > 0 ? envCapabilities : defaultCapabilities,
  films: envFilms.length > 0 ? envFilms : defaultFilms,
  photos: envPhotos.length > 0 ? envPhotos : defaultPhotos,
  showreel: {
    url: read("NEXT_PUBLIC_SHOWREEL_URL") ?? defaultShowreel.url,
    title: read("NEXT_PUBLIC_SHOWREEL_TITLE") ?? defaultShowreel.title,
    eyebrow: read("NEXT_PUBLIC_SHOWREEL_EYEBROW") ?? defaultShowreel.eyebrow,
    caption: read("NEXT_PUBLIC_SHOWREEL_CAPTION") ?? defaultShowreel.caption,
    poster: read("NEXT_PUBLIC_SHOWREEL_POSTER") ?? defaultShowreel.poster,
  },
};

/** Ordered neighbours for previous / next project navigation. */
