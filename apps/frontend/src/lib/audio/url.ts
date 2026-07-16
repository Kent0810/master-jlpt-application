// Natural-audio clips live at a single configured base URL (an S3 bucket or CDN
// set via NEXT_PUBLIC_AUDIO_BASE). Each clip's key is the exact text that was
// synthesized, URL-encoded — so the app can derive a clip's URL from the text
// alone, with no per-item URL stored in the data files. When the base is unset
// (no clips generated yet) callers fall back to on-device Web Speech.

export function audioKey(text: string): string {
  return encodeURIComponent(text);
}

// Kana readings in the kanji data carry markers that shouldn't be spoken: "-"
// for affix boundaries and "." separating a kun reading from its okurigana
// (e.g. "ひと-", "ひと.つ" → "ひと"). Use this for both playback and the clip key
// so the app's request and the generated file agree.
export function readingForAudio(reading: string): string {
  return reading.replace(/\..*$/, "").replace(/-/g, "").trim();
}

export function audioUrlFor(text: string): string | null {
  const base = process.env.NEXT_PUBLIC_AUDIO_BASE;
  if (!base || !text) return null;
  return `${base.replace(/\/+$/, "")}/${audioKey(text)}.mp3`;
}
