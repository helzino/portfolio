/** Shared shape of every piece of content the site renders. */

export type Discipline = "film" | "photography";

/** "system" follows the visitor's operating system setting. */
export type ThemePreference = "dark" | "light" | "system";

export interface Social {
  label: string;
  href: string;
}

export interface Capability {
  title: string;
  description: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  organisation: string;
  detail: string;
}

export interface Award {
  title: string;
  detail: string;
  year: string;
}

export interface Film {
  slug: string;
  title: string;
  role: string;
  year: string;
  format: string;
  description: string;
  poster: string;
  link?: string;
  stills: string[];
  body: string[];
}

export interface Photo {
  id: string;
  title: string;
  location: string;
  year: string;
  src: string;
  caption: string;
}

export interface SiteContent {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  url: string;
  availability: string;
  defaultTheme: ThemePreference;
  heroHeadline: string[];
  heroImage: string;
  socials: Social[];
  about: {
    intro: string;
    body: string[];
    quote: string;
    portrait: string;
    quoteImage: string;
  };
  capabilities: Capability[];
  timeline: TimelineEntry[];
  awards: Award[];
  films: Film[];
  photos: Photo[];
}
