package config

import (
	"fmt"
	"log/slog"
	"os"
	"strings"
)

type Config struct {
	AppEnv      string
	Port        string
	DatabaseURL string
	LogLevel    slog.Level
	CORSOrigins []string
}

func Load() Config {
	return Config{
		AppEnv:      getenv("APP_ENV", "dev"),
		Port:        getenv("APP_PORT", "8080"),
		DatabaseURL: mustEnv("DATABASE_URL"),
		LogLevel:    parseLevel(getenv("LOG_LEVEL", "info")),
		CORSOrigins: splitCSV(getenv("CORS_ORIGINS", "http://localhost:5173")),
	}
}

func getenv(key, def string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return def
}

func mustEnv(key string) string {
	v, ok := os.LookupEnv(key)
	if !ok || v == "" {
		fmt.Fprintf(os.Stderr, "missing required env var: %s\n", key)
		os.Exit(1)
	}
	return v
}

func splitCSV(s string) []string {
	parts := strings.Split(s, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		if p = strings.TrimSpace(p); p != "" {
			out = append(out, p)
		}
	}
	return out
}

func parseLevel(s string) slog.Level {
	switch strings.ToLower(s) {
	case "debug":
		return slog.LevelDebug
	case "warn":
		return slog.LevelWarn
	case "error":
		return slog.LevelError
	default:
		return slog.LevelInfo
	}
}
