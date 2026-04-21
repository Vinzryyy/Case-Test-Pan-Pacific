# Pan Pacific — Travel Inspiration

A responsive marketing page built as a front-end case study: Pan Pacific Hotels' editorial homepage — trending destinations, editor's pick, curated journeys, experiences, and an interactive destinations explorer.

> **Live demo:** _add Vercel/Netlify URL here after deploy_


## Highlights

- Pixel-close recreation of a multi-section editorial layout from scratch — no UI library.
- Fully responsive with two deliberate breakpoints (`≤1080px` tablet, `≤720px` mobile) plus mobile-specific layouts (horizontal scroll rails, stacked destination cards, accordion footer).
- **Interactive destinations explorer**: click a country and the feature image + active state update in sync (`src/components/Destinations.jsx`).
- Heading typography via Google Fonts (Playfair Display + Instrument Sans), with graceful system-font fallbacks.
- Accessibility: semantic landmarks (`header`, `main`, `nav`, `footer`), `aria-label` / `aria-pressed` / `aria-hidden` applied where appropriate, focus-visible buttons.
- Performance: `loading="lazy"` and `decoding="async"` on off-screen images, font `preconnect`, CSS-only card backgrounds on the hero/experience sections to avoid extra HTTP requests.

## Tech stack

- **React 19** + **Vite 8** (JSX, functional components, hooks)
- **Vanilla CSS** with custom properties (no framework, no preprocessor)
- **ESLint 9** with React Hooks + React Refresh plugins

## Project structure

```
src/
├── App.jsx              # page composition, nothing more
├── App.css              # all section styles
├── index.css            # tokens, resets, global typography
├── main.jsx             # React entry
├── constants/
│   └── data.js          # every array of content (trending, journeys, destinations, footer…)
└── components/
    ├── Header.jsx
    ├── Hero.jsx
    ├── Trending.jsx
    ├── EditorsPick.jsx
    ├── Journey.jsx
    ├── Experiences.jsx
    ├── Destinations.jsx  # useState for the active country
    └── Footer.jsx
```

Static assets (hero, logos, destination imagery) live under `public/`.

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production bundle in dist/
npm run preview # serve the built bundle locally
npm run lint    # ESLint
```

Requires Node 18+.

## Deploy

The app is a static Vite SPA — any static host works.

**Vercel (recommended)**

1. Push the repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset **Vite** is auto-detected. `npm run build` → `dist/`. Click deploy.

**Netlify**

1. Push to GitHub.
2. [app.netlify.com/start](https://app.netlify.com/start), pick the repo.
3. Build command `npm run build`, publish directory `dist`.

## Design decisions / trade-offs

- **No CSS framework.** Wanted to demonstrate fluency with raw CSS (custom properties, `clamp()`, grid/flex, `aspect-ratio`) rather than lean on Tailwind utilities.
- **Single `App.css`.** Kept colocated for this scope; the next step at real production size would be to split per-component CSS modules.
- **Data in `src/constants/data.js`.** Chosen over colocating data in each component so swapping to a CMS later is a one-file change.
- **Mobile nav/destination lists are duplicated markup rather than conditional rendering.** Lets CSS media queries own the breakpoint logic without JS layout thrash, and avoids hydration flicker.

## Follow-ups

- Wire the hero carousel dots and menu button to real state/drawers.
- Convert the large PNG/JPG sources to WebP (especially `HomePage.jpg`, `ausie.png`, the trending card art).
- Replace the 6.8 KB thumbnail `public/Destination/Canada.jpg` with an HD source.
- Add a Vitest + React Testing Library suite (start with the destinations click-to-swap behaviour).
- `IntersectionObserver`-driven fade-in on section reveal.

---

Built by Vinzryyy.
