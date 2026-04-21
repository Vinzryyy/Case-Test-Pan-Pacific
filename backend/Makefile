.PHONY: help run build test tidy db-up db-down db-reset docker-build

# On Windows without make, run the raw commands shown under each target.

help:
	@echo "Targets:"
	@echo "  make run          -> go run ./cmd/api           (needs .env + running db)"
	@echo "  make build        -> go build -o ./bin/api ./cmd/api"
	@echo "  make test         -> go test ./..."
	@echo "  make tidy         -> go mod tidy"
	@echo "  make db-up        -> docker compose up -d"
	@echo "  make db-down      -> docker compose down"
	@echo "  make db-reset     -> docker compose down -v && docker compose up -d"
	@echo "  make docker-build -> docker build -t pan-pacific-api ."

run:
	go run ./cmd/api

build:
	go build -o ./bin/api ./cmd/api

test:
	go test ./...

tidy:
	go mod tidy

db-up:
	docker compose up -d

db-down:
	docker compose down

db-reset:
	docker compose down -v
	docker compose up -d

docker-build:
	docker build -t pan-pacific-api .
