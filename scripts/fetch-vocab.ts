import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { normalizeMnnVocab, type RawMnn } from "../src/lib/data/normalize";
import type { Vocabulary } from "../src/lib/data/types";

// Word selection and translations © 3A Corporation, non-commercial. See data/ATTRIBUTION.md.
const SRC =
  "https://raw.githubusercontent.com/vitto4/MinnaNoDS/HEAD/minna-no-ds.yaml";
const OUT = path.join(process.cwd(), "data", "n5-vocab.json");
const MAX_LESSON = 25;

function parseMnn(yaml: string, maxLesson: number): RawMnn[] {
  const lines = yaml.split("\n");
  const out: RawMnn[] = [];
  let lesson = 0;
  let cur: Partial<RawMnn> | null = null;

  const flush = () => {
    if (cur && cur.lesson && cur.lesson <= maxLesson && cur.kana && cur.en) {
      out.push({
        lesson: cur.lesson,
        kanji: cur.kanji ?? null,
        kana: cur.kana,
        romaji: cur.romaji ?? "",
        en: cur.en,
      });
    }
    cur = null;
  };

  for (const raw of lines) {
    const lm = raw.match(/^lesson-(\d+):/);
    if (lm) {
      flush();
      lesson = parseInt(lm[1], 10);
      continue;
    }
    const idm = raw.match(/^\s*-\s*id:\s*\[(\d+),/);
    if (idm) {
      flush();
      cur = { lesson };
      continue;
    }
    if (!cur) continue;
    let m: RegExpMatchArray | null;
    if ((m = raw.match(/^\s*kanji:\s*(~|"(.*)")\s*$/))) {
      cur.kanji = m[2] !== undefined ? m[2] : null;
    } else if ((m = raw.match(/^\s*kana:\s*"(.*)"\s*$/))) {
      cur.kana = m[1];
    } else if ((m = raw.match(/^\s*romaji:\s*"(.*)"\s*$/))) {
      cur.romaji = m[1];
    } else if ((m = raw.match(/^\s*en:\s*"(.*)",?\s*$/))) {
      cur.en = m[1];
    }
  }
  flush();
  return out;
}

async function main() {
  console.log("Fetching Minna no Nihongo vocabulary…");
  const res = await fetch(SRC);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const raw = parseMnn(await res.text(), MAX_LESSON);
  console.log(`  parsed ${raw.length} Shokyū I entries`);

  const seen = new Set<string>();
  const vocab: Vocabulary[] = [];
  for (const r of raw) {
    const v = normalizeMnnVocab(r);
    if (seen.has(v.id)) continue;
    seen.add(v.id);
    vocab.push(v);
  }

  vocab.sort((a, b) =>
    (a.mnnLesson ?? 99) - (b.mnnLesson ?? 99) ||
    a.reading.localeCompare(b.reading, "ja"),
  );

  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(vocab, null, 2) + "\n", "utf8");
  console.log(`Wrote ${vocab.length} vocab -> ${path.relative(process.cwd(), OUT)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
