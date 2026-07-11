export type JlptLevel = "N5" | "N4" | "N3" | "N2" | "N1";

export type PartOfSpeech =
  | "noun"
  | "godan-verb"
  | "ichidan-verb"
  | "irregular-verb"
  | "i-adjective"
  | "na-adjective"
  | "adverb"
  | "expression"
  | "unknown";

export interface Kanji {
  id: string;
  character: string;
  meanings: string[];
  meaningsVi?: string[];
  onyomi: string[];
  kunyomi: string[];
  strokeCount: number;
  jlptLevel: JlptLevel;
  kanjivgId?: string;
  exampleVocabIds: string[];
}

// A furigana segment: kanji text `t` with reading `f`, or plain text (no `f`).
export interface FuriSegment {
  t: string;
  f?: string;
}
// A word-spaced chunk (分かち書き) is a run of segments rendered without internal
// spaces; chunks are separated by spaces.
export type TokenChunk = FuriSegment[];

export interface ExampleSentence {
  jp: string;
  reading: string;
  en: string;
  vi?: string;
  tokens?: TokenChunk[];
  romaji?: string;
}

export interface Vocabulary {
  id: string;
  word: string;
  reading: string;
  romaji: string;
  meanings: string[];
  meaningsVi?: string[];
  partOfSpeech: PartOfSpeech;
  jlptLevel: JlptLevel;
  audioUrl: string | null;
  example?: ExampleSentence;
  mnnLesson?: number;
  mnnBook?: "I" | "II";
}

export interface Grammar {
  id: string;
  lesson: number;
  title: string;
  meaning: string;
  meaningVi?: string;
  structure: string;
  examples: ExampleSentence[];
}

export type StudyStatus = "new" | "learning" | "mastered";

export interface SrsState {
  ease: number;
  intervalDays: number;
  dueAt: string;
  reviews: number;
  lapses: number;
}

export interface StudyState {
  itemId: string;
  status: StudyStatus;
  srs: SrsState;
  starred: boolean;
  updatedAt: string;
}
