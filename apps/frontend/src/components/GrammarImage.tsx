"use client";

import { useEffect, useState } from "react";
import { getGrammarImage } from "@/lib/grammarImages";
import { accentOnWhite } from "@/lib/lessonAccents";
import { useLang } from "@/lib/i18n";

export function GrammarImage({
  grammarId,
  accent,
}: {
  grammarId: string;
  accent?: string;
}) {
  const lang = useLang();
  const image = getGrammarImage(grammarId);
  const src = image ? `/grammar-images/${image.file}` : null;
  const [ready, setReady] = useState(false);

  // Preload so we only render for images that actually exist — mirrors
  // WordImage and LessonImageFigure, and avoids an SSR/hydration race where
  // <img> onError fires before React attaches the handler.
  useEffect(() => {
    setReady(false);
    if (!src) return;
    let alive = true;
    const img = new Image();
    img.onload = () => alive && setReady(true);
    img.onerror = () => alive && setReady(false);
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src]);

  if (!image || !src || !ready) return null;

  const caption = lang === "vi" ? image.captionVi : image.captionEn;

  return (
    <figure className="mt-3 overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
      <div
        className="flex items-center justify-center bg-white p-3 dark:bg-white/95"
        // Solid light tint so the artwork pops; stays light in dark mode too.
        style={accent ? { backgroundColor: accentOnWhite(accent, 0.08) } : undefined}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={caption}
          className="max-h-28 w-auto object-contain"
        />
      </div>
      <figcaption className="px-3 py-1.5 text-[11px] text-slate-500">
        {caption}
      </figcaption>
    </figure>
  );
}
