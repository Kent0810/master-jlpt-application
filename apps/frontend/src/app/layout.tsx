import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { ServiceWorker } from "@/components/ServiceWorker";
import { SettingsProvider } from "@/lib/settings/SettingsProvider";
import { InstallPromptProvider } from "@/lib/pwa/InstallPromptProvider";

// Public publisher ID, not a secret - safe to hardcode as a fallback so
// AdSense verification/loading works even where NEXT_PUBLIC_ADSENSE_CLIENT_ID
// isn't set (the env var still wins if someone points it at a different
// account).
const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "ca-pub-9567232763160769";

// Sets data-theme before first paint so there's no flash of the wrong theme
// (e.g. a dark-OS visitor briefly seeing dark before React hydrates and
// applies the app's actual "light" default). Mirrors resolveTheme() in
// src/lib/settings/theme.ts and the "n5.settings" key from SettingsProvider —
// duplicated here because this must run before any app JS loads.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var raw = localStorage.getItem("n5.settings");
    var pref = raw ? JSON.parse(raw).theme : "light";
    var theme =
      pref === "dark"
        ? "dark"
        : pref === "light"
        ? "light"
        : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export const metadata: Metadata = {
  title: "N5 道場 — JLPT N5 Study",
  description:
    "Learn JLPT N5 kanji and vocabulary with furigana, romaji, audio, spaced-repetition flashcards and quizzes.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "N5 道場" },
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
  },
};

export const viewport: Viewport = {
  themeColor: "#e11d48",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <InstallPromptProvider>
          <SettingsProvider>
            <AppShell>{children}</AppShell>
            <ServiceWorker />
          </SettingsProvider>
        </InstallPromptProvider>
        {ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
