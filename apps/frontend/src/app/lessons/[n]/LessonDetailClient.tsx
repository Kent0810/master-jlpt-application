"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  getLessonMeta,
  getBookReference,
  LESSON_META,
} from "@/lib/lessons/lessons";
import { getLessonBlocks } from "@/lib/lessons/blocks";
import { LessonImageFigure } from "@/components/LessonImage";
import { getLessonHero } from "@/lib/lessonImages";
import { lessonAccent, accentShade } from "@/lib/lessonAccents";
import { LessonBlocks } from "@/components/lessons/LessonBlocks";
import { useT, useLang } from "@/lib/i18n";

export default function LessonDetailClient() {
  const params = useParams<{ n: string }>();
  const lesson = Number(params.n);
  const meta = getLessonMeta(lesson);
  const t = useT();
  const lang = useLang();
  if (!meta) return notFound();

  const blocks = getLessonBlocks(lesson);
  const prev = LESSON_META.find((l) => l.lesson === lesson - 1);
  const next = LESSON_META.find((l) => l.lesson === lesson + 1);
  const accent = lessonAccent(lesson);

  return (
    <div className="space-y-8">
      <Link href="/lessons" className="text-sm text-brand">
        {t("← Lessons")}
      </Link>

      {/* Header banner — tinted with this lesson's journey accent color */}
      <header
        className="relative overflow-hidden rounded-3xl p-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${accentShade(accent, 0.55)})`,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 -top-5 select-none font-jp text-8xl font-bold opacity-15"
        >
          {meta.lesson}
        </span>
        <div className="relative space-y-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">
              {t("Lesson")} {meta.lesson}
            </span>
            <span className="font-jp text-sm text-white/80">
              {meta.titleJp}
            </span>
          </div>
          <h1 className="text-2xl font-bold">
            {lang === "vi" ? meta.titleVi : meta.titleEn}
          </h1>
          <p className="text-sm text-white/90">
            {lang === "vi" ? meta.focusVi : meta.focus}
          </p>
          <p className="flex items-center gap-1.5 pt-1 text-xs text-white/75">
            <span aria-hidden>📖</span>
            <span className="font-jp">{getBookReference(meta.lesson).jp}</span>
          </p>
        </div>
      </header>

      {/* Lesson hero illustration */}
      <LessonImageFigure
        image={getLessonHero(meta.lesson)}
        variant="hero"
        accent={accent}
      />

      {/* Original recap + textbook reference */}
      <section className="rounded-2xl border border-black/10 bg-black/[0.015] p-4 dark:border-white/10 dark:bg-white/[0.02]">
        <p className="text-sm leading-relaxed">
          {lang === "vi" ? meta.recapVi : meta.recap}
        </p>
        <p className="mt-2 text-xs text-slate-500">
          {lang === "vi"
            ? `Học cùng ${getBookReference(meta.lesson).vi}.`
            : `Study alongside ${getBookReference(meta.lesson).en}.`}
        </p>
      </section>

      {/* Lesson content — grammar, dialogues, vocab and exercises as blocks */}
      <LessonBlocks blocks={blocks} lesson={lesson} accent={accent} />

      {/* Prev / next — mini journey stops in each neighbour's accent color */}
      <nav className="flex justify-between gap-3 border-t border-black/10 pt-5 text-sm dark:border-white/10">
        {prev ? <NeighborLink meta={prev} direction="prev" /> : <span />}
        {next ? <NeighborLink meta={next} direction="next" /> : <span />}
      </nav>
    </div>
  );
}

function NeighborLink({
  meta,
  direction,
}: {
  meta: (typeof LESSON_META)[number];
  direction: "prev" | "next";
}) {
  const t = useT();
  const lang = useLang();
  const accent = lessonAccent(meta.lesson);
  const isPrev = direction === "prev";

  return (
    <Link
      href={`/lessons/${meta.lesson}`}
      className={`group flex max-w-[48%] items-center gap-3 rounded-2xl border border-black/10 p-3 transition-all hover:-translate-y-0.5 hover:border-[var(--acc)] hover:shadow-md dark:border-white/15 ${
        isPrev ? "" : "flex-row-reverse text-right"
      }`}
      style={{ "--acc": accent } as React.CSSProperties}
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-jp text-sm font-bold text-white shadow-sm"
        style={{ backgroundColor: accent }}
      >
        {meta.lesson}
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-slate-400">
          {isPrev ? "←" : ""} {t("Lesson")} {meta.lesson} {isPrev ? "" : "→"}
        </span>
        <span className="block truncate font-semibold">
          {lang === "vi" ? meta.titleVi : meta.titleEn}
        </span>
      </span>
    </Link>
  );
}
