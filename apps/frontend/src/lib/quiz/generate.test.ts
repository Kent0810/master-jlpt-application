import { describe, it, expect } from "vitest";
import {
  buildQuestion,
  buildQuiz,
  checkTyping,
  meaningChoices,
  similarityRank,
} from "./generate";
import { initialSrs } from "@/lib/srs/sm2";
import type { StudyItem } from "@/lib/study/deck";
import type { Vocabulary, Kanji } from "@/lib/data/types";

function vocabItem(word: string, reading: string, meaning: string): StudyItem {
  const vocab: Vocabulary = {
    id: `vocab_${word}`,
    word,
    reading,
    romaji: "",
    meanings: [meaning],
    partOfSpeech: "noun",
    jlptLevel: "N5",
    audioUrl: null,
  };
  return { id: vocab.id, kind: "vocab", vocab, srs: initialSrs() };
}

function kanjiItem(
  character: string,
  meaning: string,
  kunyomi: string[] = [],
  onyomi: string[] = [],
  strokeCount = 1,
): StudyItem {
  const kanji: Kanji = {
    id: `kanji_${character}`,
    character,
    meanings: [meaning],
    onyomi,
    kunyomi,
    strokeCount,
    jlptLevel: "N5",
    exampleVocabIds: [],
  };
  return { id: kanji.id, kind: "kanji", kanji, srs: initialSrs() };
}

function vocabItemWithPos(
  word: string,
  meaning: string,
  partOfSpeech: Vocabulary["partOfSpeech"],
): StudyItem {
  const vocab: Vocabulary = {
    id: `vocab_${word}`,
    word,
    reading: word,
    romaji: "",
    meanings: [meaning],
    partOfSpeech,
    jlptLevel: "N5",
    audioUrl: null,
  };
  return { id: vocab.id, kind: "vocab", vocab, srs: initialSrs() };
}

const vocabPool: StudyItem[] = [
  vocabItem("食べる", "たべる", "to eat"),
  vocabItem("学校", "がっこう", "school"),
  vocabItem("水", "みず", "water"),
  vocabItem("犬", "いぬ", "dog"),
  vocabItem("本", "ほん", "book"),
];

describe("buildQuestion", () => {
  it("meaning mode gives 4 options containing the correct word", () => {
    const q = buildQuestion(vocabPool[0], "meaning");
    expect(q.options).toHaveLength(4);
    expect(q.options).toContain("食べる");
    expect(q.answer).toBe("食べる");
    expect(new Set(q.options).size).toBe(4);
  });

  it("reading mode asks for the reading", () => {
    const q = buildQuestion(vocabPool[1], "reading");
    expect(q.prompt).toBe("学校");
    expect(q.answer).toBe("がっこう");
    expect(q.options).toContain("がっこう");
  });

  it("typing mode has no options", () => {
    const q = buildQuestion(vocabPool[2], "typing");
    expect(q.options).toBeUndefined();
    expect(q.answer).toBe("みず");
  });

  it("listening mode speaks the reading, answers with the word", () => {
    const q = buildQuestion(vocabPool[3], "listening");
    expect(q.prompt).toBe("いぬ");
    expect(q.answer).toBe("犬");
    expect(q.options).toContain("犬");
  });

  it("builds a meaning question from a kanji item", () => {
    const kanji = kanjiItem("水", "water", ["みず"], ["スイ"]);
    const q = buildQuestion(kanji, "meaning");
    expect(q.prompt).toBe("water");
    expect(q.answer).toBe("水");
    expect(q.options).toContain("水");
  });

  it("reading mode on a kanji uses its first kunyomi", () => {
    const kanji = kanjiItem("水", "water", ["みず"], ["スイ"]);
    const q = buildQuestion(kanji, "reading");
    expect(q.answer).toBe("みず");
  });

  it("reading mode falls back to onyomi when there's no kunyomi", () => {
    const kanji = kanjiItem("九", "nine", [], ["キュウ"]);
    const q = buildQuestion(kanji, "reading");
    expect(q.answer).toBe("キュウ");
  });
});

describe("buildQuiz", () => {
  it("builds the requested number of questions", () => {
    expect(buildQuiz(vocabPool, "reading", 3)).toHaveLength(3);
  });

  it("caps at the number of eligible items if fewer are available", () => {
    expect(buildQuiz(vocabPool.slice(0, 2), "reading", 10)).toHaveLength(2);
  });

  it("meaning mode can include kanji items", () => {
    const kanji = kanjiItem("水", "water", ["みず"]);
    const mixed = [...vocabPool, kanji];
    const questions = buildQuiz(mixed, "meaning", mixed.length);
    expect(questions.some((q) => q.item.kind === "kanji")).toBe(true);
  });

  it("typing mode never includes kanji items", () => {
    const kanji = kanjiItem("水", "water", ["みず"]);
    const mixed = [...vocabPool, kanji];
    const questions = buildQuiz(mixed, "typing", mixed.length);
    expect(questions.every((q) => q.item.kind === "vocab")).toBe(true);
  });

  it("reading mode excludes kanji with no readings at all", () => {
    const readable = kanjiItem("水", "water", ["みず"]);
    const unreadable = kanjiItem("〆", "seal", [], []);
    const questions = buildQuiz([readable, unreadable], "reading", 2);
    expect(questions).toHaveLength(1);
    expect(questions[0].item.id).toBe(readable.id);
  });
});

describe("meaningChoices", () => {
  it("gives 4 options containing the correct meaning for a vocab item", () => {
    const { options, answer } = meaningChoices(vocabPool[0]);
    expect(options).toHaveLength(4);
    expect(options).toContain("to eat");
    expect(answer).toBe("to eat");
    expect(new Set(options).size).toBe(4);
  });

  it("gives 4 options containing the correct meaning for a kanji item", () => {
    const kanji = kanjiItem("水", "water", ["みず"]);
    const { options, answer } = meaningChoices(kanji);
    expect(options).toHaveLength(4);
    expect(options).toContain("water");
    expect(answer).toBe("water");
  });
});

describe("similarityRank", () => {
  it("ranks kanji by closeness in stroke count", () => {
    const target = kanjiItem("水", "water", ["みず"], [], 4);
    const close = kanjiItem("火", "fire", ["ひ"], [], 5);
    const far = kanjiItem("鬱", "gloom", [], [], 25);
    expect(similarityRank(target, close)).toBeLessThan(
      similarityRank(target, far),
    );
  });

  it("ranks vocab with the same part of speech as more plausible", () => {
    const target = vocabItemWithPos("食べる", "to eat", "ichidan-verb");
    const samePos = vocabItemWithPos("見る", "to see", "ichidan-verb");
    const differentPos = vocabItemWithPos("水", "water", "noun");
    expect(similarityRank(target, samePos)).toBeLessThan(
      similarityRank(target, differentPos),
    );
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
