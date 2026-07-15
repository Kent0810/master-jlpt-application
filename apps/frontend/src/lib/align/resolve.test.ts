import { describe, expect, it } from "vitest";
import { resolveSpans, segmentText } from "./resolve";

describe("resolveSpans", () => {
  it("maps each part to its character span in the text", () => {
    const text = "I am a student.";
    expect(resolveSpans(text, ["I", "student", "am"])).toEqual([
      [0, 1],
      [7, 14],
      [2, 4],
    ]);
  });

  it("passes null parts through", () => {
    expect(resolveSpans("Yes.", [null, "Yes"])).toEqual([null, [0, 3]]);
  });

  it("claims successive occurrences for duplicate parts", () => {
    const text = "Nice to meet you. Nice to meet you.";
    expect(
      resolveSpans(text, ["Nice to meet you", "Nice to meet you"]),
    ).toEqual([
      [0, 16],
      [18, 34],
    ]);
  });

  it("skips occurrences that overlap an already-claimed span", () => {
    // "an" occurs inside "and" (claimed first) — the standalone "an" later
    // in the string must be chosen instead.
    const text = "and then an apple";
    expect(resolveSpans(text, ["and then", "an"])).toEqual([
      [0, 8],
      [9, 11],
    ]);
  });

  it("returns null for parts not present in the text", () => {
    expect(resolveSpans("Hello.", ["Goodbye"])).toEqual([null]);
  });

  it("prefers word-boundary occurrences over mid-word matches", () => {
    // "a" first occurs inside "am"; the standalone article must win.
    expect(resolveSpans("I am a student.", ["a"])).toEqual([[5, 6]]);
  });

  it("respects boundaries in Vietnamese text with diacritics", () => {
    // "là" occurs inside "làm"; the standalone copula later must win.
    const text = "Tôi làm việc, tôi là sinh viên.";
    expect(resolveSpans(text, ["là"])).toEqual([[18, 20]]);
  });
});

describe("segmentText", () => {
  it("splits text into plain and token-linked segments in order", () => {
    const text = "I am a student.";
    const spans = resolveSpans(text, ["I", "student", "am"]);
    expect(segmentText(text, spans)).toEqual([
      { text: "I", token: 0 },
      { text: " ", token: null },
      { text: "am", token: 2 },
      { text: " a ", token: null },
      { text: "student", token: 1 },
      { text: ".", token: null },
    ]);
  });

  it("returns the whole text as one plain segment when nothing aligns", () => {
    expect(segmentText("Hello.", [null])).toEqual([
      { text: "Hello.", token: null },
    ]);
  });
});
