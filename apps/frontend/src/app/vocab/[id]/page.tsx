"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { getVocab, getKanjiByChar } from "@/lib/data";
import { AudioButton } from "@/components/AudioButton";
import { StarButton } from "@/components/StarButton";
import { AddToListButton } from "@/components/AddToListButton";
import { StatusBadge } from "@/components/StatusBadge";
import { Furigana, Reading } from "@/components/Furigana";
import { WordImage } from "@/components/WordImage";
import { useStudyState } from "@/lib/db/hooks";
import { useLang, pickMeanings } from "@/lib/i18n";

const POS_LABEL: Record<string, string> = {
  noun: "Noun",
  "godan-verb": "Godan verb (u-verb)",
  "ichidan-verb": "Ichidan verb (ru-verb)",
  "irregular-verb": "Irregular verb",
  "i-adjective": "い-adjective",
  "na-adjective": "な-adjective",
  adverb: "Adverb",
  expression: "Expression",
  unknown: "—",
};

export default function VocabDetailPage() {
  const params = useParams<{ id: string }>();
  const word = decodeURIComponent(params.id);
  const vocab = getVocab().find((v) => v.word === word);

  const state = useStudyState(vocab?.id ?? "");
  const lang = useLang();

  if (!vocab) return notFound();

  const relatedKanji = Array.from(new Set(vocab.word.split("")))
    .map((ch) => getKanjiByChar(ch))
    .filter((k): k is NonNullable<typeof k> => Boolean(k));

  // Long set-phrase entries (e.g. ［どうぞ］よろしく［お願いします］。) look cramped
  // at the display size used for single words, so scale the headline down.
  const wordLen = vocab.word.length;
  const wordSize =
    wordLen > 12 ? "text-2xl" : wordLen > 7 ? "text-3xl" : "text-5xl";

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="text-sm text-brand">
        ← Home
      </Link>

      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className={`font-jp ${wordSize} leading-tight break-words`}>
            <Furigana word={vocab.word} reading={vocab.reading} />
          </div>
          <p className="mt-2 text-sm text-slate-500">{vocab.romaji}</p>
          <p className="mt-1 text-lg">{pickMeanings(vocab, lang).join(", ")}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={state.status} />
            <span className="text-sm text-slate-500">
              {POS_LABEL[vocab.partOfSpeech]}
            </span>
            {vocab.mnnLesson && (
              <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs text-slate-500 dark:bg-white/10">
                みんなの日本語 L{vocab.mnnLesson}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <StarButton itemId={vocab.id} />
          <AddToListButton itemId={vocab.id} />
          <AudioButton
            text={vocab.reading}
            audioUrl={vocab.audioUrl}
            label={`Play ${vocab.word}`}
          />
        </div>
      </header>

      <WordImage vocab={vocab} />

      {vocab.example && (
        <section className="rounded-xl border border-black/10 p-4 dark:border-white/10">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Example
          </h2>
          <p className="font-jp text-lg">
            <Reading word={vocab.example.jp} reading={vocab.example.reading} />
          </p>
          <p className="mt-1 text-sm text-slate-500">{vocab.example.en}</p>
        </section>
      )}

      {relatedKanji.length > 0 && (
        <section>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Kanji in this word
          </h2>
          <ul className="flex flex-wrap gap-3">
            {relatedKanji.map((k) => (
              <li key={k.id}>
                <Link
                  href={`/kanji/${encodeURIComponent(k.character)}`}
                  className="flex flex-col items-center rounded-xl border border-black/10 p-3 hover:border-brand dark:border-white/10"
                >
                  <span className="font-jp text-3xl">{k.character}</span>
                  <span className="text-xs text-slate-500">
                    {pickMeanings(k, lang)[0]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
