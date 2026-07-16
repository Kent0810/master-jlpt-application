// Speaker icon that replaces the old 🔊 emoji. Sizes to 1em and uses
// currentColor, so callers control size/colour with normal text classes. Three
// states: a loading spinner, an idle speaker (dim second wave), and a playing
// speaker (both waves lit + gently animated).

export type AudioIconState = "idle" | "loading" | "playing";

export function AudioIcon({ state }: { state: AudioIconState }) {
  if (state === "loading") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-[1em] w-[1em] animate-spin"
        fill="none"
        aria-hidden
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2.5"
          opacity="0.25"
        />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  const playing = state === "playing";
  return (
    <svg viewBox="0 0 24 24" className="h-[1em] w-[1em]" aria-hidden>
      <path
        d="M3 10v4a1 1 0 0 0 1 1h3l3.3 3.3a1 1 0 0 0 1.7-.7V6.4a1 1 0 0 0-1.7-.7L7 9H4a1 1 0 0 0-1 1z"
        fill="currentColor"
      />
      <path
        d="M15.5 9.2a4 4 0 0 1 0 5.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className={playing ? "animate-pulse" : ""}
      />
      <path
        d="M18 6.7a7.5 7.5 0 0 1 0 10.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className={playing ? "animate-pulse" : "opacity-40"}
      />
    </svg>
  );
}
