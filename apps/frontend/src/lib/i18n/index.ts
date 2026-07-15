"use client";

import { useSettings, type Language } from "@/lib/settings/SettingsProvider";
import { VI } from "./dict";

export function useLang(): Language {
  return useSettings().language;
}

// Translate a UI string by its English source text. Unlisted strings fall back
// to the source, so partial coverage is always safe.
export function useT() {
  const { language } = useSettings();
  return (s: string) => (language === "vi" ? (VI[s] ?? s) : s);
}

export {
  pickMeanings,
  pickGrammarMeaning,
  pickExampleGloss,
  pickExampleAlign,
  pickGrammarDetail,
} from "./content";
