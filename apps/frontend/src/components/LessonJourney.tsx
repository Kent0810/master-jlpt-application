"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LESSON_META, type LessonMeta } from "@/lib/lessons/lessons";
import { lessonAccent, accentTint } from "@/lib/lessonAccents";
import { getLessonHero, lessonImageSrc } from "@/lib/lessonImages";
import {
  firstUncompleted,
  useLessonProgress,
  type LessonProgress,
} from "@/lib/lessons/progress";
import { useT, useLang } from "@/lib/i18n";

const CHAPTER_SIZE = 5;

const LESSON_ROW_H = 148;
const MARKER_ROW_H = 76;
const NODE_SIZE = 72;
const STARS_H = 2;
const NODE_CENTER_Y = STARS_H + NODE_SIZE / 2;
const AMPLITUDE = 0.28; // horizontal swing, as a fraction of container width

type Row =
  | { kind: "banner"; first: number; last: number }
  | { kind: "lesson"; meta: LessonMeta; xFrac: number }
  | { kind: "finish" };

function buildRows(): Row[] {
  const rows: Row[] = [];
  LESSON_META.forEach((meta, i) => {
    if (i % CHAPTER_SIZE === 0) {
      rows.push({
        kind: "banner",
        first: meta.lesson,
        last: Math.min(
          meta.lesson + CHAPTER_SIZE - 1,
          LESSON_META[LESSON_META.length - 1].lesson,
        ),
      });
    }
    rows.push({
      kind: "lesson",
      meta,
      xFrac: 0.5 + AMPLITUDE * Math.sin((i * Math.PI) / 2),
    });
  });
  rows.push({ kind: "finish" });
  return rows;
}

function rowHeight(row: Row): number {
  return row.kind === "lesson" ? LESSON_ROW_H : MARKER_ROW_H;
}

// Center point of each row's node/marker, in pixels.
function rowPoints(rows: Row[], width: number): [number, number][] {
  let top = 0;
  return rows.map((row) => {
    const x = width * (row.kind === "lesson" ? row.xFrac : 0.5);
    const y = top + (row.kind === "lesson" ? NODE_CENTER_Y : MARKER_ROW_H / 2);
    top += rowHeight(row);
    return [x, y];
  });
}

// Smooth vertical S-curves through consecutive points.
function pathThrough(points: [number, number][]): string {
  if (points.length === 0) return "";
  const [x0, y0] = points[0];
  let d = `M ${x0} ${y0}`;
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    const k = (y2 - y1) / 2;
    d += ` C ${x1} ${y1 + k}, ${x2} ${y2 - k}, ${x2} ${y2}`;
  }
  return d;
}

