import Link from "next/link";

const STAGES = [
  {
    href: "/write/basics",
    step: "①",
    title: "Basic strokes",
    desc: "The fundamental lines every kanji is built from — dots, sweeps, hooks.",
  },
  {
    href: "/write/rules",
    step: "②",
    title: "Stroke-order rules",
    desc: "The simple rules that tell you which stroke comes first.",
  },
  {
    href: "/write/practice",
    step: "③",
    title: "Practice kanji",
    desc: "Trace real N5 kanji, from 1-stroke basics up to advanced ones.",
  },
];

export default function WriteHome() {
  return (
    <div className="space-y-5">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Learn to Write</h1>
        <p className="text-slate-500">
          Start with the basic lines, learn the order rules, then practise
          writing real kanji stroke by stroke.
        </p>
      </header>

      <ol className="space-y-3">
        {STAGES.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="flex items-center gap-4 rounded-2xl border border-black/10 p-5 transition-colors hover:border-brand dark:border-white/10"
            >
              <span className="font-jp text-3xl text-brand">{s.step}</span>
              <span className="min-w-0">
                <span className="block font-semibold">{s.title}</span>
                <span className="block text-sm text-slate-500">{s.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
