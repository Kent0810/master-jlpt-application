import type { PartOfSpeech } from "./types";

const E_I_ROW_KANA = new Set(
  "いきしちにひみりぎじぢびぴえけせてねへめれげぜでべぺゐゑ".split(""),
);

const U_ROW_KANA = new Set("うくぐすつぬぶむる".split(""));

const KANJI_RE = /[一-龯]/;

export function guessPartOfSpeech(word: string, reading: string): PartOfSpeech {
  if (!word) return "unknown";

  if (word.endsWith("する") && KANJI_RE.test(word)) {
    return "irregular-verb";
  }

  const hasKanjiStem = KANJI_RE.test(word);
  if (!hasKanjiStem) return "noun";

  const last = word[word.length - 1];
  const prev = word.length >= 2 ? word[word.length - 2] : "";

  if (last === "い" && prev !== "え" && prev !== "せ") {
    return "i-adjective";
  }

  if (last === "る") {
    const readingPrev =
      reading && reading.length >= 2 ? reading[reading.length - 2] : prev;
    return E_I_ROW_KANA.has(readingPrev) ? "ichidan-verb" : "godan-verb";
  }

  if (U_ROW_KANA.has(last)) {
    return "godan-verb";
  }

  return "noun";
}
