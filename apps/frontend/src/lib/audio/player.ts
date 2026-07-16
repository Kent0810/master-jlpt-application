import { audioUrlFor } from "./url";

// Called when audio actually starts sounding (as opposed to still loading a
// clip), so the UI can move from a loading spinner to a "playing" state.
export interface PlayHooks {
  onPlaying?: () => void;
}

export interface AudioPlayer {
  isAvailable(): boolean;
  play(
    text: string,
    audioUrl?: string | null,
    hooks?: PlayHooks,
  ): Promise<void>;
}

export class WebSpeechPlayer implements AudioPlayer {
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    this.loadVoice();
    window.speechSynthesis.addEventListener?.("voiceschanged", () =>
      this.loadVoice(),
    );
  }

  private loadVoice() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices();
    this.voice =
      voices.find((v) => v.lang === "ja-JP") ??
      voices.find((v) => v.lang.startsWith("ja")) ??
      null;
  }

  isAvailable(): boolean {
    // Available whenever the browser can synthesize speech at all. We do NOT
    // gate on a Japanese voice being loaded yet: voices load asynchronously, so
    // requiring one here would flakily hide the button on cold page loads. The
    // best available voice is chosen at play() time instead.
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  play(
    text: string,
    _audioUrl?: string | null,
    hooks?: PlayHooks,
  ): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        resolve();
        return;
      }
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        clearTimeout(cap);
        resolve();
      };
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ja-JP";
      if (this.voice) u.voice = this.voice;
      u.rate = 0.9;
      u.onstart = () => hooks?.onPlaying?.();
      u.onend = finish;
      u.onerror = finish;
      // Some engines drop an utterance silently (no matching voice) and never
      // fire onend/onerror — cap the wait so the button can't hang in "playing".
      const cap = setTimeout(
        finish,
        Math.min(15000, Math.max(2500, text.length * 350)),
      );
      window.speechSynthesis.speak(u);
      // Some browsers never fire onstart for very short utterances — signal
      // "playing" optimistically on the next tick as a floor.
      setTimeout(() => hooks?.onPlaying?.(), 120);
    });
  }
}

let webSpeech: WebSpeechPlayer | null = null;

function getWebSpeech(): WebSpeechPlayer {
  return (webSpeech ??= new WebSpeechPlayer());
}

// Clip URLs that failed to load once (offline, 404, not-yet-generated). Remembered
// so we don't re-attempt the fetch and instead go straight to Web Speech.
const failedUrls = new Set<string>();

export class ClipPlayer implements AudioPlayer {
  isAvailable(): boolean {
    return typeof Audio !== "undefined";
  }

  play(
    text: string,
    audioUrl?: string | null,
    hooks?: PlayHooks,
  ): Promise<void> {
    if (!audioUrl || typeof Audio === "undefined" || failedUrls.has(audioUrl)) {
      return getWebSpeech().play(text, null, hooks);
    }
    return new Promise((resolve) => {
      const audio = new Audio(audioUrl);
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        resolve();
      };
      // Fall back to on-device speech if the clip can't load (offline, 403, not
      // yet generated) or stalls, so the button always makes a sound — and
      // remember the failure so later taps skip straight to speech.
      const fallback = () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        failedUrls.add(audioUrl);
        try {
          audio.pause();
        } catch {
          // ignore
        }
        getWebSpeech().play(text, null, hooks).then(resolve, resolve);
      };
      // Guard only the loading phase: if playback never starts within a few
      // seconds (stalled fetch), give up and fall back rather than spin forever.
      const timer = setTimeout(fallback, 6000);
      audio.onplaying = () => {
        clearTimeout(timer);
        hooks?.onPlaying?.();
      };
      audio.onended = finish;
      audio.onerror = fallback;
      void audio.play().catch(fallback);
    });
  }
}

let clip: ClipPlayer | null = null;

function getClip(): ClipPlayer {
  return (clip ??= new ClipPlayer());
}

// Resolve which clip URL (if any) to attempt for `text`: an explicitly stored
// URL wins, otherwise the derived one; a URL known to have failed resolves to
// null so we fall back to Web Speech without another round-trip. Pure and
// testable — the players own the actual playback.
export function resolveClipUrl(
  text: string,
  explicitUrl?: string | null,
): string | null {
  const url = explicitUrl ?? audioUrlFor(text);
  if (!url || failedUrls.has(url)) return null;
  return url;
}

/** Test-only: forget remembered clip failures. */
export function _resetFailedUrls(): void {
  failedUrls.clear();
}

// Play `text`: a natural clip when one is available, else on-device speech.
export function playAudio(
  text: string,
  explicitUrl?: string | null,
  hooks?: PlayHooks,
): Promise<void> {
  const url = resolveClipUrl(text, explicitUrl);
  if (url) return getClip().play(text, url, hooks);
  return getWebSpeech().play(text, null, hooks);
}

// Whether the button should show at all: true if a clip could exist or the
// device can speak. Hides the control only when neither is possible.
export function isAudioAvailable(
  text: string,
  explicitUrl?: string | null,
): boolean {
  if (resolveClipUrl(text, explicitUrl) && typeof Audio !== "undefined") {
    return true;
  }
  return getWebSpeech().isAvailable();
}

// Back-compat: existing callers that pick a player then call .play(). New code
// should prefer playAudio()/isAudioAvailable().
export function getPlayer(audioUrl?: string | null): AudioPlayer {
  return audioUrl ? getClip() : getWebSpeech();
}
