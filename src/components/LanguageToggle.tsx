"use client";

import { useSettings, type Language } from "@/lib/settings/SettingsProvider";

const OPTIONS: { value: Language; label: string }[] = [
  { value: "vi", label: "Tiếng Việt" },
  { value: "en", label: "English" },
];

export function LanguageToggle({ onDark = false }: { onDark?: boolean }) {
  const { language, setLanguage } = useSettings();
  const border = onDark ? "border-white/40" : "border-black/15 dark:border-white/15";

  return (
    <div
      className={`inline-flex overflow-hidden rounded-full border ${border}`}
      role="group"
      aria-label="Language"
    >
      {OPTIONS.map((o) => {
        const active = language === o.value;
        const activeCls = onDark
          ? "bg-white text-brand"
          : "bg-brand text-white";
        const idleCls = onDark
          ? "text-white/90 hover:bg-white/10"
          : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300";
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setLanguage(o.value)}
            aria-pressed={active}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              active ? activeCls : idleCls
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
