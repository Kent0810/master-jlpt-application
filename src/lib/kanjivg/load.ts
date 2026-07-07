"use client";

import { parseKanjiVg, type ParsedKanji } from "./parse";

const CDN = "https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji";

const cache = new Map<string, ParsedKanji | null>();

export async function loadStrokes(
  kanjivgId: string,
): Promise<ParsedKanji | null> {
  if (cache.has(kanjivgId)) return cache.get(kanjivgId) ?? null;
  try {
    const res = await fetch(`${CDN}/${kanjivgId}.svg`);
    if (!res.ok) throw new Error(`${res.status}`);
    const parsed = parseKanjiVg(await res.text());
    cache.set(kanjivgId, parsed);
    return parsed;
  } catch {
    cache.set(kanjivgId, null);
    setTimeout(() => {
      if (cache.get(kanjivgId) === null) cache.delete(kanjivgId);
    }, 5000);
    return null;
  }
}
