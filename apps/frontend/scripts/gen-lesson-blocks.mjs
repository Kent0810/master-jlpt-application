// Generates data/n5-lesson-blocks.json for every lesson.
//
// Lessons listed in data/n5-lesson-blocks.authored.json use their hand-authored
// layout verbatim (these carry the paragraph and Q&A reading passages that can't
// be auto-generated). Every other lesson is synthesized from verified data:
// one named section per grammar point with a grammar block and a fill-in-the-
// blank exercise DERIVED from that point's own example sentences, then the
// lesson's conversational dialogue, the vocab list, and a vocab check.
//
// Run: node scripts/gen-lesson-blocks.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(dir, "..", "data");
const read = (f) => JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8"));

const grammar = read("n5-grammar.json");
const authored = read("n5-lesson-blocks.authored.json");
const authoredByLesson = new Map(authored.map((l) => [l.lesson, l]));

// Single-hiragana particles safe to use as blank options. Destination へ/に can
// both be valid, but we only ever blank the particle the grammar point is
// teaching (a standalone token in its structure pattern), so the intended answer
// is unambiguous within that section.
const PARTICLES = ["は", "が", "を", "に", "で", "へ", "と", "も"];

// Particles that share a slot and can both be valid, so we never offer one as a
// distractor when the other is the answer.
const CONFUSABLE = { は: ["も"], も: ["は"] };

// The standalone particle tokens named in a grammar point's structure pattern,
// e.g. "[place] へ 行きます" → ["へ"]. は is pushed last because it appears in
// almost every pattern; we prefer to blank the point's focus particle instead.
function structureParticles(structure) {
  const found = structure
    .split(/[\s[\]/／・、。]+/)
    .filter((tok) => PARTICLES.includes(tok));
  return [...new Set(found)].sort((a, b) =>
    a === "は" ? 1 : b === "は" ? -1 : 0,
  );
}

function countChar(str, ch) {
  return str.split(ch).length - 1;
}

function rotate(arr, by) {
  const n = arr.length;
  const k = ((by % n) + n) % n;
  return [...arr.slice(k), ...arr.slice(0, k)];
}

// Build up to 2 fill-in-the-blank items for a grammar point by blanking the
// particle it teaches in example sentences where that particle appears exactly
// once (so the blank has a single unambiguous answer).
function grammarExercise(g, seed) {
  const targets = structureParticles(g.structure);
  if (targets.length === 0) return null;
  const items = [];
  for (const ex of g.examples) {
    for (const p of targets) {
      if (countChar(ex.jp, p) !== 1) continue;
      if (ex.jp.indexOf(p) === 0) continue;
      const exclude = new Set([p, ...(CONFUSABLE[p] || [])]);
      const distractors = PARTICLES.filter((x) => !exclude.has(x)).slice(0, 3);
      const options = rotate([p, ...distractors], seed + items.length);
      items.push({
        prompt: ex.jp.replace(p, "（　）"),
        options,
        answer: options.indexOf(p),
        explanation: {
          en: `Pattern: ${g.structure}`,
          vi: `Mẫu câu: ${g.structure}`,
        },
      });
      break;
    }
    if (items.length >= 2) break;
  }
  if (items.length === 0) return null;
  return {
    kind: "exercise",
    title: { en: "Practice · grammar", vi: "Luyện tập · ngữ pháp" },
    source: "authored",
    items,
  };
}

function buildLesson(lesson) {
  const points = grammar.filter((g) => g.lesson === lesson);
  const blocks = [];
  points.forEach((g, j) => {
    blocks.push({
      kind: "section",
      title: { en: `Part ${j + 1}`, vi: `Phần ${j + 1}` },
      subtitle: { en: g.meaning, vi: g.meaningVi || g.meaning },
    });
    blocks.push({ kind: "grammar", grammarIds: [g.id] });
    const ex = grammarExercise(g, lesson + j);
    if (ex) blocks.push(ex);
  });
  blocks.push({ kind: "dialogue", style: "conversational", source: "lesson" });
  blocks.push({ kind: "vocab" });
  blocks.push({
    kind: "exercise",
    title: { en: "Vocabulary check", vi: "Kiểm tra từ vựng" },
    source: "vocab-auto",
  });
  return { lesson, blocks };
}

const layouts = [];
for (let lesson = 1; lesson <= 25; lesson++) {
  layouts.push(authoredByLesson.get(lesson) ?? buildLesson(lesson));
}

const generatedCount = 25 - authoredByLesson.size;
fs.writeFileSync(
  path.join(dataDir, "n5-lesson-blocks.json"),
  JSON.stringify(layouts, null, 2) + "\n",
);
console.log(
  `Wrote ${layouts.length} lessons: ${authoredByLesson.size} authored ` +
    `(${[...authoredByLesson.keys()].sort((a, b) => a - b).join(", ")}), ` +
    `${generatedCount} generated.`,
);
