import type { Vocabulary } from "@/lib/data/types";
import type { Language } from "@/lib/settings/SettingsProvider";
import { getVocab } from "@/lib/data";
import { pickMeanings } from "@/lib/i18n/content";
import type { AuthoredExerciseItem } from "./blocks";

// A ready-to-render multiple-choice question, produced from either an authored
// item or an auto-generated vocab question. The renderer treats both the same.
export interface ExerciseQuestion {
  prompt: string;
  reading?: string;
  options: string[];
  answer: number; // index into options
  explanation?: string;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Meaning → word recognition questions from a vocab set. The prompt (meaning) is
// localized; the options are Japanese words, so they read the same in any UI
// language. Distractors favour the same part of speech, falling back to the full
// vocab pool so there are always enough options.
export function buildVocabQuestions(
  vocab: Vocabulary[],
  lang: Language,
  count = 6,
): ExerciseQuestion[] {
  const pool = getVocab();
  return shuffle(vocab)
    .slice(0, count)
    .map((v) => {
      const answer = v.word;
      const same = shuffle(
        pool.filter(
          (x) =>
            x.id !== v.id &&
            x.word !== answer &&
            x.partOfSpeech === v.partOfSpeech,
        ),
      );
      const opts = same.slice(0, 3).map((x) => x.word);
      for (const x of shuffle(pool)) {
        if (opts.length >= 3) break;
        if (x.word !== answer && !opts.includes(x.word)) opts.push(x.word);
      }
      const options = shuffle([answer, ...opts]);
      return {
        prompt: pickMeanings(v, lang)[0] ?? v.word,
        options,
        answer: options.indexOf(answer),
      };
    });
}

// Convert an authored exercise item into the render-ready shape, localizing its
// explanation.
export function authoredToQuestion(
  item: AuthoredExerciseItem,
  lang: Language,
): ExerciseQuestion {
  return {
    prompt: item.prompt,
    reading: item.reading,
    options: item.options,
    answer: item.answer,
    explanation:
      item.explanation &&
      (lang === "vi" ? item.explanation.vi : item.explanation.en),
  };
}
