import type { SrsState, StudyStatus } from "../data/types";

export type Grade = "again" | "hard" | "good" | "easy";

const QUALITY: Record<Grade, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

const MIN_EASE = 1.3;
export const MASTERED_INTERVAL_DAYS = 21;

export function initialSrs(now: Date = new Date()): SrsState {
  return {
    ease: 2.5,
    intervalDays: 0,
    dueAt: isoDate(now),
    reviews: 0,
    lapses: 0,
  };
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

export function schedule(
  state: SrsState,
  grade: Grade,
  now: Date = new Date(),
): SrsState {
  const q = QUALITY[grade];

  let ease = state.ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (ease < MIN_EASE) ease = MIN_EASE;

  let intervalDays: number;
  let reviews = state.reviews + 1;
  let lapses = state.lapses;

  if (q < 3) {
    reviews = 0;
    lapses += 1;
    intervalDays = 1;
  } else if (state.reviews === 0) {
    intervalDays = 1;
  } else if (state.reviews === 1) {
    intervalDays = 6;
  } else {
    intervalDays = Math.round(state.intervalDays * ease);
  }

  return {
    ease: Math.round(ease * 100) / 100,
    intervalDays,
    dueAt: isoDate(addDays(now, intervalDays)),
    reviews,
    lapses,
  };
}

export function deriveStatus(state: SrsState): StudyStatus {
  if (state.reviews === 0 && state.intervalDays === 0) return "new";
  if (state.intervalDays >= MASTERED_INTERVAL_DAYS) return "mastered";
  return "learning";
}

export function isDue(state: SrsState, now: Date = new Date()): boolean {
  return state.dueAt <= isoDate(now);
}

export function formatInterval(days: number): string {
  if (days < 30) return `${days}d`;
  if (days < 365) return `${Math.round(days / 30)}mo`;
  return `${Math.round(days / 365)}y`;
}
