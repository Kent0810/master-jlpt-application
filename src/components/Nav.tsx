"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/dashboard", label: "Home", icon: "🏠" },
  { href: "/kanji", label: "Kanji", icon: "漢" },
  { href: "/vocab", label: "Vocab", icon: "語" },
  { href: "/write", label: "Write", icon: "筆" },
  { href: "/study", label: "Study", icon: "🗂️" },
  { href: "/quiz", label: "Quiz", icon: "✏️" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-black/10 bg-[var(--background)]/95 backdrop-blur dark:border-white/10">
      <ul className="mx-auto flex w-full max-w-2xl">
        {ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-2 text-xs transition-colors ${
                  active
                    ? "text-brand"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <span className="text-lg leading-none">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
