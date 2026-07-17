"use client";

import * as wanakana from "wanakana";
import { useSettings } from "@/lib/settings/SettingsProvider";
import type { TokenChunk } from "@/lib/data/types";

interface Props {
  jp: string;
  reading?: string;
  tokens?: TokenChunk[];
  romaji?: string;
  // Romaji split per token chunk (aligned 1:1 with `tokens`). When present in an
  // interactive sentence, each romaji word highlights with its Japanese word.
  romajiChunks?: string[];
  className?: string;
  romajiClassName?: string;
  // When set, each word token becomes tappable and calls back with its
  // surface text, index, and on-screen rect (so a lookup popover can anchor to
  // the tapped word) instead of rendering as a plain, non-interactive span.
  onWordSelect?: (word: string, index: number, anchor: DOMRect) => void;
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

// Grammatical particles whose Hepburn romaji differs from their kana spelling.
// wanakana romanizes は→"ha", へ→"he", を→"wo"; as particles they are wa/e/o.
// Tokenized sentences keep these as their own single-kana segment, so a lone
// unfuriganated segment matching one of these is (almost always) the particle.
const PARTICLE_ROMAJI: Record<string, string> = { は: "wa", へ: "e", を: "o" };

function segmentRomaji(seg: { t: string; f?: string }): string {
  if (!seg.f && PARTICLE_ROMAJI[seg.t] !== undefined) {
    return " " + PARTICLE_ROMAJI[seg.t];
  }
  return wanakana.toRomaji(seg.f ?? seg.t);
}

// Word-spaced romaji derived from the token chunks: each chunk is romanized from
// its reading (furigana where present, kana otherwise) and chunks are joined
// with spaces, so the romaji lines up with the 分かち書き display instead of
// merging into one run. Used when no explicit `romaji` was authored.
function tokensRomaji(tokens: TokenChunk[]): string {
  return tokens
    .map((chunk) => chunk.map(segmentRomaji).join("").trim())
    .join(" ")
    .replace(/\s+([.,!?])/g, "$1")
    .trim();
}

// Renders a sentence in traditional textbook style: word-spaced (分かち書き) with
// furigana over kanji, and an optional spaced-romaji line below (honouring the
// Romaji setting). Falls back to whole-string furigana when no tokens exist.
export function Sentence({
  jp,
  reading,
  tokens,
  romaji,
  romajiChunks,
  className,
  romajiClassName,
  onWordSelect,
  selectedWord,
  onWordHover,
  highlightIndex,
}: Props) {
  const { showRomaji } = useSettings();
  const interactive = Boolean(onWordSelect || onWordHover);
  const roma =
    romaji ??
    (tokens && tokens.length > 0
      ? tokensRomaji(tokens)
      : reading
        ? wanakana.toRomaji(reading)
        : "");
  // Per-chunk romaji drives the linked highlight: authored chunks when they
  // line up 1:1 with the tokens, else derived per token chunk (the same pieces
  // tokensRomaji joins, so the text matches the plain `roma` line). An authored
  // whole-line `romaji` may word-break differently from the tokens, so in that
  // case we don't derive and fall back to the joined line.
  const chunkedRomaji =
    romajiChunks && tokens && romajiChunks.length === tokens.length
      ? romajiChunks
      : !romaji && tokens && tokens.length > 0
        ? tokens.map((chunk) => chunk.map(segmentRomaji).join("").trim())
        : null;
  const romajiClass =
    romajiClassName ??
    "mt-0.5 block text-sm text-slate-500 dark:text-slate-400";

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
                onClick={(e) =>
                  onWordSelect?.(
                    text,
                    ci,
                    e.currentTarget.getBoundingClientRect(),
                  )
                }
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
      {showRomaji &&
        (chunkedRomaji && interactive ? (
          <span className={romajiClass}>
            {chunkedRomaji.map((piece, ci) =>
              piece ? (
                <span
                  key={ci}
                  onMouseEnter={() => onWordHover?.(ci)}
                  onMouseLeave={() => onWordHover?.(null)}
                  className={`mr-1 inline-block rounded px-0.5 transition-colors ${
                    ci === highlightIndex
                      ? "bg-brand/20"
                      : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                >
                  {piece}
                </span>
              ) : null,
            )}
          </span>
        ) : roma ? (
          <span className={romajiClass}>{roma}</span>
        ) : null)}
    </span>
  );
}
