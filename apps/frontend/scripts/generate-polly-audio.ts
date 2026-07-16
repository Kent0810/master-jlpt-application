// Optional, not run by default. Synthesizes Amazon Polly clips for the app's
// Japanese audio — vocabulary readings, kanji on/kun readings, dialogue lines,
// and grammar example sentences — and uploads them to S3. The app derives each
// clip's URL from the text it plays (see src/lib/audio/url.ts), so this script
// does NOT write anything back into the data files. It just needs the uploaded
// keys to match `audioKey(text)`.
//
// Setup (once):
//   pnpm add -D @aws-sdk/client-polly @aws-sdk/client-s3
//   export AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=...   (or a shared profile)
//
// Run:  N5_AUDIO_BUCKET=my-bucket pnpm data:audio
//
// Then point the app at the clips by setting, in .env.local:
//   NEXT_PUBLIC_AUDIO_BASE=https://<bucket>.s3.<region>.amazonaws.com/<prefix>
//
// Voice/model: defaults to the neural engine with the Kazuha (ja-JP) neural
// voice. Override with N5_AUDIO_VOICE (e.g. Tomoko, Takumi) and N5_AUDIO_ENGINE
// (neural | standard). Mizuki is standard-only — pair it with N5_AUDIO_ENGINE=standard.
//
// The bucket must serve these objects to the browser (public-read policy or a
// CDN in front). Re-runs are cheap: keys already present in the bucket are
// skipped unless N5_AUDIO_FORCE=1.
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Vocabulary, Kanji, ExampleSentence } from "../src/lib/data/types";
import { audioKey, readingForAudio } from "../src/lib/audio/url";

const DATA = path.join(process.cwd(), "data");
const VOICE = process.env.N5_AUDIO_VOICE ?? "Kazuha";
const ENGINE = (process.env.N5_AUDIO_ENGINE ?? "neural") as
  "neural" | "standard";
const BUCKET = process.env.N5_AUDIO_BUCKET;
const PREFIX = process.env.N5_AUDIO_PREFIX ?? "n5-audio";
const REGION = process.env.AWS_REGION ?? "us-east-1";
const FORCE = process.env.N5_AUDIO_FORCE === "1";

const CACHE_CONTROL = "public, max-age=31536000, immutable";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function withRetry<T>(fn: () => Promise<T>, label: string): Promise<T> {
  let delay = 500;
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const name = (err as { name?: string }).name ?? "";
      const throttled = /Throttling|TooManyRequests|Timeout/i.test(name);
      if (!throttled || attempt >= 5) throw err;
      process.stdout.write(`\n  ${label} throttled, retrying in ${delay}ms…`);
      await sleep(delay);
      delay *= 2;
    }
  }
}

const readJson = async <T>(file: string): Promise<T> =>
  JSON.parse(await readFile(path.join(DATA, file), "utf8")) as T;

// Every distinct Japanese string the app will ask to play, keyed by its clip
// key so identical readings collapse to one clip.
async function collectTexts(): Promise<string[]> {
  const texts = new Set<string>();
  const add = (t?: string | null) => {
    const s = (t ?? "").trim();
    if (s) texts.add(s);
  };

  const vocab = await readJson<Vocabulary[]>("n5-vocab.json");
  for (const v of vocab) add(v.reading);

  const kanji = await readJson<Kanji[]>("n5-kanji.json");
  for (const k of kanji)
    for (const r of [...k.kunyomi, ...k.onyomi]) add(readingForAudio(r));

  const grammar =
    await readJson<{ examples: ExampleSentence[] }[]>("n5-grammar.json");
  for (const g of grammar) for (const ex of g.examples) add(ex.reading);

  const dialogues =
    await readJson<{ lines: { reading?: string }[] }[]>("n5-dialogues.json");
  for (const d of dialogues) for (const line of d.lines) add(line.reading);

  return [...texts];
}

async function main() {
  if (!BUCKET) {
    console.error(
      "N5_AUDIO_BUCKET is not set. See the header of this script for setup.",
    );
    process.exit(1);
  }

  const { PollyClient, SynthesizeSpeechCommand } =
    await import("@aws-sdk/client-polly");
  const { S3Client, PutObjectCommand, ListObjectsV2Command } =
    await import("@aws-sdk/client-s3");

  const polly = new PollyClient({ region: REGION });
  const s3 = new S3Client({ region: REGION });

  const texts = await collectTexts();
  const base = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${PREFIX}`;

  // Existing keys, so re-runs only synthesize what's missing.
  const existing = new Set<string>();
  if (!FORCE) {
    let token: string | undefined;
    do {
      const res = await s3.send(
        new ListObjectsV2Command({
          Bucket: BUCKET,
          Prefix: `${PREFIX}/`,
          ContinuationToken: token,
        }),
      );
      for (const o of res.Contents ?? []) if (o.Key) existing.add(o.Key);
      token = res.IsTruncated ? res.NextContinuationToken : undefined;
    } while (token);
  }

  console.log(
    `${texts.length} distinct clips with ${VOICE} (${ENGINE}) → s3://${BUCKET}/${PREFIX}/`,
  );

  let done = 0;
  let skipped = 0;
  for (let i = 0; i < texts.length; i++) {
    const text = texts[i];
    const key = `${PREFIX}/${audioKey(text)}.mp3`;

    if (!FORCE && existing.has(key)) {
      skipped++;
      continue;
    }

    const speech = await withRetry(
      () =>
        polly.send(
          new SynthesizeSpeechCommand({
            Text: text,
            OutputFormat: "mp3",
            VoiceId: VOICE as never,
            Engine: ENGINE,
            LanguageCode: "ja-JP",
          }),
        ),
      text,
    );
    const bytes = await speech.AudioStream?.transformToByteArray();
    if (!bytes) continue;

    await withRetry(
      () =>
        s3.send(
          new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: bytes,
            ContentType: "audio/mpeg",
            CacheControl: CACHE_CONTROL,
          }),
        ),
      text,
    );

    done++;
    process.stdout.write(`\r  synthesized ${i + 1}/${texts.length}`);
  }
  process.stdout.write("\n");

  console.log(`Done: ${done} generated, ${skipped} already up to date.`);
  console.log(`\nSet this in .env.local so the app plays them:`);
  console.log(`  NEXT_PUBLIC_AUDIO_BASE=${base}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
