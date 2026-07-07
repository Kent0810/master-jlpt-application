"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db, newStudyState } from "./db";
import type { StudyState } from "../data/types";

export function useStudyState(itemId: string): StudyState {
  const state = useLiveQuery(() => db().studyStates.get(itemId), [itemId]);
  return state ?? newStudyState(itemId);
}

export function useAllStudyStates(): Map<string, StudyState> {
  const rows = useLiveQuery(() => db().studyStates.toArray(), [], []);
  return new Map((rows ?? []).map((r) => [r.itemId, r]));
}

export function useStudyLists() {
  return useLiveQuery(() => db().studyLists.toArray(), [], []);
}
