"use client";

import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { getKanji, getVocab } from "@/lib/data";
import { getStats } from "@/lib/db/db";
import { LevelSelector } from "@/components/LevelSelector";

const TOTAL_KANJI = getKanji().length;
const TOTAL_VOCAB = getVocab().length;
const TOTAL = TOTAL_KANJI + TOTAL_VOCAB;

export default function HomePage() {
  const stats = useLiveQuery(() => getStats(), []);

  const learning = stats?.byStatus.learning ?? 0;
  const mastered = stats?.byStatus.mastered ?? 0;
  const seen = learning + mastered;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-jp text-3xl font-bold">N5 道場</h1>
        <p className="text-slate-500">Your JLPT N5 kanji &amp; vocab trainer.</p>
      </header>

      <LevelSelector />

      <section className="grid grid-cols-2 gap-3">
        <Stat label="Studied" value={`${seen}`} sub={`of ${TOTAL}`} />
        <Stat label="Mastered" value={`${mastered}`} sub="items" />
        <Stat
          label="Streak"
          value={`${stats?.streakDays ?? 0}`}
          sub="days 🔥"
        />
        <Stat
          label="Today"
          value={`${stats?.reviewedToday ?? 0}`}
          sub="reviews"
        />
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>Overall progress</span>
          <span>{Math.round((seen / TOTAL) * 100)}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div className="flex h-full">
            <div
              className="h-full bg-emerald-500"
              style={{ width: `${(mastered / TOTAL) * 100}%` }}
            />
            <div
              className="h-full bg-amber-400"
              style={{ width: `${(learning / TOTAL) * 100}%` }}
            />
          </div>
        </div>
        {stats && (stats.byStatus.learning + stats.byStatus.mastered > 0) && (
          <p className="text-xs text-slate-500">
            Accuracy so far: {Math.round(stats.accuracy * 100)}%
          </p>
        )}
      </section>

      <section className="grid grid-cols-2 gap-3">
        <Tile href="/grammar" title="Grammar" emoji="📖" desc="N5 reference" />
        <Tile href="/lists" title="Lists" emoji="⭐" desc="Custom decks" />
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 p-4 dark:border-white/10">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-3xl font-bold">{value}</div>
      <div className="text-xs text-slate-500">{sub}</div>
    </div>
  );
}

function Tile({
  href,
  title,
  emoji,
  desc,
}: {
  href: string;
  title: string;
  emoji: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 rounded-2xl border border-black/10 p-4 transition-colors hover:border-brand dark:border-white/10"
    >
      <span className="font-jp text-2xl">{emoji}</span>
      <span className="font-semibold">{title}</span>
      <span className="text-xs text-slate-500">{desc}</span>
    </Link>
  );
}
