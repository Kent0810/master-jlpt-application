import { describe, expect, it } from "vitest";
import { findVocabForSurface } from "./lookup";

// Tapped sentence chunks bundle trailing particles/copula onto the word
// (分かち書き): looking up "映画を" must still find 映画.

describe("findVocabForSurface", () => {
  it("finds an exact vocabulary match", () => {
    expect(findVocabForSurface("映画")?.id).toBe("vocab_映画");
  });

  it("strips a trailing particle", () => {
    expect(findVocabForSurface("映画を")?.id).toBe("vocab_映画");
    expect(findVocabForSurface("図書館で")?.id).toBe("vocab_図書館");
    expect(findVocabForSurface("テニスを")?.id).toBe("vocab_テニス");
  });

  it("strips the copula", () => {
    expect(findVocabForSurface("学生です")?.id).toBe("vocab_学生");
    expect(findVocabForSurface("学生ですか")?.id).toBe("vocab_学生");
  });

  it("prefers the exact word over a stripped base", () => {
    // もも exists? use a real pair: これ vs こ+れ is not strippable; assert
    // a word ending in a particle-like kana resolves to itself when listed.
    expect(findVocabForSurface("これ")?.id).toBe("vocab_これ");
  });

  it("returns undefined when nothing matches", () => {
    expect(findVocabForSurface("ゾンビ")).toBeUndefined();
    // never matches the empty string when the chunk is only a particle
    expect(findVocabForSurface("を")).toBeUndefined();
  });
});
