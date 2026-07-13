# N5 道場 — JLPT N5 Learning App

A mobile-first PWA for studying the JLPT N5 kanji and vocabulary set. Every item
shows the written form, its kana reading (furigana), romaji, and can be spoken
aloud. Includes spaced-repetition flashcards, quizzes, a grammar reference, and
progress tracking — all offline-capable with no account required.

Built with Next.js (App Router) + TypeScript + Tailwind. Progress is stored
locally in IndexedDB (Dexie). See `../../docs/superpowers/specs/` for the
design spec (this app lives in `apps/frontend/` of the `n5-master` monorepo).

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Building the dataset

The app ships with generated static data in `data/`. To regenerate it from the
open sources (see `data/ATTRIBUTION.md`):

```bash
pnpm data:all   # fetch kanji + vocab, then link examples
# or individually:
pnpm data:kanji # -> data/n5-kanji.json  (103 N5 kanji)
pnpm data:vocab # -> data/n5-vocab.json  (~710 N5 words)
pnpm data:link  # populate kanji example vocab links
```

## Features

- **Browse & search** — kanji and vocab lists with search by kanji, kana,
  romaji, or English (typing `taberu` finds 食べる), plus stroke-count and
  part-of-speech filters.
- **Detail views** — furigana (HTML ruby), toggleable romaji, audio button,
  linked example words / component kanji, per-item status and starring.
- **Flashcards** — SM-2 spaced repetition with a "due today" queue over decks
  (all / kanji / vocab / starred / custom lists).
- **Quizzes** — meaning→word, word→reading, typing (romaji or kana), and
  listening. Misses feed back into the flashcard schedule.
- **Dashboard** — studied / mastered counts, study streak, reviews today,
  accuracy, and overall progress.
- **Grammar** — a static reference of the core N5 particles and forms.
- **PWA** — installable and offline-capable via a service worker.

## Audio

v1 uses the on-device Web Speech API (no cost, works offline, degrades
gracefully if no Japanese voice is installed). To swap in consistent
pre-generated clips, run `scripts/generate-polly-audio.ts` with AWS credentials
(see the file header) — it synthesizes Amazon Polly MP3s to S3 and populates each
item's `audioUrl`, which the player then prefers automatically. No UI change
needed.

## Tests

```bash
pnpm test           # vitest — data normalization, POS heuristic, search,
                   # SM-2 scheduler, streak, and quiz logic
```

## Tech notes

- Part of speech is inferred heuristically from surface form (the vocab source
  has no POS field); it is approximate, not authoritative grammar data.
- The N5 kanji set uses the pre-2010 JLPT level 4 list (~103 characters), the
  community consensus for N5. There is no official post-2010 list.
