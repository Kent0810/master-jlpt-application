"use client";

import * as wanakana from "wanakana";
import { useSettings } from "@/lib/settings/SettingsProvider";

// CJK ideograph ranges (kanji). Everything else (kana, brackets, punctuation,
// full-width period, etc.) is treated as literal text shared between word and
// reading.
const KANJI_RE = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;
const isKanjiChar = (ch: string) => KANJI_RE.test(ch);

interface Segment {
  text: string;
  furigana?: string;
}

// Splits `word` into runs of kanji vs. non-kanji characters, and aligns each
// kanji run with its corresponding slice of `reading` by matching the
// surrounding literal (non-kanji) characters, which are assumed identical in
// both strings. This avoids wrapping an entire long phrase (e.g. one
// containing brackets/okurigana/punctuation) in a single <ruby>, which
// browsers can render as a broken, one-character-per-line vertical stack
// when the container is narrow.
function segmentFurigana(word: string, reading: string): Segment[] {
  const segments: Segment[] = [];
  let wi = 0;
  let ri = 0;

  while (wi < word.length) {
    const ch = word[wi];
    if (!isKanjiChar(ch)) {
      segments.push({ text: ch });
      wi++;
      if (ri < reading.length) ri++;
      continue;
    }

    const runStart = wi;
    while (wi < word.length && isKanjiChar(word[wi])) wi++;
    const run = word.slice(runStart, wi);
    const nextLiteral = wi < word.length ? word[wi] : null;

    let readingEnd: number;
    if (nextLiteral === null) {
      readingEnd = reading.length;
    } else {
      const idx = reading.indexOf(nextLiteral, ri);
      readingEnd = idx === -1 ? reading.length : idx;
    }
    if (readingEnd < ri) readingEnd = ri;

    segments.push({ text: run, furigana: reading.slice(ri, readingEnd) });
    ri = readingEnd;
  }

  return segments;
}

interface FuriganaProps {
  word: string;
  reading: string;
  className?: string;
}

export function Furigana({ word, reading, className }: FuriganaProps) {
  const needsRuby = reading && reading !== word && !wanakana.isKana(word);
  if (!needsRuby) {
    return <span className={className}>{word}</span>;
  }

  const segments = segmentFurigana(word, reading);

  return (
    <span className={className}>
      {segments.map((seg, i) =>
        seg.furigana ? (
          <ruby key={i}>
            {seg.text}
            <rt>{seg.furigana}</rt>
          </ruby>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </span>
  );
}

interface ReadingProps {
  word: string;
  reading: string;
  romaji?: string;
  className?: string;
}

export function Reading({ word, reading, romaji, className }: ReadingProps) {
  const { showRomaji } = useSettings();
  const roma = romaji ?? wanakana.toRomaji(reading);
  return (
    <span className={className}>
      <Furigana word={word} reading={reading} />
      {showRomaji && roma && (
        <span className="ml-2 align-middle text-sm text-slate-500 dark:text-slate-400">
          {roma}
        </span>
      )}
    </span>
  );
}
