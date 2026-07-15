// Word-alignment between a tokenized Japanese sentence and its translation.
// Alignment data is authored as one substring (or null) of the translation per
// token chunk; spans are resolved to character offsets here so duplicate words
// each claim their own occurrence.

export type AlignSpan = [start: number, end: number];

export interface TextSegment {
  text: string;
  // Index of the token chunk this segment translates, or null for connective
  // text that belongs to no single word (articles, particles' glue, etc.).
  token: number | null;
}

const WORD_CHAR = /[\p{L}\p{N}]/u;

// True when the occurrence at [start, end) is not glued to letters/digits on
// either side — so "a" can't match inside "am", or "là" inside "làm".
function atWordBoundary(text: string, start: number, end: number): boolean {
  const before = start > 0 ? text[start - 1] : "";
  const after = end < text.length ? text[end] : "";
  return !WORD_CHAR.test(before) && !WORD_CHAR.test(after);
}

// Resolve each part to its occurrence in `text`, preferring word-boundary
// matches, skipping spans already claimed by earlier parts. Unresolvable
// parts yield null so a bad alignment degrades to "no highlight" rather than
// breaking the page.
export function resolveSpans(
  text: string,
  parts: (string | null)[],
): (AlignSpan | null)[] {
  const claimed: AlignSpan[] = [];
  return parts.map((part) => {
    if (!part) return null;
    let fallback: AlignSpan | null = null;
    let from = 0;
    while (from <= text.length - part.length) {
      const start = text.indexOf(part, from);
      if (start === -1) break;
      const end = start + part.length;
      if (!claimed.some(([s, e]) => start < e && end > s)) {
        if (atWordBoundary(text, start, end)) {
          claimed.push([start, end]);
          return [start, end] as AlignSpan;
        }
        fallback ??= [start, end];
      }
      from = start + 1;
    }
    if (fallback) claimed.push(fallback);
    return fallback;
  });
}

// Split `text` into ordered segments, tagging each aligned run with its token
// index. Spans are non-overlapping by construction (see resolveSpans).
export function segmentText(
  text: string,
  spans: (AlignSpan | null)[],
): TextSegment[] {
  const marks = spans
    .map((span, token) => (span ? { span, token } : null))
    .filter((m): m is { span: AlignSpan; token: number } => m !== null)
    .sort((a, b) => a.span[0] - b.span[0]);

  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const { span, token } of marks) {
    if (span[0] > cursor) {
      segments.push({ text: text.slice(cursor, span[0]), token: null });
    }
    segments.push({ text: text.slice(span[0], span[1]), token });
    cursor = span[1];
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), token: null });
  }
  return segments;
}
