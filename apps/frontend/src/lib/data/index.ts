import kanjiJson from "../../../data/n5-kanji.json";
import vocabJson from "../../../data/n5-vocab.json";
import grammarJson from "../../../data/n5-grammar.json";
import grammarDetailsJson from "../../../data/n5-grammar-details.json";
import { getAlignment } from "./alignments";
import type { Kanji, Vocabulary, Grammar, GrammarDetail } from "./types";

const grammarDetails = grammarDetailsJson as unknown as Record<
  string,
  { en: GrammarDetail; vi: GrammarDetail }
>;

const kanji = kanjiJson as Kanji[];
const vocab = vocabJson as Vocabulary[];
// Attach the separately-authored elaborations and example word-alignments to
// each grammar point so consumers see one enriched Grammar object.
const grammar = (grammarJson as Grammar[]).map((g) => ({
  ...g,
  detail: grammarDetails[g.id]?.en,
  detailVi: grammarDetails[g.id]?.vi,
  examples: g.examples.map((ex, i) => {
    const align = getAlignment(`g:${g.id}:${i}`);
    return align ? { ...ex, alignEn: align.en, alignVi: align.vi } : ex;
  }),
}));

const kanjiById = new Map(kanji.map((k) => [k.id, k]));
const vocabById = new Map(vocab.map((v) => [v.id, v]));
const kanjiByChar = new Map(kanji.map((k) => [k.character, k]));

export function getKanji(): Kanji[] {
  return kanji;
}

export function getVocab(): Vocabulary[] {
  return vocab;
}

export function getGrammar(): Grammar[] {
  return grammar;
}

export function getGrammarByLesson(lesson: number): Grammar[] {
  return grammar.filter((g) => g.lesson === lesson);
}

export function getVocabByLesson(lesson: number): Vocabulary[] {
  return vocab.filter((v) => v.mnnLesson === lesson);
}

export function getKanjiById(id: string): Kanji | undefined {
  return kanjiById.get(id);
}

export function getVocabById(id: string): Vocabulary | undefined {
  return vocabById.get(id);
}

export function getKanjiByChar(character: string): Kanji | undefined {
  return kanjiByChar.get(character);
}

export function getItemById(id: string): Kanji | Vocabulary | undefined {
  return kanjiById.get(id) ?? vocabById.get(id);
}

export type { Kanji, Vocabulary, Grammar };
