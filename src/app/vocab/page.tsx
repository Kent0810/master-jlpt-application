"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getVocab } from "@/lib/data";
import type { PartOfSpeech } from "@/lib/data/types";
import { searchVocab } from "@/lib/search";
import { useAllStudyStates } from "@/lib/db/hooks";
import { StatusBadge } from "@/components/StatusBadge";
import { StarButton } from "@/components/StarButton";
import { Reading } from "@/components/Furigana";
import { AudioButton } from "@/components/AudioButton";

const ALL_VOCAB = getVocab();

const LESSONS = Array.from(
  new Set(ALL_VOCAB.map((v) => v.mnnLesson).filter((n): n is number => !!n)),
).sort((a, b) => a - b);

const POS_FILTERS: { value: PartOfSpeech | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "noun", label: "Nouns" },
  { value: "godan-verb", label: "Godan" },
  { value: "ichidan-verb", label: "Ichidan" },
  { value: "i-adjective", label: "い-adj" },
];

export default function VocabListPage() {
  const [query, setQuery] = useState("");
  const [pos, setPos] = useState<PartOfSpeech | "all">("all");
  const [lesson, setLesson] = useState<number | "all">("all");
  const states = useAllStudyStates();

  const results = useMemo(() => {
    let list = searchVocab(ALL_VOCAB, query);
    if (pos !== "all") list = list.filter((v) => v.partOfSpeech === pos);
    if (lesson !== "all") list = list.filter((v) => v.mnnLesson === lesson);
    return list;
  }, [query, pos, lesson]);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Vocabulary</h1>
          <p className="text-xs text-slate-500">
            Minna no Nihongo Shokyū Ⅰ · lessons 1–25
          </p>
        </div>
        <span className="text-sm text-slate-500">{results.length} shown</span>
      </header>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search word, reading, romaji, or meaning…"
        className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-2 outline-none focus:border-brand dark:border-white/15"
      />

      <label className="flex items-center gap-2 text-sm">
        <span className="text-slate-500">Lesson</span>
        <select
          value={lesson}
          onChange={(e) =>
            setLesson(e.target.value === "all" ? "all" : Number(e.target.value))
          }
          className="flex-1 rounded-xl border border-black/10 bg-transparent px-3 py-2 outline-none focus:border-brand dark:border-white/15"
        >
          <option value="all">All lessons (1–25)</option>
          {LESSONS.map((n) => (
            <option key={n} value={n}>
              Lesson {n}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-wrap gap-2">
        {POS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setPos(f.value)}
            className={`rounded-full px-3 py-1 text-xs ${
              pos === f.value ? "bg-brand text-white" : "bg-black/5 dark:bg-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {results.slice(0, 400).map((v) => {
          const status = states.get(v.id)?.status ?? "new";
          return (
            <li key={v.id}>
              <Link
                href={`/vocab/${encodeURIComponent(v.word)}`}
                className="flex items-center gap-3 rounded-xl border border-black/10 p-3 hover:border-brand dark:border-white/10"
              >
                <AudioButton text={v.reading} audioUrl={v.audioUrl} />
                <div className="min-w-0 flex-1">
                  <div className="text-lg">
                    <Reading word={v.word} reading={v.reading} romaji={v.romaji} />
                  </div>
                  <div className="line-clamp-1 text-sm text-slate-500">
                    {v.meanings.join(", ")}
                  </div>
                </div>
                {v.mnnLesson && (
                  <span className="shrink-0 rounded-full bg-black/5 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-white/10">
                    L{v.mnnLesson}
                  </span>
                )}
                <StatusBadge status={status} />
                <StarButton itemId={v.id} />
              </Link>
            </li>
          );
        })}
      </ul>
      {results.length > 400 && (
        <p className="py-4 text-center text-sm text-slate-500">
          Showing first 400 — refine your search to see more.
        </p>
      )}
      {results.length === 0 && (
        <p className="py-8 text-center text-slate-500">No matches.</p>
      )}
    </div>
  );
}
