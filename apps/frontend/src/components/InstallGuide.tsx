"use client";

import { useInstallPrompt } from "@/lib/pwa/InstallPromptProvider";
import { useT } from "@/lib/i18n";

export function InstallGuide() {
  const t = useT();
  const { platform, installed, canPromptInstall, install } = useInstallPrompt();

  if (installed) {
    return (
      <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm">
        <h3 className="flex items-center gap-2 font-semibold text-[var(--foreground)]">
          <span>✅</span> {t("App installed")}
        </h3>
        <p className="mt-1 text-slate-500">
          {t("JLPT 道場 is installed on this device and works offline.")}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-black/10 p-4 text-sm dark:border-white/10">
      <h3 className="font-semibold text-[var(--foreground)]">
        {t("Install the app")}
      </h3>
      <p className="mt-1 text-slate-500">
        {t(
          "Add JLPT 道場 to your home screen for a faster, full-screen, offline experience.",
        )}
      </p>

      {canPromptInstall ? (
        <button
          onClick={install}
          className="mt-3 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white"
        >
          {t("Install app")}
        </button>
      ) : platform === "ios" ? (
        <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-slate-600 dark:text-slate-300">
          <li>{t("Tap the Share icon 📤 in Safari's toolbar.")}</li>
          <li>{t("Scroll down and tap Add to Home Screen.")}</li>
          <li>{t("Tap Add to confirm.")}</li>
        </ol>
      ) : platform === "android" ? (
        <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-slate-600 dark:text-slate-300">
          <li>{t("Open the browser menu (⋮).")}</li>
          <li>{t("Tap Add to Home screen or Install app.")}</li>
        </ol>
      ) : (
        <p className="mt-3 text-slate-500">
          {t(
            "Open this site in Chrome or Edge to install it as an app, or just bookmark it — it works great in the browser too.",
          )}
        </p>
      )}
    </section>
  );
}
