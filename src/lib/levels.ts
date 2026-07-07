import type { JlptLevel } from "./data/types";

export interface LevelInfo {
  level: JlptLevel;
  label: string;
  blurb: string;
  available: boolean;
}

export const LEVELS: LevelInfo[] = [
  { level: "N5", label: "N5", blurb: "Basics", available: true },
  { level: "N4", label: "N4", blurb: "Elementary", available: false },
  { level: "N3", label: "N3", blurb: "Intermediate", available: false },
  { level: "N2", label: "N2", blurb: "Upper-intermediate", available: false },
];

export function isLevelAvailable(level: JlptLevel): boolean {
  return LEVELS.find((l) => l.level === level)?.available ?? false;
}
