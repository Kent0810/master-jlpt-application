"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n";

const TABS = [
  { href: "/kanji", label: "Browse", icon: "漢" },
  { href: "/write", label: "Write", icon: "筆" },
];

export function KanjiWriteTabs() {
  const pathname = usePathname();
  const t = useT();

  return (
    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-black/5 p-1 dark:bg-white/10">
      {TABS.map((tab) => {
        const active = pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold transition-colors ${
              active
                ? "bg-white text-brand shadow-sm dark:bg-white/10 dark:text-white"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <span className="font-jp">{tab.icon}</span>
            {t(tab.label)}
          </Link>
        );
      })}
    </div>
  );
}
