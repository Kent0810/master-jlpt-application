"use client";

import { useState } from "react";
import Link from "next/link";
import { buildQueue, type DeckKind, type StudyItem } from "@/lib/study/deck";
import { getStarredIds, reviewItem } from "@/lib/db/db";
import { useStudyLists } from "@/lib/db/hooks";
import { Flashcard } from "@/components/Flashcard";
import { StudyQuizTabs } from "@/components/StudyQuizTabs";
import type { Grade } from "@/lib/srs/sm2";

type Phase = "pick" | "studying" | "done";

const DECKS: { kind: DeckKind; label: string }[] = [
  { kind: "all", label: "All N5" },
  { kind: "kanji", label: "Kanji only" },
  { kind: "vocab", label: "Vocab only" },
  { kind: "starred", label: "Starred" },
];

export default function StudyPage() {
  const [phase, setPhase] = useState<Phase>("pick");
  const [queue, setQueue] = useState<StudyItem[]>([]);
  const [index, setIndex] = useState(0);
  const [reviewed, setReviewed] = useState(0);
  const lists = useStudyLists();

  async function start(kind: DeckKind, listIds?: string[]) {
    const starredIds = kind === "starred" ? await getStarredIds() : undefined;
    const q = await buildQueue({ kind, listIds, starredIds, limit: 20 });
    if (q.length === 0) {
      setQueue([]);
      setPhase("done");
      return;
    }
    setQueue(q);
    setIndex(0);
    setReviewed(0);
    setPhase("studying");
  }

  async function grade(g: Grade) {
    const item = queue[index];
    await reviewItem(item.id, g);
    setReviewed((n) => n + 1);
    if (index + 1 >= queue.length) {
      setPhase("done");
    } else {
      setIndex((i) => i + 1);
    }
  }

  if (phase === "studying") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <button onClick={() => setPhase("pick")}>✕ End</button>
          <span>
            {index + 1} / {queue.length}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded bg-black/10 dark:bg-white/10">
          <div
            className="h-full bg-brand transition-all"
            style={{ width: `${(index / queue.length) * 100}%` }}
          />
        </div>
        <Flashcard item={queue[index]} onGrade={grade} />
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="space-y-6 py-12 text-center">
        <div className="text-5xl">🎉</div>
        <h1 className="text-2xl font-bold">
          {reviewed > 0 ? `Reviewed ${reviewed} cards` : "Nothing due"}
        </h1>
        <p className="text-slate-500">
          {reviewed > 0
            ? "Great work — come back when more cards are due."
            : "No cards are due in this deck right now."}
        </p>
        <button
          onClick={() => setPhase("pick")}
          className="rounded-2xl bg-brand px-6 py-3 font-semibold text-white"
        >
          Back to decks
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Practice</h1>
      <p className="text-slate-500">
        Spaced-repetition flashcards. Pick a deck to review what&apos;s due.
      </p>

      <StudyQuizTabs />

      <div className="grid grid-cols-2 gap-3">
        {DECKS.map((d) => (
          <button
            key={d.kind}
            onClick={() => start(d.kind)}
            className="rounded-2xl border border-black/10 p-5 text-left font-semibold transition-colors hover:border-brand dark:border-white/10"
          >
            {d.label}
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
              <span className="text-sm text-slate-500">{l.itemIds.length}</span>
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
