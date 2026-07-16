"use client";

import Link from "next/link";
import { Reading } from "@/components/Furigana";
import { useT, useLang, pickMeanings } from "@/lib/i18n";
import type { VocabBlock as VocabBlockData } from "@/lib/lessons/blocks";
import { SectionHeading } from "./Headings";

export function VocabBlock({
  block,
  accent,
}: {
  block: VocabBlockData;
  accent: string;
}) {
  const t = useT();
  const lang = useLang();
  const title = block.title
    ? lang === "vi"
      ? block.title.vi
      : block.title.en
    : t("Vocabulary");

  return (
    <section className="space-y-3">
      <SectionHeading
        emoji="🗂️"
        title={title}
        count={block.items.length}
        accent={accent}
      />
      <ul className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
        {block.items.map((v, i) => (
          <li
            key={v.id}
            className={i % 2 ? "bg-black/[0.015] dark:bg-white/[0.02]" : ""}
          >
            <Link
              href={`/vocab/${encodeURIComponent(v.word)}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-brand/5"
            >
              <span className="min-w-0 flex-1 text-base">
                <Reading word={v.word} reading={v.reading} romaji={v.romaji} />
              </span>
              <span className="min-w-0 max-w-[45%] shrink truncate text-right text-sm text-slate-500">
                {pickMeanings(v, lang)[0]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
