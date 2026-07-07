import Link from "next/link";
import { getKanji } from "@/lib/data";
import type { Kanji } from "@/lib/data/types";

const BANDS: { label: string; test: (k: Kanji) => boolean }[] = [
  { label: "Beginner · 1–4 strokes", test: (k) => k.strokeCount <= 4 },
  { label: "Intermediate · 5–8 strokes", test: (k) => k.strokeCount >= 5 && k.strokeCount <= 8 },
  { label: "Advanced · 9+ strokes", test: (k) => k.strokeCount >= 9 },
];

export default function PracticePage() {
  const kanji = [...getKanji()].sort((a, b) => a.strokeCount - b.strokeCount);

  return (
    <div className="space-y-6">
      <Link href="/write" className="text-sm text-brand">
        ← Learn to Write
      </Link>
      <h1 className="text-2xl font-bold">Practice kanji</h1>
      <p className="text-slate-500">
        Pick a kanji to see its stroke order and trace it yourself. Start simple
        and work your way up.
      </p>

      {BANDS.map((band) => {
        const items = kanji.filter(band.test);
        return (
          <section key={band.label} className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {band.label} · {items.length}
            </h2>
            <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {items.map((k) => (
                <li key={k.id}>
                  <Link
                    href={`/write/${encodeURIComponent(k.character)}`}
                    className="flex flex-col items-center rounded-xl border border-black/10 p-2 hover:border-brand dark:border-white/10"
                  >
                    <span className="font-jp text-2xl">{k.character}</span>
                    <span className="text-[10px] text-slate-500">
                      {k.strokeCount}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
