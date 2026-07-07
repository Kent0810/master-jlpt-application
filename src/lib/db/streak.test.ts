import { describe, it, expect } from "vitest";
import { computeStreak } from "./db";

const TODAY = new Date("2026-07-06T12:00:00Z");

describe("computeStreak", () => {
  it("is 0 with no reviews", () => {
    expect(computeStreak([], TODAY)).toBe(0);
  });

  it("counts consecutive days ending today", () => {
    expect(computeStreak(["2026-07-06", "2026-07-05", "2026-07-04"], TODAY)).toBe(3);
  });

  it("still counts a streak ending yesterday (today not studied yet)", () => {
    expect(computeStreak(["2026-07-05", "2026-07-04"], TODAY)).toBe(2);
  });

  it("breaks on a gap", () => {
    expect(computeStreak(["2026-07-06", "2026-07-04", "2026-07-03"], TODAY)).toBe(1);
  });

  it("dedupes multiple reviews on the same day", () => {
    expect(computeStreak(["2026-07-06", "2026-07-06", "2026-07-05"], TODAY)).toBe(2);
  });
});
