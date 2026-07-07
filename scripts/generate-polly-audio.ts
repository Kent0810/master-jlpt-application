// Optional, not run in v1. Generates Polly clips to S3 and writes audioUrl into
// data/n5-vocab.json. Needs AWS creds, the AWS SDK packages, and N5_AUDIO_BUCKET.
// Run: N5_AUDIO_BUCKET=my-bucket npm run data:audio
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Vocabulary } from "../src/lib/data/types";

const VOCAB = path.join(process.cwd(), "data", "n5-vocab.json");
const VOICE = process.env.N5_AUDIO_VOICE ?? "Mizuki";
const BUCKET = process.env.N5_AUDIO_BUCKET;
const PREFIX = process.env.N5_AUDIO_PREFIX ?? "n5-audio";
const REGION = process.env.AWS_REGION ?? "us-east-1";

async function main() {
  if (!BUCKET) {
    console.error(
      "N5_AUDIO_BUCKET is not set. This script is optional and skipped in v1.",
    );
    process.exit(1);
  }

  const { PollyClient, SynthesizeSpeechCommand } = await import(
    "@aws-sdk/client-polly"
  );
  const { S3Client, PutObjectCommand } = await import("@aws-sdk/client-s3");

  const polly = new PollyClient({ region: REGION });
  const s3 = new S3Client({ region: REGION });

  const vocab: Vocabulary[] = JSON.parse(await readFile(VOCAB, "utf8"));

  for (let i = 0; i < vocab.length; i++) {
    const v = vocab[i];
    const key = `${PREFIX}/${encodeURIComponent(v.word)}.mp3`;

    const speech = await polly.send(
      new SynthesizeSpeechCommand({
        Text: v.reading,
        OutputFormat: "mp3",
        VoiceId: VOICE as never,
        LanguageCode: "ja-JP",
      }),
    );
    const bytes = await speech.AudioStream?.transformToByteArray();
    if (!bytes) continue;

    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: bytes,
        ContentType: "audio/mpeg",
      }),
    );

    v.audioUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
    process.stdout.write(`\r  synthesized ${i + 1}/${vocab.length}`);
  }
  process.stdout.write("\n");

  await writeFile(VOCAB, JSON.stringify(vocab, null, 2) + "\n", "utf8");
  console.log(`Updated audioUrl for ${vocab.length} vocab items.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
