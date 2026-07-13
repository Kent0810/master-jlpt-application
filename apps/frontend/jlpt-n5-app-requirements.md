# JLPT N5 Learning App — Requirements Spec

> Hand this document to Claude Code as the source of truth. It defines _what_ to build and the key technical decisions, not the line-by-line implementation. Sections marked **[DECISION]** are assumptions I've made — override them if you disagree before building.

---

## 1. Overview & Goals

A web app for learning the vocabulary and kanji required for the **JLPT N5** (the most basic level of the Japanese Language Proficiency Test). The core promise: for every item the learner sees the **kanji**, its **reading (how to pronounce it)**, and can **hear it spoken aloud**.

Primary goals:

- Let a beginner browse, study, and drill the full N5 kanji + vocabulary set.
- Always surface pronunciation three ways: furigana (kana over kanji), romaji (Latin), and audio playback.
- Reinforce memory with spaced-repetition flashcards and quizzes.
- Track progress so the learner knows what's mastered vs. still weak.

Non-goals for v1: N4–N1 content, full grammar course, social/community features, native mobile apps (PWA covers mobile).

---

## 2. Scope note on "N5 content"

**Important for data sourcing:** The Japan Foundation officially stopped publishing JLPT vocabulary/kanji lists in 2010. There is **no authoritative list**. The community consensus (derived from past exams and standard textbooks like Minna no Nihongo / Genki / Tango) is:

- **Kanji:** ~103 characters (sources cite 100–120).
- **Vocabulary:** ~650–800 words depending on the list.
- **Grammar:** ~80 grammar points (out of scope for v1 core, see §6.5).

The app should treat the bundled list as a versioned dataset, not gospel, and make it easy to swap/extend later.

---

## 3. Target User

A complete or near-complete beginner in Japanese who:

- Can read hiragana/katakana (or is learning), and needs romaji as a crutch early on.
- Is studying toward the N5 exam or self-studying basic Japanese.
- Studies in short sessions, often on a phone.

Single-user, local-first is fine for v1. **[DECISION]** No account/login in v1 — progress persists locally (see §9). Add auth only if multi-device sync is needed later.

---

## 4. Core Content Requirements

### 4.1 Kanji entry

Each of the ~103 N5 kanji must include:

- The character (e.g. 日)
- English meaning(s) (e.g. "day, sun")
- **On'yomi** reading(s) in katakana (e.g. ニチ, ジツ)
- **Kun'yomi** reading(s) in hiragana (e.g. ひ, -び, -か)
- Stroke count
- Stroke-order animation or diagram **[DECISION]** — nice-to-have for v1, see §6.3
- 2–3 example vocabulary words that use the kanji (linking to vocab entries)
- Audio playback of the readings

### 4.2 Vocabulary entry

Each word must include:

- Word in its normal written form (kanji + kana as appropriate, e.g. 食べる, 学校, ありがとう)
- **Reading in hiragana** (the furigana / how to pronounce it)
- **Romaji** (Hepburn) — derived, not hand-maintained (see §7)
- English meaning
- Part of speech (noun, godan/ichidan verb, i-adj, na-adj, etc.)
- One example sentence (JP + reading + EN) — **[DECISION]** optional in v1 if the dataset lacks it
- Audio playback of the word

### 4.3 Pronunciation (this is a first-class feature — see §7 for the full treatment)

Every kanji and vocab item must be pronounceable. The app must render:

- **Furigana**: kana displayed above/beside kanji using HTML ruby (`<ruby>漢字<rt>かんじ</rt></ruby>`).
- **Romaji**: toggleable, so advanced learners can hide it.
- **Audio**: a speaker button that plays the word/reading aloud.

---

## 5. Data Sourcing (for the dataset build step)

Do **not** hand-type the data. Build a seed script that pulls from open sources and normalizes into the app's schema (§8). Vet the license before shipping any dataset.

Recommended sources:

- **Kanji data** — `kanjiapi.dev` (JSON API over KANJIDIC/EDICT; includes on/kun readings, meanings, stroke count, and a `jlpt` field to filter N5). Or the static JSON dataset at `github.com/davidluzgouveia/kanji-data` (KANJIDIC-derived, JSON, includes updated JLPT levels). KANJIDIC/EDICT are EDRDG-licensed — attribute accordingly.
- **Vocabulary** — `jlpt-vocab-api` (`github.com/wkei/jlpt-vocab-api`, REST + GraphQL, N5–N1, has a hosted instance) or the Tanos JLPT lists (CC BY, e.g. the Kaggle mirror `robinpourtaud/jlpt-words-by-level`) which include kanji + furigana + English + level.
- **Stroke order** (if implemented) — KanjiVG (`kanjivg` SVG data), which gives per-stroke SVG paths.

