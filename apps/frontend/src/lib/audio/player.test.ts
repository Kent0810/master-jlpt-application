import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resolveClipUrl, _resetFailedUrls, ClipPlayer } from "./player";

describe("resolveClipUrl", () => {
  beforeEach(() => {
    _resetFailedUrls();
    vi.stubEnv("NEXT_PUBLIC_AUDIO_BASE", "https://cdn.example.com/n5");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    _resetFailedUrls();
  });

  it("prefers an explicit URL over the derived one", () => {
    expect(resolveClipUrl("海", "https://other/x.mp3")).toBe(
      "https://other/x.mp3",
    );
  });

  it("derives from text when no explicit URL is given", () => {
    expect(resolveClipUrl("海")).toBe(
      "https://cdn.example.com/n5/%E6%B5%B7.mp3",
    );
  });

  it("returns null when no base is configured and no explicit URL", () => {
    vi.stubEnv("NEXT_PUBLIC_AUDIO_BASE", "");
    expect(resolveClipUrl("海")).toBeNull();
  });
});

describe("ClipPlayer negative cache", () => {
  beforeEach(() => {
    _resetFailedUrls();
    vi.stubEnv("NEXT_PUBLIC_AUDIO_BASE", "https://cdn.example.com/n5");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    _resetFailedUrls();
    vi.restoreAllMocks();
  });

  it("remembers a failed clip URL so it is not retried", async () => {
    // Audio stub that immediately errors, and speechSynthesis that resolves.
    class FakeAudio {
      onplaying: (() => void) | null = null;
      onended: (() => void) | null = null;
      onerror: (() => void) | null = null;
      play() {
        queueMicrotask(() => this.onerror?.());
        return Promise.resolve();
      }
    }
    vi.stubGlobal("Audio", FakeAudio as unknown as typeof Audio);
    vi.stubGlobal("window", {
      speechSynthesis: {
        cancel() {},
        speak(u: { onend?: () => void }) {
          u.onend?.();
        },
        getVoices: () => [],
        addEventListener() {},
      },
      SpeechSynthesisUtterance: class {},
    });
    vi.stubGlobal(
      "SpeechSynthesisUtterance",
      class {
        onstart: (() => void) | null = null;
        onend: (() => void) | null = null;
        onerror: (() => void) | null = null;
      },
    );

    const url = "https://cdn.example.com/n5/%E6%B5%B7.mp3";
    expect(resolveClipUrl("海")).toBe(url);

    const player = new ClipPlayer();
    await player.play("umi", url);

    // After the failure the URL is remembered and no longer resolves.
    expect(resolveClipUrl("海")).toBeNull();
  });
});
