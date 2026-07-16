"use client";

import { useEffect, useMemo, useState } from "react";
import { accentTint } from "@/lib/lessonAccents";
import { recordQuizResult, starsForScore } from "@/lib/lessons/progress";
import { useT, useLang } from "@/lib/i18n";
import type { ExerciseBlock as ExerciseBlockData } from "@/lib/lessons/blocks";
import {
  buildVocabQuestions,
  authoredToQuestion,
  type ExerciseQuestion,
} from "@/lib/lessons/exercises";
import { SectionHeading } from "./Headings";

export function ExerciseBlock({
  block,
  lesson,
  accent,
}: {
  block: ExerciseBlockData;
  lesson: number;
  accent: string;
}) {
  const t = useT();
  const lang = useLang();

  const questions = useMemo<ExerciseQuestion[]>(() => {
    if (block.source === "authored" && block.items) {
      return block.items.map((it) => authoredToQuestion(it, lang));
    }
    return buildVocabQuestions(block.vocab ?? [], lang, 6);
  }, [block, lang]);

  const title = block.title
    ? lang === "vi"
      ? block.title.vi
      : block.title.en
    : t("Practice");

  if (questions.length === 0) return null;

  return (
    <section className="space-y-3">
      <SectionHeading emoji="✏️" title={title} accent={accent} />
      {/* Remount on language switch so answers reset cleanly. */}
      <Quiz key={lang} questions={questions} lesson={lesson} accent={accent} />
    </section>
  );
}

function Quiz({
  questions,
  lesson,
  accent,
}: {
  questions: ExerciseQuestion[];
  lesson: number;
  accent: string;
}) {
  const t = useT();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const done = Object.keys(answers).length === questions.length;
  const correct = questions.filter((q, i) => answers[i] === q.answer).length;

  // Finishing the quiz marks the lesson complete on the journey map; the map
  // keeps the best star count, so retries can only improve it.
  useEffect(() => {
    if (done) recordQuizResult(lesson, correct, questions.length);
  }, [done, correct, lesson, questions.length]);

  return (
    <div className="space-y-5 rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
      {questions.map((q, qi) => {
        const chosen = answers[qi];
        const answered = chosen !== undefined;
        return (
          <div key={qi} className="space-y-2">
            <div className="flex gap-2.5">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  color: accent,
                  backgroundColor: accentTint(accent, 0.14),
                }}
              >
                {qi + 1}
              </span>
              <div className="min-w-0">
                <p className="font-jp text-base leading-relaxed">{q.prompt}</p>
                {q.reading && (
                  <p className="font-jp text-xs text-slate-400">{q.reading}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const isCorrect = oi === q.answer;
                const isChosen = chosen === oi;
                let state =
                  "border-black/10 hover:border-brand dark:border-white/15";
                if (answered) {
                  if (isCorrect)
                    state =
                      "border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
                  else if (isChosen)
                    state =
                      "border-rose-500/60 bg-rose-500/10 text-rose-700 dark:text-rose-300";
                  else
                    state =
                      "border-black/10 text-slate-400 dark:border-white/10";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={answered}
                    onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                    className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left font-jp text-sm transition-colors ${state}`}
                  >
                    <span>{opt}</span>
                    {answered && isCorrect && <span aria-hidden>✓</span>}
                    {answered && isChosen && !isCorrect && (
                      <span aria-hidden>✗</span>
                    )}
                  </button>
                );
              })}
            </div>
            {answered && q.explanation && (
              <p className="rounded-lg bg-black/[0.03] px-3 py-2 text-xs leading-relaxed text-slate-500 dark:bg-white/[0.04] dark:text-slate-400">
                {q.explanation}
              </p>
            )}
          </div>
        );
      })}
      {done && (
        <div className="flex items-center justify-between border-t border-black/10 pt-3 dark:border-white/10">
          <p className="flex items-center gap-2 text-sm font-semibold">
            {t("Score")}: {correct}/{questions.length}
            <span aria-hidden className="tracking-tight text-amber-400">
              {"★".repeat(starsForScore(correct, questions.length))}
              <span className="text-black/15 dark:text-white/20">
                {"★".repeat(3 - starsForScore(correct, questions.length))}
              </span>
            </span>
          </p>
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="text-xs font-semibold"
            style={{ color: accent }}
          >
            {t("Try again")}
          </button>
        </div>
      )}
    </div>
  );
}
