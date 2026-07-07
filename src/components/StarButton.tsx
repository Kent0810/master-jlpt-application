"use client";

import { toggleStar } from "@/lib/db/db";
import { useStudyState } from "@/lib/db/hooks";

export function StarButton({ itemId }: { itemId: string }) {
  const state = useStudyState(itemId);
  const starred = state.starred;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void toggleStar(itemId);
      }}
      aria-label={starred ? "Remove from starred" : "Add to starred"}
      aria-pressed={starred}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg transition-transform hover:scale-110"
    >
      <span className={starred ? "text-amber-400" : "text-slate-300 dark:text-slate-600"}>
        {starred ? "★" : "☆"}
      </span>
    </button>
  );
}
