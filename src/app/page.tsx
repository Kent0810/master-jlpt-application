import Link from "next/link";
import { getKanji, getVocab } from "@/lib/data";

const KANJI = getKanji().length;
const VOCAB = getVocab().length;

const FEATURES = [
  {
    emoji: "🔊",
    title: "Read & hear everything",
    desc: "Furigana, romaji, and tap-to-speak audio on every kanji and word.",
  },
  {
    emoji: "🗂️",
    title: "Spaced repetition",
    desc: "SM-2 flashcards resurface each item right before you'd forget it.",
  },
  {
    emoji: "✏️",
    title: "Four quiz modes",
    desc: "Meaning, reading, typing, and listening — misses come back sooner.",
  },
  {
    emoji: "筆",
    title: "Learn to write",
    desc: "Animated stroke order and a tracing canvas, basics to advanced.",
  },
  {
    emoji: "📈",
    title: "Track progress",
    desc: "Streaks, mastered counts, and accuracy — all stored on your device.",
  },
  {
    emoji: "📲",
    title: "Works offline",
    desc: "Installable as an app; study on the train with no connection.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh]">
      <section className="relative overflow-hidden bg-gradient-to-b from-brand to-brand-soft px-6 py-20 text-center text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none font-jp text-[40vw] leading-none opacity-10"
        >
          五
        </div>
        <div className="relative mx-auto max-w-xl space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            JLPT N5
          </p>
          <h1 className="font-jp text-5xl font-bold sm:text-6xl">N5 道場</h1>
          <p className="text-lg text-white/90">
            Master every kanji and word for the JLPT N5 — with furigana, audio,
            flashcards, quizzes, and stroke-order practice. Free, offline, no
            account.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Link
              href="/dashboard"
              className="w-full rounded-2xl bg-white px-8 py-3 font-semibold text-brand shadow-lg transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Start learning →
            </Link>
            <Link
              href="/kanji"
              className="w-full rounded-2xl border border-white/60 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Browse kanji
            </Link>
          </div>
          <p className="pt-2 text-sm text-white/80">
            {KANJI} kanji · {VOCAB} words · 16 grammar points
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Everything you need to pass N5
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-black/10 p-5 dark:border-white/10"
            >
              <div className="font-jp text-3xl">{f.emoji}</div>
              <h3 className="mt-2 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-3xl border border-black/10 p-8 text-center dark:border-white/10">
          <h2 className="text-xl font-bold">Start with N5 today</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            N5 is fully available now. N4, N3, and N2 are on the way.
          </p>
          <div className="mx-auto mt-5 flex max-w-md justify-center gap-2">
            <span className="rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white">
              N5
            </span>
            {["N4", "N3", "N2"].map((l) => (
              <span
                key={l}
                className="rounded-full border border-black/10 px-4 py-1.5 text-sm text-slate-400 dark:border-white/10"
              >
                🔒 {l}
              </span>
            ))}
          </div>
          <Link
            href="/dashboard"
            className="mt-8 inline-block rounded-2xl bg-brand px-8 py-3 font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            Enter the dojo →
          </Link>
        </div>
      </section>

      <footer className="border-t border-black/5 px-6 py-8 text-center text-xs text-slate-400 dark:border-white/5">
        Built for self-study. Data from KANJIDIC, Tanos &amp; KanjiVG — see
        attribution in the repo.
      </footer>
    </div>
  );
}
