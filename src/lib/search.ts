import * as wanakana from "wanakana";
import type { Kanji, Vocabulary } from "./data/types";

function vocabHaystack(v: Vocabulary): string[] {
  return [
    v.word,
    v.reading,
    v.romaji.toLowerCase(),
    ...v.meanings.map((m) => m.toLowerCase()),
  ];
}

function kanjiHaystack(k: Kanji): string[] {
  return [
    k.character,
    ...k.onyomi,
    ...k.kunyomi,
    ...k.meanings.map((m) => m.toLowerCase()),
  ];
}

export function queryForms(raw: string): string[] {
  const q = raw.trim().toLowerCase();
  if (!q) return [];
  const forms = new Set<string>([q]);
  if (wanakana.isRomaji(q)) {
    forms.add(wanakana.toHiragana(q));
    forms.add(wanakana.toKatakana(q));
  }
  return [...forms];
}

export function searchVocab(items: Vocabulary[], raw: string): Vocabulary[] {
  const forms = queryForms(raw);
  if (forms.length === 0) return items;
  return items.filter((v) => {
    const hay = vocabHaystack(v);
    return forms.some((f) => hay.some((h) => h.includes(f)));
  });
}

export function searchKanji(items: Kanji[], raw: string): Kanji[] {
  const forms = queryForms(raw);
  if (forms.length === 0) return items;
  return items.filter((k) => {
    const hay = kanjiHaystack(k);
    return forms.some((f) => hay.some((h) => h.toLowerCase().includes(f)));
  });
}
