package router

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/amitc1996/crypto-data-engine/backend/internal/api/handler"
)

func New(pool *pgxpool.Pool) http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", handler.Health)
	mux.HandleFunc("GET /ready", handler.Ready(pool))

	return mux
}
