package router

import (
	"net/http"

	"github.com/amitc1996/crypto-data-engine/backend/internal/api/handler"
)

func New() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", handler.Health)

	return mux
}
