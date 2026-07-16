"use client";

import { useEffect, useState } from "react";

// Lesson completion for the journey map, earned by finishing a lesson's
// practice quiz. Persisted in localStorage (same pattern as other UI state);
// a lesson keeps its best-ever star count across attempts.

export interface LessonProgress {
  stars: 1 | 2 | 3;
  completedAt: string;
}

export type LessonProgressMap = Record<number, LessonProgress>;

const STORAGE_KEY = "lessons.progress.N5";
const PROGRESS_EVENT = "n5:lesson-progress";

export function starsForScore(correct: number, total: number): 1 | 2 | 3 {
  if (total > 0 && correct >= total) return 3;
  if (total > 0 && correct / total >= 0.7) return 2;
  return 1;
}

// Returns the same map when the result doesn't beat the stored stars.
export function applyQuizResult(
  map: LessonProgressMap,
  lesson: number,
  correct: number,
  total: number,
  now: () => string = () => new Date().toISOString(),
): LessonProgressMap {
  const stars = starsForScore(correct, total);
  const prev = map[lesson];
  if (prev && prev.stars >= stars) return map;
  return { ...map, [lesson]: { stars, completedAt: now() } };
}

// The "current" stop on the map: the first lesson with no completion.
export function firstUncompleted(
  map: LessonProgressMap,
  lessons: number[],
): number | undefined {
  return lessons.find((n) => !map[n]);
}

export function readLessonProgress(): LessonProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as LessonProgressMap;
  } catch {
    return {};
  }
}

export function recordQuizResult(
  lesson: number,
  correct: number,
  total: number,
): void {
  const map = readLessonProgress();
  const next = applyQuizResult(map, lesson, correct, total);
  if (next === map) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

// Live view of the progress map; starts empty so SSR/hydration match, then
// syncs on mount and whenever a quiz records a result (or another tab writes).
export function useLessonProgress(): LessonProgressMap {
  const [map, setMap] = useState<LessonProgressMap>({});

  useEffect(() => {
    const sync = () => setMap(readLessonProgress());
    sync();
    window.addEventListener(PROGRESS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return map;
}
