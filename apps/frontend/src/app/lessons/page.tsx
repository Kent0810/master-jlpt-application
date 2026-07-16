"use client";

import Link from "next/link";
import { LEVELS } from "@/lib/levels";
import { useT } from "@/lib/i18n";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { LessonJourney } from "@/components/LessonJourney";

const LOCKED_LEVELS = LEVELS.filter((l) => !l.available);

export default function LessonsPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="text-sm text-brand">
        {t("← Home")}
      </Link>
      <header className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-soft px-6 py-8 text-white shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
          JLPT N5–N1
        </p>
        <h1 className="mt-1 text-3xl font-bold">{t("Lessons")}</h1>
        <p className="mt-1 max-w-lg text-sm text-white/90">
          {t(
            "Grammar and vocabulary in structured, bite-size lessons — N5 is ready now, with N4 to N1 on the way.",
          )}
        </p>
      </header>

      <CollapsibleSection
        storageKey="lessons.section.N5"
        defaultOpen
        title={
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand">
            <span className="rounded-full bg-brand/10 px-2.5 py-0.5 dark:bg-brand/20">
              N5
            </span>
            {t("Available now")}
          </h2>
        }
      >
        <LessonJourney />
      </CollapsibleSection>

      {LOCKED_LEVELS.map((level) => (
        <CollapsibleSection
          key={level.level}
          storageKey={`lessons.section.${level.level}`}
          defaultOpen={false}
          title={
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-400">
              <span className="rounded-full bg-black/5 px-2.5 py-0.5 dark:bg-white/10">
                {level.level}
              </span>
              {t("Coming soon")}
            </h2>
          }
        >
          <div className="rounded-3xl border border-dashed border-black/15 p-6 text-center text-sm text-slate-400 dark:border-white/15">
            🔒 {t("Lessons for this level are on the way.")}
          </div>
        </CollapsibleSection>
      ))}
    </div>
  );
}
