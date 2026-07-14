"use client";

import Link from "next/link";
import { LESSON_META } from "@/lib/lessons/lessons";
import { getLessonHero, lessonImageSrc } from "@/lib/lessonImages";
import { getGrammarByLesson, getVocabByLesson } from "@/lib/data";
import { LEVELS } from "@/lib/levels";
import { useT, useLang } from "@/lib/i18n";
import { CollapsibleSection } from "@/components/CollapsibleSection";

const LOCKED_LEVELS = LEVELS.filter((l) => !l.available);

export default function LessonsPage() {
  const t = useT();
  const lang = useLang();

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="text-sm text-brand">
        {t("← Home")}
      </Link>
      <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-soft px-6 py-8 text-white shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
          {t("Minna no Nihongo Shokyū Ⅰ")}
        </p>
        <h1 className="mt-1 text-3xl font-bold">{t("Lessons")}</h1>
        <p className="mt-1 max-w-lg text-sm text-white/90">
          {t(
            "Grammar and vocabulary organised like Minna no Nihongo Shokyū Ⅰ, lessons 1–25.",
          )}
        </p>
      </header>

      <CollapsibleSection
        storageKey="lessons.section.N5"
        defaultOpen
        title={
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand">
            <span className="rounded-full bg-brand/10 px-2.5 py-0.5 dark:bg-brand/20">
              N5
            </span>
            {t("Available now")}
          </h2>
        }
      >
        <ul className="grid gap-5 sm:grid-cols-2">
          {LESSON_META.map((l) => {
            const words = getVocabByLesson(l.lesson).length;
            const points = getGrammarByLesson(l.lesson).length;
            const hero = getLessonHero(l.lesson);
            return (
              <li key={l.lesson}>
                <Link
                  href={`/lessons/${l.lesson}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="flex h-32 items-center justify-center bg-gradient-to-br from-brand/10 to-brand-soft/10 dark:from-brand/20 dark:to-brand-soft/10">
                    {hero ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={lessonImageSrc(hero.file)}
                        alt=""
                        aria-hidden
                        className="h-24 w-auto object-contain transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <span className="font-jp text-4xl text-brand/40">
                        第{l.lesson}課
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-5">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-brand dark:bg-brand/20">
                        {t("Lesson")} {l.lesson}
                      </span>
                      <span className="font-jp text-sm text-slate-500">
                        {l.titleJp}
                      </span>
                    </div>
                    <span className="mt-1 text-lg font-bold">
                      {lang === "vi" ? l.titleVi : l.titleEn}
                    </span>
                    <span className="text-sm text-slate-500">
                      {lang === "vi" ? l.focusVi : l.focus}
                    </span>
                    <span className="mt-2 flex items-center gap-1 text-xs font-medium text-slate-400">
                      {words} {t("words")} · {points} {t("grammar")}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </CollapsibleSection>

      {LOCKED_LEVELS.map((level) => (
        <CollapsibleSection
          key={level.level}
          storageKey={`lessons.section.${level.level}`}
          defaultOpen={false}
          title={
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-400">
              <span className="rounded-full bg-black/5 px-2.5 py-0.5 dark:bg-white/10">
                {level.level}
              </span>
              {t("Coming soon")}
            </h2>
          }
        >
          <div className="rounded-3xl border border-dashed border-black/15 p-6 text-center text-sm text-slate-400 dark:border-white/15">
            🔒 {t("Lessons for this level are on the way.")}
          </div>
        </CollapsibleSection>
      ))}
    </div>
  );
}
