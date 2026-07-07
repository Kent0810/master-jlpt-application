"use client";

import Link from "next/link";
import { STROKE_RULES } from "@/lib/writing/curriculum";
import { getKanjiByChar } from "@/lib/data";
import { StrokeOrderPlayer } from "@/components/StrokeOrderPlayer";

export default function RulesPage() {
  return (
    <div className="space-y-4">
      <Link href="/write" className="text-sm text-brand">
        ← Learn to Write
      </Link>
      <h1 className="text-2xl font-bold">Stroke-order rules</h1>
      <p className="text-slate-500">
        A handful of rules cover almost every kanji. Press play on each example.
      </p>

      <ol className="space-y-4">
        {STROKE_RULES.map((rule, i) => {
          const kanji = getKanjiByChar(rule.exampleChar);
          return (
            <li
              key={rule.id}
              className="rounded-2xl border border-black/10 p-4 dark:border-white/10"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-jp text-lg text-brand">{i + 1}.</span>
                <h2 className="font-semibold">{rule.title}</h2>
              </div>
              <p className="mt-1 text-sm text-slate-500">{rule.description}</p>
              {kanji && (
                <div className="mt-3 flex flex-col items-center">
                  <StrokeOrderPlayer
                    kanjivgId={kanji.kanjivgId!}
                    character={kanji.character}
                    size={160}
                  />
                  <Link
                    href={`/write/${encodeURIComponent(kanji.character)}`}
                    className="mt-1 text-xs text-brand"
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
        className="block pt-2 text-right text-sm font-medium text-brand"
      >
        Next: practice kanji →
      </Link>
    </div>
  );
}
