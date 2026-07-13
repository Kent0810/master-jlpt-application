import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import * as wanakana from "wanakana";
import { normalizeKanji, type RawKanji } from "../src/lib/data/normalize";
import type { Kanji } from "../src/lib/data/types";

// N5 set = jlpt_old === 4 (pre-2010 level 4, ~103 kanji). See data/ATTRIBUTION.md.
const SRC =
  "https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json";
const OUT = path.join(process.cwd(), "data", "n5-kanji.json");

interface DlEntry {
  strokes: number;
  jlpt_old: number | null;
  jlpt_new: number | null;
  meanings: string[];
  readings_on: string[];
  readings_kun: string[];
}

function toRawKanji(char: string, e: DlEntry): RawKanji {
  return {
    kanji: char,
    meanings: (e.meanings ?? []).map((m) => m.toLowerCase()),
    on_readings: (e.readings_on ?? []).map((r) => wanakana.toKatakana(r)),
    kun_readings: e.readings_kun ?? [],
    stroke_count: e.strokes,
    jlpt: 5,
    unicode: char.codePointAt(0)!.toString(16),
  };
}

async function main() {
  console.log("Fetching kanji dataset…");
  const res = await fetch(SRC);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = (await res.json()) as Record<string, DlEntry>;

  const kanji: Kanji[] = Object.entries(data)
    .filter(([, e]) => e.jlpt_old === 4)
    .map(([char, e]) => normalizeKanji(toRawKanji(char, e)));

  kanji.sort((a, b) =>
    a.strokeCount === b.strokeCount
      ? a.character.localeCompare(b.character)
      : a.strokeCount - b.strokeCount,
  );

  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(kanji, null, 2) + "\n", "utf8");
  console.log(
    `Wrote ${kanji.length} kanji -> ${path.relative(process.cwd(), OUT)}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
