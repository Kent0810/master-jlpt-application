---
name: verify
description: Build/launch/drive recipe for verifying frontend changes in the N5 study app
---

# Verifying apps/frontend changes

## Launch

```bash
cd apps/frontend
npx next dev -p 3457 &   # ready in ~5s; GET / returns 200
```

## Drive

- Lesson pages live at `/lessons/1`–`/lessons/25`. Default UI language is Vietnamese.
- To test the English content path, go to `/settings` and click the "English"
  toggle; the choice persists across full page loads (SettingsProvider gates
  its localStorage write on a `hydrated` flag — don't remove that gate, or
  StrictMode's double-mount wipes saved settings in dev).
- Linked word highlighting (JP token ↔ romaji chunk ↔ translation segment) is
  hover-driven. To assert it, hover a word then count highlighted nodes:

  ```js
  [...document.querySelectorAll('[class*="bg-brand"]')]
    .filter(el => el.className.includes('bg-brand/20'))
    .map(el => el.tagName + ': ' + el.textContent.trim())
  // expect 3 entries: BUTTON (JP), SPAN (romaji), SPAN (translation)
  ```

## Gotchas

- A browser extension injecting `cz-shortcut-listen` on `<body>` triggers a
  recoverable Next hydration warning ("1 Issue" badge) — environmental, ignore.
- Alignment data integrity is covered by `src/lib/data/enrichment.test.ts`;
  browser verification is for the hover/tap wiring, not the data.
- Word-alignment data flow: `data/n5-alignments.json` (built-in dialogues d{lesson}:{i},
  grammar g:{id}:{i}) + inline `alignEn`/`alignVi` on lines in
  `data/n5-lesson-blocks.authored.json`. Edit the authored file, then run
  `node scripts/gen-lesson-blocks.mjs` to regenerate `n5-lesson-blocks.json`.
