import { describe, it, expect } from "vitest";
import {
  getKanji,
  getVocab,
  getGrammar,
  getKanjiByChar,
  getVocabById,
} from "./index";

describe("data loaders", () => {
  it("loads the full N5 kanji set", () => {
    expect(getKanji().length).toBeGreaterThanOrEqual(100);
  });

  it("loads the full N5 vocab set", () => {
    expect(getVocab().length).toBeGreaterThan(600);
  });

  it("loads grammar points", () => {
    expect(getGrammar().length).toBeGreaterThan(10);
  });

  it("every kanji has readings and a stroke count", () => {
    for (const k of getKanji()) {
      expect(k.strokeCount).toBeGreaterThan(0);
      expect(k.onyomi.length + k.kunyomi.length).toBeGreaterThan(0);
    }
  });

  it("every vocab item has a reading and romaji", () => {
    for (const v of getVocab()) {
      expect(v.reading.length).toBeGreaterThan(0);
      expect(v.romaji.length).toBeGreaterThan(0);
    }
  });

  it("resolves kanji example vocab ids to real entries", () => {
    const hi = getKanjiByChar("日");
    expect(hi).toBeDefined();
    for (const id of hi!.exampleVocabIds) {
      expect(getVocabById(id)).toBeDefined();
    }
  });
});
