"use client";

import { Sentence } from "@/components/Sentence";
import { AlignedTranslation } from "@/components/AlignedTranslation";
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
  gloss: string;
  alignParts?: AlignmentParts;
  sentenceClassName?: string;
  translationClassName?: string;
}) {
  const link = useSentenceLink(sKey);
  return (
    <>
      <Sentence
        jp={jp}
        reading={reading}
        tokens={tokens}
        romaji={romaji}
        className={sentenceClassName}
        onWordSelect={link.onWordSelect}
        selectedWord={link.selectedWord}
        onWordHover={link.onWordHover}
        highlightIndex={link.highlightIndex}
      />
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
