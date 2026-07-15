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
import type { GrammarDetail } from "@/lib/data/types";
import { Reading } from "@/components/Furigana";
import { Sentence } from "@/components/Sentence";
import { AlignedTranslation } from "@/components/AlignedTranslation";
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
  pickExampleAlign,
  pickGrammarDetail,
} from "@/lib/i18n";

export default function LessonDetailPage() {
  const params = useParams<{ n: string }>();
  const lesson = Number(params.n);
  const content = getLessonContent(lesson);
  const dialogue = getDialogue(lesson);
  const t = useT();
  const lang = useLang();
  // Word selection (tap → lookup card) and hover, keyed per sentence:
  // "d:{lineIdx}" for dialogue lines, "g:{grammarIdx}:{exampleIdx}" for
  // grammar examples. `token` links the word to its translation span.
  const [selected, setSelected] = useState<{
    key: string;
    word: string;
    token: number;
  } | null>(null);
  const [hovered, setHovered] = useState<{
    key: string;
    token: number;
  } | null>(null);
  if (!content) return notFound();

  // The token index to tint in a given sentence and its translation — the
  // hovered word wins, otherwise the tapped selection stays lit.
  const linkFor = (key: string) =>
    hovered?.key === key
      ? hovered.token
      : selected?.key === key
        ? selected.token
        : null;
  const hoverFor = (key: string) => (token: number | null) =>
    setHovered(token === null ? null : { key, token });

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
            {grammar.map((g, gi) => {
              const detail = pickGrammarDetail(g, lang);
              return (
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
                    {g.examples.map((ex, i) => {
                      const key = `g:${gi}:${i}`;
                      return (
                        <li key={i} className="text-sm">
                          <Sentence
                            jp={ex.jp}
                            reading={ex.reading}
                            tokens={ex.tokens}
                            romaji={ex.romaji}
                            className="text-base"
                            onWordSelect={(word, token) =>
                              setSelected({ key, word, token })
                            }
                            selectedWord={
                              selected?.key === key ? selected.word : null
                            }
                            onWordHover={hoverFor(key)}
                            highlightIndex={linkFor(key)}
                          />
                          <AlignedTranslation
                            text={pickExampleGloss(ex, lang)}
                            parts={pickExampleAlign(ex, lang)}
                            highlightIndex={linkFor(key)}
                            onWordHover={hoverFor(key)}
                            className="mt-0.5 block text-slate-500"
                          />
                          {selected?.key === key && (
                            <WordLookupCard
                              word={selected.word}
                              onClose={() => setSelected(null)}
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  {detail && (
                    <GrammarDetailBlock detail={detail} accent={accent} />
                  )}
                </li>
              );
            })}
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
              const key = `d:${i}`;
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
                        onWordSelect={(word, token) =>
                          setSelected({ key, word, token })
                        }
                        selectedWord={
                          selected?.key === key ? selected.word : null
                        }
                        onWordHover={hoverFor(key)}
                        highlightIndex={linkFor(key)}
                      />
                      <AlignedTranslation
                        text={lang === "vi" ? line.vi : line.en}
                        parts={lang === "vi" ? line.alignVi : line.alignEn}
                        highlightIndex={linkFor(key)}
                        onWordHover={hoverFor(key)}
                        className="mt-1 block text-xs text-slate-500 dark:text-slate-400"
                      />
                    </div>
                    {selected?.key === key && (
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

// Highlights example fragments inside a pitfall string: parenthesized groups
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

// Collapsible in-depth explanation under a grammar point: usage paragraphs,
// a formation box, and common-mistake callouts.
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
