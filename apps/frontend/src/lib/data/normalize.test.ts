import { describe, it, expect } from "vitest";
import {
  normalizeKanji,
  normalizeVocab,
  normalizeMnnVocab,
  cleanMnnSurface,
} from "./normalize";

describe("normalizeKanji", () => {
  it("maps the kanjiapi shape for 日", () => {
    const k = normalizeKanji({
      kanji: "日",
      meanings: ["day", "sun"],
      on_readings: ["ニチ", "ジツ"],
      kun_readings: ["ひ", "-び", "-か"],
      stroke_count: 4,
      jlpt: 5,
      unicode: "65E5",
    });
    expect(k.id).toBe("kanji_日");
    expect(k.character).toBe("日");
    expect(k.onyomi).toContain("ニチ");
    expect(k.kunyomi).toContain("ひ");
    expect(k.strokeCount).toBe(4);
    expect(k.jlptLevel).toBe("N5");
    expect(k.kanjivgId).toBe("065e5");
    expect(k.exampleVocabIds).toEqual([]);
  });
});

describe("normalizeVocab", () => {
  it("maps the jlpt-vocab-api shape for 毎朝", () => {
    const v = normalizeVocab({
      word: "毎朝",
      meaning: "every morning",
      furigana: "まいあさ",
      romaji: "maiasa",
      level: 5,
    });
    expect(v.id).toBe("vocab_毎朝");
    expect(v.reading).toBe("まいあさ");
    expect(v.romaji).toBe("maiasa");
    expect(v.meanings).toEqual(["every morning"]);
    expect(v.partOfSpeech).toBe("noun");
    expect(v.audioUrl).toBeNull();
  });

  it("derives romaji from reading when missing", () => {
    const v = normalizeVocab({
      word: "食べる",
      meaning: "to eat",
      furigana: "たべる",
      level: 5,
    });
    expect(v.romaji).toBe("taberu");
    expect(v.partOfSpeech).toBe("ichidan-verb");
  });

  it("splits multiple meanings", () => {
    const v = normalizeVocab({
      word: "本",
      meaning: "book; main; origin",
      furigana: "ほん",
      level: 5,
    });
    expect(v.meanings).toEqual(["book", "main", "origin"]);
  });
});

describe("cleanMnnSurface", () => {
  it("strips tildes, spaces, and bracketed alternatives", () => {
    expect(cleanMnnSurface("あの 人（あの 方）")).toBe("あの人");
    expect(cleanMnnSurface("［お］国")).toBe("国");
    expect(cleanMnnSurface("この ～")).toBe("この");
  });
});

describe("normalizeMnnVocab", () => {
  it("maps a Minna entry with kanji", () => {
    const v = normalizeMnnVocab({
      lesson: 6,
      kanji: "魚",
      kana: "さかな",
      romaji: "sakana",
      en: "fish",
    });
    expect(v.id).toBe("vocab_魚");
    expect(v.word).toBe("魚");
    expect(v.reading).toBe("さかな");
    expect(v.romaji).toBe("sakana");
    expect(v.meanings).toEqual(["fish"]);
    expect(v.mnnLesson).toBe(6);
    expect(v.mnnBook).toBe("I");
  });

  it("falls back to kana when there is no kanji", () => {
    const v = normalizeMnnVocab({
      lesson: 1,
      kanji: null,
      kana: "わたし",
      romaji: "watashi",
      en: "I",
    });
    expect(v.word).toBe("わたし");
    expect(v.reading).toBe("わたし");
  });

  it("assigns Book II for lessons past 25", () => {
    const v = normalizeMnnVocab({
      lesson: 30,
      kanji: "地図",
      kana: "ちず",
      romaji: "chizu",
      en: "map",
    });
    expect(v.mnnBook).toBe("II");
  });
});
