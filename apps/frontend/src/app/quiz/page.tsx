"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as wanakana from "wanakana";
import { buildQueue, countDue, type DeckKind } from "@/lib/study/deck";
import {
  buildQuiz,
  isQuestionCorrect,
  type QuizMode,
  type QuizQuestion,
} from "@/lib/quiz/generate";
import { reviewItem } from "@/lib/db/db";
import { AudioButton } from "@/components/AudioButton";
import { AdSlot } from "@/components/ads/AdSlot";

type Phase = "pick" | "playing" | "done";
type SessionSize = 10 | 20 | 50 | "all";
type GradedQuestion = {
  question: QuizQuestion;
  response: string;
  correct: boolean;
};
type ExamResults = { score: number; graded: GradedQuestion[] };

const MODES: { mode: QuizMode; label: string; hint: string }[] = [
  {
    mode: "meaning",
    label: "Meaning → Word",
    hint: "Pick the word for a meaning",
  },
  {
    mode: "reading",
    label: "Word → Reading",
    hint: "Pick the correct reading",
  },
  {
    mode: "typing",
    label: "Typing",
    hint: "Type the reading (romaji or kana)",
  },
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
  const [dueCounts, setDueCounts] = useState<Partial<Record<QuizMode, number>>>(
    {},
  );
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [results, setResults] = useState<ExamResults | null>(null);

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
    setQuestions(built);
    setResponses({});
    setResults(null);
    setPhase(built.length === 0 ? "done" : "playing");
  }

  function setResponse(itemId: string, value: string) {
    setResponses((r) => ({ ...r, [itemId]: value }));
  }

  async function submit() {
    const graded: GradedQuestion[] = questions.map((q) => {
      const response = responses[q.itemId] ?? "";
      return { question: q, response, correct: isQuestionCorrect(q, response) };
    });
    const score = graded.filter((g) => g.correct).length;
    await Promise.all(
      graded.map((g) =>
        reviewItem(g.question.itemId, g.correct ? "good" : "again"),
      ),
    );
    setResults({ score, graded });
    setPhase("done");
  }

  useEffect(() => {
    if (phase !== "playing") return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setPhase("pick");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase]);

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
    const graded = results?.graded ?? [];
    const score = results?.score ?? 0;
    return (
      <div className="space-y-6 py-8">
        <div className="space-y-4 text-center">
          <div className="text-5xl">
            {graded.length === 0
              ? "📭"
              : score >= graded.length * 0.8
                ? "🏆"
                : "📓"}
          </div>
          <h1 className="text-2xl font-bold">
            {graded.length > 0 ? `${score} / ${graded.length}` : "Nothing due"}
          </h1>
          <p className="text-slate-500">
            {graded.length > 0
              ? `${Math.round((score / graded.length) * 100)}% correct`
              : "No cards are due for this mode right now."}
          </p>
          <button
            onClick={() => setPhase("pick")}
            className="rounded-2xl bg-brand px-6 py-3 font-semibold text-white"
          >
            New quiz
          </button>
        </div>

        {graded.length > 0 && (
          <div className="space-y-4">
            {graded.map((g, i) => (
              <ReviewQuestion key={g.question.itemId} index={i} graded={g} />
            ))}
          </div>
        )}

        <div className="mx-auto max-w-sm pt-2">
          <AdSlot placement="sessionDone" />
        </div>
      </div>
    );
  }

  const answeredCount = questions.filter(
    (question) => (responses[question.itemId] ?? "").length > 0,
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <button onClick={() => setPhase("pick")}>✕ End (Esc)</button>
        <span>
          {answeredCount} / {questions.length} answered
        </span>
      </div>

      <div className="space-y-6">
        {questions.map((question, i) => (
          <AnsweringQuestion
            key={question.itemId}
            index={i}
            question={question}
            value={responses[question.itemId] ?? ""}
            onChange={(value) => setResponse(question.itemId, value)}
          />
        ))}
      </div>

      <button
        onClick={submit}
        className="w-full rounded-2xl bg-brand py-3 font-semibold text-white"
      >
        Submit exam ({answeredCount}/{questions.length} answered)
      </button>
    </div>
  );
}

