import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "N5 道場 — JLPT N5 Study",
    short_name: "N5 道場",
    description:
      "Learn JLPT N5 kanji and vocabulary with furigana, romaji, audio, and spaced-repetition flashcards.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#0f1115",
    theme_color: "#e11d48",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
