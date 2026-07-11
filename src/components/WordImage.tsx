"use client";

import { useEffect, useState } from "react";
import type { Vocabulary } from "@/lib/data/types";
import { getWordImage } from "@/lib/wordImages";

export function WordImage({ vocab }: { vocab: Vocabulary }) {
  const src = getWordImage(vocab.word);
  const [ready, setReady] = useState(false);

  // Preload so we only render the section for images that actually exist. This
  // avoids an SSR/hydration race where an <img> onError can fire before React
  // attaches the handler (leaving a broken image visible).
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

  if (!src || !ready) return null;

  return (
    <section>
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Illustration
      </h2>
      <figure className="overflow-hidden rounded-xl border border-black/10 dark:border-white/10">
        <div className="flex items-center justify-center bg-white p-4 dark:bg-white/95">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Illustration of ${vocab.meanings[0] ?? vocab.word}`}
            className="max-h-56 w-auto object-contain"
          />
        </div>
        <figcaption className="px-3 py-2 text-[11px] text-slate-500">
          Illustration ·{" "}
          <a
            href="https://www.irasutoya.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brand"
          >
            いらすとや
          </a>
        </figcaption>
      </figure>
    </section>
  );
}
