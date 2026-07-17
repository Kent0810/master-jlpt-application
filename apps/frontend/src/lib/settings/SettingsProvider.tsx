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

export type Language = "vi" | "en";

export interface Settings {
  showFurigana: boolean;
  showRomaji: boolean;
  theme: ThemePref;
  level: JlptLevel;
  language: Language;
}

const DEFAULTS: Settings = {
  showFurigana: true,
  showRomaji: true,
  theme: "light",
  level: "N5",
  language: "vi",
};
const STORAGE_KEY = "n5.settings";

interface SettingsContextValue extends Settings {
  resolvedTheme: ResolvedTheme;
  toggleFurigana: () => void;
  toggleRomaji: () => void;
  setTheme: (theme: ThemePref) => void;
  setLevel: (level: JlptLevel) => void;
  setLanguage: (language: Language) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  // False until the stored settings have been loaded into state. Persisting is
  // gated on this: the first post-mount effect pass still sees DEFAULTS, and
  // writing those would clobber the saved settings before they're read back
  // (guaranteed to lose them under StrictMode's double mount).
  const [hydrated, setHydrated] = useState(false);
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULTS, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
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
    if (hydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch {
        /* ignore */
      }
    }
    document.body.classList.toggle("hide-furigana", !settings.showFurigana);
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  }, [hydrated, settings, resolvedTheme]);

  const value: SettingsContextValue = {
    ...settings,
    resolvedTheme,
    toggleFurigana: () =>
      setSettings((s) => ({ ...s, showFurigana: !s.showFurigana })),
    toggleRomaji: () =>
      setSettings((s) => ({ ...s, showRomaji: !s.showRomaji })),
    setTheme: (theme) => setSettings((s) => ({ ...s, theme })),
    setLevel: (level) => setSettings((s) => ({ ...s, level })),
    setLanguage: (language) => setSettings((s) => ({ ...s, language })),
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
