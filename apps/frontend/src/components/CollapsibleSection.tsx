"use client";

import { useEffect, useState, type ReactNode } from "react";

export function CollapsibleSection({
  storageKey,
  defaultOpen,
  title,
  children,
}: {
  storageKey: string;
  defaultOpen: boolean;
  title: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw !== null) setOpen(raw === "1");
    } catch {
      /* ignore */
    }
    // Only read the persisted value once on mount for this key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggle() {
    setOpen((o) => {
      const next = !o;
      try {
        localStorage.setItem(storageKey, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-5 py-4 text-left transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.05]"
      >
        {title}
        <span
          aria-hidden
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/5 text-slate-400 transition-transform dark:bg-white/10 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="border-t border-black/10 px-5 py-5 dark:border-white/10">
          {children}
        </div>
      )}
    </section>
  );
}
