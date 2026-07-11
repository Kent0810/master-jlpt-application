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
}: Props) {
  const { showRomaji } = useSettings();
  const roma = romaji ?? (reading ? wanakana.toRomaji(reading) : "");

  return (
    <span className={className}>
      <span className="font-jp leading-loose">
        {tokens && tokens.length > 0 ? (
          tokens.map((chunk, ci) => (
            <span key={ci} className="mr-2 inline-block">
              {chunk.map((seg, si) =>
                seg.f ? (
                  <ruby key={si}>
                    {seg.t}
                    <rt>{seg.f}</rt>
                  </ruby>
                ) : (
                  <span key={si}>{seg.t}</span>
                ),
              )}
            </span>
          ))
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
            romajiClassName ?? "mt-0.5 block text-sm text-slate-500 dark:text-slate-400"
          }
        >
          {roma}
        </span>
      )}
    </span>
  );
}
