# backend

A minimal Go HTTP service. Currently just a health-check skeleton — no
product features are wired up yet.

Requires Go 1.26 on your PATH.

## Run

```bash
pnpm dev        # go run ./cmd/server, listens on :8080 (or $PORT)
```

## Test

```bash
pnpm test       # go test ./...
```

## Layout

- `cmd/server/main.go` — entrypoint, router setup
- `internal/health/` — the `/healthz` handler
