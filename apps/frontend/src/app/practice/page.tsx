"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { countDue } from "@/lib/study/deck";

const MODES = [
  {
    href: "/study",
    icon: "🗂️",
    title: "Flashcards",
    desc: "Spaced-repetition recall",
  },
  {
    href: "/quiz",
    icon: "✏️",
    title: "Quiz",
    desc: "Multiple choice & typing",
  },
  {
    href: "/practice/match",
    icon: "🧩",
    title: "Match",
    desc: "Pair kanji & words with meanings, timed",
  },
];

const LOCKED_MODES = [
  {
    icon: "📈",
    title: "Learn",
    desc: "Adaptive practice that escalates as you improve",
  },
  {
    icon: "📝",
    title: "Test",
    desc: "Timed batch exam, graded at the end",
  },
];

export default function PracticeHub() {
  const [dueCount, setDueCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    countDue({ kind: "all" }).then((n) => {
      if (alive) setDueCount(n);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      <Link href="/dashboard" className="text-sm text-brand">
        ← Home
      </Link>
      <h1 className="text-2xl font-bold">Practice</h1>
      <p className="text-slate-500">Pick how you want to review today.</p>

      <ul className="space-y-3">
        {MODES.map((m) => (
          <li key={m.href}>
            <Link
              href={m.href}
              className="group flex items-center gap-4 rounded-3xl border border-black/10 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md dark:border-white/10"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-2xl transition-transform group-hover:scale-110 dark:bg-brand/20">
                {m.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{m.title}</span>
                <span className="block text-sm text-slate-500">{m.desc}</span>
              </span>
              <span className="shrink-0 text-xs text-slate-400">
                {dueCount ?? "…"} due
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="space-y-3 pt-2">
        {LOCKED_MODES.map((m) => (
          <div
            key={m.title}
            className="flex items-center gap-4 rounded-3xl border border-dashed border-black/15 p-5 dark:border-white/15"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/5 text-2xl opacity-60 dark:bg-white/10">
              {m.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-slate-400">
                {m.title}
              </span>
              <span className="block text-sm text-slate-400">{m.desc}</span>
            </span>
            <span className="shrink-0 text-xs text-slate-400">🔒 Soon</span>
          </div>
        ))}
      </div>
    </div>
  );
}
