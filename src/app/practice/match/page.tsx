"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buildQueue } from "@/lib/study/deck";
import { buildTiles, isPair, type Tile } from "@/lib/study/match";
import { reviewItem } from "@/lib/db/db";
import { AdSlot } from "@/components/ads/AdSlot";

type Phase = "loading" | "playing" | "done" | "empty";

const PAIR_COUNT = 6;
const FLASH_MS = 500;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function MatchPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("loading");
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string[]>([]);
  const [wrong, setWrong] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedMs, setElapsedMs] = useState(0);
  const wrongTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function loadGame() {
    setPhase("loading");
    const items = await buildQueue({ kind: "all", limit: PAIR_COUNT });
    if (items.length < 3) {
      setPhase("empty");
      return;
    }
    setTiles(shuffle(buildTiles(items)));
    setMatched(new Set());
    setSelected([]);
    setMistakes(0);
    setStartedAt(null);
    setElapsedMs(0);
    setPhase("playing");
  }

  useEffect(() => {
    void loadGame();
    return () => {
      if (wrongTimeout.current) clearTimeout(wrongTimeout.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "playing" || startedAt === null) return;
    const id = setInterval(() => setElapsedMs(Date.now() - startedAt), 100);
    return () => clearInterval(id);
  }, [phase, startedAt]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (phase === "playing" && e.key === "Escape") {
        router.push("/practice");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, router]);

  function tap(tile: Tile) {
    if (wrong || matched.has(tile.itemId)) return;
    if (startedAt === null) setStartedAt(Date.now());

    if (selected.includes(tile.key)) {
      setSelected([]);
      return;
    }
    if (selected.length === 0) {
      setSelected([tile.key]);
      return;
    }

    const first = tiles.find((t) => t.key === selected[0])!;
    if (isPair(first, tile)) {
      const nextMatched = new Set(matched);
      nextMatched.add(tile.itemId);
      setMatched(nextMatched);
      setSelected([]);
      void reviewItem(tile.itemId, "good");
      if (nextMatched.size === tiles.length / 2) {
        setPhase("done");
      }
    } else {
      setSelected([first.key, tile.key]);
      setMistakes((m) => m + 1);
      setWrong(true);
      wrongTimeout.current = setTimeout(() => {
        setWrong(false);
        setSelected([]);
      }, FLASH_MS);
    }
  }

  if (phase === "loading") {
    return (
      <div className="py-24 text-center text-sm text-slate-400">Loading…</div>
    );
  }

  if (phase === "empty") {
    return (
      <div className="space-y-6 py-12 text-center">
        <div className="text-5xl">📭</div>
        <h1 className="text-2xl font-bold">Nothing due</h1>
        <p className="text-slate-500">
          No cards are due right now — come back later.
        </p>
        <Link
          href="/practice"
          className="inline-block rounded-2xl bg-brand px-6 py-3 font-semibold text-white"
        >
          Back to Practice
        </Link>
      </div>
    );
  }

  if (phase === "done") {
    const seconds = (elapsedMs / 1000).toFixed(1);
    return (
      <div className="space-y-6 py-12 text-center">
        <div className="text-5xl">🧩</div>
        <h1 className="text-2xl font-bold">{seconds}s</h1>
        <p className="text-slate-500">{mistakes} mistakes</p>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => void loadGame()}
            className="rounded-2xl bg-brand px-6 py-3 font-semibold text-white"
          >
            Play again
          </button>
          <Link href="/practice" className="text-sm text-brand">
            ← Practice
          </Link>
        </div>
        <div className="mx-auto max-w-sm pt-2">
          <AdSlot placement="sessionDone" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <button onClick={() => router.push("/practice")}>✕ End (Esc)</button>
        <span>
          {(elapsedMs / 1000).toFixed(1)}s · {mistakes} mistakes
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {tiles.map((tile) => {
          const isMatched = matched.has(tile.itemId);
          const isSelected = selected.includes(tile.key);
          let cls = "border-black/10 dark:border-white/10 hover:border-brand";
          if (isMatched) {
            cls =
              "border-black/5 opacity-0 pointer-events-none dark:border-white/5";
          } else if (isSelected && wrong) {
            cls = "border-rose-500 bg-rose-500/10";
          } else if (isSelected) {
            cls = "border-brand bg-brand/5";
          }
          return (
            <button
              key={tile.key}
              onClick={() => tap(tile)}
              disabled={isMatched}
              className={`flex min-h-[72px] items-center justify-center rounded-2xl border p-2 text-center text-sm font-medium transition-all ${
                tile.kind === "front" ? "font-jp text-lg" : ""
              } ${cls}`}
            >
              {tile.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
