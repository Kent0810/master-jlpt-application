"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { findVocabForSurface } from "@/lib/data/lookup";
import { Reading } from "@/components/Furigana";
import { AddToListButton } from "@/components/AddToListButton";
import { AudioButton } from "@/components/AudioButton";
import { useT, useLang, pickMeanings } from "@/lib/i18n";

// Shared tap-to-lookup + linked-highlight state for a whole lesson page. Each
// tappable sentence is identified by a stable `key`; selecting a word opens its
// lookup card, and hovering a word lights up its counterpart in the translation.

interface Selection {
  key: string;
  word: string;
  token: number;
  // Viewport rect of the tapped word, so the lookup popover can anchor to it.
  anchor: DOMRect;
}
interface Hover {
  key: string;
  token: number;
}

interface InteractionValue {
  selected: Selection | null;
  setSelected: (s: Selection | null) => void;
  hovered: Hover | null;
  setHovered: (h: Hover | null) => void;
}

const Ctx = createContext<InteractionValue | null>(null);

export function LessonInteractionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState<Selection | null>(null);
  const [hovered, setHovered] = useState<Hover | null>(null);
  return (
    <Ctx.Provider value={{ selected, setSelected, hovered, setHovered }}>
      {children}
    </Ctx.Provider>
  );
}

function useInteraction(): InteractionValue {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error(
      "useSentenceLink must be used within a LessonInteractionProvider",
    );
  return ctx;
}

// Props for one tappable sentence, keyed by `key`. The hovered word wins for the
// highlight; otherwise the tapped selection stays lit.
export function useSentenceLink(key: string) {
  const { selected, setSelected, hovered, setHovered } = useInteraction();
  const highlightIndex =
    hovered?.key === key
      ? hovered.token
      : selected?.key === key
        ? selected.token
        : null;
  return {
    highlightIndex,
    selectedWord: selected?.key === key ? selected.word : null,
    onWordSelect: (word: string, token: number, anchor: DOMRect) =>
      setSelected({ key, word, token, anchor }),
    onWordHover: (token: number | null) =>
      setHovered(token === null ? null : { key, token }),
  };
}

// Renders the lookup popover for a sentence's currently-selected word, or
// nothing. Placed by each block, but the popover itself is position: fixed and
// anchored to the tapped word, so its spot in the DOM doesn't matter.
export function WordCardFor({ sKey }: { sKey: string }) {
  const { selected, setSelected } = useInteraction();
  if (selected?.key !== sKey) return null;
  return (
    <WordLookupCard
      word={selected.word}
      anchor={selected.anchor}
      onClose={() => setSelected(null)}
    />
  );
}

function WordLookupCard({
  word,
  anchor,
  onClose,
}: {
  word: string;
  anchor: DOMRect;
  onClose: () => void;
}) {
  const lang = useLang();
  const t = useT();
  const vocab = findVocabForSurface(word);
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  // Position next to the tapped word: below it by default, above if it would
  // overflow the bottom, and clamped horizontally to the viewport.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();
    const m = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const left = Math.min(Math.max(m, anchor.left), vw - width - m);
    let top = anchor.bottom + 6;
    if (top + height > vh - m) {
      const above = anchor.top - height - 6;
      top = above >= m ? above : Math.max(m, vh - height - m);
    }
    setPos({ top, left });
  }, [anchor, word]);

  // Dismiss on Escape, scroll, resize, or a click outside the popover. The
  // outside-click listener is armed on the next tick so the opening tap (which
  // is still propagating) doesn't immediately close it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    window.addEventListener("scroll", onClose, true);
    window.addEventListener("resize", onClose);
    document.addEventListener("keydown", onKey);
    const id = window.setTimeout(
      () => document.addEventListener("mousedown", onOutside),
      0,
    );
    return () => {
      window.removeEventListener("scroll", onClose, true);
      window.removeEventListener("resize", onClose);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
      window.clearTimeout(id);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      style={{
        top: pos?.top ?? anchor.bottom + 6,
        left: pos?.left ?? anchor.left,
        visibility: pos ? "visible" : "hidden",
      }}
      className="fixed z-50 flex w-[min(20rem,calc(100vw-1rem))] items-start justify-between gap-3 rounded-xl border border-black/10 bg-[var(--background)] p-3 text-left shadow-xl dark:border-white/15"
    >
      <div className="min-w-0">
        {vocab ? (
          <>
            <div className="font-jp text-lg">
              <Reading
                word={vocab.word}
                reading={vocab.reading}
                romaji={vocab.romaji}
              />
            </div>
            <p className="text-sm text-slate-500">
              {pickMeanings(vocab, lang).join(", ")}
            </p>
          </>
        ) : (
          <p className="text-sm text-slate-400">
            <span className="font-jp">{word}</span> —{" "}
            {t("not in the vocabulary list")}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <AudioButton
          text={vocab ? vocab.reading : word}
          audioUrl={vocab?.audioUrl}
          label={`Play ${word}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base text-slate-400 transition-colors hover:bg-brand hover:text-white"
        />
        {vocab && <AddToListButton itemId={vocab.id} />}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("Close")}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
