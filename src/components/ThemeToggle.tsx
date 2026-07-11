"use client";

import { useSettings } from "@/lib/settings/SettingsProvider";

interface Props {
  className?: string;
}

export function ThemeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useSettings();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={
        className ??
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-lg text-white transition-colors hover:bg-white/10"
      }
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
