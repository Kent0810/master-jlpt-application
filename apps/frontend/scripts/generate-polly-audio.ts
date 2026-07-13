// Optional, not run by default. Synthesizes Amazon Polly clips for every vocab
// item, uploads them to S3, and writes the public URL into data/n5-vocab.json as
// `audioUrl`. Once populated, the app's ClipPlayer plays these instead of the
// on-device Web Speech voice.
//
// Setup (once):
//   pnpm add -D @aws-sdk/client-polly @aws-sdk/client-s3
//   export AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=...   (or a shared profile)
//
// Run:  N5_AUDIO_BUCKET=my-bucket pnpm data:audio
//
// Voice/model: defaults to the neural engine with the Kazuha (ja-JP) neural
// voice. Override with N5_AUDIO_VOICE (e.g. Tomoko, Takumi) and N5_AUDIO_ENGINE
// (neural | standard). Mizuki is standard-only — pair it with N5_AUDIO_ENGINE=standard.
//
// The bucket must serve these objects to the browser (public-read policy or a
// CDN in front). Re-runs are cheap: items already pointing at this bucket/prefix
// are skipped unless N5_AUDIO_FORCE=1.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Vocabulary } from "../src/lib/data/types";

const VOCAB = path.join(process.cwd(), "data", "n5-vocab.json");
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

async function main() {
  if (!BUCKET) {
    console.error(
      "N5_AUDIO_BUCKET is not set. See the header of this script for setup.",
    );
    process.exit(1);
  }

  const { PollyClient, SynthesizeSpeechCommand } =
    await import("@aws-sdk/client-polly");
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");

  const polly = new PollyClient({ region: REGION });
  const s3 = new S3Client({ region: REGION });

  const vocab: Vocabulary[] = JSON.parse(await readFile(VOCAB, "utf8"));
  const baseUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${PREFIX}/`;

  console.log(
    `Synthesizing ${vocab.length} clips with ${VOICE} (${ENGINE}) → s3://${BUCKET}/${PREFIX}/`,
  );

  let done = 0;
  let skipped = 0;
  for (let i = 0; i < vocab.length; i++) {
    const v = vocab[i];
    const key = `${PREFIX}/${encodeURIComponent(v.word)}.mp3`;
    const url = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

    if (!FORCE && v.audioUrl && v.audioUrl.startsWith(baseUrl)) {
      skipped++;
      continue;
    }

    const speech = await withRetry(
      () =>
        polly.send(
          new SynthesizeSpeechCommand({
            Text: v.reading,
            OutputFormat: "mp3",
            VoiceId: VOICE as never,
            Engine: ENGINE,
            LanguageCode: "ja-JP",
          }),
        ),
      v.word,
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
      v.word,
    );

    v.audioUrl = url;
    done++;
    process.stdout.write(`\r  synthesized ${i + 1}/${vocab.length}`);
  }
  process.stdout.write("\n");

  await writeFile(VOCAB, JSON.stringify(vocab, null, 2) + "\n", "utf8");
  console.log(`Done: ${done} generated, ${skipped} already up to date.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
