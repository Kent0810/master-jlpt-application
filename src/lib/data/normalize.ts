import * as wanakana from "wanakana";
import type { Kanji, Vocabulary } from "./types";
import { guessPartOfSpeech } from "./pos";

export interface RawKanji {
  kanji: string;
  meanings: string[];
  on_readings: string[];
  kun_readings: string[];
  stroke_count: number;
  jlpt: number | null;
  unicode: string;
}

export interface RawVocab {
  word: string;
  meaning: string;
  furigana: string;
  romaji?: string;
  level: number;
}

export function normalizeKanji(raw: RawKanji): Kanji {
  return {
    id: `kanji_${raw.kanji}`,
    character: raw.kanji,
    meanings: raw.meanings ?? [],
    onyomi: raw.on_readings ?? [],
    kunyomi: raw.kun_readings ?? [],
    strokeCount: raw.stroke_count,
    jlptLevel: "N5",
    kanjivgId: raw.unicode ? raw.unicode.toLowerCase().padStart(5, "0") : undefined,
    exampleVocabIds: [],
  };
}

export interface RawMnn {
  lesson: number;
  kanji: string | null;
  kana: string;
  romaji: string;
  en: string;
}

export function cleanMnnSurface(s: string): string {
  return s
    .replace(/（[^）]*）/g, "")
    .replace(/［[^］]*］/g, "")
    .replace(/[～~]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

export function normalizeMnnVocab(raw: RawMnn): Vocabulary {
  const word = raw.kanji && raw.kanji.trim() ? raw.kanji : raw.kana;
  const cleanWord = cleanMnnSurface(word);
  const cleanReading = cleanMnnSurface(raw.kana);
  const romaji =
    raw.romaji && raw.romaji.trim()
      ? raw.romaji
      : wanakana.toRomaji(cleanReading);
  return {
    id: `vocab_${cleanWord || word}`,
    word,
    reading: raw.kana,
    romaji,
    meanings: [raw.en],
    partOfSpeech: guessPartOfSpeech(cleanWord, cleanReading),
    jlptLevel: "N5",
    audioUrl: null,
    mnnLesson: raw.lesson,
    mnnBook: raw.lesson <= 25 ? "I" : "II",
  };
}

export function normalizeVocab(raw: RawVocab): Vocabulary {
  const reading = raw.furigana || (wanakana.isKana(raw.word) ? raw.word : "");
  const romaji =
    raw.romaji && raw.romaji.trim().length > 0
      ? raw.romaji
      : wanakana.toRomaji(reading);
  const meanings = raw.meaning
    .split(/[;,/]/)
    .map((m) => m.trim())
    .filter(Boolean);
  return {
    id: `vocab_${raw.word}`,
    word: raw.word,
    reading,
    romaji,
    meanings,
    partOfSpeech: guessPartOfSpeech(raw.word, reading),
    jlptLevel: "N5",
    audioUrl: null,
  };
}
