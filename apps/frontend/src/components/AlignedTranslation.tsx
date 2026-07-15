"use client";

import { useMemo } from "react";
import { resolveSpans, segmentText } from "@/lib/align/resolve";
import type { AlignmentParts } from "@/lib/data/types";

interface Props {
  text: string;
  // Per-token substrings of `text` (see AlignmentParts). When missing, the
  // translation renders as plain text with no linked highlighting.
  parts?: AlignmentParts;
  highlightIndex?: number | null;
  onWordHover?: (index: number | null) => void;
  className?: string;
}

// Renders a translation line whose aligned words light up together with the
// Japanese word they translate: hovering either side highlights both (the
// hover state itself lives in the parent, keyed by token index).
export function AlignedTranslation({
  text,
  parts,
  highlightIndex,
  onWordHover,
  className,
}: Props) {
  const segments = useMemo(
    () => (parts ? segmentText(text, resolveSpans(text, parts)) : null),
    [text, parts],
  );

  if (!segments) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {segments.map((seg, i) =>
        seg.token === null ? (
          <span key={i}>{seg.text}</span>
        ) : (
          <span
            key={i}
            onMouseEnter={() => onWordHover?.(seg.token)}
            onMouseLeave={() => onWordHover?.(null)}
            className={`rounded transition-colors ${
              seg.token === highlightIndex
                ? "bg-brand/20"
                : "hover:bg-black/5 dark:hover:bg-white/10"
            }`}
          >
            {seg.text}
          </span>
        ),
      )}
    </span>
  );
}
