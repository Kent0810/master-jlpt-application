import Link from "next/link";
import { BASIC_STROKES } from "@/lib/writing/curriculum";
import { BasicStrokeCard } from "@/components/BasicStrokeCard";

export default function BasicsPage() {
  return (
    <div className="space-y-5">
      <Link href="/write" className="text-sm text-brand">
        ← Learn to Write
      </Link>
      <header className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-2xl dark:bg-brand/20">
          ✏️
        </span>
        <div>
          <h1 className="text-2xl font-bold">Basic strokes</h1>
          <p className="text-sm text-slate-500">
            Step 1 of 3 — the building blocks of every kanji
          </p>
        </div>
      </header>
      <p className="text-slate-500">
        Every kanji is a combination of these fundamental strokes. Watch the red
        line to see the direction each one is drawn.
      </p>
      <div className="space-y-3">
        {BASIC_STROKES.map((s) => (
          <BasicStrokeCard key={s.id} stroke={s} />
        ))}
      </div>
      <Link
        href="/write/rules"
        className="flex items-center justify-between rounded-2xl bg-brand/5 p-4 text-sm font-semibold text-brand transition-colors hover:bg-brand/10 dark:bg-brand/10"
      >
        Next: stroke-order rules
        <span>→</span>
      </Link>
    </div>
  );
}
