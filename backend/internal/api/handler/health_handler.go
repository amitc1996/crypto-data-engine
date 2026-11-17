package handler

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func writeJSON(
	w http.ResponseWriter,
	status int,
	data any,
) {
	w.Header().Set(
		"Content-Type", "application/json",
	)
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(data); err != nil {
		log.Printf("write JSON failed: %v", err)
	}
}

func Health(
	w http.ResponseWriter,
	r *http.Request,
) {
	writeJSON(w, http.StatusOK, map[string]string{
		"status":  "ok",
		"service": "crypto-historical-data-engine",
	})
}

func Ready(pool *pgxpool.Pool) http.HandlerFunc {
	return func(
		w http.ResponseWriter,
		r *http.Request,
	) {
		ctx, cancel := context.WithTimeout(
			r.Context(), 2*time.Second,
		)
		defer cancel()

		if err := pool.Ping(ctx); err != nil {
			log.Printf("database not ready: %v", err)

			writeJSON(
				w,
				http.StatusServiceUnavailable,
				map[string]string{
					"status": "not_ready",
				},
			)
			return
		}

		writeJSON(w, http.StatusOK, map[string]string{
			"status":   "ready",
			"database": "connected",
		})
	}
}
