import type { StudyStatus } from "@/lib/data/types";

const STYLES: Record<StudyStatus, string> = {
  new: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  learning: "bg-amber-200 text-amber-800 dark:bg-amber-500/25 dark:text-amber-300",
  mastered: "bg-emerald-200 text-emerald-800 dark:bg-emerald-500/25 dark:text-emerald-300",
};

const LABELS: Record<StudyStatus, string> = {
  new: "New",
  learning: "Learning",
  mastered: "Mastered",
};

export function StatusBadge({ status }: { status: StudyStatus }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
