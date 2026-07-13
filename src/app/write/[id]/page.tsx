"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { getKanjiByChar } from "@/lib/data";
import { loadStrokes } from "@/lib/kanjivg/load";
import type { ParsedKanji } from "@/lib/kanjivg/parse";
import { StrokeOrderPlayer } from "@/components/StrokeOrderPlayer";
import { WritingCanvas } from "@/components/WritingCanvas";

export default function WriteKanjiPage() {
  const params = useParams<{ id: string }>();
  const character = decodeURIComponent(params.id);
  const kanji = getKanjiByChar(character);
  if (!kanji) return notFound();

  const [strokes, setStrokes] = useState<ParsedKanji | null>(null);

  useEffect(() => {
    let alive = true;
    loadStrokes(kanji.kanjivgId!).then((s) => {
      if (alive) setStrokes(s);
    });
    return () => {
      alive = false;
    };
  }, [kanji.kanjivgId]);

  return (
    <div className="space-y-6">
      <Link href="/write/practice" className="text-sm text-brand">
        ← Practice
      </Link>

      <header className="flex items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-soft p-6 text-white shadow-lg">
        <span className="font-jp text-5xl leading-none">{kanji.character}</span>
        <div>
          <p className="text-lg font-semibold">
            {kanji.meanings.slice(0, 3).join(", ")}
          </p>
          <p className="text-sm text-white/85">{kanji.strokeCount} strokes</p>
        </div>
      </header>

      <section className="space-y-2 rounded-3xl border border-black/10 p-4 shadow-sm dark:border-white/10">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          <span>▶️</span> Watch the stroke order
        </h2>
        <div className="flex justify-center">
          <StrokeOrderPlayer
            kanjivgId={kanji.kanjivgId!}
            character={kanji.character}
          />
        </div>
      </section>

      <section className="space-y-2 rounded-3xl border border-black/10 p-4 shadow-sm dark:border-white/10">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          <span>✍️</span> Now trace it yourself
        </h2>
        <p className="text-sm text-slate-500">
          Use a finger, mouse, or Apple Pencil. On iPad, turn on “Pen only” to
          rest your palm while you write — Pencil strokes get real pressure.
        </p>
        {strokes ? (
          <WritingCanvas strokes={strokes.strokes} viewBox={strokes.viewBox} />
        ) : (
          <p className="text-center text-sm text-slate-400">
            Tracing guide needs a connection the first time you open this kanji.
          </p>
        )}
      </section>

      <Link
        href={`/kanji/${encodeURIComponent(kanji.character)}`}
        className="flex items-center justify-between rounded-2xl bg-brand/5 p-4 text-sm font-semibold text-brand transition-colors hover:bg-brand/10 dark:bg-brand/10"
      >
        See full kanji details
        <span>→</span>
      </Link>
    </div>
  );
}
