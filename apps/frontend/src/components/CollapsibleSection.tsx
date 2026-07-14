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
    <section className="space-y-3">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        {title}
        <span
          aria-hidden
          className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && children}
    </section>
  );
}
