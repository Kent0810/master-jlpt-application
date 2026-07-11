export interface AudioPlayer {
  isAvailable(): boolean;
  play(text: string, audioUrl?: string | null): Promise<void>;
}

export class WebSpeechPlayer implements AudioPlayer {
  private voice: SpeechSynthesisVoice | null = null;
  private ready = false;

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
    this.ready = true;
  }

  isAvailable(): boolean {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return false;
    }
    return !this.ready || this.voice !== null;
  }

  play(text: string): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ja-JP";
      if (this.voice) u.voice = this.voice;
      u.rate = 0.9;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      window.speechSynthesis.speak(u);
    });
  }
}

let webSpeech: WebSpeechPlayer | null = null;

function getWebSpeech(): WebSpeechPlayer {
  return (webSpeech ??= new WebSpeechPlayer());
}

export class ClipPlayer implements AudioPlayer {
  isAvailable(): boolean {
    return typeof Audio !== "undefined";
  }

  play(text: string, audioUrl?: string | null): Promise<void> {
    if (!audioUrl || typeof Audio === "undefined") {
      return getWebSpeech().play(text);
    }
    return new Promise((resolve) => {
      const audio = new Audio(audioUrl);
      // Fall back to on-device speech if the clip can't load (offline, 403,
      // not yet generated) so the button always makes a sound.
      const fallback = () => getWebSpeech().play(text).then(resolve, resolve);
      audio.onended = () => resolve();
      audio.onerror = fallback;
      void audio.play().catch(fallback);
    });
  }
}

let clip: ClipPlayer | null = null;

export function getPlayer(audioUrl?: string | null): AudioPlayer {
  if (audioUrl) {
    clip ??= new ClipPlayer();
    return clip;
  }
  return getWebSpeech();
}
