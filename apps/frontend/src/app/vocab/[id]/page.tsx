import type { Metadata } from "next";
import { getVocab } from "@/lib/data";
import VocabDetailClient from "./VocabDetailClient";

export function generateStaticParams() {
  return getVocab().map((v) => ({ id: v.word }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const word = decodeURIComponent(id);
  const vocab = getVocab().find((v) => v.word === word);
  if (!vocab) return { title: "Word not found — JLPT 道場" };

  const meanings = vocab.meanings.slice(0, 4).join(", ");
  const title = `${vocab.word}（${vocab.reading}） — ${meanings} | JLPT 道場`;
  const description = `${vocab.word} (${vocab.reading}, ${vocab.romaji}) means "${meanings}". JLPT ${vocab.jlptLevel} vocabulary with audio pronunciation${
    vocab.example ? " and an example sentence" : ""
  }.`;
  const canonical = `/vocab/${encodeURIComponent(vocab.word)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article" },
  };
}

export default function VocabDetailPage() {
  return <VocabDetailClient />;
}
