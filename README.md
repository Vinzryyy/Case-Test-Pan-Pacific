# Pan Pacific — Fullstack Travel Guide

A travel-editorial single-page app with a Go API and Postgres backing store. Started as a pixel-close front-end recreation of Pan Pacific's homepage, extended into a fullstack project: the hero carousel, journey feed, destinations explorer, and newsletter form are now served from a real API.

> **Live:** https://pan-pacific.netlify.app
> **API:** https://case-test-pan-pacific.onrender.com

---

## Architecture

```
   ┌──────────────────┐    HTTPS / JSON    ┌──────────────────┐
   │   Netlify        │ ─────────────────► │   Render         │
   │   Vite + React   │ ◄───────────────── │   Go + chi       │
   │   (static SPA)   │    CORS allowed    │   (container)    │
   └──────────────────┘                    └────────┬─────────┘
                                                    │ pgxpool
                                                    │ (sslmode=require)
                                                    ▼
                                           ┌──────────────────┐
                                           │   Supabase       │
                                           │   Postgres 16    │
                                           │   (session pool) │
                                           └──────────────────┘
```

- Frontend and backend are separately deployed; the browser talks directly to the API over CORS.
- Supabase is accessed via the session-mode pooler on port **5432** (transaction mode on 6543 breaks pgx prepared statements).
- Env var `VITE_API_URL` is baked into the Vite bundle at build time; `CORS_ORIGINS` on the API whitelists the Netlify origin.

---

## Tech stack

### Backend (`backend/`)
- **Go 1.25** with `chi/v5` router
- **pgx/v5** with `pgxpool` — typed connection pool, 5 s query context timeouts
- **log/slog** for structured JSON logs (method, path, status, duration)
- **godotenv** to auto-load `.env` in dev
- Typed env config (`internal/config`), no viper
- Middleware: RequestID → RealIP → Logger → Recoverer (panic → 500 JSON) → CORS → 30 s timeout
- Graceful shutdown via `signal.NotifyContext` + `srv.Shutdown(10s)`
- Multi-stage Dockerfile → `gcr.io/distroless/static-debian12:nonroot`

### Frontend (`src/`)
- **React 19** + **Vite 8**
- Vanilla CSS (custom properties, `clamp()`, grid, scroll-snap) — no Tailwind, no component library
- `import.meta.env.VITE_API_URL` drives the API client in `src/api.js`
- Google Fonts via `preconnect`
- `loading="lazy"` + `decoding="async"` on off-screen media

### Data
- **Postgres 16** (Supabase in prod, Docker Compose in dev)
- 4 tables: `hero_slides`, `destinations`, `journeys`, `newsletter_subscribers`
- Migrations are raw SQL in `backend/migrations/` (applied manually in Supabase SQL Editor; `docker-entrypoint-initdb.d` in local Docker)

### Deployment
- **Netlify** — Vite static build
- **Render** — Dockerfile-based web service
- **Supabase** — hosted Postgres
- **GitHub** — pushing to `main` triggers both Netlify and Render rebuilds

---

## API reference

Base URL: `https://case-test-pan-pacific.onrender.com`

| Method | Path | Query | Response |
|---|---|---|---|
| `GET` | `/healthz` | — | `{ status, db }` |
| `GET` | `/api/hero-slides` | — | `[{ id, spotlight, location, title, tags[], image }]` |
| `GET` | `/api/destinations` | `?q=search` | `[{ id, name, image }]` |
| `GET` | `/api/journeys` | `?category=X` | `[{ id, category, location, title, image }]` |
| `POST` | `/api/newsletter` | body: `{ email }` | `201 { status: "subscribed" }` / `400` on invalid email |

All GETs have a 5 s DB-query timeout. Newsletter POST validates with a regex and upserts with `ON CONFLICT (email) DO NOTHING`.

---

## Project structure

```
.
├── backend/
│   ├── cmd/api/main.go         # entry: router + middleware + graceful shutdown
│   ├── internal/
│   │   ├── config/             # env-driven typed config
│   │   ├── database/           # pgxpool bootstrap (max 10, min 1, 1 h lifetime)
│   │   ├── handlers/           # one file per endpoint + tests
│   │   └── middleware/         # logger, recoverer, CORS + tests
│   ├── migrations/             # 001_init + 002_seed, .up.sql / .down.sql
│   ├── Dockerfile              # multi-stage → distroless nonroot
│   ├── docker-compose.yml      # local Postgres 16 with auto-seed
│   └── Makefile                # run / build / test / db-up/down
│
├── src/
│   ├── api.js                  # fetch helpers + newsletter POST
│   ├── App.jsx                 # page composition
│   ├── components/
│   │   ├── Hero.jsx            # API-backed carousel (/api/hero-slides)
│   │   ├── Journey.jsx         # API-backed filtered feed (/api/journeys)
│   │   ├── Destinations.jsx    # API-backed explorer (/api/destinations)
│   │   ├── Footer.jsx          # real form → POST /api/newsletter
│   │   ├── Trending.jsx        # still static (data.js)
│   │   ├── EditorsPick.jsx     # still static (data.js)
│   │   ├── Experiences.jsx     # still static (data.js)
│   │   └── Header.jsx
│   └── constants/data.js       # static content for the 4 unmigrated sections
│
├── .env.example                # frontend (VITE_API_URL)
├── backend/.env.example        # backend (DATABASE_URL + others)
└── README.md
```

