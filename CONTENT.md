# Editing the site

Nothing on this site requires touching a React component. All the words and
pictures come from **environment variables** in Vercel, which flow through one
configuration layer into the pages:

```
Vercel environment variables
        ↓  config/env.ts        (reads the variables)
        ↓  config/content.ts    (turns them into structured data)
        ↓  content/defaults.ts  (fills in anything not set)
        ↓  components / sections
        ↓  the website
```

Every variable is optional. If you don't set one, the built-in default is used,
so the site can never break because something is missing.

---

## Changing something (the 60-second version)

1. Go to **vercel.com** → your project → **Settings** → **Environment Variables**.
2. Add or edit a variable from the list below. Apply it to *Production*,
   *Preview* and *Development*.
3. Go to **Deployments**, open the most recent one, click **⋯ → Redeploy**.
4. About a minute later the site is updated.

> Environment variables are baked in when the site builds, so a redeploy is
> always needed for a change to appear.

---

## How the values are written

Some variables hold several pieces of information in one line. They are split
on the vertical bar `|`, always in the same order:

```
NEXT_PUBLIC_PHOTO_1="Hanging In There | Philippines | 2023 | /images/butterfly.jpg | A Pipevine Swallowtail."
                     └─ title ──────┘   └─ place ─┘  └year┘  └── image ─────────┘  └── caption ───────────┘
```

- `|` separates the fields of one entry.
- `||` separates paragraphs inside long text (the about page, project stories).
- `,` separates a list of images.
- Leave a field empty if you don't want it: `Title | | 2024 | /images/x.jpg |`

**Images** can be either:
- a file in this repository: `/images/puffin.jpg`
- any web address: `https://…/photo.jpg`

---

## Adding a new photograph to the repository

1. On GitHub, open the `public/images` folder → **Add file → Upload files**.
2. Drop the photo in and commit.
3. Run `npm run blur` locally and commit the updated `content/media.json`. This
   generates the blurred placeholder and the correct proportions for the new
   image. (If you skip this the photo still works; it just fades in without a
   blur-up placeholder.)
4. Point a `NEXT_PUBLIC_PHOTO_n` variable at `/images/your-file.jpg`.

---

## The variables

### Identity

| Variable | What it is |
| --- | --- |
| `NEXT_PUBLIC_SITE_NAME` | Your name, used in the header monogram, titles and footer |
| `NEXT_PUBLIC_SITE_ROLE` | e.g. "Researcher & Camera Assistant" |
| `NEXT_PUBLIC_SITE_TAGLINE` | One sentence, shown top-right of the opening screen |
| `NEXT_PUBLIC_SITE_LOCATION` | e.g. "London, United Kingdom" |
| `NEXT_PUBLIC_SITE_EMAIL` | The address behind every "Contact" link |
| `NEXT_PUBLIC_SITE_URL` | The live domain (used for link previews) |
| `NEXT_PUBLIC_SITE_AVAILABILITY` | Short line above the email in the footer |

### Opening screen

| Variable | What it is |
| --- | --- |
| `NEXT_PUBLIC_HERO_HEADLINE` | Big type. Split into lines on `/`, e.g. `"Helena / Wreford"` |
| `NEXT_PUBLIC_HERO_IMAGE` | The full-screen opening photograph |

### Social links

`NEXT_PUBLIC_SOCIAL_INSTAGRAM`, `…_LINKEDIN`, `…_VIMEO`, `…_YOUTUBE`, `…_IMDB`.
Only the ones you fill in appear. Setting any of them replaces the default set.

### About page

| Variable | What it is |
| --- | --- |
| `NEXT_PUBLIC_ABOUT_INTRO` | The opening line of the about page |
| `NEXT_PUBLIC_ABOUT_BODY` | The story. Paragraphs separated by `\|\|` |
| `NEXT_PUBLIC_ABOUT_PORTRAIT` | The wide photograph under the title |
| `NEXT_PUBLIC_SHOWREEL_URL` | YouTube or Vimeo link; empty hides the section |
| `NEXT_PUBLIC_SHOWREEL_TITLE` | Heading over the player |
| `NEXT_PUBLIC_SHOWREEL_EYEBROW` | Small label above it, e.g. "Reel" |
| `NEXT_PUBLIC_SHOWREEL_CAPTION` | One line beside the label |
| `NEXT_PUBLIC_SHOWREEL_POSTER` | Still shown before the video is played |

### Film & TV: `NEXT_PUBLIC_FILM_1` … `NEXT_PUBLIC_FILM_8`

```
Title | Role | Year | Format | Poster image | Link | Description
```

Two optional companions per project:

- `NEXT_PUBLIC_FILM_1_STILLS`: extra images, comma separated
- `NEXT_PUBLIC_FILM_1_BODY`: the project story, paragraphs separated by `||`

Projects appear in number order, and each one gets its own page at
`/film/<title-as-a-web-address>`.

### Photography: `NEXT_PUBLIC_PHOTO_1` … `NEXT_PUBLIC_PHOTO_30`

```
Title | Category | Location | Year | Image | Caption
```

Locations become the filter buttons at the top of the photography page
automatically, with no separate list to maintain.

### Capabilities: `NEXT_PUBLIC_CAPABILITY_1` … `_8`

```
Title | Description
```

---

## One rule worth knowing

For the numbered lists (films, photographs, capabilities, timeline, awards,
socials): **if you set even one, the environment takes over completely** and the
built-in defaults for that list are ignored. This is deliberate: it stops you
ending up with a half-replaced list where two of your projects sit next to four
old ones. So when you start editing photographs, set all the ones you want.

---

## The journal

Journal entries are Markdown files in `_posts/`. Add a file, and it appears at
`/journal/<file-name>`:

```markdown
---
date: '2026-03-01T10:00:00.000Z'
title: The title
tagline: One line underneath it.
preview: >-
  The paragraph shown on the journal index.
image: /images/puffin.jpg
---

The body of the entry, in Markdown.
```

`image` is optional: leave it as `""` and the entry renders without a hero,
and as a text-only row on the journal index.
