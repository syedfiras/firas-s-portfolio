# Syed Firas Peerzade — Portfolio

A scroll-driven, cinematic portfolio built with Next.js 15 (App Router), TypeScript,
Tailwind CSS v4, GSAP + ScrollTrigger, and Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 · App Router · React 19 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | GSAP 3 (`ScrollTrigger`, `SplitText`) |
| Smooth scroll | Lenis |
| Micro-interactions | Framer Motion (mobile nav), GSAP (everything else) |
| Icons | lucide-react + a few hand-rolled SVGs (`components/icons.tsx`) |
| Fonts | Anton (display) · Manrope (sans) · JetBrains Mono (mono) via `next/font` |

---

## Animation architecture

### 1. One clock: Lenis → GSAP

`src/lib/lenis.tsx` owns the scroll engine:

- Creates a single `Lenis` instance.
- Forwards `lenis.on('scroll', ScrollTrigger.update)` so triggers read virtual scroll.
- Drives Lenis' RAF from `gsap.ticker` (no double `requestAnimationFrame`, no jitter).
- Re-measures with `ScrollTrigger.refresh()` after webfonts and a 600 ms settle.
- Under `prefers-reduced-motion` no Lenis instance is created — the page falls back to
  native scrolling.

`useLenis()` exposes `scrollTo(target, options)` for nav links, the hero CTA and
"back to top".

### 2. Three media conditions

`src/lib/motion.ts` defines the conditions every section uses through
`gsap.matchMedia()`:

| Key | Query | Behaviour |
| --- | --- | --- |
| `full` | `min-width: 1024px` + motion allowed | Pinning, scrubbing, horizontal tracks |
| `lite` | `max-width: 1023px` + motion allowed | Simplified, no pinning, fade/rise on enter |
| `reduce` | `prefers-reduced-motion: reduce` | Static content, instant visibility |

Every section registers `mm.add(...)` handlers and returns a cleanup that kills its
own ScrollTriggers. `gsap.context()` scopes and reverts everything on unmount.

### 3. Intro choreography

`src/lib/intro.ts` is a tiny event bus (`site:loaded`):

1. `Loader.tsx` locks scroll, counts `000 → 100`, wipes the curtain up.
2. It calls `markIntroDone()`, which sets `<html data-loaded="true">` and dispatches
   the event.
3. `Hero.tsx` and `Nav.tsx` subscribe with `onIntroDone()` — so the name reveal and
   nav entrance start exactly when the curtain clears (and immediately if the intro
   already finished, e.g. on client-side navigation).

### 4. Section-by-section

| Section | File | Motion |
| --- | --- | --- |
| Hero | `sections/Hero.tsx` | Pinned `+=200%`; letters spread, name scales + fades, clip-path photo expands from a pill to full-bleed then recedes; Build/Create/Impact reveal on scrub |
| Identity | `sections/Identity.tsx` | Pinned scrub filling statement words from 15% → 100% opacity; count-up stats |
| Services | `sections/Services.tsx` | Pinned horizontal track; each card brightens at center and dims at the edges via `containerAnimation` |
| Featured | `sections/FeaturedProject.tsx` | Pin + image zoom-out scrub, content reveals early, letter-spacing settles |
| Experience | `sections/Experience.tsx` | Self-drawing vertical line tied to scroll progress; split-line heading |
| Toolkit | `sections/Toolkit.tsx` | Two opposing marquees, velocity-linked to scroll |
| Selected Work | `sections/SelectedWork.tsx` | Sticky stacked cards: previous card scales to 0.92 and dims; inner image parallax |
| Certs | `sections/Certs.tsx` | Reveal-on-enter rows with hover-expanding tags |
| Beyond | `sections/Beyond.tsx` | Warm palette, alternating horizontal parallax |
| Activity | `sections/GithubActivity.tsx` | Contribution heatmap with a wave-in reveal |
| Contact | `sections/Contact.tsx` | Accent "good" underline, magnetic mailto, oversized name watermark |

