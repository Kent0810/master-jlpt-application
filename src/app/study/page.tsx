"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Link from "next/link";
import {
  buildQueue,
  countDue,
  type DeckKind,
  type StudyItem,
} from "@/lib/study/deck";
import {
  getStarredIds,
  getStudyState,
  reviewItem,
  undoLastReview,
} from "@/lib/db/db";
import type { StudyState } from "@/lib/data/types";
import { useStudyLists } from "@/lib/db/hooks";
import { Flashcard, type FlashcardMode } from "@/components/Flashcard";
import { AdSlot } from "@/components/ads/AdSlot";
import type { Grade } from "@/lib/srs/sm2";

type Phase = "pick" | "studying" | "done";
type SessionSize = 10 | 20 | 50 | "all";

const DECKS: { kind: DeckKind; label: string }[] = [
  { kind: "all", label: "All N5" },
  { kind: "kanji", label: "Kanji only" },
  { kind: "vocab", label: "Vocab only" },
  { kind: "starred", label: "Starred" },
];

const SESSION_SIZES: SessionSize[] = [10, 20, 50, "all"];

const ANSWER_MODES: { mode: FlashcardMode; label: string; desc: string }[] = [
  { mode: "choice", label: "Multiple choice", desc: "Pick the meaning from 4 options" },
  { mode: "recall", label: "Recall", desc: "Try to remember it yourself, then reveal" },
];

const SWIPE_THRESHOLD = 50;

interface LastGraded {
  item: StudyItem;
  previousState: StudyState;
  index: number;
}

