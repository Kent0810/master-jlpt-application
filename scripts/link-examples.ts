import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Kanji, Vocabulary } from "../src/lib/data/types";

const KANJI = path.join(process.cwd(), "data", "n5-kanji.json");
const VOCAB = path.join(process.cwd(), "data", "n5-vocab.json");
const MAX_EXAMPLES = 3;

async function main() {
  const kanji: Kanji[] = JSON.parse(await readFile(KANJI, "utf8"));
  const vocab: Vocabulary[] = JSON.parse(await readFile(VOCAB, "utf8"));

  const byLength = [...vocab].sort((a, b) => a.word.length - b.word.length);

  for (const k of kanji) {
    const matches: string[] = [];
    for (const v of byLength) {
      if (v.word.includes(k.character)) {
        matches.push(v.id);
        if (matches.length >= MAX_EXAMPLES) break;
      }
    }
    k.exampleVocabIds = matches;
  }

  await writeFile(KANJI, JSON.stringify(kanji, null, 2) + "\n", "utf8");
  const linked = kanji.filter((k) => k.exampleVocabIds.length > 0).length;
  console.log(`Linked examples for ${linked}/${kanji.length} kanji.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
