import { getKanji, getVocab, getKanjiById, getVocabById } from "@/lib/data";
import type { Kanji, Vocabulary, SrsState } from "@/lib/data/types";
import { db, newStudyState } from "@/lib/db/db";
import { isDue } from "@/lib/srs/sm2";

export type DeckKind = "all" | "kanji" | "vocab" | "starred" | "list";

export interface StudyItem {
  id: string;
  kind: "kanji" | "vocab";
  kanji?: Kanji;
  vocab?: Vocabulary;
  srs: SrsState;
}

function toItem(id: string, srs: SrsState): StudyItem | null {
  const k = getKanjiById(id);
  if (k) return { id, kind: "kanji", kanji: k, srs };
  const v = getVocabById(id);
  if (v) return { id, kind: "vocab", vocab: v, srs };
  return null;
}

function baseIds(kind: DeckKind, listIds?: string[]): string[] {
  switch (kind) {
    case "kanji":
      return getKanji().map((k) => k.id);
    case "vocab":
      return getVocab().map((v) => v.id);
    case "list":
      return listIds ?? [];
    case "all":
    default:
      return [...getKanji().map((k) => k.id), ...getVocab().map((v) => v.id)];
  }
}

export interface DueQuery {
  kind: DeckKind;
  listIds?: string[];
  starredIds?: string[];
  now?: Date;
  shuffle?: boolean;
}

interface DueEntry {
  id: string;
  srs: SrsState;
}

async function getDueEntries({
  kind,
  listIds,
  starredIds,
  now = new Date(),
  shuffle = true,
}: DueQuery): Promise<DueEntry[]> {
  const ids = kind === "starred" ? (starredIds ?? []) : baseIds(kind, listIds);

  const states = await db().studyStates.bulkGet(ids);
  const due: DueEntry[] = [];
  ids.forEach((id, i) => {
    const state = states[i] ?? newStudyState(id);
    if (isDue(state.srs, now)) due.push({ id, srs: state.srs });
  });

  if (shuffle) {
    for (let i = due.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [due[i], due[j]] = [due[j], due[i]];
    }
  }

  return due;
}

export async function countDue(query: DueQuery): Promise<number> {
  return (await getDueEntries(query)).length;
}

export interface BuildQueueOptions extends DueQuery {
  limit?: number;
}

export async function buildQueue({
  limit = 20,
  ...query
}: BuildQueueOptions): Promise<StudyItem[]> {
  const due = await getDueEntries(query);
  return due
    .slice(0, limit)
    .map(({ id, srs }) => toItem(id, srs))
    .filter((x): x is StudyItem => x !== null);
}
