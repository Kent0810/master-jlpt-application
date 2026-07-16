// Aggregates per-lesson expansion content from ./lessons/L01.cjs … L25.cjs.
// Each lesson module exports { examples?, explanations?, exercises? }; keys never
// collide across lessons, so a shallow merge is sufficient. Applied by
// scripts/expand-content.cjs.
const fs = require("fs");
const path = require("path");

const merged = { examples: {}, explanations: {}, exercises: {} };
const dir = path.join(__dirname, "lessons");

for (const file of fs.readdirSync(dir).sort()) {
  if (!file.endsWith(".cjs")) continue;
  const mod = require(path.join(dir, file));
  Object.assign(merged.examples, mod.examples || {});
  Object.assign(merged.explanations, mod.explanations || {});
  Object.assign(merged.exercises, mod.exercises || {});
}

module.exports = merged;
