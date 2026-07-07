import { describe, it, expect } from "vitest";
import { initialSrs, schedule, deriveStatus, isDue } from "./sm2";

const NOW = new Date("2026-07-06T00:00:00Z");

describe("initialSrs", () => {
  it("starts new and due today", () => {
    const s = initialSrs(NOW);
    expect(s.ease).toBe(2.5);
    expect(s.reviews).toBe(0);
    expect(deriveStatus(s)).toBe("new");
    expect(isDue(s, NOW)).toBe(true);
  });
});

describe("schedule", () => {
  it("first 'good' review schedules 1 day out", () => {
    const s = schedule(initialSrs(NOW), "good", NOW);
    expect(s.intervalDays).toBe(1);
    expect(s.reviews).toBe(1);
    expect(s.dueAt).toBe("2026-07-07");
  });

  it("second 'good' review schedules 6 days out", () => {
    let s = schedule(initialSrs(NOW), "good", NOW);
    s = schedule(s, "good", NOW);
    expect(s.intervalDays).toBe(6);
    expect(s.reviews).toBe(2);
  });

  it("third review multiplies by ease", () => {
    let s = schedule(initialSrs(NOW), "good", NOW);
    s = schedule(s, "good", NOW);
    const before = s.intervalDays;
    s = schedule(s, "good", NOW);
    expect(s.intervalDays).toBe(Math.round(before * s.ease));
    expect(s.intervalDays).toBeGreaterThan(6);
  });

  it("'again' lapses back to 1 day and counts a lapse", () => {
    let s = schedule(initialSrs(NOW), "good", NOW);
    s = schedule(s, "good", NOW);
    s = schedule(s, "again", NOW);
    expect(s.intervalDays).toBe(1);
    expect(s.lapses).toBe(1);
    expect(s.reviews).toBe(0);
  });

  it("never lets ease fall below 1.3", () => {
    let s = initialSrs(NOW);
    for (let i = 0; i < 10; i++) s = schedule(s, "again", NOW);
    expect(s.ease).toBeGreaterThanOrEqual(1.3);
  });

  it("marks long intervals as mastered", () => {
    const s = { ...initialSrs(NOW), intervalDays: 30, reviews: 5 };
    expect(deriveStatus(s)).toBe("mastered");
  });
});
