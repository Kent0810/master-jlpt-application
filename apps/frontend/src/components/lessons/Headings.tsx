"use client";

import { accentTint } from "@/lib/lessonAccents";

// The emoji-chip heading used at the top of each content block (Grammar,
// Dialogue, Vocabulary, Practice…).
export function SectionHeading({
  emoji,
  title,
  count,
  accent,
}: {
  emoji: string;
  title: string;
  count?: number;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-xl text-base"
        style={{ backgroundColor: accentTint(accent, 0.12) }}
      >
        {emoji}
      </span>
      <h2 className="text-base font-bold">{title}</h2>
      {count !== undefined && (
        <span
          className="rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{ color: accent, backgroundColor: accentTint(accent, 0.12) }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

// A named-section divider (from a `section` block) that visually groups the
// blocks beneath it — e.g. "Part 1 · Existence".
export function SectionDivider({
  title,
  subtitle,
  accent,
}: {
  title: string;
  subtitle?: string;
  accent: string;
}) {
  return (
    <div className="pt-4">
      <div className="flex items-center gap-3">
        <span
          className="shrink-0 rounded-full px-3 py-1 text-sm font-bold"
          style={{ color: accent, backgroundColor: accentTint(accent, 0.14) }}
        >
          {title}
        </span>
        <span
          aria-hidden
          className="h-px flex-1"
          style={{ backgroundColor: accentTint(accent, 0.3) }}
        />
      </div>
      {subtitle && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
