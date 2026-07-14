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
  onWordSelect?: (word: string) => void;
  selectedWord?: string | null;
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
            if (!onWordSelect) {
              return (
                <span key={ci} className="mr-2 inline-block">
                  {content}
                </span>
              );
            }
            const text = chunkText(chunk);
            const isSelected = text === selectedWord;
            return (
              <button
                key={ci}
                type="button"
                onClick={() => onWordSelect(text)}
                className={`mr-2 inline-block rounded px-0.5 transition-colors ${
                  isSelected
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
