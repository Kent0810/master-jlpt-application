"use client";

import Link from "next/link";
import { useSettings } from "@/lib/settings/SettingsProvider";
import type { ThemePref } from "@/lib/settings/theme";
import { LevelSelector } from "@/components/LevelSelector";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useT } from "@/lib/i18n";

const THEMES: { value: ThemePref; label: string }[] = [
  { value: "system", label: "Auto" },
  { value: "light", label: "☀️ Light" },
  { value: "dark", label: "🌙 Dark" },
];

function Row({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 p-4 dark:border-white/10">
      <div className="min-w-0">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const {
    showFurigana,
    showRomaji,
    theme,
    toggleFurigana,
    toggleRomaji,
    setTheme,
  } = useSettings();
  const t = useT();

  return (
    <div className="space-y-5">
      <Link href="/dashboard" className="text-sm text-brand">
        {t("← Home")}
      </Link>
      <h1 className="text-2xl font-bold">{t("Settings")}</h1>

      <section className="space-y-3">
        <Row title={t("Language")} desc={t("Interface and word meanings.")}>
          <LanguageToggle />
        </Row>

        <Row title={t("Theme")} desc={t("Light, dark, or follow your device.")}>
          <div className="inline-flex overflow-hidden rounded-full border border-black/15 dark:border-white/15">
            {THEMES.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setTheme(opt.value)}
                aria-pressed={theme === opt.value}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  theme === opt.value
                    ? "bg-brand text-white"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {t(opt.label)}
              </button>
            ))}
          </div>
        </Row>

        <Row title={t("Furigana")} desc={t("Show kana readings above kanji.")}>
          <Switch on={showFurigana} onClick={toggleFurigana} label="Furigana" />
        </Row>

        <Row title={t("Romaji")} desc={t("Show Latin-alphabet readings.")}>
          <Switch on={showRomaji} onClick={toggleRomaji} label="Romaji" />
        </Row>
      </section>

      <section className="space-y-2">
        <LevelSelector />
      </section>

      <section className="rounded-2xl border border-black/10 p-4 text-sm text-slate-500 dark:border-white/10">
        <h3 className="font-semibold text-[var(--foreground)]">About the data</h3>
        <p className="mt-1">
          Vocabulary is the Minna no Nihongo Shokyū Ⅰ word list (lessons 1–25),
          used for personal study alongside the textbooks. Word selection and
          translations are © 3A Corporation — non-commercial use only. Kanji data
          from KANJIDIC (EDRDG); stroke order from KanjiVG (CC BY-SA).
        </p>
        <p className="mt-2">
          Progress is stored only on this device. Clearing your browser data
          resets it.
        </p>
      </section>
    </div>
  );
}

function Switch({
  on,
  onClick,
  label,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={`inline-flex h-7 w-12 items-center rounded-full transition-colors ${
        on ? "bg-brand" : "bg-black/15 dark:bg-white/20"
      }`}
    >
      <span
        className={`h-6 w-6 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