**[DECISION]** Ship the data as **static JSON bundled with the app** (generated once at build time), not live API calls at runtime. Reasons: N5 content is small and static, works offline, no rate limits, no runtime dependency. Keep the fetch/normalize script in `/scripts` so the dataset can be regenerated.

Deliverable of the seed step: `data/n5-kanji.json` and `data/n5-vocab.json` conforming to §8, plus attribution/license notes in the repo.

---

## 6. Feature Requirements

### 6.1 Browse & Search

- List views for Kanji and Vocabulary, filterable and searchable.
- Search accepts kanji, kana, romaji, or English (use kana↔romaji conversion so typing "taberu" finds 食べる).
- Filter vocab by part of speech; filter kanji by stroke count.
- Tapping an item opens a detail view with everything from §4 + audio.

### 6.2 Flashcards with Spaced Repetition (SRS)

- Study decks: all N5, kanji-only, vocab-only, or custom study lists.
- Card shows the prompt (e.g. kanji or English), user reveals the answer, then self-rates recall.
- **[DECISION]** Use a well-known SRS algorithm — **SM-2** (simple, proven, easy to implement) for v1; leave room to swap in **FSRS** later. Store per-card scheduling state (ease, interval, due date, review count).
- A "due today" queue driven by the scheduler.

### 6.3 Kanji stroke order **[DECISION: nice-to-have]**

- Animated stroke order using KanjiVG SVG paths (animate stroke draw-on).
- If deferred, still show stroke count and a static glyph.

### 6.4 Quizzes / Practice

Support multiple quiz modes:

- **Multiple choice** — meaning→word, word→meaning, kanji→reading.
- **Typing** — type the reading in romaji/kana (use kana conversion to accept either).
- **Listening** — play audio, learner picks the matching word (directly exercises pronunciation).
- Score, show correct answers, feed misses back into the SRS queue.

### 6.5 Grammar **[DECISION: out of scope for v1 core]**

- Optionally include a static reference list of N5 grammar points (no drilling). Ship as a stretch goal; do not block v1 on it.

### 6.6 Progress Dashboard

- Items seen / learning / mastered counts for kanji and vocab.
- Study streak, cards reviewed today, accuracy over time.
- Per-item status visible in browse views (e.g. a "mastered" badge).

### 6.7 Study lists / bookmarking

- Star items into named lists to build custom decks.

---

## 7. Pronunciation — Detailed Requirements

This is the feature you specifically asked for, so it gets its own section. Three layers:

### 7.1 Reading display (furigana + romaji)

- Render kanji with furigana via HTML **ruby** (`<ruby>`/`<rt>`). The furigana comes straight from the dataset's reading field — don't compute it at runtime for known N5 items.
- Provide a **romaji toggle**. Convert kana→romaji with **`wanakana`** (npm `wanakana`, v5.x). It handles hiragana/katakana↔romaji cleanly and also powers romaji search input. Use Hepburn.
- `wanakana` also gives `toKana` for the typing-quiz input (learner types "taberu", it becomes たべる live).

### 7.2 Auto-furigana for arbitrary text (only if needed)

- For the _fixed_ N5 dataset you do **not** need automatic furigana generation — the readings are in the data.
- If example sentences arrive without readings, use **`kuroshiro`** (npm `kuroshiro`) with the **`kuroshiro-analyzer-kuromoji`** analyzer to generate furigana/okurigana from raw Japanese. Note from the docs: fully automatic _furigana→romaji_ is imperfect (furigana loses some pronunciation info), but _kanji→furigana_ and _kanji→romaji_ are fine. Prefer running this **at build time** over runtime (kuromoji ships a large dictionary).

### 7.3 Audio playback

Two-tier approach:

- **Baseline (v1, zero-cost):** Web Speech API `SpeechSynthesis`. Create an utterance, set `utterance.lang = 'ja-JP'`, pick a Japanese voice from `speechSynthesis.getVoices()`, and `speak()`. **Caveat to handle:** Japanese voice availability depends on the user's OS/browser — some environments have no `ja-JP` voice. Detect this and gracefully degrade (hide the audio button or fall back to tier 2). Also handle the async voice-loading quirk (`onvoiceschanged`).