export default function StudyPage() {
  const [phase, setPhase] = useState<Phase>("pick");
  const [queue, setQueue] = useState<StudyItem[]>([]);
  const [index, setIndex] = useState(0);
  const [graded, setGraded] = useState<Set<string>>(new Set());
  const [sessionSize, setSessionSize] = useState<SessionSize>(20);
  const [shuffleEnabled, setShuffleEnabled] = useState(true);
  const [answerMode, setAnswerMode] = useState<FlashcardMode>("choice");
  const [dueCounts, setDueCounts] = useState<Partial<Record<DeckKind, number>>>({});
  const [listDueCounts, setListDueCounts] = useState<Record<string, number>>({});
  const [lastGraded, setLastGraded] = useState<LastGraded | null>(null);
  const lists = useStudyLists();
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (phase !== "pick") return;
    let alive = true;
    (async () => {
      const starredIds = await getStarredIds();
      const entries = await Promise.all(
        DECKS.map(
          async (d) => [d.kind, await countDue({ kind: d.kind, starredIds })] as const,
        ),
      );
      if (alive) setDueCounts(Object.fromEntries(entries));
    })();
    return () => {
      alive = false;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "pick" || !lists || lists.length === 0) return;
    let alive = true;
    (async () => {
      const entries = await Promise.all(
        lists.map(
          async (l) =>
            [l.id, await countDue({ kind: "list", listIds: l.itemIds })] as const,
        ),
      );
      if (alive) setListDueCounts(Object.fromEntries(entries));
    })();
    return () => {
      alive = false;
    };
  }, [phase, lists]);

  async function start(kind: DeckKind, listIds?: string[]) {
    const starredIds = kind === "starred" ? await getStarredIds() : undefined;
    const limit =
      sessionSize === "all"
        ? await countDue({ kind, listIds, starredIds })
        : sessionSize;
    const q = await buildQueue({
      kind,
      listIds,
      starredIds,
      limit,
      shuffle: shuffleEnabled,
    });
    if (q.length === 0) {
      setQueue([]);
      setPhase("done");
      return;
    }
    setQueue(q);
    setIndex(0);
    setGraded(new Set());
    setLastGraded(null);
    setPhase("studying");
  }

  function nextUngraded(from: number, gradedIds: Set<string>): number | null {
    for (let i = from + 1; i < queue.length; i++) {
      if (!gradedIds.has(queue[i].id)) return i;
    }
    for (let i = 0; i <= from; i++) {
      if (!gradedIds.has(queue[i].id)) return i;
    }
    return null;
  }

  async function grade(g: Grade) {
    const item = queue[index];
    const previousState = await getStudyState(item.id);
    await reviewItem(item.id, g);
    setLastGraded({ item, previousState, index });
    const nextGraded = new Set(graded);
    nextGraded.add(item.id);
    setGraded(nextGraded);
    const next = nextUngraded(index, nextGraded);
    if (next === null) {
      setPhase("done");
    } else {
      setIndex(next);
    }
  }

  async function undo() {
    if (!lastGraded) return;
    await undoLastReview(lastGraded.item.id, lastGraded.previousState);
    const nextGraded = new Set(graded);
    nextGraded.delete(lastGraded.item.id);
    setGraded(nextGraded);
    setIndex(lastGraded.index);
    setLastGraded(null);
    setPhase("studying");
  }

  function goTo(delta: number) {
    setIndex((i) => Math.min(Math.max(i + delta, 0), queue.length - 1));
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (phase === "studying" && e.key === "Escape") {
        setPhase("pick");
      } else if (
        (phase === "studying" || phase === "done") &&
        e.key === "Backspace" &&
        lastGraded
      ) {
        e.preventDefault();
        void undo();
      } else if (phase === "studying" && e.key === "ArrowLeft") {
        goTo(-1);
      } else if (phase === "studying" && e.key === "ArrowRight") {
        goTo(1);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, lastGraded, queue.length]);

  function onTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: TouchEvent<HTMLDivElement>) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    goTo(dx > 0 ? -1 : 1);
  }

  if (phase === "studying") {
    const current = queue[index];
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <button onClick={() => setPhase("pick")}>✕ End (Esc)</button>
          <span>
            {graded.size} / {queue.length} graded
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded bg-black/10 dark:bg-white/10">
          <div
            className="h-full bg-brand transition-all"
            style={{ width: `${(graded.size / queue.length) * 100}%` }}
          />
        </div>
        <div
          className="flex items-center gap-2"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={() => goTo(-1)}
            disabled={index === 0}
            aria-label="Previous card"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-slate-400 transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-30 dark:border-white/10"
          >
            ‹
          </button>
          <div className="min-w-0 flex-1">
            <Flashcard
              item={current}
              mode={answerMode}
              alreadyGraded={graded.has(current.id)}
              onGrade={grade}
            />
          </div>
          <button
            onClick={() => goTo(1)}
            disabled={index === queue.length - 1}
            aria-label="Next card"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-slate-400 transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-30 dark:border-white/10"
          >
            ›
          </button>
        </div>
        {lastGraded && (
          <button
            onClick={() => void undo()}
            className="mx-auto block text-xs text-slate-400 hover:text-brand"
          >
            ↶ Undo last grade (Backspace)
          </button>
        )}
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="space-y-6 py-12 text-center">
        <div className="text-5xl">🎉</div>
        <h1 className="text-2xl font-bold">
          {graded.size > 0 ? `Reviewed ${graded.size} cards` : "Nothing due"}
        </h1>
        <p className="text-slate-500">
          {graded.size > 0
            ? "Great work — come back when more cards are due."
            : "No cards are due in this deck right now."}
        </p>
        <button
          onClick={() => setPhase("pick")}
          className="rounded-2xl bg-brand px-6 py-3 font-semibold text-white"
        >
          Back to decks
        </button>
        {lastGraded && (
          <button
            onClick={() => void undo()}
            className="mx-auto block text-xs text-slate-400 hover:text-brand"
          >
            ↶ Undo last grade (Backspace)
          </button>
        )}
        <div className="mx-auto max-w-sm pt-2">
          <AdSlot placement="sessionDone" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href="/practice" className="text-sm text-brand">
        ← Practice
      </Link>
      <h1 className="text-2xl font-bold">Flashcards</h1>
      <p className="text-slate-500">
        Spaced-repetition flashcards. Pick a deck to review what&apos;s due.
      </p>

      <div className="space-y-1.5">
        <span className="text-xs text-slate-500">Answer mode</span>
        <div className="grid grid-cols-2 gap-2">
          {ANSWER_MODES.map((m) => (
            <button
              key={m.mode}
              onClick={() => setAnswerMode(m.mode)}
              aria-pressed={answerMode === m.mode}
              className={`rounded-2xl border p-3 text-left transition-colors ${
                answerMode === m.mode
                  ? "border-brand bg-brand/5 dark:bg-brand/10"
                  : "border-black/10 dark:border-white/10"
              }`}
            >
              <span className="block text-sm font-semibold">{m.label}</span>
              <span className="block text-xs text-slate-500">{m.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Session size</span>
        <div className="inline-flex overflow-hidden rounded-full border border-black/10 dark:border-white/15">
          {SESSION_SIZES.map((n) => (
            <button
              key={n}
              onClick={() => setSessionSize(n)}
              className={`px-3 py-1 font-medium ${
                sessionSize === n ? "bg-brand text-white" : ""
              }`}
            >
              {n === "all" ? "All due" : n}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Shuffle</span>
        <button
          onClick={() => setShuffleEnabled((s) => !s)}
          aria-pressed={shuffleEnabled}
          className={`rounded-full px-3 py-1 font-medium ${
            shuffleEnabled
              ? "bg-brand text-white"
              : "border border-black/10 dark:border-white/15"
          }`}
        >
          {shuffleEnabled ? "On" : "Off"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {DECKS.map((d) => (
          <button
            key={d.kind}
            onClick={() => start(d.kind)}
            className="rounded-2xl border border-black/10 p-5 text-left font-semibold transition-colors hover:border-brand dark:border-white/10"
          >
            {d.label}
            <span className="mt-1 block text-xs font-normal text-slate-500">
              {dueCounts[d.kind] ?? "…"} due
            </span>
          </button>
        ))}
      </div>

      {lists && lists.length > 0 && (
        <section className="space-y-2 pt-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Your lists
          </h2>
          {lists.map((l) => (
            <button
              key={l.id}
              onClick={() => start("list", l.itemIds)}
              className="flex w-full items-center justify-between rounded-xl border border-black/10 p-3 text-left hover:border-brand dark:border-white/10"
            >
              <span>{l.name}</span>
              <span className="text-sm text-slate-500">
                {listDueCounts[l.id] ?? "…"} due
              </span>
            </button>
          ))}
        </section>
      )}

      <Link href="/lists" className="block pt-2 text-sm text-brand">
        Manage study lists →
      </Link>
    </div>
  );
}
