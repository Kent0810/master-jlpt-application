"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { getKanjiByChar, getVocabById } from "@/lib/data";
import { AudioButton } from "@/components/AudioButton";
import { StarButton } from "@/components/StarButton";
import { AddToListButton } from "@/components/AddToListButton";
import { StatusBadge } from "@/components/StatusBadge";
import { Reading } from "@/components/Furigana";
import { StrokeOrderPlayer } from "@/components/StrokeOrderPlayer";
import { useStudyState } from "@/lib/db/hooks";
import { useT, useLang, pickMeanings } from "@/lib/i18n";

export default function KanjiDetailPage() {
  const params = useParams<{ id: string }>();
  const character = decodeURIComponent(params.id);
  const kanji = getKanjiByChar(character);
  if (!kanji) return notFound();

  const state = useStudyState(kanji.id);
  const t = useT();
  const lang = useLang();
  const examples = kanji.exampleVocabIds
    .map((id) => getVocabById(id))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  const readingsAudio = [...kanji.kunyomi, ...kanji.onyomi]
    .map((r) => r.replace(/-/g, ""))
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <Link href="/kanji" className="text-sm text-brand">
        {t("← Kanji")}
      </Link>

      <header className="flex items-start justify-between">
        <div>
          <div className="font-jp text-7xl leading-none">{kanji.character}</div>
          <p className="mt-2 text-lg">{pickMeanings(kanji, lang).join(", ")}</p>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge status={state.status} />
            <span className="text-sm text-slate-500">
              {kanji.strokeCount} strokes
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <StarButton itemId={kanji.id} />
          <AddToListButton itemId={kanji.id} />
          {readingsAudio[0] && (
            <AudioButton text={readingsAudio[0]} label="Play a reading" />
          )}
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <ReadingBlock title="On'yomi (音)" readings={kanji.onyomi} />
        <ReadingBlock title="Kun'yomi (訓)" readings={kanji.kunyomi} />
      </section>

      <section className="flex flex-col items-center gap-2">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Stroke order
          </h2>
          <Link
            href={`/write/${encodeURIComponent(kanji.character)}`}
            className="text-sm text-brand"
          >
            Practise writing →
          </Link>
        </div>
        <StrokeOrderPlayer
          kanjivgId={kanji.kanjivgId!}
          character={kanji.character}
          size={180}
        />
      </section>

      {examples.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Example words
          </h2>
          <ul className="space-y-2">
            {examples.map((v) => (
              <li key={v.id}>
                <Link
                  href={`/vocab/${encodeURIComponent(v.word)}`}
                  className="flex items-center justify-between rounded-xl border border-black/10 p-3 hover:border-brand dark:border-white/10"
                >
                  <span className="text-lg">
                    <Reading
                      word={v.word}
                      reading={v.reading}
                      romaji={v.romaji}
                    />
                  </span>
                  <span className="text-sm text-slate-500">
                    {pickMeanings(v, lang)[0]}
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

function ReadingBlock({
  title,
  readings,
}: {
  title: string;
  readings: string[];
}) {
  return (
    <div className="rounded-xl border border-black/10 p-3 dark:border-white/10">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h3>
      {readings.length === 0 ? (
        <p className="text-sm text-slate-400">—</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {readings.map((r) => (
            <li key={r} className="flex items-center gap-1">
              <span className="font-jp text-lg">{r}</span>
              <AudioButton
                text={r.replace(/-/g, "")}
                label={`Play ${r}`}
                className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs hover:bg-brand hover:text-white"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
