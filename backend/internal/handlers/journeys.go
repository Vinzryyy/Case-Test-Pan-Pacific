package handlers

import (
	"context"
	"net/http"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Journey struct {
	ID       int    `json:"id"`
	Category string `json:"category"`
	Location string `json:"location"`
	Title    string `json:"title"`
	Image    string `json:"image"`
}

func ListJourneys(pool *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
		defer cancel()

		category := strings.TrimSpace(r.URL.Query().Get("category"))

		sql := `SELECT id, category, location, title, image FROM journeys`
		args := []any{}
		if category != "" && !strings.EqualFold(category, "all") {
			sql += ` WHERE category = $1`
			args = append(args, category)
		}
		sql += ` ORDER BY id`

		rows, err := pool.Query(ctx, sql, args...)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "query failed")
			return
		}
		defer rows.Close()

		out := make([]Journey, 0)
		for rows.Next() {
			var j Journey
			if err := rows.Scan(&j.ID, &j.Category, &j.Location, &j.Title, &j.Image); err != nil {
				writeError(w, http.StatusInternalServerError, "scan failed")
				return
			}
			out = append(out, j)
		}
		if err := rows.Err(); err != nil {
			writeError(w, http.StatusInternalServerError, "rows error")
			return
		}
		writeJSON(w, http.StatusOK, out)
	}
}
