"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LESSON_META, type LessonMeta } from "@/lib/lessons/lessons";
import { getLessonHero, lessonImageSrc } from "@/lib/lessonImages";
import { getGrammarByLesson, getVocabByLesson } from "@/lib/data";
import { lessonAccent, accentTint } from "@/lib/lessonAccents";
import { useT, useLang } from "@/lib/i18n";

const CHAPTER_SIZE = 5;

// Persisted open/closed state per chapter — same localStorage pattern as
// CollapsibleSection, but the header here is a capsule on the journey spine
// rather than a boxed section.
function useStoredOpen(storageKey: string, defaultOpen: boolean) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw !== null) setOpen(raw === "1");
    } catch {
      /* ignore */
    }
    // Only read the persisted value once on mount for this key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () =>
    setOpen((o) => {
      const next = !o;
      try {
        localStorage.setItem(storageKey, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });

  return [open, toggle] as const;
}

export function LessonJourney() {
  const chapters: LessonMeta[][] = [];
  for (let i = 0; i < LESSON_META.length; i += CHAPTER_SIZE) {
    chapters.push(LESSON_META.slice(i, i + CHAPTER_SIZE));
  }

  return (
    <div className="relative">
      {/* spine: left rail on mobile, centered on desktop */}
      <div
        aria-hidden
        className="absolute bottom-4 left-7 top-4 -ml-px border-l-2 border-dashed border-black/15 dark:border-white/15 sm:left-1/2"
      />
      <div className="space-y-4 sm:space-y-5">
        {chapters.map((lessons, i) => (
          <Chapter key={i} index={i} lessons={lessons} />
        ))}
        <div aria-hidden className="relative flex sm:justify-center">
          <span
            className="z-10 ml-[9px] inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-lg shadow-sm dark:border-white/15 sm:ml-0"
            style={{ backgroundColor: "var(--background)" }}
          >
            🏁
          </span>
        </div>
      </div>
    </div>
  );
}

function Chapter({ index, lessons }: { index: number; lessons: LessonMeta[] }) {
  const t = useT();
  const [open, toggle] = useStoredOpen(
    `lessons.chapter.N5.${index}`,
    index === 0,
  );
  const first = lessons[0].lesson;
  const last = lessons[lessons.length - 1].lesson;

  return (
    <section className="space-y-4 sm:space-y-5">
      <div className="relative flex sm:justify-center">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          className="z-10 inline-flex items-center gap-2 rounded-full border border-black/10 py-1.5 pl-2 pr-3 text-sm font-semibold shadow-sm transition-colors hover:border-brand dark:border-white/15"
          style={{ backgroundColor: "var(--background)" }}
        >
          <span aria-hidden className="text-base">
            ⛩️
          </span>
          {t("Lesson")} {first}–{last}
          <span
            aria-hidden
            className={`text-xs text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          >
            ▾
          </span>
        </button>
      </div>
      {open && (
        <ol className="space-y-3 sm:space-y-4">
          {lessons.map((meta) => (
            <JourneyStop key={meta.lesson} meta={meta} />
          ))}
        </ol>
      )}
    </section>
  );
}

function JourneyStop({ meta }: { meta: LessonMeta }) {
  const t = useT();
  const lang = useLang();
  const accent = lessonAccent(meta.lesson);
  const words = getVocabByLesson(meta.lesson).length;
  const points = getGrammarByLesson(meta.lesson).length;
  const hero = getLessonHero(meta.lesson);
  // Zigzag: odd lessons left of the spine, even lessons right (desktop only).
  const cardLeft = meta.lesson % 2 === 1;

  return (
    <li className="relative flex items-center gap-4 sm:grid sm:grid-cols-[1fr_5rem_1fr] sm:gap-0">
      {/* node on the spine */}
      <div className="z-10 shrink-0 sm:col-start-2 sm:row-start-1 sm:justify-self-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border-4 font-jp text-lg font-bold text-white shadow-md"
          style={{ backgroundColor: accent, borderColor: "var(--background)" }}
        >
          {meta.lesson}
        </div>
      </div>

      {/* compact card */}
      <div
        className={`min-w-0 flex-1 sm:row-start-1 ${
          cardLeft ? "sm:col-start-1 sm:pr-2" : "sm:col-start-3 sm:pl-2"
        }`}
      >
        <Link
          href={`/lessons/${meta.lesson}`}
          className="group flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--acc)] hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]"
          style={{ "--acc": accent } as React.CSSProperties}
        >
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl"
            style={{ backgroundColor: accentTint(accent, 0.1) }}
          >
            {hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={lessonImageSrc(hero.file)}
                alt=""
                aria-hidden
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            ) : (
              <span className="font-jp text-sm" style={{ color: accent }}>
                第{meta.lesson}課
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">
              {lang === "vi" ? meta.titleVi : meta.titleEn}
            </p>
            <p className="truncate text-sm text-slate-500">
              {lang === "vi" ? meta.focusVi : meta.focus}
            </p>
            <p className="mt-0.5 flex items-baseline justify-between gap-2 text-xs font-medium text-slate-400">
              <span className="shrink-0">
                {words} {t("words")} · {points} {t("grammar")}
              </span>
              <span
                aria-hidden
                className="inline-block translate-x-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                style={{ color: accent }}
              >
                →
              </span>
            </p>
          </div>
        </Link>
      </div>
    </li>
  );
}
