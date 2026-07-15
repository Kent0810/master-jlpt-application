import { getGrammar, getVocabById, getVocabByLesson } from "@/lib/data";
import { getGrammarByLesson } from "@/lib/data";
import { getDialogue, type DialogueLine } from "@/lib/lessons/lessons";
import type { Grammar, Vocabulary } from "@/lib/data/types";
import layoutsJson from "../../../data/n5-lesson-blocks.json";

// A lesson page is an ordered list of blocks. Authored layouts live in
// data/n5-lesson-blocks.json (referencing grammar/vocab by id); lessons without
// one are synthesized from existing data in Grammar → Dialogue → Vocab order.

export type DialogueStyle = "conversational" | "qa" | "paragraph";

// Short bilingual label for a block/section heading.
export interface Localized {
  en: string;
  vi: string;
}

// A single multiple-choice exercise question. For fill-in-the-blank items the
// prompt contains ＿＿ where the missing word goes.
export interface AuthoredExerciseItem {
  prompt: string;
  reading?: string;
  options: string[];
  answer: number; // index into options
  explanation?: Localized;
}

export interface SectionBlock {
  kind: "section";
  title: Localized;
  subtitle?: Localized;
}

export interface GrammarBlock {
  kind: "grammar";
  title?: Localized;
  items: Grammar[];
}

export interface DialogueBlock {
  kind: "dialogue";
  style: DialogueStyle;
  title?: Localized;
  lines: DialogueLine[];
}

export interface VocabBlock {
  kind: "vocab";
  title?: Localized;
  items: Vocabulary[];
}

export interface ExerciseBlock {
  kind: "exercise";
  title?: Localized;
  // "vocab-auto" generates questions at render time from `vocab`; "authored"
  // uses the hand-written `items`.
  source: "vocab-auto" | "authored";
  items?: AuthoredExerciseItem[];
  vocab?: Vocabulary[];
}

export type LessonBlock =
  SectionBlock | GrammarBlock | DialogueBlock | VocabBlock | ExerciseBlock;

// ── Authored (raw) layout shapes, as stored in JSON ──────────────────────────

interface RawGrammarBlock {
  kind: "grammar";
  title?: Localized;
  grammarIds: string[];
}
interface RawVocabBlock {
  kind: "vocab";
  title?: Localized;
  vocabIds?: string[];
}
interface RawExerciseBlock {
  kind: "exercise";
  title?: Localized;
  source: "vocab-auto" | "authored";
  items?: AuthoredExerciseItem[];
  vocabIds?: string[];
}
type RawLessonBlock =
  | SectionBlock
  | RawGrammarBlock
  | DialogueBlock
  | RawVocabBlock
  | RawExerciseBlock;

interface RawLessonLayout {
  lesson: number;
  blocks: RawLessonBlock[];
}

const LAYOUTS = layoutsJson as RawLessonLayout[];

function resolveGrammar(ids: string[]): Grammar[] {
  const all = getGrammar();
  return ids
    .map((id) => all.find((g) => g.id === id))
    .filter((g): g is Grammar => g !== undefined);
}

function resolveVocab(ids: string[] | undefined, lesson: number): Vocabulary[] {
  if (!ids) return getVocabByLesson(lesson);
  return ids
    .map((id) => getVocabById(id))
    .filter((v): v is Vocabulary => v !== undefined);
}

function resolveBlock(raw: RawLessonBlock, lesson: number): LessonBlock {
  switch (raw.kind) {
    case "grammar":
      return {
        kind: "grammar",
        title: raw.title,
        items: resolveGrammar(raw.grammarIds),
      };
    case "vocab":
      return {
        kind: "vocab",
        title: raw.title,
        items: resolveVocab(raw.vocabIds, lesson),
      };
    case "exercise":
      return {
        kind: "exercise",
        title: raw.title,
        source: raw.source,
        items: raw.items,
        vocab:
          raw.source === "vocab-auto"
            ? resolveVocab(raw.vocabIds, lesson)
            : undefined,
      };
    // section and dialogue blocks carry their content inline — nothing to resolve.
    default:
      return raw;
  }
}

// Fallback layout for lessons without an authored one: the classic sections in
// the new order (dialogue before vocab), capped with an auto vocab exercise.
function synthesizeDefault(lesson: number): LessonBlock[] {
  const blocks: LessonBlock[] = [];
  const grammar = getGrammarByLesson(lesson);
  const vocab = getVocabByLesson(lesson);
  const dialogue = getDialogue(lesson);

  if (grammar.length) blocks.push({ kind: "grammar", items: grammar });
  if (dialogue) {
    blocks.push({
      kind: "dialogue",
      style: "conversational",
      lines: dialogue.lines,
    });
  }
  if (vocab.length) blocks.push({ kind: "vocab", items: vocab });
  if (vocab.length) {
    blocks.push({ kind: "exercise", source: "vocab-auto", vocab });
  }
  return blocks;
}

export function getLessonBlocks(lesson: number): LessonBlock[] {
  const authored = LAYOUTS.find((l) => l.lesson === lesson);
  if (authored) return authored.blocks.map((b) => resolveBlock(b, lesson));
  return synthesizeDefault(lesson);
}