---

## Run locally

Requires Node 18+, Go 1.25+, Docker.

### 1. Backend + Postgres

```bash
cd backend
cp .env.example .env
make db-up                 # starts Postgres 16 in Docker, auto-applies migrations
go run ./cmd/api           # auto-loads .env via godotenv, listens on :8080
```

Verify:
```bash
curl http://localhost:8080/healthz          # {"status":"ok","db":true}
curl http://localhost:8080/api/destinations # 5 seeded rows
```

### 2. Frontend

In a second terminal:

```bash
cp .env.example .env.local   # VITE_API_URL=http://localhost:8080
npm install
npm run dev                  # http://localhost:5173
```

### 3. Tests

```bash
cd backend
go test ./...                # handler + middleware tests
```

---

## Database

Schema lives in `backend/migrations/`. Four tables:

| Table | Purpose |
|---|---|
| `hero_slides` | 4 featured slides with tags[] array + display_order |
| `destinations` | 5 destinations, searchable by name (ILIKE) |
| `journeys` | 7 travel stories indexed by category |
| `newsletter_subscribers` | unique-email table, POSTed from the footer form |

Local Docker auto-mounts `001_init.up.sql` + `002_seed.up.sql` into `/docker-entrypoint-initdb.d/`. For Supabase, paste both files into the SQL Editor and run in order.

---

## Deploy

### Backend → Render

1. New Web Service → connect repo → **Root Directory:** `backend` → **Runtime:** Docker.
2. Env vars: `DATABASE_URL` (Supabase pooler URL, port 5432, `sslmode=require`), `APP_PORT=8080`, `LOG_LEVEL=info`, `CORS_ORIGINS=https://pan-pacific.netlify.app,http://localhost:5173`.
3. **Health Check Path:** `/healthz`.
4. Auto-deploys on every push to `main`.

### Frontend → Netlify

1. New site from Git → pick repo → **Build command:** `npm run build` → **Publish directory:** `dist`.
2. Env var: `VITE_API_URL=https://case-test-pan-pacific.onrender.com`.
3. Trigger deploy → **Clear cache and deploy site** (mandatory after any env var change — Vite bakes vars at build time).

### Database → Supabase

1. Create project, pick the same region as the API for low latency.
2. SQL Editor → run `001_init.up.sql`, then `002_seed.up.sql`.
3. Connection string → **Session pooler** (port 5432) → append `?sslmode=require`.

---

## Design decisions

### Why chi over Gin/Echo
Standard-library-shaped API, no magic, composable middleware. The whole router fits in my head.

### Why raw pgx over an ORM or sqlc
At 5 endpoints and ~4 tables, raw `pool.Query` + `rows.Scan` is less code than generating sqlc structs and simpler than GORM's reflection. At 20+ endpoints I'd switch to sqlc.

### Why pgxpool with `MaxConns=10, MinConns=1, MaxConnLifetime=1h`
Supabase free tier gives ~60 direct connections. With Render's scale-to-one container, 10 max keeps plenty of headroom for future horizontal scaling. `MaxConnLifetime=1h` recycles connections to work around transient TLS or pooler hiccups.

### Why port 5432 (session pool) not 6543 (transaction pool)
pgx uses prepared statements by default. PgBouncer in transaction mode releases connections between queries, destroying the prepared statement. Session mode keeps one connection per client, preserving pgx defaults.

### Why `godotenv.Load()` ignores errors silently
In dev it loads `.env`. In production (Render) there is no `.env`; the function errors and we ignore it because real env vars are already set by the platform. One line, works in both environments.

### Why an IntersectionObserver fix commit
`App.jsx` observes `[data-reveal]` elements once on mount to fade them in. The Destinations component had an early-return loading placeholder without that attribute, so the observer never saw the real section that replaced it post-fetch. Fixed in `5163236` by rendering the section consistently from mount and guarding only the child image.

### Mobile and desktop variants use duplicate markup
Instead of conditionally rendering one tree via JS, each responsive variant is its own block toggled by CSS media queries. Avoids hydration flicker and lets the browser own breakpoint logic.


Built by Vinzryyy.
