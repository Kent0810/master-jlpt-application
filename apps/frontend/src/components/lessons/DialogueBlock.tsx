"use client";

import { Sentence } from "@/components/Sentence";
import { lessonAccent, accentTint } from "@/lib/lessonAccents";
import { useT, useLang } from "@/lib/i18n";
import type { Language } from "@/lib/settings/SettingsProvider";
import type { DialogueLine } from "@/lib/lessons/lessons";
import type { DialogueBlock as DialogueBlockData } from "@/lib/lessons/blocks";
import { SectionHeading } from "./Headings";
import { LessonSentence } from "./LessonSentence";
import { WordCardFor, useSentenceLink } from "./LessonInteraction";

function gloss(line: DialogueLine, lang: Language): string {
  return lang === "vi" ? line.vi : line.en;
}
function align(line: DialogueLine, lang: Language) {
  return lang === "vi" ? line.alignVi : line.alignEn;
}

export function DialogueBlock({
  block,
  blockKey,
  lesson,
  accent,
}: {
  block: DialogueBlockData;
  blockKey: string;
  lesson: number;
  accent: string;
}) {
  const t = useT();
  const lang = useLang();

  const defaultTitle =
    block.style === "paragraph"
      ? t("読み物 · Reading")
      : block.style === "qa"
        ? t("Q&A")
        : t("会話 · Dialogue");
  const title = block.title
    ? lang === "vi"
      ? block.title.vi
      : block.title.en
    : defaultTitle;

  return (
    <section className="space-y-3">
      <SectionHeading emoji="💬" title={title} accent={accent} />
      {block.style === "paragraph" ? (
        <Paragraph lines={block.lines} blockKey={blockKey} lang={lang} />
      ) : block.style === "qa" ? (
        <QA
          lines={block.lines}
          blockKey={blockKey}
          lang={lang}
          accent={accent}
        />
      ) : (
        <Conversational
          lines={block.lines}
          blockKey={blockKey}
          lesson={lesson}
          accent={accent}
          lang={lang}
        />
      )}
    </section>
  );
}

// ── Conversational: chat bubbles alternating by speaker ──────────────────────
function Conversational({
  lines,
  blockKey,
  lesson,
  accent,
  lang,
}: {
  lines: DialogueLine[];
  blockKey: string;
  lesson: number;
  accent: string;
  lang: Language;
}) {
  const firstSp = lines[0]?.sp;
  const replyColor = lessonAccent(lesson + 3);
  return (
    <div className="space-y-4 rounded-2xl border border-black/10 bg-[#faf7ee] p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
      {lines.map((line, i) => {
        const key = `${blockKey}:${i}`;
        const isReply = line.sp !== firstSp;
        const speakerColor = isReply ? replyColor : accent;
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
                <LessonSentence
                  sKey={key}
                  jp={line.jp}
                  reading={line.reading}
                  tokens={line.tokens}
                  romaji={line.romaji}
                  romajiChunks={line.romajiChunks}
                  gloss={gloss(line, lang)}
                  alignParts={align(line, lang)}
                  sentenceClassName="text-base leading-loose"
                  translationClassName="mt-1 block text-xs text-slate-500 dark:text-slate-400"
                />
              </div>
              <WordCardFor sKey={key} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Q&A: question rows with indented answers ─────────────────────────────────
function QA({
  lines,
  blockKey,
  lang,
  accent,
}: {
  lines: DialogueLine[];
  blockKey: string;
  lang: Language;
  accent: string;
}) {
  return (
    <div className="space-y-3 rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-5">
      {lines.map((line, i) => {
        const key = `${blockKey}:${i}`;
        const isAnswer = (line.sp || "").toUpperCase() === "A";
        return (
          <div key={i} className={`flex gap-3 ${isAnswer ? "sm:pl-8" : ""}`}>
            <span
              aria-hidden
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
              style={
                isAnswer
                  ? { color: accent, backgroundColor: accentTint(accent, 0.14) }
                  : { color: "white", backgroundColor: accent }
              }
            >
              {line.sp}
            </span>
            <div className="min-w-0 flex-1">
              <LessonSentence
                sKey={key}
                jp={line.jp}
                reading={line.reading}
                tokens={line.tokens}
                romaji={line.romaji}
                romajiChunks={line.romajiChunks}
                gloss={gloss(line, lang)}
                alignParts={align(line, lang)}
                sentenceClassName="text-base"
                translationClassName="mt-0.5 block text-sm text-slate-500 dark:text-slate-400"
              />
              <WordCardFor sKey={key} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Paragraph: a flowing reading passage (読み物) ──────────────────────────────
function Paragraph({
  lines,
  blockKey,
  lang,
}: {
  lines: DialogueLine[];
  blockKey: string;
  lang: Language;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-[#faf7ee] p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-6">
      <p className="font-jp text-base leading-loose">
        {lines.map((line, i) => (
          <ParagraphSentence key={i} sKey={`${blockKey}:${i}`} line={line} />
        ))}
      </p>
      {/* Lookup card sits right under the Japanese it belongs to, not below the
          whole block. Only the selected line's card renders. */}
      {lines.map((_, i) => (
        <WordCardFor key={i} sKey={`${blockKey}:${i}`} />
      ))}
      <p className="mt-3 border-t border-black/5 pt-3 text-sm leading-relaxed text-slate-500 dark:border-white/10 dark:text-slate-400">
        {lines.map((line) => gloss(line, lang)).join(" ")}
      </p>
    </div>
  );
}

function ParagraphSentence({
  sKey,
  line,
}: {
  sKey: string;
  line: DialogueLine;
}) {
  const link = useSentenceLink(sKey);
  return (
    <Sentence
      jp={line.jp}
      reading={line.reading}
      tokens={line.tokens}
      romaji={line.romaji}
      romajiChunks={line.romajiChunks}
      className="mr-1 inline"
      onWordSelect={link.onWordSelect}
      selectedWord={link.selectedWord}
      onWordHover={link.onWordHover}
      highlightIndex={link.highlightIndex}
    />
  );
}
