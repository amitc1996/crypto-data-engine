package main

import (
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/amitc1996/crypto-data-engine/backend/internal/api/router"
	"github.com/amitc1996/crypto-data-engine/backend/internal/config"
)

func main() {
	cfg := config.Load()

	server := &http.Server{
		Addr:              ":" + cfg.HTTPPort,
		Handler:           router.New(),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      15 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	log.Printf("API server listening on port %s", cfg.HTTPPort)

	if err := server.ListenAndServe(); err != nil &&
		!errors.Is(err, http.ErrServerClosed) {
		log.Fatalf("server failed: %v", err)
	}
}
