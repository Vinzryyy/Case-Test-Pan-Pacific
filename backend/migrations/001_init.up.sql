CREATE TABLE IF NOT EXISTS hero_slides (
    id            SERIAL PRIMARY KEY,
    spotlight     TEXT NOT NULL,
    location      TEXT NOT NULL,
    title         TEXT NOT NULL,
    tags          TEXT[] NOT NULL DEFAULT '{}',
    image         TEXT NOT NULL,
    display_order INT  NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS destinations (
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL UNIQUE,
    image      TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journeys (
    id         SERIAL PRIMARY KEY,
    category   TEXT NOT NULL,
    location   TEXT NOT NULL,
    title      TEXT NOT NULL,
    image      TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_journeys_category ON journeys(category);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id         SERIAL PRIMARY KEY,
    email      TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
