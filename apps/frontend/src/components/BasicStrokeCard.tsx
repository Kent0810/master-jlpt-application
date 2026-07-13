import type { BasicStroke } from "@/lib/writing/curriculum";

export function BasicStrokeCard({ stroke }: { stroke: BasicStroke }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-black/10 p-4 shadow-sm transition-colors hover:border-brand/40 dark:border-white/10">
      <svg
        viewBox="0 0 100 100"
        width={72}
        height={72}
        className="shrink-0 rounded-2xl border border-black/10 bg-black/[0.015] dark:border-white/10 dark:bg-white/[0.02]"
        role="img"
        aria-label={`${stroke.name} stroke`}
      >
        <path
          d={stroke.path}
          fill="none"
          stroke="currentColor"
          className="text-black/10 dark:text-white/10"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={stroke.path}
          fill="none"
          stroke="currentColor"
          className="animate-stroke text-brand"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
        />
      </svg>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <h3 className="font-semibold">{stroke.name}</h3>
          <span className="font-jp text-sm text-slate-500">{stroke.jp}</span>
        </div>
        <p className="text-xs uppercase tracking-wide text-brand">
          {stroke.direction}
        </p>
        <p className="mt-1 text-sm text-slate-500">{stroke.description}</p>
      </div>
    </div>
  );
}
