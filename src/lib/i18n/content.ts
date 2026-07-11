import type { Grammar, ExampleSentence } from "@/lib/data/types";
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