- **Production option (recommended given your AWS stack):** pre-generate audio with **Amazon Polly** Japanese voices (e.g. Mizuki/Takumi, or the neural Kazuha/Tomoko voices), store MP3s in **S3**, and reference them by key. This gives consistent, high-quality pronunciation independent of the client device. Generate once per word in the seed pipeline; it's a static set. **[DECISION]** Ship v1 on Web Speech API, wire the player behind an interface so swapping to S3-hosted Polly clips is a config change, not a rewrite.

Every kanji-reading and vocab item needs a speaker button hitting this player.

---

## 8. Data Model

Suggested shapes (adapt to your ORM/storage choice):

```jsonc
// Kanji
{
  "id": "kanji_日",
  "character": "日",
  "meanings": ["day", "sun"],
  "onyomi": ["ニチ", "ジツ"],
  "kunyomi": ["ひ", "-び", "-か"],
  "strokeCount": 4,
  "jlptLevel": "N5",
  "kanjivgId": "065e5",          // optional, for stroke order
  "exampleVocabIds": ["vocab_日曜日", "vocab_毎日"]
}

// Vocabulary
{
  "id": "vocab_食べる",
  "word": "食べる",
  "reading": "たべる",            // furigana source
  "romaji": "taberu",            // derived via wanakana; can be generated
  "meanings": ["to eat"],
  "partOfSpeech": "ichidan-verb",
  "jlptLevel": "N5",
  "audioUrl": null,              // null → use Web Speech; string → S3 clip
  "example": {                   // optional
    "jp": "毎日ご飯を食べる。",
    "reading": "まいにちごはんをたべる。",
    "en": "I eat rice every day."
  }
}

// Per-user study state (local)
{
  "itemId": "vocab_食べる",
  "status": "learning",          // new | learning | mastered
  "srs": { "ease": 2.5, "intervalDays": 3, "dueAt": "2026-07-09", "reviews": 4, "lapses": 1 },
  "starred": true
}
```

---

## 9. Tech Stack **[DECISION — tuned to your preferences, override freely]**

- **Framework:** Next.js (App Router) + TypeScript + Tailwind. Matches your `portfolio-nextjs` setup and deploys cleanly to Vercel.
- **Rendering:** mostly static/client — the content dataset is static JSON, no backend required for v1.
- **State/storage:** learner progress in **IndexedDB** (via a light wrapper like Dexie) so it survives reloads and works offline. No server DB in v1.
- **PWA:** installable, offline-capable (cache the dataset + audio). This is what makes it usable as a phone study app without a native build.
- **Japanese libs:** `wanakana` (kana/romaji), `kuroshiro` + `kuroshiro-analyzer-kuromoji` (build-time furigana only if needed).
- **Audio:** Web Speech API in v1; interface abstracted for a future Amazon Polly + S3 swap.
- **Deploy:** Vercel.

If you'd rather make it multi-user/synced later, the natural extension is a small NestJS + Postgres/Prisma backend (your day-job stack) for auth and progress sync — but explicitly **not** in v1.

---

## 10. Non-Functional Requirements

- **Responsive & mobile-first** — primary use is on a phone.
- **Offline** — full study experience without network (PWA + bundled data; audio degrades to Web Speech which is on-device).
- **Accessibility** — ruby text must not break screen readers; audio buttons need labels; keyboard-navigable quizzes.
- **Performance** — dataset is small; lazy-load stroke-order SVGs and any audio.
- **Fonts** — ensure a font stack that renders Japanese correctly across platforms.

---

## 11. Suggested Build Phases

1. **Data pipeline** — seed script → `n5-kanji.json` + `n5-vocab.json` with readings, meanings, romaji, licensing notes.
2. **Browse + detail views** — list, search (kana/romaji/EN), detail with furigana + romaji toggle + audio (Web Speech).
3. **Progress storage** — IndexedDB, item status, starring.
4. **Flashcards + SM-2 SRS** — study queue, self-rating, due scheduling.
5. **Quizzes** — multiple choice, typing, listening.
6. **Dashboard** — counts, streak, accuracy.
7. **PWA polish** — offline caching, installability.
8. **Stretch:** stroke-order animation (KanjiVG), grammar reference, Amazon Polly audio.

---

## 12. Open Questions (decide before or during build)

- Multi-device sync wanted, or is local-only fine for now? (Drives whether you add a backend/auth.)
- Include stroke-order animation in v1, or defer? (KanjiVG adds asset weight.)
- Include example sentences in v1? (Depends on which dataset you pick — Tanos has readings but not sentences; you may need a second source.)
- Audio: ship on Web Speech only, or invest in Polly-generated clips from the start for consistency?
- Any need for katakana/hiragana kana-learning modules as a prerequisite section, or assume the learner already knows kana?
