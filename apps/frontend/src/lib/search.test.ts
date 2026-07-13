import { describe, it, expect } from "vitest";
import { searchVocab, searchKanji, queryForms } from "./search";
import type { Kanji, Vocabulary } from "./data/types";

const taberu: Vocabulary = {
  id: "vocab_食べる",
  word: "食べる",
  reading: "たべる",
  romaji: "taberu",
  meanings: ["to eat"],
  partOfSpeech: "ichidan-verb",
  jlptLevel: "N5",
  audioUrl: null,
};

const gakkou: Vocabulary = {
  id: "vocab_学校",
  word: "学校",
  reading: "がっこう",
  romaji: "gakkou",
  meanings: ["school"],
  partOfSpeech: "noun",
  jlptLevel: "N5",
  audioUrl: null,
};

const hi: Kanji = {
  id: "kanji_日",
  character: "日",
  meanings: ["day", "sun"],
  onyomi: ["ニチ", "ジツ"],
  kunyomi: ["ひ"],
  strokeCount: 4,
  jlptLevel: "N5",
  exampleVocabIds: [],
};

describe("queryForms", () => {
  it("expands romaji into kana forms", () => {
    const forms = queryForms("taberu");
    expect(forms).toContain("たべる");
  });
  it("returns empty for blank", () => {
    expect(queryForms("  ")).toEqual([]);
  });
});

describe("searchVocab", () => {
  const items = [taberu, gakkou];
  it("matches romaji typed for a kana reading", () => {
    expect(searchVocab(items, "taberu")).toEqual([taberu]);
  });
  it("matches kana reading directly", () => {
    expect(searchVocab(items, "がっこう")).toEqual([gakkou]);
  });
  it("matches English meaning case-insensitively", () => {
    expect(searchVocab(items, "SCHOOL")).toEqual([gakkou]);
  });
  it("matches the written kanji", () => {
    expect(searchVocab(items, "食")).toEqual([taberu]);
  });
  it("returns all for empty query", () => {
    expect(searchVocab(items, "")).toHaveLength(2);
  });
});

describe("searchKanji", () => {
  it("matches English meaning", () => {
    expect(searchKanji([hi], "sun")).toEqual([hi]);
  });
  it("matches the character", () => {
    expect(searchKanji([hi], "日")).toEqual([hi]);
  });
});
