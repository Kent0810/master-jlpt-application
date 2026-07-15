import alignmentsJson from "../../../data/n5-alignments.json";
import type { AlignmentParts } from "./types";

// Word-alignment data keyed by sentence:
//   d{lesson}:{lineIndex}      — dialogue lines
//   g:{grammarId}:{exampleIdx} — grammar example sentences
// Each entry holds per-token substrings of the English/Vietnamese translation
// (see AlignmentParts); spans are resolved at render time by lib/align.
export interface SentenceAlignment {
  en?: AlignmentParts;
  vi?: AlignmentParts;
}

const ALIGNMENTS = alignmentsJson as unknown as Record<
  string,
  SentenceAlignment
>;

export function getAlignment(key: string): SentenceAlignment | undefined {
  return ALIGNMENTS[key];
}

export function getAllAlignments(): Record<string, SentenceAlignment> {
  return ALIGNMENTS;
}
