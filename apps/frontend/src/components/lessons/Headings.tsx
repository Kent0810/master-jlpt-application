"use client";

import { accentTint, accentShade } from "@/lib/lessonAccents";

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
    <div
      className="flex items-center gap-3 rounded-2xl border-l-4 px-4 py-3"
      style={{
        backgroundColor: accentTint(accent, 0.09),
        borderLeftColor: accent,
      }}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg shadow-sm"
        style={{ backgroundColor: accent }}
      >
        {emoji}
      </span>
      <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
        {title}
      </h2>
      {count !== undefined && (
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
          style={{ backgroundColor: accent }}
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
  // "Phần 2 · も・の" → eyebrow "Phần 2", main title "も・の". A part title
  // without the separator just renders whole as the main title.
  const sep = title.indexOf("·");
  const eyebrow = sep === -1 ? null : title.slice(0, sep).trim();
  const main = sep === -1 ? title : title.slice(sep + 1).trim();

  // Duolingo-style unit banner: the part divider is the parent of the
  // section bands below it, so it must visually outrank them — solid
  // accent gradient (same language as the lesson page header) vs their
  // pale tints.
  return (
    <div
      className="mt-6 overflow-hidden rounded-2xl p-5 text-white shadow-md"
      style={{
        background: `linear-gradient(135deg, ${accent}, ${accentShade(accent, 0.55)})`,
      }}
    >
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-0.5 font-jp text-2xl font-extrabold">{main}</h2>
      {subtitle && <p className="mt-1 text-sm text-white/90">{subtitle}</p>}
    </div>
  );
}
