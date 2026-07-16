import { describe, expect, it } from "vitest";
import {
  applyQuizResult,
  firstUncompleted,
  starsForScore,
  type LessonProgressMap,
} from "./progress";

const NOW = () => "2026-07-16T00:00:00.000Z";

describe("starsForScore", () => {
  it("gives 3 stars for a perfect score", () => {
    expect(starsForScore(6, 6)).toBe(3);
    expect(starsForScore(1, 1)).toBe(3);
  });

  it("gives 2 stars at 70% or better", () => {
    expect(starsForScore(5, 6)).toBe(2);
    expect(starsForScore(7, 10)).toBe(2);
  });

  it("gives 1 star below 70%", () => {
    expect(starsForScore(4, 6)).toBe(1);
    expect(starsForScore(0, 6)).toBe(1);
  });
});

describe("applyQuizResult", () => {
  it("records a new completion", () => {
    const next = applyQuizResult({}, 3, 6, 6, NOW);
    expect(next[3]).toEqual({ stars: 3, completedAt: NOW() });
  });

  it("upgrades to a better star count", () => {
    const map: LessonProgressMap = {
      3: { stars: 1, completedAt: "2026-01-01T00:00:00.000Z" },
    };
    expect(applyQuizResult(map, 3, 6, 6, NOW)[3].stars).toBe(3);
  });

  it("keeps the best result when a retry scores worse", () => {
    const map: LessonProgressMap = { 3: { stars: 3, completedAt: NOW() } };
    expect(applyQuizResult(map, 3, 0, 6, NOW)).toBe(map);
  });

  it("does not touch other lessons", () => {
    const map: LessonProgressMap = { 1: { stars: 2, completedAt: NOW() } };
    const next = applyQuizResult(map, 2, 6, 6, NOW);
    expect(next[1].stars).toBe(2);
    expect(next[2].stars).toBe(3);
  });
});

describe("firstUncompleted", () => {
  const lessons = [1, 2, 3, 4];

  it("is the first lesson when nothing is done", () => {
    expect(firstUncompleted({}, lessons)).toBe(1);
  });

  it("skips completed lessons, even with gaps", () => {
    const map: LessonProgressMap = {
      1: { stars: 3, completedAt: NOW() },
      3: { stars: 1, completedAt: NOW() },
    };
    expect(firstUncompleted(map, lessons)).toBe(2);
  });

  it("is undefined when everything is complete", () => {
    const map: LessonProgressMap = Object.fromEntries(
      lessons.map((n) => [n, { stars: 1 as const, completedAt: NOW() }]),
    );
    expect(firstUncompleted(map, lessons)).toBeUndefined();
  });
});
