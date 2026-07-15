import { describe, it, expect } from "vitest";
import { buildVocabQuestions, authoredToQuestion } from "./exercises";
import { getVocabByLesson } from "@/lib/data";

describe("buildVocabQuestions", () => {
  const questions = buildVocabQuestions(getVocabByLesson(10), "en", 5);

  it("produces questions whose answer index points to a real option", () => {
    expect(questions.length).toBeGreaterThan(0);
    for (const q of questions) {
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.options.length);
    }
  });

  it("gives each question distinct options including the answer", () => {
    for (const q of questions) {
      expect(new Set(q.options).size).toBe(q.options.length);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("authoredToQuestion", () => {
  const item = {
    prompt: "部屋（　）机があります。",
    reading: "へや（　）つくえがあります。",
    options: ["に", "で", "を"],
    answer: 0,
    explanation: { en: "use に", vi: "dùng に" },
  };

  it("localizes the explanation", () => {
    expect(authoredToQuestion(item, "vi").explanation).toBe("dùng に");
    expect(authoredToQuestion(item, "en").explanation).toBe("use に");
  });

  it("preserves prompt, options and answer", () => {
    const q = authoredToQuestion(item, "en");
    expect(q.prompt).toBe(item.prompt);
    expect(q.options).toEqual(item.options);
    expect(q.answer).toBe(0);
  });
});
