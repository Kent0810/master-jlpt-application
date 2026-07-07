"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { resolveTheme, type ThemePref, type ResolvedTheme } from "./theme";
import type { JlptLevel } from "@/lib/data/types";

export interface Settings {
  showFurigana: boolean;
  showRomaji: boolean;
  theme: ThemePref;
  level: JlptLevel;
}

const DEFAULTS: Settings = {
  showFurigana: true,
  showRomaji: true,
  theme: "system",
  level: "N5",
};
const STORAGE_KEY = "n5.settings";

interface SettingsContextValue extends Settings {
  resolvedTheme: ResolvedTheme;
  toggleFurigana: () => void;
  toggleRomaji: () => void;
  setTheme: (theme: ThemePref) => void;
  setLevel: (level: JlptLevel) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme = resolveTheme(settings.theme, systemDark);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
    document.body.classList.toggle("hide-furigana", !settings.showFurigana);
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, [settings, resolvedTheme]);

  const value: SettingsContextValue = {
    ...settings,
    resolvedTheme,
    toggleFurigana: () =>
      setSettings((s) => ({ ...s, showFurigana: !s.showFurigana })),
    toggleRomaji: () => setSettings((s) => ({ ...s, showRomaji: !s.showRomaji })),
    setTheme: (theme) => setSettings((s) => ({ ...s, theme })),
    setLevel: (level) => setSettings((s) => ({ ...s, level })),
  };

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
