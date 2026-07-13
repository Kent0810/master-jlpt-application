"use client";

import { useState } from "react";
import Link from "next/link";
import { useStudyLists } from "@/lib/db/hooks";
import { getItemById } from "@/lib/data";
import {
  createList,
  deleteList,
  getStarredIds,
  addToList,
  removeFromList,
} from "@/lib/db/db";
import { useT } from "@/lib/i18n";

export default function ListsPage() {
  const lists = useStudyLists();
  const [name, setName] = useState("");
  const t = useT();

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    await createList(trimmed);
    setName("");
  }

  async function importStarred() {
    const ids = await getStarredIds();
    if (ids.length === 0) return;
    const list = await createList("Starred import");
    for (const id of ids) await addToList(list.id, id);
  }

  return (
    <div className="space-y-4">
      <Link href="/dashboard" className="text-sm text-brand">
        {t("← Home")}
      </Link>
      <h1 className="text-2xl font-bold">{t("Study Lists")}</h1>
      <p className="text-slate-500">
        {t("Group items into custom decks you can study from the Study tab.")}
      </p>

      <form onSubmit={add} className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("New list name…")}
          className="flex-1 rounded-xl border border-black/10 bg-transparent px-4 py-2 outline-none focus:border-brand dark:border-white/15"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand px-4 py-2 font-semibold text-white"
        >
          {t("Add")}
        </button>
      </form>

      <button
        onClick={importStarred}
        className="text-sm text-brand underline-offset-2 hover:underline"
      >
        {t("★ Create a list from my starred items")}
      </button>

      <ul className="space-y-3 pt-2">
        {(lists ?? []).map((l) => (
          <li
            key={l.id}
            className="rounded-2xl border border-black/10 p-4 dark:border-white/10"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{l.name}</h2>
              <button
                onClick={() => deleteList(l.id)}
                className="text-sm text-rose-500"
                aria-label={`Delete list ${l.name}`}
              >
                {t("Delete")}
              </button>
            </div>
            {l.itemIds.length === 0 ? (
              <p className="mt-1 text-sm text-slate-400">
                {t("Empty — star items or add them from detail pages.")}
              </p>
            ) : (
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {l.itemIds.map((id) => {
                  const item = getItemById(id);
                  if (!item) return null;
                  const isKanji = "character" in item;
                  const label = isKanji ? item.character : item.word;
                  const href = isKanji
                    ? `/kanji/${encodeURIComponent(item.character)}`
                    : `/vocab/${encodeURIComponent(item.word)}`;
                  return (
                    <li
                      key={id}
                      className="flex items-center gap-1 rounded-full border border-black/10 py-0.5 pl-2.5 pr-1 dark:border-white/10"
                    >
                      <Link
                        href={href}
                        className="font-jp text-sm hover:text-brand"
                      >
                        {label}
                      </Link>
                      <button
                        onClick={() => removeFromList(l.id, id)}
                        aria-label={`Remove ${label}`}
                        className="flex h-5 w-5 items-center justify-center rounded-full text-xs text-slate-400 hover:bg-rose-500/10 hover:text-rose-500"
                      >
                        ✕
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
        {lists && lists.length === 0 && (
          <p className="py-6 text-center text-slate-500">
            {t("No lists yet.")}
          </p>
        )}
      </ul>
    </div>
  );
}
