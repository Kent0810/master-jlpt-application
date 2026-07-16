"use client";

import { useEffect, useState } from "react";
import { playAudio, isAudioAvailable } from "@/lib/audio/player";
import { AudioIcon } from "./AudioIcon";

interface Props {
  text: string;
  audioUrl?: string | null;
  label?: string;
  className?: string;
}

type Status = "idle" | "loading" | "playing";

export function AudioButton({ text, audioUrl, label, className }: Props) {
  const [available, setAvailable] = useState(true);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    setAvailable(isAudioAvailable(text, audioUrl));
  }, [text, audioUrl]);

  if (!available) return null;

  const speak = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (status !== "idle") return; // ignore taps while loading/playing
    setStatus("loading");
    try {
      await playAudio(text, audioUrl, {
        onPlaying: () => setStatus("playing"),
      });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={label ?? `Play pronunciation of ${text}`}
      aria-busy={status === "loading"}
      className={
        className ??
        `inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-lg transition-colors hover:bg-brand hover:text-white dark:border-white/15 ${
          status !== "idle" ? "bg-brand text-white" : ""
        }`
      }
    >
      <AudioIcon state={status} />
    </button>
  );
}
