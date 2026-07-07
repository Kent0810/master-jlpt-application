"use client";

import { useEffect, useState } from "react";
import { getPlayer } from "@/lib/audio/player";

interface Props {
  text: string;
  audioUrl?: string | null;
  label?: string;
  className?: string;
}

export function AudioButton({ text, audioUrl, label, className }: Props) {
  const [available, setAvailable] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setAvailable(getPlayer(audioUrl).isAvailable());
  }, [audioUrl]);

  if (!available) return null;

  const speak = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSpeaking(true);
    try {
      await getPlayer(audioUrl).play(text, audioUrl);
    } finally {
      setSpeaking(false);
    }
  };

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={label ?? `Play pronunciation of ${text}`}
      className={
        className ??
        `inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-lg transition-colors hover:bg-brand hover:text-white dark:border-white/15 ${
          speaking ? "animate-pulse bg-brand text-white" : ""
        }`
      }
    >
      🔊
    </button>
  );
}
