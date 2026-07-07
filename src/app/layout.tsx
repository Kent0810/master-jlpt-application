import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { ServiceWorker } from "@/components/ServiceWorker";
import { SettingsProvider } from "@/lib/settings/SettingsProvider";

export const metadata: Metadata = {
  title: "N5 道場 — JLPT N5 Study",
  description:
    "Learn JLPT N5 kanji and vocabulary with furigana, romaji, audio, spaced-repetition flashcards and quizzes.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "N5 道場" },
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
        <SettingsProvider>
          <AppShell>{children}</AppShell>
          <ServiceWorker />
        </SettingsProvider>
      </body>
    </html>
  );
}
