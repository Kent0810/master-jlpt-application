# JLPT N5 Learning App — Design Spec

**Date:** 2026-07-06
**Source of truth:** `jlpt-n5-app-requirements.md` (this spec narrows and locks decisions for the v1 build)

## Scope for v1

Build the full N5 study app ("Everything" tier) with these explicit exclusions:

- **Deferred:** kanji stroke-order animation (show stroke count + static glyph only).
- **Optional:** vocab example sentences — rendered only if the sourced dataset provides them; no second dataset sourced just for sentences.
- **Audio:** ship on Web Speech API. A Polly+S3 generation script is built but left un-run (no AWS creds assumed). App is fully functional on Web Speech; dropping in S3 clips later is a data change (`audioUrl`), not a code change.

Included: data pipeline, browse/search/detail, IndexedDB progress, SM-2 flashcards, quizzes (MC/typing/listening), progress dashboard, study lists/bookmarking, static grammar reference, PWA (installable + offline).

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript + Tailwind CSS.
- **Data:** static JSON bundled with the app (`data/*.json`), generated once by scripts.
- **Progress storage:** IndexedDB via Dexie. No server DB in v1.
- **PWA:** manifest + service worker; app shell + dataset cached for offline.
- **Japanese libs:** `wanakana` (kana↔romaji, live typing conversion).
- **Audio:** `AudioPlayer` interface; `WebSpeechPlayer` default, `S3ClipPlayer` when `audioUrl` present.
- **Deploy target:** Vercel.

## Data Pipeline (`/scripts`, build-time)

- `fetch-kanji.ts` — source `kanjiapi.dev` (has `jlpt` field), filter N5 (~103), normalize to Kanji shape (§ Data Model).
- `fetch-vocab.ts` — source N5 vocab (jlpt-vocab-api or Tanos CC-BY list), derive `romaji` via wanakana (Hepburn), normalize to Vocabulary shape.
- `link-examples.ts` — populate each kanji's `exampleVocabIds` by scanning vocab whose `word` contains the character (cap 2–3).
- `generate-polly-audio.ts` — **optional / un-run in v1.** With AWS creds: synthesize MP3 per item (Japanese neural voice), upload to S3, write `audioUrl` back into JSON.
- Outputs: `data/n5-kanji.json`, `data/n5-vocab.json`, `data/n5-grammar.json`, `data/ATTRIBUTION.md` (EDRDG for KANJIDIC/EDICT; CC-BY for Tanos).

Scripts are idempotent and re-runnable so the dataset can be regenerated.

## Data Model

Kanji, Vocabulary, and per-user study state follow `jlpt-n5-app-requirements.md` §8 exactly:

- **Kanji:** `id, character, meanings[], onyomi[], kunyomi[], strokeCount, jlptLevel, kanjivgId?, exampleVocabIds[]`.
- **Vocabulary:** `id, word, reading, romaji, meanings[], partOfSpeech, jlptLevel, audioUrl|null, example?{jp,reading,en}`.
- **StudyState (Dexie):** `itemId, status(new|learning|mastered), srs{ease,intervalDays,dueAt,reviews,lapses}, starred`.
- **Grammar (static ref):** `id, title, meaning, structure, examples[]`.
- **StudyList:** `id, name, itemIds[]`.
- **Settings:** `showRomaji, theme`.

## Components / Modules

- `lib/data/` — typed loaders over the static JSON; search index (kana/romaji/EN via wanakana).
- `lib/audio/` — `AudioPlayer` interface + `WebSpeechPlayer` (handles `onvoiceschanged`, degrades if no `ja-JP` voice) + `S3ClipPlayer`.
- `lib/db/` — Dexie schema, study-state CRUD, study lists, settings.
- `lib/srs/` — SM-2 scheduler: pure functions `schedule(state, grade) -> state`, `dueQueue(states, now)`.
- `components/Furigana` — `<ruby>` rendering + romaji toggle (accessible).
- `components/AudioButton` — labeled speaker button wired to the player.
- Routes (App Router): `/` dashboard, `/kanji`, `/kanji/[id]`, `/vocab`, `/vocab/[id]`, `/study` (flashcards), `/quiz`, `/grammar`, `/lists`.

## Feature Details

- **Browse & Search:** list views with filter (POS for vocab, stroke count for kanji) and a search box accepting kanji/kana/romaji/EN. Typing "taberu" matches 食べる via wanakana `toKana`.
- **Detail:** furigana ruby, romaji toggle (global setting), audio button, linked example vocab, status badge, star toggle.
- **Flashcards + SM-2:** decks = all / kanji / vocab / custom list. Prompt → reveal → self-rate (Again/Hard/Good/Easy → SM-2 grades). "Due today" queue from scheduler.
- **Quizzes:** multiple choice (meaning↔word, kanji→reading), typing (live wanakana conversion, accept romaji or kana), listening (audio → pick word). Misses feed back into SRS. Score + correct-answer reveal.
- **Dashboard:** seen/learning/mastered counts (kanji + vocab), study streak, cards reviewed today, accuracy over time.
- **Grammar:** static reference list page, no drilling.

## Non-Functional

- Mobile-first responsive; Japanese-capable font stack.
- Offline: PWA caches app shell + dataset; audio degrades to on-device Web Speech.
- Accessibility: ruby readable by screen readers, labeled audio buttons, keyboard-navigable quizzes.
- Performance: small dataset; lazy-load any heavy assets.

## Build Phases (implementation order, verify each before next)

1. Project scaffold (Next.js + TS + Tailwind + Dexie + wanakana) and data pipeline → JSON datasets.
2. Browse + detail (furigana, romaji toggle, Web Speech audio).
3. Progress storage (Dexie: status, starring, settings).
4. Flashcards + SM-2 SRS.
5. Quizzes (MC / typing / listening).
6. Dashboard.
7. Grammar reference.
8. PWA polish (offline caching, installability).

## Testing

- Unit: SM-2 scheduler (pure), wanakana search matching, data-loader normalization, Dexie study-state CRUD (fake-indexeddb).
- Component/integration: furigana + romaji toggle, audio button degradation path, quiz answer checking.
- Manual/e2e smoke per phase via the `/run` skill.

## Out of Scope (v1)

Auth/multi-device sync, N4–N1 content, grammar drilling, stroke-order animation, native apps, running Polly generation.
