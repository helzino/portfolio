# Helena Wreford: portfolio

A photographic exhibition as a website: film & television work and photography,
built as one immersive experience.

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **three.js / React Three Fiber**: hero image shader, image-to-image transitions
- **GSAP + ScrollTrigger**: pinned horizontal gallery, scroll choreography
- **Lenis**: smooth scrolling, tied into the GSAP ticker
- **Motion**: page transitions and overlays
- **Tailwind v4 tokens + hand-written CSS**: an editorial type and layout system

Content is edited through environment variables, not code. See **[CONTENT.md](./CONTENT.md)**.

---

## Running it locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

Other scripts:

```bash
npm run lint         # eslint
npm run blur         # regenerate blur placeholders after adding images
```

---

## Deploying to Vercel

### First time

1. Push this repository to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repository.
   Vercel detects Next.js, so leave every build setting as it is.
3. Before the first deploy, open **Environment Variables** and add anything you
   want to override (see the list below, and `.env.example` in this repo).
   Nothing is required: with no variables set at all, the site builds and runs
   on the built-in content.
4. **Deploy.**

### Adding the environment variables

In the project: **Settings → Environment Variables**. For each one:

- **Key**: e.g. `NEXT_PUBLIC_SITE_EMAIL`
- **Value**: e.g. `helenawreford@live.com` (no quotes needed in the Vercel UI)
- **Environments**: tick **Production**, **Preview** and **Development**

The variables worth setting first:

```
NEXT_PUBLIC_SITE_NAME          Helena Wreford
NEXT_PUBLIC_SITE_ROLE          Filmmaker & Photographer
NEXT_PUBLIC_SITE_TAGLINE       Wildlife storytelling for screen and print…
NEXT_PUBLIC_SITE_LOCATION      London, United Kingdom
NEXT_PUBLIC_SITE_EMAIL         helenawreford@live.com
NEXT_PUBLIC_SITE_URL           https://helenawreford.com
NEXT_PUBLIC_SITE_AVAILABILITY  Available for commissions and crew work
NEXT_PUBLIC_HERO_HEADLINE      Helena / Wreford
NEXT_PUBLIC_HERO_IMAGE         /images/PUFFIN.jpg
NEXT_PUBLIC_SOCIAL_INSTAGRAM   https://www.instagram.com/helswreford/
NEXT_PUBLIC_SOCIAL_LINKEDIN    https://www.linkedin.com/in/hels-wreford-2500971b1/
```

Then the numbered ones for the work itself: `NEXT_PUBLIC_FILM_1…8`,
`NEXT_PUBLIC_PHOTO_1…30`, `NEXT_PUBLIC_CAPABILITY_1…8`,
`NEXT_PUBLIC_TIMELINE_1…8`, `NEXT_PUBLIC_AWARD_1…6`. Their formats are
documented in [CONTENT.md](./CONTENT.md).

### After changing a variable

`NEXT_PUBLIC_*` values are baked in at build time, so a change only appears once
the site is rebuilt:

**Deployments → most recent → ⋯ → Redeploy.**

(Leave "Use existing build cache" unticked if a change doesn't show up.)

### Custom domain

**Settings → Domains → Add**, then point the domain's DNS at Vercel as
instructed. Set `NEXT_PUBLIC_SITE_URL` to the same address so link previews and
social cards resolve correctly.

---

## How the code is organised

```
app/          routes: one folder per page, plus the shared layout
sections/     the large composed blocks of a page (hero, disciplines, …)
components/
  chrome/     nav, footer, cursor, preloader, smooth scroll
  media/      image frame, reveal, masked text, parallax, horizontal gallery
  photography/ the wall and the full-screen viewer
  webgl/      three.js canvases: isolated from the rest of the UI
  work/       the film index list
  ui/         small shared pieces
shaders/      GLSL for the hero and the image transitions
config/       env registry, content configuration layer, types, nav
content/      default content + generated image metadata
lib/          posts, media lookup, hooks, scroll store
styles/       the design system: tokens, type scale, layout, components
scripts/      npm run blur: blur placeholder generation
_posts/       journal entries as Markdown
```

The rule: components never read `process.env`. They read `config/content.ts`,
which is the only place the environment is turned into structured data.

---

## Accessibility & performance notes

- Every page is statically generated; images go through the Next.js optimiser as
  AVIF/WebP, with blur-up placeholders and aspect-ratio containers (no layout shift).
- WebGL is lazy-loaded, never server-rendered, pauses when off screen, and always
  sits behind a real `<img>` so the photograph appears even if the shader doesn't.
- `prefers-reduced-motion` disables smooth scrolling, the preloader, the pinned
  horizontal gallery, parallax and the shader transitions.
- The custom cursor only exists for fine pointers, and every element it responds
  to is a real link or button underneath.
- Semantic landmarks, a skip link, visible focus rings, keyboard-driven photo
  viewer (arrows, Escape) and alt text throughout.

---

## The previous site

The original Next 12 template lives in `.legacy/` (git-ignored) and in the git
history. Photography, biography, project details and the journal entries were
carried across; the design was not.
