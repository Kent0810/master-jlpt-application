# Light Mode + Write-Kanji Module — Design Spec

**Date:** 2026-07-07
**Builds on:** the existing N5 app (`2026-07-06-jlpt-n5-app-design.md`).

## Feature 1 — Light / Dark / System theme

- Extend `SettingsProvider` with `theme: "system" | "light" | "dark"`, persisted in
  the existing `n5.settings` localStorage key.
- Resolve `system` via `matchMedia("(prefers-color-scheme: dark)")` (live-updating)
  and always stamp the concrete result as `data-theme="light" | "dark"` on
  `document.documentElement`.
- Tailwind `darkMode: ['selector', '[data-theme="dark"]']` so every existing
  `dark:` class follows the toggle. `globals.css` gains `:root[data-theme=...]`
  overrides that win over `prefers-color-scheme`.
- A 3-way control (System / ☀️ Light / 🌙 Dark) added to `SettingsBar`.
- Pure helper `resolveTheme(pref, systemPrefersDark)` → `"light" | "dark"`,
  unit-tested.

## Feature 2 — "Write" module

New `/write` route and nav tab. Curriculum with three stages plus a per-kanji
writing view.

### Data
- `data/basic-strokes.ts` — hand-authored, bundled (offline):
  - `BASIC_STROKES`: ~8 fundamental stroke types, each `{ id, name, jp, description, viewBox, path }` with a simple SVG path for animation.
  - `STROKE_RULES`: standard ordering rules, each `{ id, title, description, exampleChar }` (example resolves to an N5 kanji for animation).
- KanjiVG (per-stroke real paths) loaded on demand — not bundled.

### Modules
- `lib/kanjivg/parse.ts` — pure `parseKanjiVg(svg: string): { viewBox: string; strokes: string[] }`. Extracts `<path … d="…">` in document order (KanjiVG orders paths by stroke). Unit-tested with the 日 sample (4 strokes).
- `lib/kanjivg/load.ts` — `loadStrokes(kanjivgId): Promise<ParsedKanji | null>`. Fetches `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/<id>.svg`, parses, caches in an in-memory `Map`. The service worker also caches these responses, so once viewed a kanji animates offline.
- `components/StrokeOrderPlayer.tsx` — renders strokes as SVG paths; animates draw-on sequentially using `stroke-dasharray`/`stroke-dashoffset` via `getTotalLength()`. Controls: play / replay / step, optional stroke numbers. Shows a loading and an offline-unavailable state.
- `components/WritingCanvas.tsx` — a `<canvas>` with pointer drawing over a faded kanji template (the KanjiVG paths at low opacity). Buttons: clear, toggle guide, hint (flash next stroke). No grading.

### Pages
- `/write` — landing: three cards (Basics, Rules, Practice) + intro.
- `/write/basics` — animated gallery of `BASIC_STROKES`.
- `/write/rules` — `STROKE_RULES` with example animations.
- `/write/practice` — N5 kanji grouped by stroke count (1–4 Beginner, 5–8 Intermediate, 9+ Advanced), each linking to the writing view.
- `/write/[id]` — per-kanji writing view: `StrokeOrderPlayer` + `WritingCanvas`.
- `/kanji/[id]` — add `StrokeOrderPlayer` (animation only) to the detail page.

### Nav
Add a "Write" tab (筆). Nav grows to 6 items.

## Non-functional
- Basics + rules fully offline. Practice kanji require network on first view; cached after.
- Light and dark both fully styled; toggle is instant and persists.
- Canvas is pointer-events based (works with touch + mouse), no external deps.

## Testing
- Unit: `parseKanjiVg` (ordered stroke extraction), `resolveTheme`.
- Browser: theme toggle both directions, stroke-order animation plays, canvas draws.

## Attribution
Add KanjiVG (CC BY-SA 3.0, © Ulrich Apel) to `data/ATTRIBUTION.md`.

## Out of scope
Graded/scored handwriting recognition; stroke-order for non-N5 kanji.
