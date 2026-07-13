"use client";

import { useState } from "react";
import { LEVELS } from "@/lib/levels";
import { useSettings } from "@/lib/settings/SettingsProvider";

export function LevelSelector() {
  const { level, setLevel } = useSettings();
  const [comingSoon, setComingSoon] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          JLPT level
        </h2>
        {comingSoon && (
          <span className="text-xs text-brand" role="status">
            {comingSoon} coming soon
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {LEVELS.map((info) => {
          const selected = info.available && level === info.level;
          const base =
            "flex flex-col items-center gap-0.5 rounded-2xl border p-3 text-center transition-colors";
          if (!info.available) {
            return (
              <button
                key={info.level}
                type="button"
                aria-disabled="true"
                onClick={() => setComingSoon(info.level)}
                className={`${base} cursor-not-allowed border-black/10 opacity-60 dark:border-white/10`}
                title={`${info.level} is not available yet`}
              >
                <span className="text-base font-bold">{info.label}</span>
                <span className="text-[10px] text-slate-500">🔒 Soon</span>
              </button>
            );
          }
          return (
            <button
              key={info.level}
              type="button"
              aria-pressed={selected}
              onClick={() => setLevel(info.level)}
              className={`${base} ${
                selected
                  ? "border-brand bg-brand text-white"
                  : "border-black/10 hover:border-brand dark:border-white/10"
              }`}
            >
              <span className="text-base font-bold">{info.label}</span>
              <span
                className={`text-[10px] ${
                  selected ? "text-white/80" : "text-slate-500"
                }`}
              >
                {info.blurb}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
