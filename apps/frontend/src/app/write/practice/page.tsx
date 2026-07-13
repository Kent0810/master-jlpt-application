import Link from "next/link";
import { getKanji } from "@/lib/data";
import type { Kanji } from "@/lib/data/types";

const BANDS: { label: string; icon: string; test: (k: Kanji) => boolean }[] = [
  {
    label: "Beginner · 1–4 strokes",
    icon: "🌱",
    test: (k) => k.strokeCount <= 4,
  },
  {
    label: "Intermediate · 5–8 strokes",
    icon: "🌿",
    test: (k) => k.strokeCount >= 5 && k.strokeCount <= 8,
  },
  {
    label: "Advanced · 9+ strokes",
    icon: "🌳",
    test: (k) => k.strokeCount >= 9,
  },
];

export default function PracticePage() {
  const kanji = [...getKanji()].sort((a, b) => a.strokeCount - b.strokeCount);

  return (
    <div className="space-y-6">
      <Link href="/write" className="text-sm text-brand">
        ← Learn to Write
      </Link>
      <header className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-2xl dark:bg-brand/20">
          🖋️
        </span>
        <div>
          <h1 className="text-2xl font-bold">Practice kanji</h1>
          <p className="text-sm text-slate-500">
            Step 3 of 3 — pick a kanji to trace stroke by stroke
          </p>
        </div>
      </header>

      {BANDS.map((band) => {
        const items = kanji.filter(band.test);
        return (
          <section key={band.label} className="space-y-2">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <span>{band.icon}</span>
              {band.label} · {items.length}
            </h2>
            <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {items.map((k) => (
                <li key={k.id}>
                  <Link
                    href={`/write/${encodeURIComponent(k.character)}`}
                    className="flex flex-col items-center rounded-2xl border border-black/10 p-2.5 shadow-sm transition-colors hover:border-brand dark:border-white/10"
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
