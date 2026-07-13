"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n";

const ITEMS = [
  { href: "/dashboard", label: "Home", icon: "🏠" },
  { href: "/kanji", label: "Kanji", icon: "漢", matches: ["/kanji", "/write"] },
  {
    href: "/practice",
    label: "Practice",
    icon: "🗂️",
    matches: ["/practice", "/study", "/quiz"],
  },
];

export function Nav() {
  const pathname = usePathname();
  const t = useT();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-black/10 bg-[var(--background)]/95 backdrop-blur dark:border-white/10">
      <ul className="mx-auto flex w-full max-w-2xl">
        {ITEMS.map((item) => {
          const paths = item.matches ?? [item.href];
          const active =
            item.href === "/"
              ? pathname === "/"
              : paths.some((p) => pathname.startsWith(p));
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-2 text-[10px] leading-none transition-colors ${
                  active
                    ? "text-brand"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <span className="text-lg leading-none">{item.icon}</span>
                <span className="max-w-full truncate px-0.5">
                  {t(item.label)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
