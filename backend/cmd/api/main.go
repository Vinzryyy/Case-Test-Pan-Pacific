package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"pan-pacific/backend/internal/config"
	"pan-pacific/backend/internal/database"
	"pan-pacific/backend/internal/handlers"
	appmw "pan-pacific/backend/internal/middleware"

	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
)

func main() {
	cfg := config.Load()

	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: cfg.LogLevel}))
	slog.SetDefault(logger)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	pool, err := database.New(ctx, cfg.DatabaseURL)
	if err != nil {
		logger.Error("database connect failed", "err", err)
		os.Exit(1)
	}
	defer pool.Close()

	r := chi.NewRouter()
	r.Use(chimw.RequestID)
	r.Use(chimw.RealIP)
	r.Use(appmw.Logger(logger))
	r.Use(appmw.Recoverer(logger))
	r.Use(appmw.CORS(cfg.CORSOrigins))
	r.Use(chimw.Timeout(30 * time.Second))

	r.Get("/healthz", handlers.Healthz(pool))

	r.Route("/api", func(r chi.Router) {
		r.Get("/destinations", handlers.ListDestinations(pool))
		r.Get("/hero-slides", handlers.ListHeroSlides(pool))
		r.Get("/journeys", handlers.ListJourneys(pool))
		r.Post("/newsletter", handlers.Subscribe(pool))
	})

	srv := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           r,
		ReadHeaderTimeout: 10 * time.Second,
	}

	go func() {
		logger.Info("http server starting", "port", cfg.Port, "env", cfg.AppEnv)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Error("http server failed", "err", err)
			stop()
		}
	}()

	<-ctx.Done()
	logger.Info("shutdown: draining in-flight requests")
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		logger.Error("shutdown error", "err", err)
		os.Exit(1)
	}
	logger.Info("shutdown complete")
}
