"use client";

import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { getKanji, getVocab } from "@/lib/data";
import { getStats } from "@/lib/db/db";
import { LevelSelector } from "@/components/LevelSelector";
import { AdSlot } from "@/components/ads/AdSlot";
import { useT } from "@/lib/i18n";

const TOTAL_KANJI = getKanji().length;
const TOTAL_VOCAB = getVocab().length;
const TOTAL = TOTAL_KANJI + TOTAL_VOCAB;

const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function greetingKey(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function HomePage() {
  const stats = useLiveQuery(() => getStats(), []);
  const t = useT();

  const learning = stats?.byStatus.learning ?? 0;
  const mastered = stats?.byStatus.mastered ?? 0;
  const seen = learning + mastered;
  const pct = Math.round((seen / TOTAL) * 100);
  const ringOffset = RING_CIRCUMFERENCE * (1 - Math.min(seen / TOTAL, 1));
  const streakDays = stats?.streakDays ?? 0;
  const accuracyPct =
    stats && stats.accuracy > 0 ? Math.round(stats.accuracy * 100) : null;

  return (
    <div className="space-y-6">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-soft px-6 py-7 text-white shadow-lg">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-8 select-none font-jp text-[9rem] font-bold leading-none opacity-15"
        >
          五
        </div>
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            {t(greetingKey(new Date().getHours()))}
          </p>
          <h1 className="font-jp mt-1 text-3xl font-bold">N5 道場</h1>
          <p className="mt-1 text-sm text-white/90">
            {t("Your JLPT N5 kanji & vocab trainer.")}
          </p>
        </div>
      </header>

      <LevelSelector />

      <section className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-black/10 p-5 shadow-sm dark:border-white/10">
          <div className="relative h-28 w-28">
            <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
              <circle
                cx="60"
                cy="60"
                r={RING_RADIUS}
                strokeWidth="10"
                className="fill-none stroke-black/10 dark:stroke-white/10"
              />
              <circle
                cx="60"
                cy="60"
                r={RING_RADIUS}
                strokeWidth="10"
                strokeLinecap="round"
                className="fill-none stroke-brand transition-[stroke-dashoffset] duration-700 ease-out"
                style={{
                  strokeDasharray: RING_CIRCUMFERENCE,
                  strokeDashoffset: ringOffset,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {pct}%
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {seen}/{TOTAL}
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t("Studied")}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 rounded-3xl border border-black/10 bg-gradient-to-br from-amber-500/15 to-amber-500/5 p-5 shadow-sm dark:border-white/10">
          <span className="text-5xl leading-none">🔥</span>
          <span className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
            {streakDays}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t("Day streak")}
          </span>
        </div>
      </section>

      <Link
        href="/study"
        className="group flex items-center gap-4 overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-soft p-5 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl transition-transform group-hover:scale-110">
          🗂️
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{t("Continue practicing")}</span>
          <span className="block text-sm text-white/85">
            {accuracyPct !== null
              ? `${t("Accuracy so far")}: ${accuracyPct}%`
              : t("Flashcards, ready when you are")}
          </span>
        </span>
        <span className="text-xl transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>

      <section className="grid grid-cols-2 gap-3">
        <DashboardTile
          href="/lessons"
          icon="📚"
          title={t("Lessons")}
          desc={t("Minna-style 1–25")}
          accent="bg-brand/10 text-brand dark:bg-brand/20"
        />
        <DashboardTile
          href="/lists"
          icon="⭐"
          title={t("Lists")}
          desc={t("Custom decks")}
          accent="bg-amber-400/15 dark:bg-amber-400/20"
        />
      </section>

      <AdSlot placement="dashboard" />
    </div>
  );
}

function DashboardTile({
  href,
  icon,
  title,
  desc,
  accent,
}: {
  href: string;
  icon: string;
  title: string;
  desc: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-3xl border border-black/10 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md dark:border-white/10"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-transform group-hover:scale-110 ${accent}`}
      >
        {icon}
      </span>
      <span className="font-semibold">{title}</span>
      <span className="text-xs text-slate-500">{desc}</span>
    </Link>
  );
}
