import * as wanakana from "wanakana";
import type { Vocabulary } from "@/lib/data/types";

export type QuizMode = "meaning" | "reading" | "typing" | "listening";

export interface QuizQuestion {
  itemId: string;
  mode: QuizMode;
  vocab: Vocabulary;
  prompt: string;
  options?: string[];
  answer: string;
}

function sample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function distractors(
  pool: Vocabulary[],
  answer: Vocabulary,
  count: number,
  project: (v: Vocabulary) => string,
): string[] {
  const answerText = project(answer);
  const seen = new Set([answerText]);
  const out: string[] = [];
  for (const v of sample(pool, pool.length)) {
    const text = project(v);
    if (seen.has(text)) continue;
    seen.add(text);
    out.push(text);
    if (out.length >= count) break;
  }
  return out;
}

function shuffle<T>(arr: T[]): T[] {
  return sample(arr, arr.length);
}

export function buildQuestion(
  vocab: Vocabulary,
  mode: QuizMode,
  pool: Vocabulary[],
): QuizQuestion {
  if (mode === "typing") {
    return {
      itemId: vocab.id,
      mode,
      vocab,
      prompt: vocab.word,
      answer: vocab.reading,
    };
  }

  if (mode === "meaning") {
    const project = (v: Vocabulary) => v.word;
    const options = shuffle([
      vocab.word,
      ...distractors(pool, vocab, 3, project),
    ]);
    return {
      itemId: vocab.id,
      mode,
      vocab,
      prompt: vocab.meanings.join(", "),
      options,
      answer: vocab.word,
    };
  }

  if (mode === "reading") {
    const project = (v: Vocabulary) => v.reading;
    const options = shuffle([
      vocab.reading,
      ...distractors(pool, vocab, 3, project),
    ]);
    return {
      itemId: vocab.id,
      mode,
      vocab,
      prompt: vocab.word,
      options,
      answer: vocab.reading,
    };
  }

  const project = (v: Vocabulary) => v.word;
  const options = shuffle([vocab.word, ...distractors(pool, vocab, 3, project)]);
  return {
    itemId: vocab.id,
    mode,
    vocab,
    prompt: vocab.reading,
    options,
    answer: vocab.word,
  };
}

export function buildQuiz(
  pool: Vocabulary[],
  mode: QuizMode,
  count: number,
): QuizQuestion[] {
  return sample(pool, count).map((v) => buildQuestion(v, mode, pool));
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
