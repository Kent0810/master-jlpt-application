import { getKanji, getVocab, getKanjiById, getVocabById } from "@/lib/data";
import type { Kanji, Vocabulary } from "@/lib/data/types";
import { db, newStudyState } from "@/lib/db/db";
import { isDue } from "@/lib/srs/sm2";

export type DeckKind = "all" | "kanji" | "vocab" | "starred" | "list";

export interface StudyItem {
  id: string;
  kind: "kanji" | "vocab";
  kanji?: Kanji;
  vocab?: Vocabulary;
}

function toItem(id: string): StudyItem | null {
  const k = getKanjiById(id);
  if (k) return { id, kind: "kanji", kanji: k };
  const v = getVocabById(id);
  if (v) return { id, kind: "vocab", vocab: v };
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

export interface BuildQueueOptions {
  kind: DeckKind;
  listIds?: string[];
  starredIds?: string[];
  limit?: number;
  now?: Date;
}

export async function buildQueue({
  kind,
  listIds,
  starredIds,
  limit = 20,
  now = new Date(),
}: BuildQueueOptions): Promise<StudyItem[]> {
  let ids = kind === "starred" ? starredIds ?? [] : baseIds(kind, listIds);

  const states = await db().studyStates.bulkGet(ids);
  const due: string[] = [];
  ids.forEach((id, i) => {
    const state = states[i] ?? newStudyState(id);
    if (isDue(state.srs, now)) due.push(id);
  });

  for (let i = due.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [due[i], due[j]] = [due[j], due[i]];
  }

  return due
    .slice(0, limit)
    .map(toItem)
    .filter((x): x is StudyItem => x !== null);
}
