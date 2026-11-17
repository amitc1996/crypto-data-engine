package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"time"

	"github.com/amitc1996/crypto-data-engine/backend/internal/api/router"
	"github.com/amitc1996/crypto-data-engine/backend/internal/config"
	"github.com/amitc1996/crypto-data-engine/backend/internal/storage/postgres"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}

	ctx := context.Background()

	pool, err := postgres.NewPool(
		ctx, cfg.DatabaseURL,
	)
	if err != nil {
		log.Fatal(err)
	}
	defer pool.Close()

	log.Println("PostgreSQL connected successfully")

	server := &http.Server{
		Addr:              ":" + cfg.HTTPPort,
		Handler:           router.New(pool),
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       15 * time.Second,
		WriteTimeout:      15 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	log.Printf(
		"API server listening on port %s",
		cfg.HTTPPort,
	)

	if err := server.ListenAndServe(); err != nil &&
		!errors.Is(err, http.ErrServerClosed) {
		log.Printf("HTTP server failed: %v", err)
	}
}
