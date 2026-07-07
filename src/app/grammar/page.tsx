"use client";

import Link from "next/link";
import { getGrammar } from "@/lib/data";
import { Reading } from "@/components/Furigana";

const GRAMMAR = getGrammar();

export default function GrammarPage() {
  return (
    <div className="space-y-4">
      <Link href="/dashboard" className="text-sm text-brand">
        ← Home
      </Link>
      <h1 className="text-2xl font-bold">N5 Grammar</h1>
      <p className="text-slate-500">
        A quick reference to the core N5 particles and forms.
      </p>

      <ul className="space-y-3">
        {GRAMMAR.map((g) => (
          <li
            key={g.id}
            className="rounded-2xl border border-black/10 p-4 dark:border-white/10"
          >
            <h2 className="font-jp text-xl font-semibold">{g.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{g.meaning}</p>
            <p className="mt-2 font-mono text-sm">{g.structure}</p>
            <ul className="mt-3 space-y-1">
              {g.examples.map((ex, i) => (
                <li key={i} className="text-sm">
                  <span className="font-jp text-base">
                    <Reading word={ex.jp} reading={ex.reading} />
                  </span>
                  <span className="ml-2 text-slate-500">— {ex.en}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
