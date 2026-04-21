package handlers

import (
	"context"
	"net/http"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Destination struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Image string `json:"image"`
}

func ListDestinations(pool *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
		defer cancel()

		q := strings.TrimSpace(r.URL.Query().Get("q"))

		sql := `SELECT id, name, image FROM destinations`
		args := []any{}
		if q != "" {
			sql += ` WHERE name ILIKE $1`
			args = append(args, "%"+q+"%")
		}
		sql += ` ORDER BY name`

		rows, err := pool.Query(ctx, sql, args...)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "query failed")
			return
		}
		defer rows.Close()

		out := make([]Destination, 0)
		for rows.Next() {
			var d Destination
			if err := rows.Scan(&d.ID, &d.Name, &d.Image); err != nil {
				writeError(w, http.StatusInternalServerError, "scan failed")
				return
			}
			out = append(out, d)
		}
		if err := rows.Err(); err != nil {
			writeError(w, http.StatusInternalServerError, "rows error")
			return
		}
		writeJSON(w, http.StatusOK, out)
	}
}
