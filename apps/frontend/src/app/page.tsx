"use client";

import Link from "next/link";
import { getKanji, getVocab, getGrammar } from "@/lib/data";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useT } from "@/lib/i18n";

const KANJI = getKanji().length;
const VOCAB = getVocab().length;
const GRAMMAR_POINTS = getGrammar().length;

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
  const t = useT();
  return (
    <div className="min-h-[100dvh]">
      <section className="relative overflow-hidden bg-gradient-to-b from-brand to-brand-soft px-6 py-20 text-center text-white dark:from-rose-900 dark:to-slate-950">
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2">
          <LanguageToggle onDark />
          <ThemeToggle />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none font-jp text-[40vw] leading-none opacity-10"
        >
          道
        </div>
        <div className="relative mx-auto max-w-xl space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
            JLPT N5–N1
          </p>
          <h1 className="font-jp text-5xl font-bold sm:text-6xl">JLPT 道場</h1>
          <p className="text-lg text-white/90">
            {t(
              "Master JLPT kanji and vocabulary — from N5 to N1 — with furigana, audio, flashcards, quizzes, and stroke-order practice. Free, offline, no account.",
            )}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
            <Link
              href="/dashboard"
              className="w-full rounded-2xl bg-white px-8 py-3 font-semibold text-brand shadow-lg transition-transform hover:scale-[1.02] sm:w-auto"
            >
              {t("Start learning →")}
            </Link>
            <Link
              href="/kanji"
              className="w-full rounded-2xl border border-white/60 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              {t("Browse kanji")}
            </Link>
          </div>
          <p className="pt-2 text-sm text-white/80">
            {KANJI} kanji · {VOCAB} {t("words")} · {GRAMMAR_POINTS}{" "}
            {t("grammar points")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">
          {t("Everything you need to pass the JLPT")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-black/10 p-5 dark:border-white/10"
            >
              <div className="font-jp text-3xl">{f.emoji}</div>
              <h3 className="mt-2 font-semibold">{t(f.title)}</h3>
              <p className="mt-1 text-sm text-slate-500">{t(f.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="rounded-3xl border border-black/10 p-8 text-center dark:border-white/10">
          <h2 className="text-xl font-bold">{t("Start with N5 today")}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            {t("N5 is available now — N4, N3, N2 and N1 are on the way.")}
          </p>
          <div className="mx-auto mt-5 flex max-w-md justify-center gap-2">
            <span className="rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white">
              N5
            </span>
            {["N4", "N3", "N2", "N1"].map((l) => (
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
            {t("Enter the dojo →")}
          </Link>
        </div>
      </section>

      <footer className="border-t border-black/5 px-6 py-8 text-center text-xs text-slate-400 dark:border-white/5">
        {t(
          "Built for self-study. Data from KANJIDIC, Tanos & KanjiVG — see attribution in the repo.",
        )}
      </footer>
    </div>
  );
}
