"use client";

import { useEffect, useMemo, useState } from "react";
import type { StudyItem } from "@/lib/study/deck";
import { meaningChoices } from "@/lib/quiz/generate";
import { schedule, formatInterval, type Grade } from "@/lib/srs/sm2";
import { AudioButton } from "@/components/AudioButton";
import { StarButton } from "@/components/StarButton";
import { Reading } from "@/components/Furigana";

export type FlashcardMode = "recall" | "choice";

const GRADES: { grade: Grade; label: string; className: string }[] = [
  { grade: "again", label: "Again", className: "bg-rose-500" },
  { grade: "hard", label: "Hard", className: "bg-amber-500" },
  { grade: "good", label: "Good", className: "bg-emerald-500" },
  { grade: "easy", label: "Easy", className: "bg-sky-500" },
];

const GRADE_KEYS: Record<string, Grade> = {
  "1": "again",
  "2": "hard",
  "3": "good",
  "4": "easy",
};

const CARD_FACE_CLASS =
  "flip-card-face flex min-h-[220px] w-full flex-col items-center justify-center rounded-3xl border border-black/10 bg-[var(--background)] p-8 dark:border-white/10";

export function Flashcard({
  item,
  mode,
  alreadyGraded = false,
  onGrade,
}: {
  item: StudyItem;
  mode: FlashcardMode;
  alreadyGraded?: boolean;
  onGrade: (grade: Grade) => void;
}) {
  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  const showBack = revealed || alreadyGraded;

  const front =
    item.kind === "kanji" ? item.kanji!.character : item.vocab!.word;
  const audioText =
    item.kind === "kanji"
      ? ([...item.kanji!.kunyomi, ...item.kanji!.onyomi][0]?.replace(
          /-/g,
          "",
        ) ?? item.kanji!.character)
      : item.vocab!.reading;

  const choices = useMemo(() => {
    if (mode !== "choice") return null;
    return meaningChoices(item);
  }, [item, mode]);

  const previews = useMemo(() => {
    const now = new Date();
    const out = {} as Record<Grade, string>;
    for (const g of GRADES) {
      out[g.grade] = formatInterval(
        schedule(item.srs, g.grade, now).intervalDays,
      );
    }
    return out;
  }, [item]);

  useEffect(() => {
    setRevealed(false);
    setPicked(null);
  }, [item]);

  function pick(option: string) {
    if (alreadyGraded) return;
    setPicked(option);
    setRevealed(true);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (alreadyGraded) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (!revealed) {
        if (mode === "recall") {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            setRevealed(true);
          }
          return;
        }
        const idx = ["1", "2", "3", "4"].indexOf(e.key);
        const opt = idx !== -1 ? choices?.options[idx] : undefined;
        if (!opt) return;
        e.preventDefault();
        pick(opt);
        return;
      }
      const grade = GRADE_KEYS[e.key];
      if (grade) {
        e.preventDefault();
        onGrade(grade);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [revealed, onGrade, mode, choices, alreadyGraded]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className={`flip-card relative w-full ${showBack ? "is-flipped" : ""}`}
      >
        <div className="absolute right-2 top-2 z-10">
          <StarButton itemId={item.id} />
        </div>
        <div className="flip-card-inner min-h-[220px]">
          <div className={CARD_FACE_CLASS}>
            <div className="font-jp text-6xl">{front}</div>
          </div>

          <div className={`${CARD_FACE_CLASS} flip-card-back`}>
            <div className="font-jp text-4xl">{front}</div>
            <div className="mt-4 space-y-2 text-center">
              {item.kind === "kanji" ? (
                <>
                  {mode === "recall" && (
                    <p className="text-xl">{item.kanji!.meanings.join(", ")}</p>
                  )}
                  <p className="font-jp text-slate-500">
                    {item.kanji!.kunyomi.join("・") || "—"}
                  </p>
                  <p className="font-jp text-slate-500">
                    {item.kanji!.onyomi.join("・") || "—"}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-jp text-2xl">
                    <Reading
                      word={item.vocab!.word}
                      reading={item.vocab!.reading}
                      romaji={item.vocab!.romaji}
                    />
                  </p>
                  {mode === "recall" && (
                    <p className="text-lg">{item.vocab!.meanings.join(", ")}</p>
                  )}
                </>
              )}
              <div className="pt-2">
                <AudioButton text={audioText} label="Play pronunciation" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {mode === "choice" && choices && (
        <div className="grid w-full grid-cols-1 gap-2">
          {choices.options.map((opt, i) => {
            const isAnswer = opt === choices.answer;
            const isPicked = opt === picked;
            let cls = "border-black/10 dark:border-white/10 hover:border-brand";
            if (showBack) {
              if (isAnswer) cls = "border-emerald-500 bg-emerald-500/10";
              else if (isPicked) cls = "border-rose-500 bg-rose-500/10";
              else cls = "border-black/10 opacity-60 dark:border-white/10";
            }
            return (
              <button
                key={opt}
                disabled={showBack}
                onClick={() => pick(opt)}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${cls}`}
              >
                <span className="text-xs font-normal opacity-50">{i + 1}</span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>
      )}

      {mode === "recall" && !showBack && (
        <button
          onClick={() => setRevealed(true)}
          className="w-full rounded-2xl bg-brand py-3 font-semibold text-white"
        >
          Show answer <span className="text-xs opacity-70">(Space)</span>
        </button>
      )}

      {alreadyGraded ? (
        <div className="rounded-2xl bg-black/5 px-4 py-2 text-sm font-semibold text-slate-500 dark:bg-white/10">
          ✓ Graded
        </div>
      ) : (
        showBack && (
          <div className="grid w-full grid-cols-4 gap-2">
            {GRADES.map((g, i) => (
              <button
                key={g.grade}
                onClick={() => onGrade(g.grade)}
                className={`flex flex-col items-center rounded-2xl py-3 text-sm font-semibold text-white ${g.className}`}
              >
                <span>{g.label}</span>
                <span className="text-[10px] font-normal opacity-80">
                  {previews[g.grade]}
                </span>
                <span className="text-[10px] font-normal opacity-60">
                  {i + 1}
                </span>
              </button>
            ))}
          </div>
        )
      )}
    </div>
  );
}
