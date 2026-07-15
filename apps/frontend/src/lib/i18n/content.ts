import type {
  Grammar,
  GrammarDetail,
  ExampleSentence,
  AlignmentParts,
} from "@/lib/data/types";
import type { Language } from "@/lib/settings/SettingsProvider";

// Pure selectors so both hooks and non-hook code can localize content. When the
// Vietnamese field is missing they fall back to English.
export function pickMeanings(
  item: { meanings: string[]; meaningsVi?: string[] },
  lang: Language,
): string[] {
  return lang === "vi" && item.meaningsVi && item.meaningsVi.length > 0
    ? item.meaningsVi
    : item.meanings;
}

export function pickGrammarMeaning(g: Grammar, lang: Language): string {
  return lang === "vi" && g.meaningVi ? g.meaningVi : g.meaning;
}

export function pickExampleGloss(ex: ExampleSentence, lang: Language): string {
  return lang === "vi" && ex.vi ? ex.vi : ex.en;
}

// Alignment parts matching whichever translation pickExampleGloss returns.
export function pickExampleAlign(
  ex: { vi?: string; alignEn?: AlignmentParts; alignVi?: AlignmentParts },
  lang: Language,
): AlignmentParts | undefined {
  return lang === "vi" && ex.vi ? ex.alignVi : ex.alignEn;
}

export function pickGrammarDetail(
  g: Grammar,
  lang: Language,
): GrammarDetail | undefined {
  return lang === "vi" && g.detailVi ? g.detailVi : g.detail;
}
