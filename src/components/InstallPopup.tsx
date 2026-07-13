"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useInstallPrompt } from "@/lib/pwa/InstallPromptProvider";
import { useT } from "@/lib/i18n";

const DISMISS_KEY = "n5.installPopupDismissedAt";
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 2500;

export function InstallPopup() {
  const t = useT();
  const pathname = usePathname();
  const { platform, installed, canPromptInstall, install } = useInstallPrompt();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (installed) return;

    let recentlyDismissed = false;
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw && Date.now() - Number(raw) < SNOOZE_MS) recentlyDismissed = true;
    } catch {
      // localStorage unavailable (private mode etc.) — fall through and show.
    }
    if (recentlyDismissed) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [installed]);

  function dismiss() {
    setVisible(false);
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // Ignore — worst case the popup reappears next visit.
    }
  }

  async function handleInstall() {
    await install();
    setVisible(false);
  }

  if (installed || dismissed || !visible || pathname === "/settings") return null;

  return (
    <div className="fixed inset-x-0 bottom-20 z-30 flex justify-center px-4">
      <div className="w-full max-w-sm animate-popup-in rounded-2xl border border-black/10 bg-[var(--background)] p-4 shadow-xl dark:border-white/10">
        <div className="flex items-start gap-3">
          <img
            src="/icon.svg"
            alt=""
            className="h-10 w-10 shrink-0 rounded-xl"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-[var(--foreground)]">
              {t("Install N5 道場")}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              {t("Get the full-screen, offline app experience.")}
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label={t("Dismiss")}
            className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ✕
          </button>
        </div>

        {canPromptInstall ? (
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleInstall}
              className="flex-1 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white"
            >
              {t("Install app")}
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-xl px-4 py-2 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              {t("Maybe later")}
            </button>
          </div>
        ) : platform === "ios" ? (
          <p className="mt-3 text-xs text-slate-500">
            {t("Tap the Share icon 📤, then Add to Home Screen.")}
          </p>
        ) : (
          <p className="mt-3 text-xs text-slate-500">
            {t("Look for Install app in your browser's menu.")}
          </p>
        )}
      </div>
    </div>
  );
}
