import Link from "next/link";
import { KanjiWriteTabs } from "@/components/KanjiWriteTabs";

const STAGES = [
  {
    href: "/write/basics",
    step: 1,
    icon: "✏️",
    title: "Basic strokes",
    desc: "The fundamental lines every kanji is built from — dots, sweeps, hooks.",
  },
  {
    href: "/write/rules",
    step: 2,
    icon: "📐",
    title: "Stroke-order rules",
    desc: "The simple rules that tell you which stroke comes first.",
  },
  {
    href: "/write/practice",
    step: 3,
    icon: "🖋️",
    title: "Practice kanji",
    desc: "Trace real N5 kanji, from 1-stroke basics up to advanced ones.",
  },
];

export default function WriteHome() {
  return (
    <div className="space-y-6">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-soft px-6 py-8 text-white shadow-lg">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-6 select-none font-jp text-[7rem] font-bold leading-none opacity-15"
        >
          筆
        </div>
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            3-step path
          </p>
          <h1 className="mt-1 text-3xl font-bold">Learn to Write</h1>
          <p className="mt-1 max-w-md text-sm text-white/90">
            Start with the basic lines, learn the order rules, then practise
            writing real kanji stroke by stroke.
          </p>
        </div>
      </header>

      <KanjiWriteTabs />

      <ol className="space-y-3">
        {STAGES.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="group flex items-center gap-4 rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-2xl transition-transform group-hover:scale-110 dark:bg-brand/20">
                {s.icon}
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                  {s.step}
                </span>
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">{s.title}</span>
                <span className="block text-sm text-slate-500">{s.desc}</span>
              </span>
              <span className="ml-auto shrink-0 text-brand transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
