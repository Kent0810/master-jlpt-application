"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";
import { AdSlot } from "@/components/ads/AdSlot";
import { InstallPopup } from "@/components/InstallPopup";

const SIDEBAR_AD_CLASS =
  "flex h-[600px] w-40 items-center justify-center rounded-2xl border border-dashed border-black/15 text-center text-xs text-slate-400 dark:border-white/15";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  if (isLanding) return <>{children}</>;

  const onSettings = pathname === "/settings";

  return (
    <div className="mx-auto flex w-full max-w-[1400px] justify-center gap-6">
      <aside className="hidden shrink-0 xl:block">
        <div className="sticky top-6">
          <AdSlot placement="sidebar" className={SIDEBAR_AD_CLASS} />
        </div>
      </aside>

      <div className="flex min-h-[100dvh] w-full max-w-2xl flex-col">
        <div className="flex justify-end px-4 pt-3">
          <Link
            href="/settings"
            aria-label="Settings"
            aria-current={onSettings ? "page" : undefined}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-lg transition-colors ${
              onSettings
                ? "border-brand text-brand"
                : "border-black/10 text-slate-500 hover:border-brand hover:text-brand dark:border-white/15"
            }`}
          >
            ⚙︎
          </Link>
        </div>
        <main className="flex-1 px-4 pb-24 pt-1">{children}</main>
        <Nav />
      </div>

      <aside className="hidden shrink-0 xl:block">
        <div className="sticky top-6">
          <AdSlot placement="sidebar" className={SIDEBAR_AD_CLASS} />
        </div>
      </aside>

      <InstallPopup />
    </div>
  );
}
