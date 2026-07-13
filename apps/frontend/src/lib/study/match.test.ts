import { describe, it, expect } from "vitest";
import { buildTiles, isPair } from "./match";
import { initialSrs } from "@/lib/srs/sm2";
import type { StudyItem } from "@/lib/study/deck";
import type { Vocabulary, Kanji } from "@/lib/data/types";

function vocabItem(word: string, meaning: string): StudyItem {
  const vocab: Vocabulary = {
    id: `vocab_${word}`,
    word,
    reading: word,
    romaji: "",
    meanings: [meaning],
    partOfSpeech: "noun",
    jlptLevel: "N5",
    audioUrl: null,
  };
  return { id: vocab.id, kind: "vocab", vocab, srs: initialSrs() };
}

function kanjiItem(character: string, meaning: string): StudyItem {
  const kanji: Kanji = {
    id: `kanji_${character}`,
    character,
    meanings: [meaning],
    onyomi: [],
    kunyomi: [],
    strokeCount: 1,
    jlptLevel: "N5",
    exampleVocabIds: [],
  };
  return { id: kanji.id, kind: "kanji", kanji, srs: initialSrs() };
}

describe("buildTiles", () => {
  it("produces 2 tiles per item", () => {
    const items = [vocabItem("水", "water"), kanjiItem("火", "fire")];
    expect(buildTiles(items)).toHaveLength(4);
  });

  it("every itemId appears exactly once as front and once as meaning", () => {
    const items = [vocabItem("水", "water"), kanjiItem("火", "fire")];
    const tiles = buildTiles(items);
    for (const item of items) {
      const forItem = tiles.filter((t) => t.itemId === item.id);
      expect(forItem).toHaveLength(2);
      expect(forItem.map((t) => t.kind).sort()).toEqual(["front", "meaning"]);
    }
  });

  it("front tile text is the character/word, meaning tile text is the meaning", () => {
    const [front, meaning] = buildTiles([vocabItem("水", "water")]);
    expect(front.text).toBe("水");
    expect(meaning.text).toBe("water");
  });

  it("tile keys are unique", () => {
    const items = [vocabItem("水", "water"), kanjiItem("火", "fire")];
    const tiles = buildTiles(items);
    expect(new Set(tiles.map((t) => t.key)).size).toBe(tiles.length);
  });
});

describe("isPair", () => {
  it("is true for the same item's front and meaning tiles", () => {
    const [front, meaning] = buildTiles([vocabItem("水", "water")]);
    expect(isPair(front, meaning)).toBe(true);
    expect(isPair(meaning, front)).toBe(true);
  });

  it("is false for the same tile compared to itself", () => {
    const [front] = buildTiles([vocabItem("水", "water")]);
    expect(isPair(front, front)).toBe(false);
  });

  it("is false for two different items", () => {
    const [aFront] = buildTiles([vocabItem("水", "water")]);
    const [bFront] = buildTiles([kanjiItem("火", "fire")]);
    expect(isPair(aFront, bFront)).toBe(false);
  });

  it("is false for two front tiles of the same item (kind must differ)", () => {
    const tiles = buildTiles([vocabItem("水", "water")]);
    const frontClone = { ...tiles[0], key: "dup" };
    expect(isPair(tiles[0], frontClone)).toBe(false);
  });
});
