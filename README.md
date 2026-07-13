# N5 道場 — monorepo

A pnpm + Turborepo monorepo with two apps:

- **`apps/frontend`** — the N5 道場 JLPT N5 study PWA (Next.js). See
  [`apps/frontend/README.md`](apps/frontend/README.md) for details.
- **`apps/backend`** — a Go service, currently just a health-check skeleton
  with no product features yet. See
  [`apps/backend/README.md`](apps/backend/README.md).

## Prerequisites

- Node ≥22, [pnpm](https://pnpm.io) 10
- Go 1.26 (only needed for `apps/backend` — `pnpm dev`/`build`/`test` at the
  root run both apps, so the backend's Go tasks need it on your PATH even if
  you're only working on the frontend)

## Getting started

```bash
pnpm install       # installs deps for every app
pnpm dev           # runs both apps' dev servers in parallel
```

Run a single app instead:

```bash
pnpm --filter frontend dev   # http://localhost:3000
pnpm --filter backend dev    # http://localhost:8080
```

## Testing

```bash
pnpm test          # runs both apps' test suites
```

## Building

```bash
pnpm build         # builds both apps
```
