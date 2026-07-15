"use client";

import { useLang } from "@/lib/i18n";
import type { LessonBlock } from "@/lib/lessons/blocks";
import { LessonInteractionProvider } from "./LessonInteraction";
import { SectionDivider } from "./Headings";
import { GrammarBlock } from "./GrammarBlock";
import { DialogueBlock } from "./DialogueBlock";
import { VocabBlock } from "./VocabBlock";
import { ExerciseBlock } from "./ExerciseBlock";

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
  return (
    <LessonInteractionProvider>
      <div className="space-y-8">
        {blocks.map((block, i) => {
          const key = `b${i}`;
          switch (block.kind) {
            case "section":
              return (
                <SectionDivider
                  key={key}
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
              return <ExerciseBlock key={key} block={block} accent={accent} />;
          }
        })}
      </div>
    </LessonInteractionProvider>
  );
}
