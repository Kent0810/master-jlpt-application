import * as wanakana from "wanakana";
import { getKanji, getVocab } from "@/lib/data";
import { initialSrs } from "@/lib/srs/sm2";
import type { StudyItem } from "@/lib/study/deck";

export type QuizMode = "meaning" | "reading" | "typing" | "listening";

export interface QuizQuestion {
  itemId: string;
  mode: QuizMode;
  item: StudyItem;
  prompt: string;
  options?: string[];
  answer: string;
}

function answerText(item: StudyItem): string {
  return item.kind === "kanji" ? item.kanji!.character : item.vocab!.word;
}

function meaningsText(item: StudyItem): string {
  return item.kind === "kanji"
    ? item.kanji!.meanings.join(", ")
    : item.vocab!.meanings.join(", ");
}

function primaryReading(item: StudyItem): string | null {
  if (item.kind === "vocab") return item.vocab!.reading;
  const k = item.kanji!;
  const reading = k.kunyomi[0] ?? k.onyomi[0];
  return reading ? reading.replace(/-/g, "") : null;
}

function hasReading(item: StudyItem): boolean {
  return primaryReading(item) !== null;
}

function sample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function shuffle<T>(arr: T[]): T[] {
  return sample(arr, arr.length);
}

function distractorPool(item: StudyItem): StudyItem[] {
  if (item.kind === "kanji") {
    return getKanji()
      .filter((k) => k.id !== item.id)
      .map((k) => ({
        id: k.id,
        kind: "kanji" as const,
        kanji: k,
        srs: initialSrs(),
      }));
  }
  return getVocab()
    .filter((v) => v.id !== item.id)
    .map((v) => ({
      id: v.id,
      kind: "vocab" as const,
      vocab: v,
      srs: initialSrs(),
    }));
}

// Lower = more plausible as a distractor (closer in difficulty/category to
// the real item), so options aren't a random grab-bag of totally unrelated
// concepts — kanji favour similar stroke count, vocab favour the same part
// of speech. Falls back to the full same-kind pool when nothing plausible
// is left, so there are always enough distractors.
export function similarityRank(item: StudyItem, candidate: StudyItem): number {
  if (item.kind === "kanji" && candidate.kind === "kanji") {
    return Math.abs(item.kanji!.strokeCount - candidate.kanji!.strokeCount);
  }
  if (item.kind === "vocab" && candidate.kind === "vocab") {
    return item.vocab!.partOfSpeech === candidate.vocab!.partOfSpeech ? 0 : 1;
  }
  return 1;
}

function distractors(
  item: StudyItem,
  count: number,
  project: (i: StudyItem) => string | null,
): string[] {
  const answerVal = project(item);
  const seen = new Set(answerVal !== null ? [answerVal] : []);
  const ranked = shuffle(distractorPool(item)).sort(
    (a, b) => similarityRank(item, a) - similarityRank(item, b),
  );
  const out: string[] = [];
  for (const candidate of ranked) {
    const text = project(candidate);
    if (text === null || seen.has(text)) continue;
    seen.add(text);
    out.push(text);
    if (out.length >= count) break;
  }
  return out;
}

// Options for "what does this mean" flashcard-style recognition — the
// reverse of quiz "meaning" mode (which shows the meaning and asks for the
// character/word). Shares the same distractor pool so options are always
// same-kind (kanji distractors for a kanji item, vocab for a vocab item).
export function meaningChoices(item: StudyItem): {
  options: string[];
  answer: string;
} {
  const answer = meaningsText(item);
  const options = shuffle([answer, ...distractors(item, 3, meaningsText)]);
  return { options, answer };
}

export function buildQuestion(item: StudyItem, mode: QuizMode): QuizQuestion {
  if (mode === "typing") {
    return {
      itemId: item.id,
      mode,
      item,
      prompt: item.vocab!.word,
      answer: item.vocab!.reading,
    };
  }

  if (mode === "meaning") {
    const options = shuffle([
      answerText(item),
      ...distractors(item, 3, answerText),
    ]);
    return {
      itemId: item.id,
      mode,
      item,
      prompt: meaningsText(item),
      options,
      answer: answerText(item),
    };
  }

  if (mode === "reading") {
    const reading = primaryReading(item)!;
    const options = shuffle([reading, ...distractors(item, 3, primaryReading)]);
    return {
      itemId: item.id,
      mode,
      item,
      prompt: answerText(item),
      options,
      answer: reading,
    };
  }

  const reading = primaryReading(item)!;
  const options = shuffle([
    answerText(item),
    ...distractors(item, 3, answerText),
  ]);
  return {
    itemId: item.id,
    mode,
    item,
    prompt: reading,
    options,
    answer: answerText(item),
  };
}

export function buildQuiz(
  dueItems: StudyItem[],
  mode: QuizMode,
  count: number,
): QuizQuestion[] {
  let eligible = dueItems;
  if (mode === "typing") {
    eligible = eligible.filter((i) => i.kind === "vocab");
  } else if (mode === "reading" || mode === "listening") {
    eligible = eligible.filter(hasReading);
  }
  return sample(eligible, count).map((item) => buildQuestion(item, mode));
}

export function checkTyping(input: string, reading: string): boolean {
  const cleaned = input.trim().toLowerCase();
  if (!cleaned) return false;
  const asKana = wanakana.toHiragana(cleaned);
  return (
    cleaned === reading ||
    asKana === reading ||
    wanakana.toHiragana(reading) === asKana
  );
}

export function isQuestionCorrect(
  question: QuizQuestion,
  response: string,
): boolean {
  if (question.mode === "typing") {
    return checkTyping(response, question.answer);
  }
  return response === question.answer;
}
