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

export interface Film {
  title: string;
  role: string;
  year: string;
  format: string;
  description: string;
  poster: string;
}

/** The headline film on the home page. An empty url hides the section. */
export interface Showreel {
  url: string;
  title: string;
  eyebrow: string;
  caption: string;
  poster: string;
}

/** Photography is filtered by what is in the frame, not where it was taken. */
export type PhotoCategory = "Nature" | "Events" | "People";

export interface Photo {
  id: string;
  title: string;
  category: PhotoCategory;
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
    portrait: string;
  };
  capabilities: Capability[];
  films: Film[];
  photos: Photo[];
  showreel: Showreel;
}
