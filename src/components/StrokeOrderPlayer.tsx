"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadStrokes } from "@/lib/kanjivg/load";
import type { ParsedKanji } from "@/lib/kanjivg/parse";

interface Props {
  kanjivgId: string;
  character: string;
  strokeDuration?: number;
  size?: number;
}

type LoadState = "loading" | "ready" | "unavailable";

export function StrokeOrderPlayer({
  kanjivgId,
  character,
  strokeDuration = 700,
  size = 220,
}: Props) {
  const [data, setData] = useState<ParsedKanji | null>(null);
  const [status, setStatus] = useState<LoadState>("loading");
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    loadStrokes(kanjivgId).then((parsed) => {
      if (!alive) return;
      if (parsed && parsed.strokes.length > 0) {
        setData(parsed);
        setStatus("ready");
        setStep(parsed.strokes.length - 1);
      } else {
        setStatus("unavailable");
      }
    });
    return () => {
      alive = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [kanjivgId]);

  const total = data?.strokes.length ?? 0;

  const stop = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPlaying(false);
  }, []);

  const play = useCallback(() => {
    if (!data) return;
    stop();
    setStep(-1);
    setPlaying(true);
    let i = -1;
    const tick = () => {
      i += 1;
      setStep(i);
      if (i < data.strokes.length - 1) {
        timer.current = setTimeout(tick, strokeDuration);
      } else {
        setPlaying(false);
      }
    };
    timer.current = setTimeout(tick, 120);
  }, [data, strokeDuration, stop]);

  const stepForward = useCallback(() => {
    stop();
    setStep((s) => Math.min(total - 1, s + 1));
  }, [stop, total]);

  const stepBack = useCallback(() => {
    stop();
    setStep((s) => Math.max(-1, s - 1));
  }, [stop]);

  if (status === "loading") {
    return (
      <Frame size={size}>
        <span className="animate-pulse text-sm text-slate-400">
          Loading strokes…
        </span>
      </Frame>
    );
  }

  if (status === "unavailable" || !data) {
    return (
      <Frame size={size}>
        <span className="font-jp text-7xl">{character}</span>
        <span className="mt-2 text-xs text-slate-400">
          Stroke order needs a connection the first time.
        </span>
      </Frame>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        viewBox={data.viewBox}
        width={size}
        height={size}
        className="rounded-2xl border border-black/10 dark:border-white/10"
        role="img"
        aria-label={`Stroke order for ${character}`}
      >
        {data.strokes.map((d, i) => (
          <path
            key={`guide-${i}`}
            d={d}
            fill="none"
            stroke="currentColor"
            className="text-black/10 dark:text-white/10"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {data.strokes.map((d, i) => (
          <path
            key={`ink-${i}`}
            d={d}
            fill="none"
            stroke="currentColor"
            className={i === step ? "text-brand" : "text-slate-800 dark:text-slate-100"}
            strokeWidth={3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={i <= step ? 0 : 1}
            style={{
              transition: `stroke-dashoffset ${strokeDuration}ms linear`,
              visibility: i <= step ? "visible" : "hidden",
            }}
          />
        ))}
      </svg>

      <div className="flex items-center gap-2">
        <IconButton onClick={stepBack} label="Previous stroke" disabled={playing}>
          ◀
        </IconButton>
        <button
          onClick={playing ? stop : play}
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white"
        >
          {playing ? "Stop" : "▶ Play"}
        </button>
        <IconButton onClick={stepForward} label="Next stroke" disabled={playing}>
          ▶
        </IconButton>
      </div>
      <p className="text-xs text-slate-500">
        Stroke {Math.max(0, step + 1)} / {total}
      </p>
    </div>
  );
}

function Frame({
  size,
  children,
}: {
  size: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className="flex flex-col items-center justify-center rounded-2xl border border-black/10 text-center dark:border-white/10"
    >
      {children}
    </div>
  );
}

function IconButton({
  onClick,
  label,
  disabled,
  children,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-sm disabled:opacity-40 dark:border-white/15"
    >
      {children}
    </button>
  );
}
