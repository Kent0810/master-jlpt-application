"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  strokes: string[];
  viewBox: string;
  size?: number;
}

export function WritingCanvas({ strokes, viewBox, size = 300 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [showGuide, setShowGuide] = useState(true);

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

  function pos(e: React.PointerEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * size,
      y: ((e.clientY - rect.top) / rect.height) * size,
    };
  }

  function start(e: React.PointerEvent) {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    drawing.current = true;
    const { x, y } = pos(e);
    ctx.strokeStyle = inkColor();
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
    canvasRef.current?.setPointerCapture(e.pointerId);
  }

  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function end() {
    drawing.current = false;
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
        className="w-full max-w-[300px] touch-none rounded-2xl border border-black/10 bg-white/5 dark:border-white/10"
        style={{ aspectRatio: "1 / 1" }}
      />
      <div className="flex gap-2">
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
            showGuide ? "bg-brand text-white" : "border border-black/10 dark:border-white/15"
          }`}
        >
          Guide {showGuide ? "on" : "off"}
        </button>
      </div>
    </div>
  );
}
