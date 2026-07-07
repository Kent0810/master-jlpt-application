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

      <header>
        <div className="flex items-center gap-3">
          <span className="font-jp text-4xl">{kanji.character}</span>
          <div>
            <p className="text-lg">{kanji.meanings.slice(0, 3).join(", ")}</p>
            <p className="text-sm text-slate-500">{kanji.strokeCount} strokes</p>
          </div>
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Watch the stroke order
        </h2>
        <div className="flex justify-center">
          <StrokeOrderPlayer
            kanjivgId={kanji.kanjivgId!}
            character={kanji.character}
          />
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Now trace it yourself
        </h2>
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
        className="block text-center text-sm text-brand"
      >
        See full kanji details →
      </Link>
    </div>
  );
}
