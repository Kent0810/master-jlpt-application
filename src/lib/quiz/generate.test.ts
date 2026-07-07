import { describe, it, expect } from "vitest";
import { buildQuestion, buildQuiz, checkTyping } from "./generate";
import type { Vocabulary } from "@/lib/data/types";

function v(word: string, reading: string, meaning: string): Vocabulary {
  return {
    id: `vocab_${word}`,
    word,
    reading,
    romaji: "",
    meanings: [meaning],
    partOfSpeech: "noun",
    jlptLevel: "N5",
    audioUrl: null,
  };
}

const pool: Vocabulary[] = [
  v("食べる", "たべる", "to eat"),
  v("学校", "がっこう", "school"),
  v("水", "みず", "water"),
  v("犬", "いぬ", "dog"),
  v("本", "ほん", "book"),
];

describe("buildQuestion", () => {
  it("meaning mode gives 4 options containing the correct word", () => {
    const q = buildQuestion(pool[0], "meaning", pool);
    expect(q.options).toHaveLength(4);
    expect(q.options).toContain("食べる");
    expect(q.answer).toBe("食べる");
    expect(new Set(q.options).size).toBe(4);
  });

  it("reading mode asks for the reading", () => {
    const q = buildQuestion(pool[1], "reading", pool);
    expect(q.prompt).toBe("学校");
    expect(q.answer).toBe("がっこう");
    expect(q.options).toContain("がっこう");
  });

  it("typing mode has no options", () => {
    const q = buildQuestion(pool[2], "typing", pool);
    expect(q.options).toBeUndefined();
    expect(q.answer).toBe("みず");
  });

  it("listening mode speaks the reading, answers with the word", () => {
    const q = buildQuestion(pool[3], "listening", pool);
    expect(q.prompt).toBe("いぬ");
    expect(q.answer).toBe("犬");
    expect(q.options).toContain("犬");
  });
});

describe("buildQuiz", () => {
  it("builds the requested number of questions", () => {
    expect(buildQuiz(pool, "reading", 3)).toHaveLength(3);
  });
});

describe("checkTyping", () => {
  it("accepts the exact kana reading", () => {
    expect(checkTyping("たべる", "たべる")).toBe(true);
  });
  it("accepts romaji for the reading", () => {
    expect(checkTyping("taberu", "たべる")).toBe(true);
  });
  it("accepts katakana-typed reading normalised to hiragana", () => {
    expect(checkTyping("タベル", "たべる")).toBe(true);
  });
  it("rejects a wrong answer", () => {
    expect(checkTyping("のむ", "たべる")).toBe(false);
  });
  it("rejects empty input", () => {
    expect(checkTyping("  ", "たべる")).toBe(false);
  });
});