### 5. Shared primitives (`components/ui/`)

- **`SplitText`** — wraps GSAP `SplitText`, splits by chars/words/lines, masks lines.
- **`Reveal`** — fade/rise on enter, respects reduced motion.
- **`Marquee`** — seamless looping rows, scroll-velocity aware.
- **`Magnetic`** — pointer-attracted wrapper for CTAs.
- **`Cursor`** — custom dot + ring, desktop fine-pointer only (`body[data-cursor="on"]`).
- **`ProgressBar`** — hairline progress + `NN / 11` section counter from `SECTIONS`.
- **`Particles`** — dependency-free canvas particles behind the hero.

### 6. Performance notes

- ScrollTriggers are created inside `gsap.matchMedia`, so they never run on the
  wrong breakpoint.
- `ScrollTrigger.config({ ignoreMobileResize: true })` prevents iOS URL-bar resize
  thrash from re-pinning sections.
- Images use `next/image` with explicit `sizes`; the portrait and OG image are
  downscaled to 1200 px.
- The `/api/github` route scrapes the public contribution calendar and caches for
  24 h (`revalidate = 86400`), with a deterministic fallback grid if the request
  fails.

---

## Editing content

All copy lives in `src/data/` — no JSX changes needed for content updates.

| File | Contains |
| --- | --- |
| `data/profile.ts` | Name, role, email, socials, resume path, nav items, section registry, hero words, stats, bio, snapshot rows, contact links |
| `data/projects.ts` | `PROJECTS` (selected work cards) and `FEATURED_PROJECT` |
| `data/caseStudies.ts` | Long-form case study per project slug (`problem`, `solution`, `role`, `features`, `challenge`, `result`) |
| `data/experience.ts` | Roles, companies, periods, bullets |
| `data/services.ts` | Six capability cards + two toolkit marquee rows |
| `data/certs.ts` | Certifications, education, and "Beyond the Screen" items |
| `data/github.ts` | Contribution types, fallback snapshot generator, HTML parser |

### Common edits

**Add a project**

1. Add an entry to `PROJECTS` in `data/projects.ts` (unique `slug`, `id`, `image`).
2. Drop the image in `public/projects/`.
3. Add a matching `CASE_STUDIES[slug]` entry in `data/caseStudies.ts`.
4. `/projects` and `/projects/[slug]` pick it up automatically (`generateStaticParams`).

**Change the featured project** — edit `FEATURED_PROJECT` in `data/projects.ts`
(`eyebrow` is the section label, `slug` must exist in `PROJECTS`).

**Add/reorder sections** — the order lives in `Portfolio.tsx`; the counter and
landmarks come from `SECTIONS` in `data/profile.ts` (keep both in sync).

**Change the accent** — `--color-accent` in `src/app/globals.css`.

---

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx            fonts, metadata, JSON-LD, LenisProvider, Cursor, grain
│  ├─ page.tsx              renders <Portfolio/>
│  ├─ globals.css           design tokens + component classes
│  ├─ api/github/route.ts   cached contribution scrape + fallback
│  ├─ projects/             archive + SSG case studies
│  ├─ sitemap.ts · robots.ts
├─ components/
│  ├─ Portfolio.tsx         loader, nav, progress, 11 sections
│  ├─ Loader.tsx · Nav.tsx · ProjectsGrid.tsx
│  ├─ sections/             one file per scroll section
│  └─ ui/                   SplitText, Reveal, Marquee, Magnetic, Cursor, …
├─ data/                    typed content (single source of truth)
└─ lib/                     gsap registration, Lenis provider, media, intro bus
```

## Accessibility

- Skip link to `#main`, semantic landmarks, labelled sections and controls.
- `prefers-reduced-motion` disables Lenis, pinning, parallax and the custom cursor.
- Focus-visible rings use the accent colour; the mobile menu closes on `Escape`.
- The custom cursor is only enabled for fine pointers on hover-capable devices.
