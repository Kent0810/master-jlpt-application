"use client";

import { useLang, useT } from "@/lib/i18n";
import type { LessonBlock, SectionBlock } from "@/lib/lessons/blocks";
import { LessonInteractionProvider } from "./LessonInteraction";
import { SectionDivider, splitPartTitle } from "./Headings";
import { GrammarBlock } from "./GrammarBlock";
import { DialogueBlock } from "./DialogueBlock";
import { VocabBlock } from "./VocabBlock";
import { ExerciseBlock } from "./ExerciseBlock";

// Jump list of the lesson's part dividers, linked to their anchors.
function TableOfContents({
  sections,
  accent,
}: {
  sections: SectionBlock[];
  accent: string;
}) {
  const lang = useLang();
  const t = useT();
  return (
    <nav
      aria-label={t("Contents")}
      className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        {t("Contents")}
      </p>
      <ol className="mt-2.5 space-y-2">
        {sections.map((s, si) => {
          const title = lang === "vi" ? s.title.vi : s.title.en;
          const { main } = splitPartTitle(title);
          const target = `part-${si + 1}`;
          return (
            <li key={si}>
              <a
                href={`#${target}`}
                className="group flex items-center gap-2.5"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-sm"
                  style={{ backgroundColor: accent }}
                >
                  {si + 1}
                </span>
                <span className="font-jp text-sm font-semibold group-hover:underline">
                  {main}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Renders a lesson's ordered blocks. All blocks share one tap-to-lookup /
// highlight context so a word card opened in one block closes when you tap in
// another.
export function LessonBlocks({
  blocks,
  lesson,
  accent,
}: {
  blocks: LessonBlock[];
  lesson: number;
  accent: string;
}) {
  const lang = useLang();
  // Part ordinal per block index, for divider anchors (#part-1, #part-2, …).
  const sectionOrdinals = new Map<number, number>();
  const sections: SectionBlock[] = [];
  blocks.forEach((block, i) => {
    if (block.kind === "section") {
      sectionOrdinals.set(i, sections.length);
      sections.push(block);
    }
  });
  return (
    <LessonInteractionProvider>
      <div className="space-y-8">
        {sections.length > 1 && (
          <TableOfContents sections={sections} accent={accent} />
        )}
        {blocks.map((block, i) => {
          const key = `b${i}`;
          switch (block.kind) {
            case "section":
              return (
                <SectionDivider
                  key={key}
                  id={`part-${sectionOrdinals.get(i)! + 1}`}
                  title={lang === "vi" ? block.title.vi : block.title.en}
                  subtitle={
                    block.subtitle
                      ? lang === "vi"
                        ? block.subtitle.vi
                        : block.subtitle.en
                      : undefined
                  }
                  accent={accent}
                />
              );
            case "grammar":
              return <GrammarBlock key={key} block={block} accent={accent} />;
            case "dialogue":
              return (
                <DialogueBlock
                  key={key}
                  block={block}
                  blockKey={key}
                  lesson={lesson}
                  accent={accent}
                />
              );
            case "vocab":
              return <VocabBlock key={key} block={block} accent={accent} />;
            case "exercise":
              return (
                <ExerciseBlock
                  key={key}
                  block={block}
                  lesson={lesson}
                  accent={accent}
                />
              );
          }
        })}
      </div>
    </LessonInteractionProvider>
  );
}
