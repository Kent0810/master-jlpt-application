# JLPT N5 App — Phase 1: Scaffold + Data Pipeline

> **For agentic workers:** Use superpowers:executing-plans or subagent-driven-development. Steps use `- [ ]` checkboxes.

**Goal:** Stand up a Next.js + TS + Tailwind app and generate the bundled N5 datasets (`data/n5-kanji.json`, `data/n5-vocab.json`, `data/n5-grammar.json`) from open APIs.

**Architecture:** Node/tsx scripts in `/scripts` fetch from `kanjiapi.dev` and `jlpt-vocab-api`, normalize to the §8 data model, and write static JSON into `data/`. The Next.js app (App Router) reads those JSON files at build/runtime. Pure normalization helpers are unit-tested with vitest.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind, tsx (script runner), wanakana, vitest.

## Global Constraints
- Node 22, npm. TypeScript strict mode.
- Data conforms to spec §8 shapes exactly.
- Scripts idempotent and re-runnable.
- Attribution: EDRDG (KANJIDIC/EDICT via kanjiapi.dev), source note for jlpt-vocab-api.

---

### Task 1: Scaffold Next.js app
**Files:** create project scaffold, `package.json`, `tsconfig.json`, `tailwind` config, `src/app/*`.
- [ ] Run `npx create-next-app@latest . --ts --tailwind --app --eslint --src-dir --import-alias "@/*" --no-turbopack --use-npm` (accept into existing dir).
- [ ] Install deps: `npm i wanakana dexie` and `npm i -D tsx vitest @types/wanakana`.
- [ ] Verify dev server boots: `npm run build` succeeds.
- [ ] Commit: "chore: scaffold Next.js app".

### Task 2: Data model types
**Files:** create `src/lib/data/types.ts`.
- [ ] Define `Kanji`, `Vocabulary`, `Grammar` interfaces per spec §8 (Kanji: id, character, meanings[], onyomi[], kunyomi[], strokeCount, jlptLevel, kanjivgId?, exampleVocabIds[]; Vocabulary: id, word, reading, romaji, meanings[], partOfSpeech, jlptLevel, audioUrl|null, example?; Grammar: id, title, meaning, structure, examples[]).
- [ ] Commit.

### Task 3: POS heuristic (pure, tested)
**Files:** create `src/lib/data/pos.ts`, test `src/lib/data/pos.test.ts`.
**Produces:** `guessPartOfSpeech(word: string, reading: string): PartOfSpeech`.
- [ ] Write failing tests: 食べる→"ichidan-verb", 飲む→"godan-verb", 高い→"i-adjective", 学校→"noun".
- [ ] Run vitest, verify fail.
- [ ] Implement heuristic: ends in い (not preceded by し-exception set) → i-adjective; ends in る with preceding e/i-row kana → ichidan-verb; ends in う-row kana (う/く/ぐ/す/つ/ぬ/ぶ/む/る) → godan-verb; else noun. Document as approximate.
- [ ] Run vitest, verify pass. Commit.

### Task 4: Normalizers (pure, tested)
**Files:** create `src/lib/data/normalize.ts`, test `normalize.test.ts`.
**Consumes:** raw API shapes. **Produces:** `normalizeKanji(raw)`, `normalizeVocab(raw)`.
- [ ] Write failing tests using the real sample payloads (kanji 日, vocab 毎朝).
- [ ] Implement: map kanjiapi fields → Kanji (id `kanji_<char>`, kanjivgId from unicode lowercased); map vocab-api → Vocabulary (id `vocab_<word>`, romaji from API or wanakana.toRomaji(furigana), partOfSpeech via guessPartOfSpeech, audioUrl null).
- [ ] Run vitest, verify pass. Commit.

### Task 5: Fetch kanji script
**Files:** create `scripts/fetch-kanji.ts`.
- [ ] Fetch `https://kanjiapi.dev/v1/kanji/jlpt-5` → char list; fetch each `https://kanjiapi.dev/v1/kanji/<char>` (throttled), normalizeKanji, write sorted `data/n5-kanji.json`.
- [ ] Run `npx tsx scripts/fetch-kanji.ts`; verify ~103 entries. Commit data + script.

### Task 6: Fetch vocab script
**Files:** create `scripts/fetch-vocab.ts`.
- [ ] Page `https://jlpt-vocab-api.vercel.app/api/words?level=5&offset=..&limit=100` until total (662), normalizeVocab, write `data/n5-vocab.json`.
- [ ] Run `npx tsx scripts/fetch-vocab.ts`; verify ~662 entries. Commit.

### Task 7: Link examples script
**Files:** create `scripts/link-examples.ts`.
- [ ] For each kanji, find up to 3 vocab whose `word` contains the character; set `exampleVocabIds`. Rewrite `data/n5-kanji.json`.
- [ ] Run it; spot-check 日 has example ids. Commit.

### Task 8: Grammar seed + attribution
**Files:** create `data/n5-grammar.json` (curated ~15 core N5 points: は, が, を, に, で, へ, の, か, ました/ません, ～たい, ～ましょう, から, まで, と, も), `data/ATTRIBUTION.md`.
- [ ] Write the JSON + attribution notes (EDRDG for kanji, jlpt-vocab-api source, CC where applicable). Commit.

### Task 9: Typed data loaders
**Files:** create `src/lib/data/index.ts`.
**Produces:** `getKanji()`, `getVocab()`, `getGrammar()`, `getKanjiById(id)`, `getVocabById(id)`.
- [ ] Import JSON with typed casts; export accessors + by-id maps.
- [ ] Add a smoke test asserting counts > 100 (kanji) and > 600 (vocab). Run, commit.
