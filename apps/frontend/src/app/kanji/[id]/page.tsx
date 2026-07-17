import type { Metadata } from "next";
import { getKanji, getKanjiByChar } from "@/lib/data";
import KanjiDetailClient from "./KanjiDetailClient";

// Pre-render one static page per kanji so every character has a crawlable,
// unique URL. The dynamic segment is the character itself.
export function generateStaticParams() {
  return getKanji().map((k) => ({ id: k.character }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const character = decodeURIComponent(id);
  const kanji = getKanjiByChar(character);
  if (!kanji) return { title: "Kanji not found — JLPT 道場" };

  const meanings = kanji.meanings.slice(0, 4).join(", ");
  const readings = [...kanji.kunyomi, ...kanji.onyomi]
    .filter(Boolean)
    .join("、");
  const title = `${kanji.character} — ${meanings} · Kanji | JLPT 道場`;
  const description = `Learn the JLPT ${kanji.jlptLevel} kanji ${kanji.character} (${meanings}).${
    readings ? ` Readings: ${readings}.` : ""
  } ${kanji.strokeCount} strokes, with stroke order, example words and audio.`;
  const canonical = `/kanji/${encodeURIComponent(kanji.character)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article" },
  };
}

export default function KanjiDetailPage() {
  return <KanjiDetailClient />;
}