function AnsweringQuestion({
  index,
  question,
  value,
  onChange,
}: {
  index: number;
  question: QuizQuestion;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3 rounded-3xl border border-black/10 p-5 dark:border-white/10">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Question {index + 1}
      </div>
      {question.mode === "typing" ? (
        <AnsweringTyping
          question={question}
          value={value}
          onChange={onChange}
        />
      ) : (
        <AnsweringChoice
          question={question}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

function AnsweringChoice({
  question,
  value,
  onChange,
}: {
  question: QuizQuestion;
  value: string;
  onChange: (value: string) => void;
}) {
  const isListening = question.mode === "listening";
  return (
    <div className="space-y-4">
      <div className="flex min-h-[100px] flex-col items-center justify-center gap-3 rounded-2xl bg-black/[0.02] p-6 text-center dark:bg-white/[0.03]">
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
        {question.options!.map((opt, i) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex items-center gap-3 rounded-2xl border p-4 text-center font-jp text-xl transition-colors ${
              value === opt
                ? "border-brand bg-brand/10"
                : "border-black/10 hover:border-brand dark:border-white/10"
            }`}
          >
            <span className="text-xs font-sans font-normal opacity-50">
              {i + 1}
            </span>
            <span className="flex-1">{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AnsweringTyping({
  question,
  value,
  onChange,
}: {
  question: QuizQuestion;
  value: string;
  onChange: (value: string) => void;
}) {
  const kanaPreview = wanakana.toHiragana(value.trim().toLowerCase());
  return (
    <div className="space-y-3">
      <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-2xl bg-black/[0.02] p-6 text-center dark:bg-white/[0.03]">
        <span className="font-jp text-4xl">{question.prompt}</span>
        <span className="text-sm text-slate-500">Type the reading</span>
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        placeholder="taberu → たべる"
        className="w-full rounded-2xl border border-black/10 bg-transparent p-4 text-center font-jp text-2xl outline-none focus:border-brand dark:border-white/15"
      />
      {kanaPreview && kanaPreview !== value.trim().toLowerCase() && (
        <p className="text-center font-jp text-lg text-slate-500">
          {kanaPreview}
        </p>
      )}
    </div>
  );
}

function ReviewQuestion({
  index,
  graded,
}: {
  index: number;
  graded: GradedQuestion;
}) {
  const { question, response, correct } = graded;
  return (
    <div className="space-y-3 rounded-3xl border border-black/10 p-5 dark:border-white/10">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400">
        <span>Question {index + 1}</span>
        <span className={correct ? "text-emerald-500" : "text-rose-500"}>
          {correct ? "Correct" : "Incorrect"}
        </span>
      </div>

      {question.mode === "listening" ? (
        <AudioButton
          text={question.prompt}
          label="Play the word"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xl text-white"
        />
      ) : (
        <span className="font-jp text-2xl">{question.prompt}</span>
      )}

      {question.mode === "typing" ? (
        <div className="space-y-1 text-lg">
          <p className={correct ? "text-emerald-500" : "text-rose-500"}>
            Your answer:{" "}
            <span className="font-jp">{response || "(blank)"}</span>
          </p>
          {!correct && (
            <p className="text-slate-500">
              Correct: <span className="font-jp">{question.answer}</span>
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {question.options!.map((opt) => {
            const isAnswer = opt === question.answer;
            const isPicked = opt === response;
            let cls = "border-black/10 opacity-60 dark:border-white/10";
            if (isAnswer) cls = "border-emerald-500 bg-emerald-500/10";
            else if (isPicked) cls = "border-rose-500 bg-rose-500/10";
            return (
              <div
                key={opt}
                className={`rounded-2xl border p-3 text-center font-jp text-lg ${cls}`}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
