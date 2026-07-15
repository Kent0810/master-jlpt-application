"use client";

import { createContext, useContext, useState } from "react";
import { getVocab } from "@/lib/data";
import { Reading } from "@/components/Furigana";
import { AddToListButton } from "@/components/AddToListButton";
import { useT, useLang, pickMeanings } from "@/lib/i18n";

// Shared tap-to-lookup + linked-highlight state for a whole lesson page. Each
// tappable sentence is identified by a stable `key`; selecting a word opens its
// lookup card, and hovering a word lights up its counterpart in the translation.

interface Selection {
  key: string;
  word: string;
  token: number;
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
    onWordSelect: (word: string, token: number) =>
      setSelected({ key, word, token }),
    onWordHover: (token: number | null) =>
      setHovered(token === null ? null : { key, token }),
  };
}

// Renders the lookup card for a sentence's currently-selected word, or nothing.
// Placed by each block where the card should appear (e.g. below a dialogue
// bubble vs. under a grammar example).
export function WordCardFor({ sKey }: { sKey: string }) {
  const { selected, setSelected } = useInteraction();
  if (selected?.key !== sKey) return null;
  return (
    <WordLookupCard word={selected.word} onClose={() => setSelected(null)} />
  );
}

function WordLookupCard({
  word,
  onClose,
}: {
  word: string;
  onClose: () => void;
}) {
  const lang = useLang();
  const t = useT();
  const vocab = getVocab().find((v) => v.word === word);

  return (
    <div className="mt-1 flex items-start justify-between gap-3 rounded-xl border border-black/10 bg-black/[0.02] p-3 text-left dark:border-white/10 dark:bg-white/[0.03]">
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
