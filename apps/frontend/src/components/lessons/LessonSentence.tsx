"use client";

import { Sentence } from "@/components/Sentence";
import { AlignedTranslation } from "@/components/AlignedTranslation";
import { AudioButton } from "@/components/AudioButton";
import { useSentenceLink } from "./LessonInteraction";
import type { TokenChunk, AlignmentParts } from "@/lib/data/types";

// A tappable Japanese sentence paired with its aligned translation, wired to the
// lesson's shared highlight/lookup state via `sKey`. Callers render <WordCardFor
// sKey={sKey}/> wherever the lookup card should appear.
export function LessonSentence({
  sKey,
  jp,
  reading,
  tokens,
  romaji,
  romajiChunks,
  gloss,
  alignParts,
  sentenceClassName,
  translationClassName,
}: {
  sKey: string;
  jp: string;
  reading?: string;
  tokens?: TokenChunk[];
  romaji?: string;
  romajiChunks?: string[];
  gloss: string;
  alignParts?: AlignmentParts;
  sentenceClassName?: string;
  translationClassName?: string;
}) {
  const link = useSentenceLink(sKey);
  return (
    <>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <Sentence
            jp={jp}
            reading={reading}
            tokens={tokens}
            romaji={romaji}
            romajiChunks={romajiChunks}
            className={sentenceClassName}
            onWordSelect={link.onWordSelect}
            selectedWord={link.selectedWord}
            onWordHover={link.onWordHover}
            highlightIndex={link.highlightIndex}
          />
        </div>
        <AudioButton
          text={reading || jp}
          label="Play sentence"
          className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-base text-slate-500 transition-colors hover:bg-brand hover:text-white dark:bg-white/10 dark:text-slate-300"
        />
      </div>
      <AlignedTranslation
        text={gloss}
        parts={alignParts}
        highlightIndex={link.highlightIndex}
        onWordHover={link.onWordHover}
        className={translationClassName}
      />
    </>
  );
}
