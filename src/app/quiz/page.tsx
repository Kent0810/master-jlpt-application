"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as wanakana from "wanakana";
import { buildQueue, countDue, type DeckKind } from "@/lib/study/deck";
import {
  buildQuiz,
  checkTyping,
  type QuizMode,
  type QuizQuestion,
} from "@/lib/quiz/generate";
import { reviewItem } from "@/lib/db/db";
import { AudioButton } from "@/components/AudioButton";
import { AdSlot } from "@/components/ads/AdSlot";

type Phase = "pick" | "playing" | "done";
type SessionSize = 10 | 20 | 50 | "all";

const MODES: { mode: QuizMode; label: string; hint: string }[] = [
  { mode: "meaning", label: "Meaning → Word", hint: "Pick the word for a meaning" },
  { mode: "reading", label: "Word → Reading", hint: "Pick the correct reading" },
  { mode: "typing", label: "Typing", hint: "Type the reading (romaji or kana)" },
  { mode: "listening", label: "Listening", hint: "Hear it, pick the word" },
];

const SESSION_SIZES: SessionSize[] = [10, 20, 50, "all"];

function deckKindFor(mode: QuizMode): DeckKind {
  return mode === "typing" ? "vocab" : "all";
}

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("pick");
  const [mode, setMode] = useState<QuizMode>("meaning");
  const [sessionSize, setSessionSize] = useState<SessionSize>(10);
  const [dueCounts, setDueCounts] = useState<Partial<Record<QuizMode, number>>>({});
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<null | { correct: boolean }>(null);

  useEffect(() => {
    if (phase !== "pick") return;
    let alive = true;
    (async () => {
      const [all, vocabOnly] = await Promise.all([
        countDue({ kind: "all" }),
        countDue({ kind: "vocab" }),
      ]);
      if (alive) {
        setDueCounts({
          meaning: all,
          reading: all,
          listening: all,
          typing: vocabOnly,
        });
      }
    })();
    return () => {
      alive = false;
    };
  }, [phase]);

  async function start(m: QuizMode) {
    const pool = await buildQueue({ kind: deckKindFor(m), limit: Infinity });
    const count = sessionSize === "all" ? pool.length : sessionSize;
    const built = buildQuiz(pool, m, count);
    setMode(m);
    if (built.length === 0) {
      setQuestions([]);
      setPhase("done");
      return;
    }
    setQuestions(built);
    setIndex(0);
    setScore(0);
    setAnswered(null);
    setPhase("playing");
  }

  async function resolve(correct: boolean, itemId: string) {
    setAnswered({ correct });
    if (correct) setScore((s) => s + 1);
    await reviewItem(itemId, correct ? "good" : "again");
  }

  function next() {
    setAnswered(null);
    if (index + 1 >= questions.length) setPhase("done");
    else setIndex((i) => i + 1);
  }

  useEffect(() => {
    if (phase !== "playing") return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPhase("pick");
      } else if ((e.key === " " || e.key === "Enter") && answered) {
        e.preventDefault();
        next();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, answered, index, questions.length]);

  if (phase === "pick") {
    return (
      <div className="space-y-4">
        <Link href="/practice" className="text-sm text-brand">
          ← Practice
        </Link>
        <h1 className="text-2xl font-bold">Quiz</h1>
        <p className="text-slate-500">
          Wrong answers come back sooner in your flashcards.
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Session size</span>
          <div className="inline-flex overflow-hidden rounded-full border border-black/10 dark:border-white/15">
            {SESSION_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => setSessionSize(n)}
                className={`px-3 py-1 font-medium ${
                  sessionSize === n ? "bg-brand text-white" : ""
                }`}
              >
                {n === "all" ? "All due" : n}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {MODES.map((m) => (
            <button
              key={m.mode}
              onClick={() => start(m.mode)}
              className="rounded-2xl border border-black/10 p-5 text-left transition-colors hover:border-brand dark:border-white/10"
            >
              <div className="font-semibold">{m.label}</div>
              <div className="text-sm text-slate-500">{m.hint}</div>
              <div className="mt-1 text-xs text-slate-400">
                {dueCounts[m.mode] ?? "…"} due
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="space-y-6 py-12 text-center">
        <div className="text-5xl">
          {questions.length === 0 ? "📭" : score >= questions.length * 0.8 ? "🏆" : "📓"}
        </div>
        <h1 className="text-2xl font-bold">
          {questions.length > 0 ? `${score} / ${questions.length}` : "Nothing due"}
        </h1>
        <p className="text-slate-500">
          {questions.length > 0
            ? `${Math.round((score / questions.length) * 100)}% correct`
            : "No cards are due for this mode right now."}
        </p>
        <button
          onClick={() => setPhase("pick")}
          className="rounded-2xl bg-brand px-6 py-3 font-semibold text-white"
        >
          New quiz
        </button>
        <div className="mx-auto max-w-sm pt-2">
          <AdSlot placement="sessionDone" />
        </div>
      </div>
    );
  }

  const q = questions[index];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <button onClick={() => setPhase("pick")}>✕ End (Esc)</button>
        <span>
          {index + 1} / {questions.length} · Score {score}
        </span>
      </div>

      <QuestionView
        question={q}
        answered={answered}
        onResolve={(correct) => resolve(correct, q.itemId)}
      />

      {answered && (
        <button
          onClick={next}
          className="w-full rounded-2xl bg-brand py-3 font-semibold text-white"
        >
          {index + 1 >= questions.length ? "See results" : "Next (Space)"}
        </button>
      )}
    </div>
  );
}

function QuestionView({
  question,
  answered,
  onResolve,
}: {
  question: QuizQuestion;
  answered: null | { correct: boolean };
  onResolve: (correct: boolean) => void;
}) {
  if (question.mode === "typing") {
    return (
      <TypingQuestion
        question={question}
        answered={answered}
        onResolve={onResolve}
      />
    );
  }
  return (
    <ChoiceQuestion
      question={question}
      answered={answered}
      onResolve={onResolve}
    />
  );
}

function ChoiceQuestion({
  question,
  answered,
  onResolve,
}: {
  question: QuizQuestion;
  answered: null | { correct: boolean };
  onResolve: (correct: boolean) => void;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const isListening = question.mode === "listening";

  useEffect(() => {
    setPicked(null);
  }, [question]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (answered) return;
      const idx = ["1", "2", "3", "4"].indexOf(e.key);
      if (idx === -1) return;
      const opt = question.options?.[idx];
      if (!opt) return;
      e.preventDefault();
      setPicked(opt);
      onResolve(opt === question.answer);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [answered, question, onResolve]);

  return (
    <div className="space-y-4">
      <div className="flex min-h-[120px] flex-col items-center justify-center gap-3 rounded-3xl border border-black/10 p-6 text-center dark:border-white/10">
        {isListening ? (
          <AudioButton
            text={question.prompt}
            label="Play the word"
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand text-3xl text-white"
          />
        ) : (
          <span className="font-jp text-3xl">{question.prompt}</span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        {question.options!.map((opt, i) => {
          const isAnswer = opt === question.answer;
          const isPicked = opt === picked;
          let cls = "border-black/10 dark:border-white/10 hover:border-brand";
          if (answered) {
            if (isAnswer) cls = "border-emerald-500 bg-emerald-500/10";
            else if (isPicked) cls = "border-rose-500 bg-rose-500/10";
            else cls = "border-black/10 opacity-60 dark:border-white/10";
          }
          return (
            <button
              key={opt}
              disabled={!!answered}
              onClick={() => {
                setPicked(opt);
                onResolve(isAnswer);
              }}
              className={`flex items-center gap-3 rounded-2xl border p-4 text-center font-jp text-xl transition-colors ${cls}`}
            >
              <span className="text-xs font-sans font-normal opacity-50">{i + 1}</span>
              <span className="flex-1">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TypingQuestion({
  question,
  answered,
  onResolve,
}: {
  question: QuizQuestion;
  answered: null | { correct: boolean };
  onResolve: (correct: boolean) => void;
}) {
  const [value, setValue] = useState("");
  const kanaPreview = wanakana.toHiragana(value.trim().toLowerCase());

  useEffect(() => {
    setValue("");
  }, [question]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (answered) return;
    onResolve(checkTyping(value, question.answer));
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-3xl border border-black/10 p-6 text-center dark:border-white/10">
        <span className="font-jp text-4xl">{question.prompt}</span>
        <span className="text-sm text-slate-500">Type the reading</span>
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!!answered}
        autoFocus
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        placeholder="taberu → たべる"
        className="w-full rounded-2xl border border-black/10 bg-transparent p-4 text-center font-jp text-2xl outline-none focus:border-brand dark:border-white/15"
      />
      {!answered && kanaPreview && kanaPreview !== value.trim().toLowerCase() && (
        <p className="text-center font-jp text-lg text-slate-500">{kanaPreview}</p>
      )}
      {answered ? (
        <p
          className={`text-center text-lg font-semibold ${
            answered.correct ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {answered.correct ? "Correct!" : `Answer: ${question.answer}`}
        </p>
      ) : (
        <button
          type="submit"
          className="w-full rounded-2xl bg-brand py-3 font-semibold text-white"
        >
          Check
        </button>
      )}
    </form>
  );
}
