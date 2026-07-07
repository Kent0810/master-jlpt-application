import kanjiJson from "../../../data/n5-kanji.json";
import vocabJson from "../../../data/n5-vocab.json";
import grammarJson from "../../../data/n5-grammar.json";
import type { Kanji, Vocabulary, Grammar } from "./types";

const kanji = kanjiJson as Kanji[];
const vocab = vocabJson as Vocabulary[];
const grammar = grammarJson as Grammar[];

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
