import { afterEach, describe, expect, it, vi } from "vitest";
import { audioKey, audioUrlFor, readingForAudio } from "./url";

describe("readingForAudio", () => {
  it("strips affix markers and okurigana", () => {
    expect(readingForAudio("ひと-")).toBe("ひと");
    expect(readingForAudio("ひと.つ")).toBe("ひと");
    expect(readingForAudio("イチ")).toBe("イチ");
    expect(readingForAudio("うみ")).toBe("うみ");
  });
});

describe("audioKey", () => {
  it("URL-encodes Japanese text", () => {
    expect(audioKey("海")).toBe("%E6%B5%B7");
    expect(audioKey("せんせい")).toBe("%E3%81%9B%E3%82%93%E3%81%9B%E3%81%84");
  });
});

describe("audioUrlFor", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns null when no base is configured", () => {
    vi.stubEnv("NEXT_PUBLIC_AUDIO_BASE", "");
    expect(audioUrlFor("海")).toBeNull();
  });

  it("returns null for empty text", () => {
    vi.stubEnv("NEXT_PUBLIC_AUDIO_BASE", "https://cdn.example.com/n5");
    expect(audioUrlFor("")).toBeNull();
  });

  it("derives a clip URL from the text", () => {
    vi.stubEnv("NEXT_PUBLIC_AUDIO_BASE", "https://cdn.example.com/n5");
    expect(audioUrlFor("海")).toBe("https://cdn.example.com/n5/%E6%B5%B7.mp3");
  });

  it("trims a trailing slash on the base", () => {
    vi.stubEnv("NEXT_PUBLIC_AUDIO_BASE", "https://cdn.example.com/n5/");
    expect(audioUrlFor("海")).toBe("https://cdn.example.com/n5/%E6%B5%B7.mp3");
  });
});
