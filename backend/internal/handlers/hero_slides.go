package handlers

import (
	"context"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type HeroSlide struct {
	ID        int      `json:"id"`
	Spotlight string   `json:"spotlight"`
	Location  string   `json:"location"`
	Title     string   `json:"title"`
	Tags      []string `json:"tags"`
	Image     string   `json:"image"`
}

func ListHeroSlides(pool *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
		defer cancel()

		rows, err := pool.Query(ctx, `
			SELECT id, spotlight, location, title, tags, image
			FROM hero_slides
			ORDER BY display_order
		`)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "query failed")
			return
		}
		defer rows.Close()

		out := make([]HeroSlide, 0)
		for rows.Next() {
			var s HeroSlide
			if err := rows.Scan(&s.ID, &s.Spotlight, &s.Location, &s.Title, &s.Tags, &s.Image); err != nil {
				writeError(w, http.StatusInternalServerError, "scan failed")
				return
			}
			out = append(out, s)
		}
		if err := rows.Err(); err != nil {
			writeError(w, http.StatusInternalServerError, "rows error")
			return
		}
		writeJSON(w, http.StatusOK, out)
	}
}
