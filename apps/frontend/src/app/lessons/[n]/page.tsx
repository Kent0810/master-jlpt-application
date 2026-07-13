"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import {
  getLessonContent,
  getDialogue,
  getBookReference,
  LESSON_META,
} from "@/lib/lessons/lessons";
import { Reading } from "@/components/Furigana";
import { Sentence } from "@/components/Sentence";
import { LessonImageFigure } from "@/components/LessonImage";
import { getLessonHero } from "@/lib/lessonImages";
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
  if (!content) return notFound();

  const { meta, grammar, vocab } = content;
  const prev = LESSON_META.find((l) => l.lesson === lesson - 1);
  const next = LESSON_META.find((l) => l.lesson === lesson + 1);

  return (
    <div className="space-y-8">
      <Link href="/lessons" className="text-sm text-brand">
        {t("← Lessons")}
      </Link>

      {/* Header banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-soft p-6 text-white dark:from-rose-900 dark:to-slate-900">
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
        />
        {grammar.length === 0 ? (
          <p className="text-sm text-slate-400">
            {t("No grammar points for this lesson.")}
          </p>
        ) : (
          <ul className="space-y-3">
            {grammar.map((g) => (
              <li
                key={g.id}
                className="rounded-2xl border border-black/10 bg-black/[0.015] p-4 dark:border-white/10 dark:bg-white/[0.02]"
              >
                <h3 className="font-jp text-lg font-semibold">{g.title}</h3>
                <p className="mt-1 text-sm text-slate-500">
                  {pickGrammarMeaning(g, lang)}
                </p>
                <p className="mt-2 inline-block rounded-lg bg-black/5 px-2.5 py-1 font-mono text-xs dark:bg-white/10">
                  {g.structure}
                </p>
                <ul className="mt-3 space-y-2.5 border-l-2 border-brand/30 pl-3">
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
        <SectionHeading emoji="💬" title={t("会話 · Dialogue")} />
        {dialogue ? (
          <div className="space-y-4 rounded-2xl border border-black/10 bg-[#faf7ee] p-6 dark:border-white/10 dark:bg-white/[0.03]">
            {dialogue.lines.map((line, i) => {
              const isReply = line.sp === "B";
              return (
                <p key={i} className={isReply ? "pl-4" : ""}>
                  {isReply && <span className="mr-1 font-jp">――</span>}
                  <Sentence
                    jp={line.jp}
                    reading={line.reading}
                    tokens={line.tokens}
                    romaji={line.romaji}
                    className="text-base leading-loose"
                  />
                  <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
                    {lang === "vi" ? line.vi : line.en}
                  </span>
                </p>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-black/15 p-6 text-center text-sm text-slate-400 dark:border-white/15">
            {t("A short conversation for this lesson is coming soon.")}
          </div>
        )}
      </section>

      {/* Prev / next */}
      <nav className="flex justify-between gap-3 border-t border-black/10 pt-4 text-sm dark:border-white/10">
        {prev ? (
          <Link
            href={`/lessons/${prev.lesson}`}
            className="rounded-xl border border-black/10 px-3 py-2 text-brand hover:border-brand dark:border-white/15"
          >
            ← L{prev.lesson} {lang === "vi" ? prev.titleVi : prev.titleEn}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/lessons/${next.lesson}`}
            className="rounded-xl border border-black/10 px-3 py-2 text-brand hover:border-brand dark:border-white/15"
          >
            L{next.lesson} {lang === "vi" ? next.titleVi : next.titleEn} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

function SectionHeading({
  emoji,
  title,
  count,
}: {
  emoji: string;
  title: string;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg">{emoji}</span>
      <h2 className="text-base font-bold">{title}</h2>
      {count !== undefined && (
        <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs text-slate-500 dark:bg-white/10">
          {count}
        </span>
      )}
    </div>
  );
}
