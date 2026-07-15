"use client";

import * as wanakana from "wanakana";
import { useSettings } from "@/lib/settings/SettingsProvider";
import type { TokenChunk } from "@/lib/data/types";

interface Props {
  jp: string;
  reading?: string;
  tokens?: TokenChunk[];
  romaji?: string;
  className?: string;
  romajiClassName?: string;
  // When set, each word token becomes tappable and calls back with its
  // surface text instead of rendering as a plain, non-interactive span.
  onWordSelect?: (word: string, index: number) => void;
  selectedWord?: string | null;
  // Linked-highlight support: reports the hovered token index (null on leave)
  // and tints the token at highlightIndex — used to pair each word with its
  // span in the translation line.
  onWordHover?: (index: number | null) => void;
  highlightIndex?: number | null;
}

// Chunk boundaries in the dialogue data often bundle trailing punctuation
// onto the preceding word (e.g. "はい、" as one chunk) - strip it so word
// lookup/save matches the clean dictionary form in the vocab list.
const EDGE_PUNCTUATION_RE =
  /^[。、！？「」『』・～\s]+|[。、！？「」『』・～\s]+$/g;

function chunkText(chunk: TokenChunk): string {
  return chunk
    .map((seg) => seg.t)
    .join("")
    .replace(EDGE_PUNCTUATION_RE, "");
}

// Renders a sentence in traditional textbook style: word-spaced (分かち書き) with
// furigana over kanji, and an optional spaced-romaji line below (honouring the
// Romaji setting). Falls back to whole-string furigana when no tokens exist.
export function Sentence({
  jp,
  reading,
  tokens,
  romaji,
  className,
  romajiClassName,
  onWordSelect,
  selectedWord,
  onWordHover,
  highlightIndex,
}: Props) {
  const { showRomaji } = useSettings();
  const roma = romaji ?? (reading ? wanakana.toRomaji(reading) : "");

  return (
    <span className={className}>
      <span className="font-jp leading-loose">
        {tokens && tokens.length > 0 ? (
          tokens.map((chunk, ci) => {
            const content = chunk.map((seg, si) =>
              seg.f ? (
                <ruby key={si}>
                  {seg.t}
                  <rt>{seg.f}</rt>
                </ruby>
              ) : (
                <span key={si}>{seg.t}</span>
              ),
            );
            if (!onWordSelect && !onWordHover) {
              return (
                <span key={ci} className="mr-2 inline-block">
                  {content}
                </span>
              );
            }
            const text = chunkText(chunk);
            const isActive = text === selectedWord || ci === highlightIndex;
            return (
              <button
                key={ci}
                type="button"
                onClick={() => onWordSelect?.(text, ci)}
                onMouseEnter={() => onWordHover?.(ci)}
                onMouseLeave={() => onWordHover?.(null)}
                className={`mr-2 inline-block rounded px-0.5 transition-colors ${
                  isActive
                    ? "bg-brand/20"
                    : "hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                {content}
              </button>
            );
          })
        ) : reading && reading !== jp && !wanakana.isKana(jp) ? (
          <ruby>
            {jp}
            <rt>{reading}</rt>
          </ruby>
        ) : (
          jp
        )}
      </span>
      {showRomaji && roma && (
        <span
          className={
            romajiClassName ??
            "mt-0.5 block text-sm text-slate-500 dark:text-slate-400"
          }
        >
          {roma}
        </span>
      )}
    </span>
  );
}
