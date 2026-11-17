package config

import (
	"os"
)

type Config struct {
	HTTPPort    string
	DatabaseURL string
}

func Load() (Config, error) {
	port := os.Getenv("HTTP_PORT")

	if port == "" {
		port = "8081"
	}

	dbURL := os.Getenv("DATABASE_URL")

	// if dbURL == "" {
	// 	return Config{}, errors.New(
	// 		"DATABASE_URL is required",
	// 	)
	// }

	return Config{
		HTTPPort:    port,
		DatabaseURL: dbURL,
	}, nil
}