export function LessonJourney() {
  const rows = buildRows();
  const progress = useLessonProgress();
  const current = firstUncompleted(
    progress,
    LESSON_META.map((m) => m.lesson),
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setWidth(el.getBoundingClientRect().width);
    // Measure immediately: ResizeObserver's first delivery waits for a
    // rendering frame, which background tabs don't get.
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const points = rowPoints(rows, width);
  // The "traveled" stretch of the path ends at the current lesson's node.
  const currentRowIndex = rows.findIndex(
    (r) => r.kind === "lesson" && r.meta.lesson === current,
  );
  const traveledEnd =
    currentRowIndex === -1 ? points.length : currentRowIndex + 1;

  return (
    <div ref={containerRef} className="relative">
      {width > 0 && (
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${width} ${rows.reduce((h, r) => h + rowHeight(r), 0)}`}
        >
          <path
            d={pathThrough(points)}
            fill="none"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="1 12"
            className="stroke-black/20 dark:stroke-white/25"
          />
          <path
            d={pathThrough(points.slice(0, traveledEnd))}
            fill="none"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="1 12"
            className="stroke-brand/60"
          />
        </svg>
      )}

      {rows.map((row) => {
        if (row.kind === "banner") {
          return (
            <ChapterBanner
              key={`c${row.first}`}
              first={row.first}
              last={row.last}
            />
          );
        }
        if (row.kind === "finish") {
          return (
            <div
              key="finish"
              aria-hidden
              className="flex items-center justify-center"
              style={{ height: MARKER_ROW_H }}
            >
              <span
                className="z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-lg shadow-sm dark:border-white/15"
                style={{ backgroundColor: "var(--background)" }}
              >
                🏁
              </span>
            </div>
          );
        }
        return (
          <MapNode
            key={row.meta.lesson}
            meta={row.meta}
            xFrac={row.xFrac}
            progress={progress[row.meta.lesson]}
            isCurrent={row.meta.lesson === current}
          />
        );
      })}
    </div>
  );
}

function ChapterBanner({ first, last }: { first: number; last: number }) {
  const t = useT();
  return (
    <div
      className="flex items-center justify-center"
      style={{ height: MARKER_ROW_H }}
    >
      <span
        className="z-10 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-sm font-semibold shadow-sm dark:border-white/15"
        style={{ backgroundColor: "var(--background)" }}
      >
        <span aria-hidden className="text-base">
          ⛩️
        </span>
        {t("Lesson")} {first}–{last}
      </span>
    </div>
  );
}

function MapNode({
  meta,
  xFrac,
  progress,
  isCurrent,
}: {
  meta: LessonMeta;
  xFrac: number;
  progress: LessonProgress | undefined;
  isCurrent: boolean;
}) {
  const t = useT();
  const lang = useLang();
  const accent = lessonAccent(meta.lesson);
  const title = lang === "vi" ? meta.titleVi : meta.titleEn;
  const completed = Boolean(progress);
  const upcoming = !completed && !isCurrent;

  return (
    <div className="relative" style={{ height: LESSON_ROW_H }}>
      <div
        // z-20 beats the banners' z-10: the translate creates a stacking
        // context, so the hover card's own z-index can't escape this wrapper.
        className="absolute top-0 z-20 flex w-40 -translate-x-1/2 flex-col items-center"
        style={{ left: `${xFrac * 100}%` }}
      >
        <Stars stars={progress?.stars} />
        <Link
          href={`/lessons/${meta.lesson}`}
          aria-label={`${t("Lesson")} ${meta.lesson}: ${title}${
            progress ? ` — ${progress.stars}/3 ★` : ""
          }`}
          className="group relative z-10 block"
        >
          <HoverCard meta={meta} accent={accent} title={title} />
          {isCurrent && (
            <span
              aria-hidden
              className="absolute inset-0 rounded-full opacity-40 motion-safe:animate-ping motion-safe:[animation-duration:1.8s]"
              style={{ backgroundColor: accent }}
            />
          )}
          <span
            className={`relative flex items-center justify-center rounded-full border-4 font-jp text-xl font-bold shadow-md transition-transform group-hover:scale-110 ${
              upcoming
                ? "bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-400"
                : "text-white"
            } ${isCurrent ? "ring-4" : ""}`}
            style={{
              width: NODE_SIZE,
              height: NODE_SIZE,
              backgroundColor: upcoming ? undefined : accent,
              borderColor: "var(--background)",
              ...(isCurrent
                ? ({
                    "--tw-ring-color": `${accent}55`,
                  } as React.CSSProperties)
                : null),
            }}
          >
            {meta.lesson}
          </span>
        </Link>
        <p
          className={`mt-1.5 line-clamp-2 text-center text-xs font-semibold leading-tight ${
            upcoming ? "text-slate-400" : ""
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

// Floating preview card shown when a node is hovered or keyboard-focused:
// the lesson's hero illustration and name, above the node.
function HoverCard({
  meta,
  accent,
  title,
}: {
  meta: LessonMeta;
  accent: string;
  title: string;
}) {
  const t = useT();
  const hero = getLessonHero(meta.lesson);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-max -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
    >
      <div
        className="flex items-center gap-3 rounded-2xl border border-black/10 p-3 pr-4 shadow-lg dark:border-white/15"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl"
          style={{ backgroundColor: accentTint(accent, 0.1) }}
        >
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lessonImageSrc(hero.file)}
              alt=""
              className="h-14 w-auto object-contain"
            />
          ) : (
            <span className="font-jp text-sm" style={{ color: accent }}>
              第{meta.lesson}課
            </span>
          )}
        </div>
        <div className="max-w-44 text-left">
          <p
            className="text-[0.65rem] font-bold uppercase tracking-wide"
            style={{ color: accent }}
          >
            {t("Lesson")} {meta.lesson}
          </p>
          <p className="text-sm font-bold leading-snug">{title}</p>
        </div>
      </div>
    </div>
  );
}

// Candy Crush-style star arc overlapping the top of a completed node.
function Stars({ stars }: { stars: number | undefined }) {
  if (!stars) return <span aria-hidden style={{ height: STARS_H }} />;
  return (
    <span
      aria-hidden
      className="z-20 flex items-end text-base leading-none"
      style={{ height: STARS_H, marginBottom: -6 }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`${
            i < stars
              ? "text-amber-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
              : "text-black/15 dark:text-white/20"
          } ${i === 1 ? "-translate-y-1.5 text-lg" : ""}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}
