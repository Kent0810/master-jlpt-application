"use client";

import { useState } from "react";
import type { StudyItem } from "@/lib/study/deck";
import type { Grade } from "@/lib/srs/sm2";
import { AudioButton } from "@/components/AudioButton";
import { Reading } from "@/components/Furigana";

const GRADES: { grade: Grade; label: string; className: string }[] = [
  { grade: "again", label: "Again", className: "bg-rose-500" },
  { grade: "hard", label: "Hard", className: "bg-amber-500" },
  { grade: "good", label: "Good", className: "bg-emerald-500" },
  { grade: "easy", label: "Easy", className: "bg-sky-500" },
];

export function Flashcard({
  item,
  onGrade,
}: {
  item: StudyItem;
  onGrade: (grade: Grade) => void;
}) {
  const [revealed, setRevealed] = useState(false);

  const front =
    item.kind === "kanji" ? item.kanji!.character : item.vocab!.word;
  const audioText =
    item.kind === "kanji"
      ? [...item.kanji!.kunyomi, ...item.kanji!.onyomi][0]?.replace(/-/g, "") ??
        item.kanji!.character
      : item.vocab!.reading;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-3xl border border-black/10 p-8 dark:border-white/10">
        <div className="font-jp text-6xl">{front}</div>

        {revealed && (
          <div className="mt-6 space-y-2 text-center">
            {item.kind === "kanji" ? (
              <>
                <p className="text-xl">{item.kanji!.meanings.join(", ")}</p>
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
                <p className="text-lg">{item.vocab!.meanings.join(", ")}</p>
              </>
            )}
            <div className="pt-2">
              <AudioButton text={audioText} label="Play pronunciation" />
            </div>
          </div>
        )}
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full rounded-2xl bg-brand py-3 font-semibold text-white"
        >
          Show answer
        </button>
      ) : (
        <div className="grid w-full grid-cols-4 gap-2">
          {GRADES.map((g) => (
            <button
              key={g.grade}
              onClick={() => {
                onGrade(g.grade);
                setRevealed(false);
              }}
              className={`rounded-2xl py-3 text-sm font-semibold text-white ${g.className}`}
            >
              {g.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
