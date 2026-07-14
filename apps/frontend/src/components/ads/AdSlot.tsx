"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// Public publisher ID, not a secret - matches the fallback in
// src/app/layout.tsx so ad units render without needing the env var set.
const CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "ca-pub-9567232763160769";

const PLACEMENTS = {
  dashboard: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_DASHBOARD,
    envVar: "NEXT_PUBLIC_ADSENSE_SLOT_DASHBOARD",
  },
  sessionDone: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SESSION_DONE,
    envVar: "NEXT_PUBLIC_ADSENSE_SLOT_SESSION_DONE",
  },
  sidebar: {
    slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
    envVar: "NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR",
  },
} as const;

export type AdPlacement = keyof typeof PLACEMENTS;

const DEFAULT_PLACEHOLDER_CLASS =
  "flex min-h-[90px] items-center justify-center rounded-2xl border border-dashed border-black/15 px-4 text-center text-xs text-slate-400 dark:border-white/15";

// Renders a real AdSense unit once NEXT_PUBLIC_ADSENSE_CLIENT_ID and the
// per-placement slot env var are set; otherwise shows a dashed placeholder so
// the layout is visible without needing real ad IDs yet. See .env.example.
export function AdSlot({
  placement,
  className,
}: {
  placement: AdPlacement;
  className?: string;
}) {
  const { slot, envVar } = PLACEMENTS[placement];
  const configured = Boolean(CLIENT_ID && slot);

  useEffect(() => {
    if (!configured) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blocked, offline, or script not ready yet — safe to ignore.
    }
  }, [configured]);

  if (!configured) {
    return (
      <div className={className ?? DEFAULT_PLACEHOLDER_CLASS}>
        Ad space — set NEXT_PUBLIC_ADSENSE_CLIENT_ID and {envVar} to enable
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
