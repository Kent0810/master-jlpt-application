import { getVocab } from "./index";
import type { Vocabulary } from "./types";

// Trailing pieces a 分かち書き chunk may bundle onto a word beyond its
// dictionary form: the copula and grammatical particles. Longest first so
// compound endings (ですか, には) win over their single-kana tails.
const TRAILING_ENDINGS = [
  "じゃありませんか",
  "じゃありません",
  "ではありません",
  "でしたか",
  "でした",
  "ですか",
  "です",
  "では",
  "には",
  "から",
  "まで",
  "より",
  "は",
  "が",
  "を",
  "に",
  "で",
  "へ",
  "と",
  "も",
  "の",
];

// Look up the vocabulary entry for a tapped word's surface text. Tries the
// exact chunk first, then retries with one trailing particle/copula stripped
// ("映画を" → 映画, "学生です" → 学生).
export function findVocabForSurface(surface: string): Vocabulary | undefined {
  const all = getVocab();
  const exact = all.find((v) => v.word === surface);
  if (exact) return exact;
  for (const ending of TRAILING_ENDINGS) {
    if (surface.length > ending.length && surface.endsWith(ending)) {
      const base = surface.slice(0, -ending.length);
      const hit = all.find((v) => v.word === base);
      if (hit) return hit;
    }
  }
  return undefined;
}
