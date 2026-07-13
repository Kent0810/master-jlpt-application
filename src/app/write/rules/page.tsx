"use client";

import Link from "next/link";
import { STROKE_RULES } from "@/lib/writing/curriculum";
import { getKanjiByChar } from "@/lib/data";
import { StrokeOrderPlayer } from "@/components/StrokeOrderPlayer";

export default function RulesPage() {
  return (
    <div className="space-y-5">
      <Link href="/write" className="text-sm text-brand">
        ← Learn to Write
      </Link>
      <header className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-2xl dark:bg-brand/20">
          📐
        </span>
        <div>
          <h1 className="text-2xl font-bold">Stroke-order rules</h1>
          <p className="text-sm text-slate-500">
            Step 2 of 3 — press play on each example
          </p>
        </div>
      </header>
      <p className="text-slate-500">
        A handful of rules cover almost every kanji.
      </p>

      <ol className="space-y-4">
        {STROKE_RULES.map((rule, i) => {
          const kanji = getKanjiByChar(rule.exampleChar);
          return (
            <li
              key={rule.id}
              className="rounded-3xl border border-black/10 p-5 shadow-sm dark:border-white/10"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand/10 font-jp text-sm font-bold text-brand dark:bg-brand/20">
                  {i + 1}
                </span>
                <h2 className="font-semibold">{rule.title}</h2>
              </div>
              <p className="mt-1 text-sm text-slate-500">{rule.description}</p>
              {kanji && (
                <div className="mt-3 flex flex-col items-center rounded-2xl bg-black/[0.015] py-4 dark:bg-white/[0.02]">
                  <StrokeOrderPlayer
                    kanjivgId={kanji.kanjivgId!}
                    character={kanji.character}
                    size={160}
                  />
                  <Link
                    href={`/write/${encodeURIComponent(kanji.character)}`}
                    className="mt-1 text-xs font-semibold text-brand"
                  >
                    Practise {kanji.character} →
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <Link
        href="/write/practice"
        className="flex items-center justify-between rounded-2xl bg-brand/5 p-4 text-sm font-semibold text-brand transition-colors hover:bg-brand/10 dark:bg-brand/10"
      >
        Next: practice kanji
        <span>→</span>
      </Link>
    </div>
  );
}
