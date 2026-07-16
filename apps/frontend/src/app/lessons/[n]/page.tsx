import type { Metadata } from "next";
import { getLessonMeta, LESSON_META } from "@/lib/lessons/lessons";
import LessonDetailClient from "./LessonDetailClient";

// Pre-render one static page per lesson.
export function generateStaticParams() {
  return LESSON_META.map((l) => ({ n: String(l.lesson) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  const meta = getLessonMeta(Number(n));
  if (!meta) return { title: "Lesson not found — JLPT 道場" };

  const title = `Lesson ${meta.lesson}: ${meta.titleEn} (${meta.titleJp}) | JLPT 道場`;
  const description = `${meta.recap} Focus: ${meta.focus}.`;
  const canonical = `/lessons/${meta.lesson}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "article" },
  };
}

export default function LessonDetailPage() {
  return <LessonDetailClient />;
}
