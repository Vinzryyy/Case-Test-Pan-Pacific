# Pan Pacific — Travel Inspiration

A responsive marketing page built as a front-end case study: Pan Pacific Hotels' editorial homepage — trending destinations, editor's pick, a filterable travel-story feed, persona-based experiences, and an interactive destinations explorer.

> **Live demo:** _add Vercel/Netlify URL here after deploy_

## Highlights

- Pixel-close recreation of a multi-section editorial layout from scratch — no UI library, no CSS framework.
- Fully responsive: two deliberate breakpoints (`≤1080px` tablet, `≤720px` mobile) plus fluid `clamp()` typography for everything in between.
- **Full-screen hero** on desktop with a swipeable carousel — 4 distinct travel guides, keyboard (← →), touch swipe, and dot navigation, all cross-faded.
- **Filterable journey grid**: click a category (Road Trips, Photo Journal, Romantic…) and the card track updates live; ← → arrow buttons scroll the row horizontally with snap-scroll.
- **Persona-switching experiences section**: one click on For Couples / For Family / For Business swaps the hero image, title, description, and all 3 cards.
- **Interactive destinations explorer**: click a country and the feature image swaps in sync. Mobile variant is a swipe carousel instead of a stacked list.
- **Side-drawer navigation menu** with serif Playfair Display links that smooth-scroll to real page sections (`#trending`, `#journey`, `#destinations`, etc.).
- **Accessibility**: semantic landmarks, `aria-pressed` / `aria-selected` / `aria-controls`, keyboard support on the hero carousel and drawer (Esc to close), focus-visible states, `prefers-reduced-motion` handling on transitions.
- **Performance**: `loading="lazy"` + `decoding="async"` on off-screen images, font `preconnect`, hidden scrollbars on carousels, zero runtime dependencies beyond React.

## Tech stack

- **React 19** + **Vite 8** (JSX, functional components, hooks: `useState`, `useRef`, `useEffect`)
- **Vanilla CSS** with custom properties, `clamp()`, CSS grid, flexbox, `aspect-ratio`, scroll-snap
- **Google Fonts** (Playfair Display + Instrument Sans) loaded via `preconnect`
- **ESLint 9** with React Hooks + React Refresh plugins

## Project structure

```
src/
├── App.jsx                   # page composition, one section per component
├── App.css                   # all section styles (single file, token-driven)
├── index.css                 # tokens, resets, global typography
├── main.jsx                  # React entry
├── constants/
│   └── data.js               # every array of content: hero slides, trending,
│                             #   journey cards, experience categories,
│                             #   destinations, menu links, footer brands
└── components/
    ├── Header.jsx            # utility bar + nav + side-drawer menu (useState)
    ├── Hero.jsx              # swipeable 4-slide carousel (useRef + touch events)
    ├── Trending.jsx
    ├── EditorsPick.jsx
    ├── Journey.jsx           # filter state + scroll-by-arrow card rail
    ├── Experiences.jsx       # tab state drives hero + cards
    ├── Destinations.jsx      # active-country state drives right-hand image
    └── Footer.jsx
```

Static assets (hero, logos, destination imagery) live under `public/`.

## Interactive features

| Feature | File | State |
|---|---|---|
| Side-drawer menu open/close | `components/Header.jsx` | `useState` + `useEffect` (Esc key, body scroll lock) |
| Hero carousel | `components/Hero.jsx` | `useState` index + `useRef` touch start X |
| Journey filter | `components/Journey.jsx` | `useState` active filter → derived `visibleCards` |
| Journey ← → arrow scroll | `components/Journey.jsx` | `useRef` on scroll container, `scrollBy` smooth |
| Experience tab swap | `components/Experiences.jsx` | `useState` active category id |
| Destinations swap | `components/Destinations.jsx` | `useState` active destination name |

Every interaction is accessible via keyboard alone (Tab + Enter / Space / arrow keys) and respects `prefers-reduced-motion`.

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

- **No CSS framework.** Chose raw CSS to demonstrate fluency with custom properties, `clamp()`, grid/flex, `aspect-ratio`, and scroll-snap rather than lean on Tailwind utilities.
- **Single `App.css`.** Kept colocated for this scope; the next step at production size would be per-component CSS modules.
- **Data in `src/constants/data.js`.** Chosen over colocating data in each component so swapping to a CMS later is a one-file change.
- **`minmax(0, 1fr)` everywhere** instead of `1fr` on grid columns that collapse on mobile. Prevents content (long filter rows, wide flex children) from growing the track beyond the viewport — a common responsive CSS-grid gotcha.
- **Pseudo-element card link pattern** on the romantic cards: the `<a>` on the title extends its hit area via `::after { inset: 0 }` so the whole card is clickable without wrapping all the meta/tags inside one giant link announcement for screen readers.
- **Mobile nav / destination lists are duplicate markup** rather than conditionally rendered. Lets CSS media queries own the breakpoint logic without JS layout thrash and avoids hydration flicker.

## Follow-ups

- Convert large PNG/JPG sources to WebP (`HomePage.jpg`, `ausie.png`, trending card art).
- Replace the 6.8 KB thumbnail `public/Destination/Canada.jpg` with an HD source.
- Add a Vitest + React Testing Library suite (start with the destinations click-to-swap and Journey arrow-scroll).
- `IntersectionObserver`-driven fade-in on section reveal.
- Wire the hero filter bar ("Who's exploring" / "Your journey to") and the utility-bar search icon to real state / modal.
- Migrate to TypeScript for additional type safety.

---

Built by Vinzryyy.
