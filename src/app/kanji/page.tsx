"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getKanji } from "@/lib/data";
import { searchKanji } from "@/lib/search";
import { useAllStudyStates } from "@/lib/db/hooks";
import { StatusBadge } from "@/components/StatusBadge";
import { KanjiWriteTabs } from "@/components/KanjiWriteTabs";
import { useT, useLang, pickMeanings } from "@/lib/i18n";

const ALL_KANJI = getKanji();
const STROKE_BUCKETS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export default function KanjiListPage() {
  const [query, setQuery] = useState("");
  const [stroke, setStroke] = useState<number | null>(null);
  const states = useAllStudyStates();
  const t = useT();
  const lang = useLang();

  const results = useMemo(() => {
    let list = searchKanji(ALL_KANJI, query);
    if (stroke !== null) {
      list =
        stroke === 10
          ? list.filter((k) => k.strokeCount >= 10)
          : list.filter((k) => k.strokeCount === stroke);
    }
    return list;
  }, [query, stroke]);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("Kanji")}</h1>
        <span className="text-sm text-slate-500">
          {results.length} {t("shown")}
        </span>
      </header>

      <KanjiWriteTabs />

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("Search by meaning, reading, or kanji…")}
        className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-2 outline-none focus:border-brand dark:border-white/15"
      />

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setStroke(null)}
          className={`rounded-full px-3 py-1 text-xs ${
            stroke === null ? "bg-brand text-white" : "bg-black/5 dark:bg-white/10"
          }`}
        >
          All strokes
        </button>
        {STROKE_BUCKETS.map((n) => (
          <button
            key={n}
            onClick={() => setStroke(n)}
            className={`rounded-full px-3 py-1 text-xs ${
              stroke === n ? "bg-brand text-white" : "bg-black/5 dark:bg-white/10"
            }`}
          >
            {n === 10 ? "10+" : n}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {results.map((k) => {
          const status = states.get(k.id)?.status ?? "new";
          return (
            <li key={k.id}>
              <Link
                href={`/kanji/${encodeURIComponent(k.character)}`}
                className="flex h-full flex-col items-center gap-1 rounded-2xl border border-black/10 p-3 text-center transition-colors hover:border-brand dark:border-white/10"
              >
                <span className="text-4xl font-jp leading-none">{k.character}</span>
                <span className="line-clamp-1 text-xs text-slate-500">
                  {pickMeanings(k, lang)[0]}
                </span>
                <StatusBadge status={status} />
              </Link>
            </li>
          );
        })}
      </ul>
      {results.length === 0 && (
        <p className="py-8 text-center text-slate-500">No matches.</p>
      )}
    </div>
  );
}
