"use client";

import { useState } from "react";
import { GrammarImage } from "@/components/GrammarImage";
import { accentTint } from "@/lib/lessonAccents";
import {
  useT,
  useLang,
  pickGrammarMeaning,
  pickExampleGloss,
  pickExampleAlign,
  pickGrammarDetail,
} from "@/lib/i18n";
import type { GrammarDetail } from "@/lib/data/types";
import type { GrammarBlock as GrammarBlockData } from "@/lib/lessons/blocks";
import { SectionHeading } from "./Headings";
import { LessonSentence } from "./LessonSentence";
import { WordCardFor } from "./LessonInteraction";

export function GrammarBlock({
  block,
  accent,
}: {
  block: GrammarBlockData;
  accent: string;
}) {
  const t = useT();
  const lang = useLang();
  const title = block.title
    ? lang === "vi"
      ? block.title.vi
      : block.title.en
    : t("Grammar");

  return (
    <section className="space-y-3">
      <SectionHeading
        emoji="📝"
        title={title}
        count={block.items.length}
        accent={accent}
      />
      <ul className="space-y-3">
        {block.items.map((g, gi) => {
          const detail = pickGrammarDetail(g, lang);
          return (
            <li
              key={g.id}
              className="rounded-2xl border border-l-4 border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
              style={{ borderLeftColor: accent }}
            >
              <h3 className="flex items-center gap-2.5 font-jp text-lg font-semibold">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: accent }}
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
              <GrammarImage grammarId={g.id} accent={accent} />
              <ul
                className="mt-3 space-y-2.5 border-l-2 pl-3"
                style={{ borderColor: accentTint(accent, 0.55) }}
              >
                {g.examples.map((ex, i) => {
                  const key = `g:${g.id}:${i}`;
                  return (
                    <li key={i} className="text-sm">
                      <LessonSentence
                        sKey={key}
                        jp={ex.jp}
                        reading={ex.reading}
                        tokens={ex.tokens}
                        romaji={ex.romaji}
                        romajiChunks={ex.romajiChunks}
                        gloss={pickExampleGloss(ex, lang)}
                        alignParts={pickExampleAlign(ex, lang)}
                        sentenceClassName="text-base"
                        translationClassName="mt-0.5 block text-slate-500"
                      />
                      <WordCardFor sKey={key} />
                    </li>
                  );
                })}
              </ul>
              {detail && <GrammarDetailBlock detail={detail} accent={accent} />}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

// Highlights example fragments inside a pitfall string: parenthesized groups
// carrying a ✗ (wrong) or ✓ (right) mark get colored so learners spot the
// error/correct forms at a glance. Handles both half- and full-width parens.
function renderPitfall(text: string) {
  const parts = text.split(/([（(][^）)]*[✗✓][^）)]*[）)])/g);
  return parts.map((part, i) => {
    if (!/[✗✓]/.test(part)) return <span key={i}>{part}</span>;
    const isWrong = part.includes("✗");
    return (
      <span
        key={i}
        className={`rounded px-1 font-medium ${
          isWrong
            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
            : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
        }`}
      >
        {part}
      </span>
    );
  });
}

// Collapsible in-depth explanation under a grammar point: usage paragraphs, a
// formation box, and common-mistake callouts.
function GrammarDetailBlock({
  detail,
  accent,
}: {
  detail: GrammarDetail;
  accent: string;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-xs font-semibold"
        style={{ color: accent }}
      >
        <span
          aria-hidden
          className={`inline-block transition-transform ${open ? "rotate-90" : ""}`}
        >
          ▸
        </span>
        {t("Learn more")}
      </button>
      {open && (
        <div className="mt-2 space-y-3 rounded-xl border border-black/10 bg-white/70 p-3.5 text-sm dark:border-white/10 dark:bg-white/[0.03]">
          <div className="space-y-2 leading-relaxed">
            {detail.explanation.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {detail.formation && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                {t("How it's formed")}
              </p>
              <p
                className="mt-1 whitespace-pre-line rounded-lg px-2.5 py-1.5 font-mono text-xs font-medium leading-relaxed"
                style={{
                  color: accent,
                  backgroundColor: accentTint(accent, 0.1),
                }}
              >
                {detail.formation}
              </p>
            </div>
          )}
          {detail.pitfalls.length > 0 && (
            <div className="rounded-xl border border-amber-300/60 bg-amber-50/80 p-3 dark:border-amber-500/25 dark:bg-amber-500/[0.07]">
              <div className="flex items-center gap-1.5">
                <span aria-hidden className="text-sm leading-none">
                  ⚠️
                </span>
                <p className="text-xs font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                  {t("Watch out")}
                </p>
              </div>
              <ul className="mt-2 space-y-2">
                {detail.pitfalls.map((p, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-200"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500 dark:bg-amber-400"
                    />
                    <span>{renderPitfall(p)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
