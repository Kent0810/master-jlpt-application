"use client";

import { useEffect, useState } from "react";
import { lessonImageSrc, type LessonImage } from "@/lib/lessonImages";
import { useLang } from "@/lib/i18n";

export function LessonImageFigure({
  image,
  variant,
}: {
  image: LessonImage | null;
  variant: "hero" | "inline";
}) {
  const lang = useLang();
  const src = image ? lessonImageSrc(image.file) : null;
  const [ready, setReady] = useState(false);

  // Preload so we only render for images that actually exist — mirrors WordImage
  // and avoids an SSR/hydration race where <img> onError fires before React
  // attaches the handler.
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
  const maxH = variant === "hero" ? "max-h-64" : "max-h-32";

  return (
    <figure className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
      <div className="flex items-center justify-center bg-white p-4 dark:bg-white/95">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={caption} className={`${maxH} w-auto object-contain`} />
      </div>
      <figcaption className="px-3 py-2 text-[11px] text-slate-500">
        {caption}
      </figcaption>
    </figure>
  );
}
