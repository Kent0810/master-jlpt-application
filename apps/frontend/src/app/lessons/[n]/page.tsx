"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  getLessonContent,
  getDialogue,
  getBookReference,
  LESSON_META,
} from "@/lib/lessons/lessons";
import { getVocab } from "@/lib/data";
import { Reading } from "@/components/Furigana";
import { Sentence } from "@/components/Sentence";
import { LessonImageFigure } from "@/components/LessonImage";
import { GrammarImage } from "@/components/GrammarImage";
import { getLessonHero } from "@/lib/lessonImages";
import { lessonAccent, accentTint, accentShade } from "@/lib/lessonAccents";
import { AddToListButton } from "@/components/AddToListButton";
import {
  useT,
  useLang,
  pickMeanings,
  pickGrammarMeaning,
  pickExampleGloss,
} from "@/lib/i18n";

export default function LessonDetailPage() {
  const params = useParams<{ n: string }>();
  const lesson = Number(params.n);
  const content = getLessonContent(lesson);
  const dialogue = getDialogue(lesson);
  const t = useT();
  const lang = useLang();
  const [selected, setSelected] = useState<{
    line: number;
    word: string;
  } | null>(null);
  if (!content) return notFound();

  const { meta, grammar, vocab } = content;
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
      <LessonImageFigure image={getLessonHero(meta.lesson)} variant="hero" />

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

      {/* Grammar */}
      <section className="space-y-3">
        <SectionHeading
          emoji="📝"
          title={t("Grammar")}
          count={grammar.length}
          accent={accent}
        />
        {grammar.length === 0 ? (
          <p className="text-sm text-slate-400">
            {t("No grammar points for this lesson.")}
          </p>
        ) : (
          <ul className="space-y-3">
            {grammar.map((g, gi) => (
              <li
                key={g.id}
                className="rounded-2xl border border-l-4 border-black/10 bg-black/[0.015] p-4 dark:border-white/10 dark:bg-white/[0.02]"
                style={{ borderLeftColor: accent }}
              >
                <h3 className="flex items-center gap-2.5 font-jp text-lg font-semibold">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      color: accent,
                      backgroundColor: accentTint(accent, 0.14),
                    }}
                  >
                    {gi + 1}
                  </span>
                  {g.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {pickGrammarMeaning(g, lang)}
                </p>
                <p
                  className="mt-2 inline-block rounded-lg px-2.5 py-1 font-mono text-xs font-medium"
                  style={{
                    color: accent,
                    backgroundColor: accentTint(accent, 0.1),
                  }}
                >
                  {g.structure}
                </p>
                <GrammarImage grammarId={g.id} />
                <ul
                  className="mt-3 space-y-2.5 border-l-2 pl-3"
                  style={{ borderColor: accentTint(accent, 0.35) }}
                >
                  {g.examples.map((ex, i) => (
                    <li key={i} className="text-sm">
                      <Sentence
                        jp={ex.jp}
                        reading={ex.reading}
                        tokens={ex.tokens}
                        romaji={ex.romaji}
                        className="text-base"
                      />
                      <span className="mt-0.5 block text-slate-500">
                        {pickExampleGloss(ex, lang)}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Vocabulary */}
      <section className="space-y-3">
        <SectionHeading
          emoji="🗂️"
          title={t("Vocabulary")}
          count={vocab.length}
          accent={accent}
        />
        <ul className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
          {vocab.map((v, i) => (
            <li
              key={v.id}
              className={i % 2 ? "bg-black/[0.015] dark:bg-white/[0.02]" : ""}
            >
              <Link
                href={`/vocab/${encodeURIComponent(v.word)}`}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-brand/5"
              >
                <span className="min-w-0 flex-1 text-base">
                  <Reading
                    word={v.word}
                    reading={v.reading}
                    romaji={v.romaji}
                  />
                </span>
                <span className="min-w-0 max-w-[45%] shrink truncate text-right text-sm text-slate-500">
                  {pickMeanings(v, lang)[0]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Dialogue */}
      <section className="space-y-3">
        <SectionHeading
          emoji="💬"
          title={t("会話 · Dialogue")}
          accent={accent}
        />
        {dialogue ? (
          <div className="space-y-4 rounded-2xl border border-black/10 bg-[#faf7ee] p-4 dark:border-white/10 dark:bg-white/[0.03] sm:p-6">
            {dialogue.lines.map((line, i) => {
              const isReply = line.sp !== dialogue.lines[0].sp;
              const speakerColor = isReply ? lessonAccent(lesson + 3) : accent;
              return (
                <div
                  key={i}
                  className={`flex items-end gap-2.5 ${isReply ? "flex-row-reverse" : ""}`}
                >
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: speakerColor }}
                  >
                    {line.sp}
                  </span>
                  <div
                    className={`min-w-0 max-w-[85%] ${isReply ? "text-right" : ""}`}
                  >
                    <div
                      className={`inline-block rounded-2xl border border-black/5 px-3.5 py-2.5 text-left shadow-sm dark:border-white/10 ${
                        isReply
                          ? "rounded-br-sm"
                          : "rounded-bl-sm bg-white dark:bg-white/[0.06]"
                      }`}
                      style={
                        isReply
                          ? { backgroundColor: accentTint(speakerColor, 0.1) }
                          : undefined
                      }
                    >
                      <Sentence
                        jp={line.jp}
                        reading={line.reading}
                        tokens={line.tokens}
                        romaji={line.romaji}
                        className="text-base leading-loose"
                        onWordSelect={(word) => setSelected({ line: i, word })}
                        selectedWord={
                          selected?.line === i ? selected.word : null
                        }
                      />
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {lang === "vi" ? line.vi : line.en}
                      </p>
                    </div>
                    {selected?.line === i && (
                      <WordLookupCard
                        word={selected.word}
                        onClose={() => setSelected(null)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 p-6 text-center text-sm text-slate-400 dark:border-white/15">
            {t("A short conversation for this lesson is coming soon.")}
          </div>
        )}
      </section>

      {/* Prev / next — mini journey stops in each neighbour's accent color */}
      <nav className="flex justify-between gap-3 border-t border-black/10 pt-5 text-sm dark:border-white/10">
        {prev ? <NeighborLink meta={prev} direction="prev" /> : <span />}
        {next ? <NeighborLink meta={next} direction="next" /> : <span />}
      </nav>
    </div>
  );
}

function WordLookupCard({
  word,
  onClose,
}: {
  word: string;
  onClose: () => void;
}) {
  const lang = useLang();
  const t = useT();
  const vocab = getVocab().find((v) => v.word === word);

  return (
    <div className="mt-1 flex items-start justify-between gap-3 rounded-xl border border-black/10 bg-black/[0.02] p-3 text-left dark:border-white/10 dark:bg-white/[0.03]">
      <div className="min-w-0">
        {vocab ? (
          <>
            <div className="font-jp text-lg">
              <Reading
                word={vocab.word}
                reading={vocab.reading}
                romaji={vocab.romaji}
              />
            </div>
            <p className="text-sm text-slate-500">
              {pickMeanings(vocab, lang).join(", ")}
            </p>
          </>
        ) : (
          <p className="text-sm text-slate-400">
            <span className="font-jp">{word}</span> —{" "}
            {t("not in the vocabulary list")}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        {vocab && <AddToListButton itemId={vocab.id} />}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Close")}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function SectionHeading({
  emoji,
  title,
  count,
  accent,
}: {
  emoji: string;
  title: string;
  count?: number;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-xl text-base"
        style={{ backgroundColor: accentTint(accent, 0.12) }}
      >
        {emoji}
      </span>
      <h2 className="text-base font-bold">{title}</h2>
      {count !== undefined && (
        <span
          className="rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{
            color: accent,
            backgroundColor: accentTint(accent, 0.12),
          }}
        >
          {count}
        </span>
      )}
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
