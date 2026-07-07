"use client";

import * as wanakana from "wanakana";
import { useSettings } from "@/lib/settings/SettingsProvider";

interface FuriganaProps {
  word: string;
  reading: string;
  className?: string;
}

export function Furigana({ word, reading, className }: FuriganaProps) {
  const needsRuby = reading && reading !== word && !wanakana.isKana(word);
  if (!needsRuby) {
    return <span className={className}>{word}</span>;
  }
  return (
    <ruby className={className}>
      {word}
      <rt>{reading}</rt>
    </ruby>
  );
}

interface ReadingProps {
  word: string;
  reading: string;
  romaji?: string;
  className?: string;
}

export function Reading({ word, reading, romaji, className }: ReadingProps) {
  const { showRomaji } = useSettings();
  const roma = romaji ?? wanakana.toRomaji(reading);
  return (
    <span className={className}>
      <Furigana word={word} reading={reading} />
      {showRomaji && roma && (
        <span className="ml-2 align-middle text-sm text-slate-500 dark:text-slate-400">
          {roma}
        </span>
      )}
    </span>
  );
}
