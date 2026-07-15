import { describe, it, expect } from "vitest";
import { getLessonBlocks } from "./blocks";

describe("getLessonBlocks — default synthesis", () => {
  // Lesson 5 has no authored layout, so it is synthesized from existing data.
  const blocks = getLessonBlocks(5);
  const kinds = blocks.map((b) => b.kind);

  it("renders in Grammar → Dialogue → Vocab → Exercise order", () => {
    expect(kinds).toEqual(["grammar", "dialogue", "vocab", "exercise"]);
  });

  it("puts the dialogue before the vocabulary (the requested reorder)", () => {
    expect(kinds.indexOf("dialogue")).toBeLessThan(kinds.indexOf("vocab"));
  });

  it("resolves grammar and vocab to real objects", () => {
    const grammar = blocks.find((b) => b.kind === "grammar");
    const vocab = blocks.find((b) => b.kind === "vocab");
    expect(grammar?.kind === "grammar" && grammar.items.length).toBeTruthy();
    expect(vocab?.kind === "vocab" && vocab.items.length).toBeTruthy();
  });

  it("appends an auto-generated vocab exercise", () => {
    const ex = blocks.find((b) => b.kind === "exercise");
    expect(ex?.kind === "exercise" && ex.source).toBe("vocab-auto");
  });
});

describe("getLessonBlocks — authored Lesson 10", () => {
  const blocks = getLessonBlocks(10);

  it("uses the authored layout with named sections", () => {
    expect(blocks.some((b) => b.kind === "section")).toBe(true);
  });

  it("resolves authored grammarIds to real grammar points", () => {
    const grammar = blocks.filter((b) => b.kind === "grammar");
    expect(grammar.length).toBeGreaterThan(0);
    for (const g of grammar) {
      if (g.kind !== "grammar") continue;
      expect(g.items.length).toBeGreaterThan(0);
      expect(g.items.every((it) => typeof it.title === "string")).toBe(true);
    }
  });

  it("includes conversational, paragraph and Q&A dialogue styles", () => {
    const styles = blocks
      .filter((b) => b.kind === "dialogue")
      .map((b) => (b.kind === "dialogue" ? b.style : ""));
    expect(styles).toContain("conversational");
    expect(styles).toContain("paragraph");
    expect(styles).toContain("qa");
  });

  it("includes at least one authored exercise with a valid answer index", () => {
    const authored = blocks.filter(
      (b) => b.kind === "exercise" && b.source === "authored",
    );
    expect(authored.length).toBeGreaterThan(0);
    for (const ex of authored) {
      if (ex.kind !== "exercise" || !ex.items) continue;
      for (const item of ex.items) {
        expect(item.answer).toBeGreaterThanOrEqual(0);
        expect(item.answer).toBeLessThan(item.options.length);
      }
    }
  });
});
