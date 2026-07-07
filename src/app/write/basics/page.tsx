import Link from "next/link";
import { BASIC_STROKES } from "@/lib/writing/curriculum";
import { BasicStrokeCard } from "@/components/BasicStrokeCard";

export default function BasicsPage() {
  return (
    <div className="space-y-4">
      <Link href="/write" className="text-sm text-brand">
        ← Learn to Write
      </Link>
      <h1 className="text-2xl font-bold">Basic strokes</h1>
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
        className="block pt-2 text-right text-sm font-medium text-brand"
      >
        Next: stroke-order rules →
      </Link>
    </div>
  );
}
