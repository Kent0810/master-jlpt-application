import Dexie, { type Table } from "dexie";
import type { StudyState, SrsState, StudyStatus } from "../data/types";
import { initialSrs, schedule, deriveStatus, type Grade } from "../srs/sm2";

export interface StudyList {
  id: string;
  name: string;
  itemIds: string[];
  createdAt: string;
}

export interface ReviewLogEntry {
  id?: number;
  itemId: string;
  grade: Grade;
  correct: boolean;
  at: string;
  day: string;
}

class N5Database extends Dexie {
  studyStates!: Table<StudyState, string>;
  studyLists!: Table<StudyList, string>;
  reviewLog!: Table<ReviewLogEntry, number>;

  constructor() {
    super("n5-dojo");
    this.version(1).stores({
      studyStates: "itemId, status",
      studyLists: "id, name",
      reviewLog: "++id, itemId, day",
    });
  }
}

let _db: N5Database | null = null;
export function db(): N5Database {
  if (!_db) _db = new N5Database();
  return _db;
}

export function newStudyState(itemId: string): StudyState {
  return {
    itemId,
    status: "new",
    srs: initialSrs(),
    starred: false,
    updatedAt: new Date().toISOString(),
  };
}

export async function getStudyState(itemId: string): Promise<StudyState> {
  const existing = await db().studyStates.get(itemId);
  return existing ?? newStudyState(itemId);
}

export async function reviewItem(
  itemId: string,
  grade: Grade,
): Promise<StudyState> {
  const now = new Date();
  const state = await getStudyState(itemId);
  const srs: SrsState = schedule(state.srs, grade, now);
  const status: StudyStatus = deriveStatus(srs);
  const updated: StudyState = {
    ...state,
    srs,
    status,
    updatedAt: now.toISOString(),
  };
  await db().studyStates.put(updated);
  await db().reviewLog.add({
    itemId,
    grade,
    correct: grade !== "again",
    at: now.toISOString(),
    day: now.toISOString().slice(0, 10),
  });
  return updated;
}

export async function undoLastReview(
  itemId: string,
  previousState: StudyState,
): Promise<void> {
  await db().studyStates.put(previousState);
  const lastLog = await db().reviewLog.where("itemId").equals(itemId).last();
  if (lastLog?.id !== undefined) await db().reviewLog.delete(lastLog.id);
}

export async function toggleStar(itemId: string): Promise<boolean> {
  const state = await getStudyState(itemId);
  const starred = !state.starred;
  await db().studyStates.put({
    ...state,
    starred,
    updatedAt: new Date().toISOString(),
  });
  return starred;
}

export async function getStarredIds(): Promise<string[]> {
  const rows = await db().studyStates.filter((s) => s.starred).toArray();
  return rows.map((r) => r.itemId);
}

export async function createList(name: string): Promise<StudyList> {
  const list: StudyList = {
    id: `list_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name,
    itemIds: [],
    createdAt: new Date().toISOString(),
  };
  await db().studyLists.put(list);
  return list;
}

export async function addToList(listId: string, itemId: string): Promise<void> {
  const list = await db().studyLists.get(listId);
  if (!list) return;
  if (!list.itemIds.includes(itemId)) {
    list.itemIds.push(itemId);
    await db().studyLists.put(list);
  }
}

export async function removeFromList(
  listId: string,
  itemId: string,
): Promise<void> {
  const list = await db().studyLists.get(listId);
  if (!list) return;
  list.itemIds = list.itemIds.filter((id) => id !== itemId);
  await db().studyLists.put(list);
}

export async function deleteList(listId: string): Promise<void> {
  await db().studyLists.delete(listId);
}

export interface Stats {
  byStatus: Record<StudyStatus, number>;
  reviewedToday: number;
  streakDays: number;
  accuracy: number;
}

function statusCounts(states: StudyState[]): Record<StudyStatus, number> {
  const counts: Record<StudyStatus, number> = {
    new: 0,
    learning: 0,
    mastered: 0,
  };
  for (const s of states) counts[s.status] += 1;
  return counts;
}

export function computeStreak(days: string[], today: Date = new Date()): number {
  const set = new Set(days);
  const cursor = new Date(today);
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  if (!set.has(iso(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (set.has(iso(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export async function getStats(): Promise<Stats> {
  const states = await db().studyStates.toArray();
  const log = await db().reviewLog.toArray();
  const today = new Date().toISOString().slice(0, 10);
  const reviewedToday = log.filter((l) => l.day === today).length;
  const correct = log.filter((l) => l.correct).length;
  return {
    byStatus: statusCounts(states),
    reviewedToday,
    streakDays: computeStreak(log.map((l) => l.day)),
    accuracy: log.length ? correct / log.length : 0,
  };
}
