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
  defaultAwards,
  defaultCapabilities,
  defaultFilms,
  defaultPhotos,
  defaultSite,
  defaultSocials,
  defaultTimeline,
} from "@/content/defaults";
import { SLOTS, fields, list, paragraphs, read, slot } from "@/config/env";
import { slugify } from "@/lib/slugify";
import type {
  Award,
  Capability,
  Film,
  Photo,
  SiteContent,
  Social,
  ThemePreference,
  TimelineEntry,
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
// NEXT_PUBLIC_FILM_n = Title | Role | Year | Format | Poster | Link | Description
const envFilms = collect<Film>("FILM", SLOTS.film, (value, index) => {
  const parts = fields(value);
  const title = at(parts, 0);
  if (!title) return null;
  const stills = slot("FILM", index, "STILLS");
  const body = slot("FILM", index, "BODY");
  return {
    slug: slugify(title),
    title,
    role: at(parts, 1),
    year: at(parts, 2),
    format: at(parts, 3),
    poster: at(parts, 4),
    link: at(parts, 5) || undefined,
    description: at(parts, 6),
    stills: stills ? list(stills) : [],
    body: body ? paragraphs(body) : [],
  };
});

// ── Photographs ─────────────────────────────────────────────────────────────
// NEXT_PUBLIC_PHOTO_n = Title | Location | Year | Image | Caption
const envPhotos = collect<Photo>("PHOTO", SLOTS.photo, (value, index) => {
  const parts = fields(value);
  const src = at(parts, 3);
  if (!src) return null;
  return {
    id: String(index),
    title: at(parts, 0),
    location: at(parts, 1),
    year: at(parts, 2),
    src,
    caption: at(parts, 4),
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

// ── Timeline ────────────────────────────────────────────────────────────────
// NEXT_PUBLIC_TIMELINE_n = Period | Title | Organisation | Detail
const envTimeline = collect<TimelineEntry>("TIMELINE", SLOTS.timeline, (value) => {
  const parts = fields(value);
  const title = at(parts, 1);
  return title
    ? {
        period: at(parts, 0),
        title,
        organisation: at(parts, 2),
        detail: at(parts, 3),
      }
    : null;
});

// ── Awards ──────────────────────────────────────────────────────────────────
// NEXT_PUBLIC_AWARD_n = Title | Detail | Year
const envAwards = collect<Award>("AWARD", SLOTS.award, (value) => {
  const parts = fields(value);
  const title = at(parts, 0);
  return title ? { title, detail: at(parts, 1), year: at(parts, 2) } : null;
});

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
    quote: read("NEXT_PUBLIC_ABOUT_QUOTE") ?? defaultAbout.quote,
    portrait: read("NEXT_PUBLIC_ABOUT_PORTRAIT") ?? defaultAbout.portrait,
    quoteImage: read("NEXT_PUBLIC_ABOUT_QUOTE_IMAGE") ?? defaultAbout.quoteImage,
  },
  capabilities: envCapabilities.length > 0 ? envCapabilities : defaultCapabilities,
  timeline: envTimeline.length > 0 ? envTimeline : defaultTimeline,
  awards: envAwards.length > 0 ? envAwards : defaultAwards,
  films: envFilms.length > 0 ? envFilms : defaultFilms,
  photos: envPhotos.length > 0 ? envPhotos : defaultPhotos,
};

export function filmBySlug(slug: string): Film | undefined {
  return site.films.find((film) => film.slug === slug);
}

/** Ordered neighbours for previous / next project navigation. */
export function filmNeighbours(slug: string): { previous: Film; next: Film } | null {
  const index = site.films.findIndex((film) => film.slug === slug);
  if (index < 0 || site.films.length < 2) return null;
  const previous = site.films[(index - 1 + site.films.length) % site.films.length];
  const next = site.films[(index + 1) % site.films.length];
  return { previous, next };
}
