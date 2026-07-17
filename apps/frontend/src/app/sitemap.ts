import type { MetadataRoute } from "next";
import { getKanji, getVocab } from "@/lib/data";
import { LESSON_META } from "@/lib/lessons/lessons";

// The public origin. Override per-deploy with NEXT_PUBLIC_SITE_URL so preview
// builds don't advertise the production domain.
const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hoc-jlpt.com"
).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Top-level routes worth surfacing to search. Detail/tool pages that only
  // make sense mid-session (quiz, match, write practice) are intentionally
  // left off the map.
  const staticPaths: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1.0 },
    { path: "/lessons", priority: 0.9 },
    { path: "/kanji", priority: 0.9 },
    { path: "/lists", priority: 0.6 },
    { path: "/study", priority: 0.6 },
    { path: "/practice", priority: 0.6 },
    { path: "/quiz", priority: 0.5 },
    { path: "/write", priority: 0.6 },
    { path: "/write/basics", priority: 0.5 },
    { path: "/write/rules", priority: 0.5 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map(
    ({ path, priority }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority,
    }),
  );

  // Content detail pages. The dynamic segments are the kanji character and the
  // vocab word respectively, so they must be percent-encoded for the sitemap.
  const kanjiEntries: MetadataRoute.Sitemap = getKanji().map((k) => ({
    url: `${BASE_URL}/kanji/${encodeURIComponent(k.character)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const vocabEntries: MetadataRoute.Sitemap = getVocab().map((v) => ({
    url: `${BASE_URL}/vocab/${encodeURIComponent(v.word)}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const lessonEntries: MetadataRoute.Sitemap = LESSON_META.map((l) => ({
    url: `${BASE_URL}/lessons/${l.lesson}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...lessonEntries, ...kanjiEntries, ...vocabEntries];
}
