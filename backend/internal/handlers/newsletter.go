package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var emailRE = regexp.MustCompile(`^[^@\s]+@[^@\s]+\.[^@\s]+$`)

type subscribeReq struct {
	Email string `json:"email"`
}

func validEmail(s string) (string, bool) {
	e := strings.ToLower(strings.TrimSpace(s))
	if len(e) > 254 || !emailRE.MatchString(e) {
		return "", false
	}
	return e, true
}

func Subscribe(pool *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req subscribeReq
		if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, 1<<14)).Decode(&req); err != nil {
			writeError(w, http.StatusBadRequest, "invalid json body")
			return
		}

		email, ok := validEmail(req.Email)
		if !ok {
			writeError(w, http.StatusBadRequest, "invalid email")
			return
		}

		ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
		defer cancel()

		_, err := pool.Exec(ctx, `
			INSERT INTO newsletter_subscribers (email)
			VALUES ($1)
			ON CONFLICT (email) DO NOTHING
		`, email)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "subscribe failed")
			return
		}

		writeJSON(w, http.StatusCreated, map[string]string{"status": "subscribed"})
	}
}
