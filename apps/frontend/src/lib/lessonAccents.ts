// Per-lesson accent colors for the lessons journey UI. Same 8-color rotation
// as the hero/grammar illustration generators (scripts/gen-lesson-images.mjs),
// so each lesson card's accents match its illustration's accent color.

export const LESSON_ACCENTS = [
  "#3B82F6",
  "#22C55E",
  "#F43F5E",
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#65A30D",
] as const;

export function lessonAccent(lesson: number): string {
  return LESSON_ACCENTS[(lesson - 1) % LESSON_ACCENTS.length];
}

// Translucent tint of an accent, for image strips and pills. Accepts #RRGGBB.
export function accentTint(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Darkened shade of an accent (factor 0..1, fraction kept), for gradients.
export function accentShade(hex: string, factor: number): string {
  const r = Math.round(parseInt(hex.slice(1, 3), 16) * factor);
  const g = Math.round(parseInt(hex.slice(3, 5), 16) * factor);
  const b = Math.round(parseInt(hex.slice(5, 7), 16) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}
