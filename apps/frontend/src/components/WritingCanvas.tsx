"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  strokes: string[];
  viewBox: string;
  size?: number;
}

interface Point {
  x: number;
  y: number;
  w: number;
}

const MIN_WIDTH = 2;
const MAX_WIDTH = 14;

function widthFor(pressure: number): number {
  const p = pressure > 0 ? pressure : 0.5;
  return MIN_WIDTH + p * (MAX_WIDTH - MIN_WIDTH);
}

export function WritingCanvas({ strokes, viewBox, size = 300 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<Point | null>(null);
  const [showGuide, setShowGuide] = useState(true);
  const [penOnly, setPenOnly] = useState(false);
  const [hasPen, setHasPen] = useState(false);

  const vbSize = Number(viewBox.split(/\s+/)[2]) || 109;

  const inkColor = useCallback(() => {
    if (typeof window === "undefined") return "#111827";
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue("--foreground")
      .trim();
    return v || "#111827";
  }, []);

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);

    ctx.save();
    ctx.strokeStyle = "rgba(148,163,184,0.5)";
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(size / 2, 0);
    ctx.lineTo(size / 2, size);
    ctx.moveTo(0, size / 2);
    ctx.lineTo(size, size / 2);
    ctx.stroke();
    ctx.restore();

    if (showGuide) {
      ctx.save();
      const scale = size / vbSize;
      ctx.scale(scale, scale);
      ctx.strokeStyle = "rgba(148,163,184,0.5)";
      ctx.lineWidth = 3 / scale;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (const d of strokes) {
        try {
          ctx.stroke(new Path2D(d));
        } catch {
          /* ignore */
        }
      }
      ctx.restore();
    }
  }, [size, vbSize, strokes, showGuide]);

  useEffect(() => {
    drawGuide();
  }, [drawGuide]);

  function pointFrom(e: PointerEvent | React.PointerEvent): Point {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * size,
      y: ((e.clientY - rect.top) / rect.height) * size,
      w: widthFor(e.pressure),
    };
  }

  function accepts(e: React.PointerEvent): boolean {
    if (e.pointerType === "pen") return true;
    return !penOnly;
  }

  function segment(ctx: CanvasRenderingContext2D, from: Point, to: Point) {
    ctx.strokeStyle = inkColor();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = (from.w + to.w) / 2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  function start(e: React.PointerEvent) {
    if (e.pointerType === "pen" && !hasPen) setHasPen(true);
    if (e.pointerType === "pen" && !penOnly) setPenOnly(true);
    if (!accepts(e)) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    drawing.current = true;
    const p = pointFrom(e);
    last.current = p;
    // Dot so a quick tap leaves a mark.
    ctx.fillStyle = inkColor();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.w / 2, 0, Math.PI * 2);
    ctx.fill();
    canvasRef.current?.setPointerCapture(e.pointerId);
  }

  function move(e: React.PointerEvent) {
    if (!drawing.current || !accepts(e)) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !last.current) return;
    const native = e.nativeEvent;
    const events: (PointerEvent | React.PointerEvent)[] =
      typeof native.getCoalescedEvents === "function"
        ? native.getCoalescedEvents()
        : [e];
    for (const ev of events) {
      const p = pointFrom(ev);
      segment(ctx, last.current, p);
      last.current = p;
    }
  }

  function end() {
    drawing.current = false;
    last.current = null;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        onPointerCancel={end}
        className="w-full max-w-[300px] touch-none rounded-2xl border border-black/10 bg-white/5 dark:border-white/10"
        style={{ aspectRatio: "1 / 1" }}
      />
      {hasPen && (
        <p className="text-xs text-brand">
          ✏️ Apple Pencil connected — pressure sensitive
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={drawGuide}
          className="rounded-full border border-black/10 px-4 py-1.5 text-sm dark:border-white/15"
        >
          Clear
        </button>
        <button
          onClick={() => setShowGuide((g) => !g)}
          aria-pressed={showGuide}
          className={`rounded-full px-4 py-1.5 text-sm ${
            showGuide
              ? "bg-brand text-white"
              : "border border-black/10 dark:border-white/15"
          }`}
        >
          Guide {showGuide ? "on" : "off"}
        </button>
        <button
          onClick={() => setPenOnly((p) => !p)}
          aria-pressed={penOnly}
          title="Ignore finger and palm touches — rest your hand while writing"
          className={`rounded-full px-4 py-1.5 text-sm ${
            penOnly
              ? "bg-brand text-white"
              : "border border-black/10 dark:border-white/15"
          }`}
        >
          Pen only {penOnly ? "on" : "off"}
        </button>
      </div>
    </div>
  );
}
