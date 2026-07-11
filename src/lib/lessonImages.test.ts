import { describe, it, expect } from "vitest";
import { getLessonHero, lessonImageSrc, LESSON_HEROES } from "./lessonImages";

describe("lessonImages", () => {
  it("returns the hero entry for a known lesson", () => {
    const hero = getLessonHero(1);
    expect(hero).not.toBeNull();
    expect(hero!.file).toBe("hero-l01.svg");
    expect(hero!.captionEn.length).toBeGreaterThan(0);
    expect(hero!.captionVi.length).toBeGreaterThan(0);
  });

  it("returns null for an unknown lesson", () => {
    expect(getLessonHero(999)).toBeNull();
  });

  it("builds a public path", () => {
    expect(lessonImageSrc("hero-l01.png")).toBe("/lesson-images/hero-l01.png");
  });
});

describe("lessonImages completeness", () => {
  it("has a hero for every lesson 1–25 with correct filename + captions", () => {
    for (let n = 1; n <= 25; n++) {
      const h = LESSON_HEROES[n];
      expect(h, `lesson ${n}`).toBeDefined();
      expect(h.file).toBe(`hero-l${String(n).padStart(2, "0")}.svg`);
      expect(h.captionEn.trim().length).toBeGreaterThan(0);
      expect(h.captionVi.trim().length).toBeGreaterThan(0);
    }
  });
});
