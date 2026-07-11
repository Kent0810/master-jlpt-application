"use client";

import { useState } from "react";
import { useStudyLists } from "@/lib/db/hooks";
import { addToList, createList, removeFromList } from "@/lib/db/db";
import { useT } from "@/lib/i18n";

export function AddToListButton({ itemId }: { itemId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const lists = useStudyLists();
  const t = useT();

  async function createAndAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const list = await createList(trimmed);
    await addToList(list.id, itemId);
    setName("");
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("Add to list")}
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg text-slate-400 transition-transform hover:scale-110 hover:text-brand dark:text-slate-500"
      >
        {open ? "✕" : "➕"}
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-40 mt-1 w-56 space-y-1 rounded-2xl border border-black/10 bg-[var(--background)] p-2 shadow-lg dark:border-white/10">
            <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t("Add to list")}
            </p>
            {(lists ?? []).length === 0 && (
              <p className="px-2 py-1 text-xs text-slate-400">{t("No lists yet.")}</p>
            )}
            {(lists ?? []).map((l) => {
              const included = l.itemIds.includes(itemId);
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() =>
                    void (included
                      ? removeFromList(l.id, itemId)
                      : addToList(l.id, itemId))
                  }
                  className="flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-left text-sm hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <span className="min-w-0 flex-1 truncate">{l.name}</span>
                  <span
                    className={
                      included
                        ? "text-brand"
                        : "text-slate-300 dark:text-slate-600"
                    }
                  >
                    {included ? "✓" : "+"}
                  </span>
                </button>
              );
            })}
            <form onSubmit={createAndAdd} className="flex gap-1 pt-1">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("New list…")}
                className="min-w-0 flex-1 rounded-lg border border-black/10 bg-transparent px-2 py-1 text-sm outline-none focus:border-brand dark:border-white/15"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-brand px-2 py-1 text-xs font-semibold text-white"
              >
                {t("Add")}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
