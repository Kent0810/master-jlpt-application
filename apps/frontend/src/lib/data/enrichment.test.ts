import { describe, expect, it } from "vitest";
import { getGrammar } from "./index";
import { getDialogue } from "@/lib/lessons/lessons";
import { getLessonBlocks } from "@/lib/lessons/blocks";
import { resolveSpans } from "@/lib/align/resolve";
import type { AlignmentParts, TokenChunk } from "./types";

// Every lesson sentence must carry complete, resolvable word alignments, and
// every grammar point a full bilingual elaboration — these tests keep the
// authored data files in data/ honest as content evolves.

const LESSONS = Array.from({ length: 25 }, (_, i) => i + 1);

function checkAlignment(
  label: string,
  tokens: TokenChunk[] | undefined,
  parts: AlignmentParts | undefined,
  text: string,
) {
  expect(parts, `${label}: missing alignment`).toBeDefined();
  expect(parts!.length, `${label}: parts/tokens length mismatch`).toBe(
    tokens!.length,
  );
  const spans = resolveSpans(text, parts!);
  parts!.forEach((p, i) => {
    if (p !== null) {
      expect(
        spans[i],
        `${label}[${i}]: "${p}" not found in "${text}"`,
      ).not.toBeNull();
    }
  });
}

describe("dialogue alignments", () => {
  it("aligns every dialogue line in both languages", () => {
    for (const lesson of LESSONS) {
      const dialogue = getDialogue(lesson);
      expect(dialogue, `dialogue for lesson ${lesson}`).toBeDefined();
      dialogue!.lines.forEach((line, i) => {
        const label = `d${lesson}:${i}`;
        expect(line.tokens, `${label}: missing tokens`).toBeDefined();
        checkAlignment(`${label} en`, line.tokens, line.alignEn, line.en);
        checkAlignment(`${label} vi`, line.tokens, line.alignVi, line.vi);
      });
    }
  });
});

describe("lesson block dialogue alignments", () => {
  it("aligns every inline-authored dialogue line in both languages", () => {
    for (const lesson of LESSONS) {
      getLessonBlocks(lesson).forEach((block, bi) => {
        if (block.kind !== "dialogue") return;
        block.lines.forEach((line, i) => {
          const label = `b${lesson}:${bi}:${i}`;
          expect(line.tokens, `${label}: missing tokens`).toBeDefined();
          checkAlignment(`${label} en`, line.tokens, line.alignEn, line.en);
          checkAlignment(`${label} vi`, line.tokens, line.alignVi, line.vi);
        });
      });
    }
  });
});

describe("grammar enrichment", () => {
  it("aligns every grammar example in both languages", () => {
    for (const g of getGrammar()) {
      g.examples.forEach((ex, i) => {
        const label = `g:${g.id}:${i}`;
        expect(ex.tokens, `${label}: missing tokens`).toBeDefined();
        checkAlignment(`${label} en`, ex.tokens, ex.alignEn, ex.en);
        expect(ex.vi, `${label}: missing vi gloss`).toBeDefined();
        checkAlignment(`${label} vi`, ex.tokens, ex.alignVi, ex.vi!);
      });
    }
  });

  it("gives every grammar point a full bilingual detail", () => {
    for (const g of getGrammar()) {
      for (const [lang, detail] of [
        ["en", g.detail],
        ["vi", g.detailVi],
      ] as const) {
        expect(detail, `${g.id}: missing ${lang} detail`).toBeDefined();
        expect(
          detail!.explanation.length,
          `${g.id} ${lang}: too few explanation paragraphs`,
        ).toBeGreaterThanOrEqual(2);
        expect(
          detail!.formation.length,
          `${g.id} ${lang}: empty formation`,
        ).toBeGreaterThan(0);
        expect(
          detail!.pitfalls.length,
          `${g.id} ${lang}: no pitfalls`,
        ).toBeGreaterThanOrEqual(1);
      }
    }
  });
});
