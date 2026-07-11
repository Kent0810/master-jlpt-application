// Generates 25 original flat-style SVG hero illustrations for the lesson pages.
// Original artwork — simple geometric shapes only, no third-party art. These SVGs
// are bundled in the repo and shown as each lesson's hero image. Captions live in
// src/lib/lessonImages.ts. Regenerate with `pnpm data:lesson-images`.
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = process.argv[2] || "public/lesson-images";
mkdirSync(OUT, { recursive: true });

const BG = ["#EFF6FF","#F0FDF4","#FFF1F2","#FFFBEB","#F5F3FF","#ECFEFF","#FDF2F8","#F7FEE7"];
const AC = ["#3B82F6","#22C55E","#F43F5E","#F59E0B","#8B5CF6","#06B6D4","#EC4899","#65A30D"];
const INK = "#334155";
const LIGHT = "#CBD5E1";
const W = 400, H = 300;

// ---- helpers (all return SVG string fragments) --------------------------
const g = (attrs, inner) => `<g ${attrs}>${inner}</g>`;
const ink = (inner) =>
  g(`fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`, inner);
const circle = (cx, cy, r, fill = "none", stroke = "none", sw = 6) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const rrect = (x, y, w, h, r, fill = "none", stroke = "none", sw = 6) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line = (x1, y1, x2, y2, stroke = INK, sw = 6) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
const pathf = (d, fill, stroke = "none", sw = 6) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;

// a person: head circle + rounded shoulders, feet at feetY
function person(cx, feetY, s, color) {
  const headR = 15 * s;
  const headCy = feetY - 72 * s;
  const bodyTop = headCy + headR + 6 * s;
  const bw = 42 * s;
  const r = 16 * s;
  const d = `M ${cx - bw / 2} ${feetY}
    L ${cx - bw / 2} ${bodyTop + r}
    Q ${cx - bw / 2} ${bodyTop} ${cx - bw / 2 + r} ${bodyTop}
    L ${cx + bw / 2 - r} ${bodyTop}
    Q ${cx + bw / 2} ${bodyTop} ${cx + bw / 2} ${bodyTop + r}
    L ${cx + bw / 2} ${feetY} Z`;
  return circle(cx, headCy, headR, color) + pathf(d, color);
}

// speech bubble with a small tail at bottom-left
function bubble(x, y, w, h, fill = "#fff", stroke = INK) {
  const tail = `M ${x + 20} ${y + h} L ${x + 12} ${y + h + 16} L ${x + 36} ${y + h} Z`;
  return rrect(x, y, w, h, 14, fill, stroke, 5) + pathf(tail, fill, stroke, 5);
}

// a bold question mark centred at (cx,cy)
function qmark(cx, cy, s = 1, color = INK) {
  const d = `M ${cx - 11 * s} ${cy - 8 * s}
    Q ${cx - 11 * s} ${cy - 24 * s} ${cx + 3 * s} ${cy - 24 * s}
    Q ${cx + 16 * s} ${cy - 24 * s} ${cx + 16 * s} ${cy - 10 * s}
    Q ${cx + 16 * s} ${cy - 1 * s} ${cx + 3 * s} ${cy + 4 * s}
    L ${cx + 3 * s} ${cy + 10 * s}`;
  return (
    pathf(d, "none", color, 6) +
    circle(cx + 3 * s, cy + 22 * s, 4 * s, color)
  );
}

function heart(cx, cy, s, color) {
  const d = `M ${cx} ${cy + 14 * s}
    C ${cx - 20 * s} ${cy - 2 * s} ${cx - 14 * s} ${cy - 20 * s} ${cx} ${cy - 8 * s}
    C ${cx + 14 * s} ${cy - 20 * s} ${cx + 20 * s} ${cy - 2 * s} ${cx} ${cy + 14 * s} Z`;
  return pathf(d, color);
}

function star(cx, cy, s, color) {
  let pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 6 * s : 15 * s;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(" ")}" fill="${color}"/>`;
}

function pin(cx, topY, s, color) {
  const d = `M ${cx} ${topY} C ${cx - 22 * s} ${topY} ${cx - 22 * s} ${topY + 30 * s} ${cx} ${topY + 52 * s}
    C ${cx + 22 * s} ${topY + 30 * s} ${cx + 22 * s} ${topY} ${cx} ${topY} Z`;
  return pathf(d, color) + circle(cx, topY + 20 * s, 7 * s, "#fff");
}

function arrow(x1, y1, x2, y2, color = INK, sw = 6) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const hl = 14;
  const a1 = ang + Math.PI - 0.5, a2 = ang + Math.PI + 0.5;
  return (
    line(x1, y1, x2, y2, color, sw) +
    line(x2, y2, x2 + hl * Math.cos(a1), y2 + hl * Math.sin(a1), color, sw) +
    line(x2, y2, x2 + hl * Math.cos(a2), y2 + hl * Math.sin(a2), color, sw)
  );
}

function checkBadge(cx, cy, r, color = "#22C55E") {
  return (
    circle(cx, cy, r, color) +
    ink(`<path d="M ${cx - r * 0.45} ${cy} L ${cx - r * 0.1} ${cy + r * 0.4} L ${cx + r * 0.5} ${cy - r * 0.4}" stroke="#fff"/>`)
  );
}
function crossBadge(cx, cy, r, color = "#F43F5E") {
  return (
    circle(cx, cy, r, color) +
    g(`stroke="#fff" stroke-width="6" stroke-linecap="round"`,
      line(cx - r * 0.4, cy - r * 0.4, cx + r * 0.4, cy + r * 0.4, "#fff") +
      line(cx + r * 0.4, cy - r * 0.4, cx - r * 0.4, cy + r * 0.4, "#fff"))
  );
}
function noEntry(cx, cy, r, color = "#F43F5E") {
  return circle(cx, cy, r, "none", color, 8) + line(cx - r * 0.55, cy, cx + r * 0.55, cy, color, 8);
}

function clock(cx, cy, r, color) {
  return (
    circle(cx, cy, r, "#fff", color, 7) +
    line(cx, cy, cx, cy - r * 0.55, color, 6) +
    line(cx, cy, cx + r * 0.4, cy + r * 0.15, color, 6) +
    circle(cx, cy, 4, color)
  );
}

function giftBox(x, y, w, h, color) {
  return (
    rrect(x, y, w, h, 6, color) +
    rrect(x - 4, y - 10, w + 8, 16, 4, color) +
    line(x + w / 2, y - 8, x + w / 2, y + h, "#fff", 5) +
    pathf(`M ${x + w / 2} ${y - 8} q -18 -20 -26 -2 q 14 4 26 2 q 12 2 26 -2 q -8 -18 -26 2 Z`, color)
  );
}

function apple(cx, cy, s, color) {
  return (
    circle(cx, cy, 14 * s, color) +
    line(cx, cy - 14 * s, cx + 3, cy - 22 * s, "#65A30D", 4)
  );
}

function mountain(x, baseY, w, h, color) {
  const d = `M ${x} ${baseY} L ${x + w * 0.5} ${baseY - h} L ${x + w} ${baseY} Z`;
  const cap = `M ${x + w * 0.5 - w * 0.14} ${baseY - h + h * 0.28} L ${x + w * 0.5} ${baseY - h} L ${x + w * 0.5 + w * 0.14} ${baseY - h + h * 0.28} L ${x + w*0.5+6} ${baseY-h+h*0.34} L ${x+w*0.5} ${baseY-h+h*0.22} L ${x+w*0.5-6} ${baseY-h+h*0.34} Z`;
  return pathf(d, color) + pathf(cap, "#fff");
}

function flower(cx, cy, s, color) {
  let petals = "";
  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 / 5) * i - Math.PI / 2;
    petals += circle(cx + 13 * s * Math.cos(a), cy + 13 * s * Math.sin(a), 8 * s, color);
  }
  return petals + circle(cx, cy, 7 * s, "#FFFBEB");
}

// ---- scenes -------------------------------------------------------------
// each: (a=accent, a2=secondary accent) => inner svg string
const scenes = [
  // 1 Introductions
  (a, a2) => person(120, 245, 1.5, a) + person(280, 245, 1.5, a2) +
    bubble(150, 60, 100, 52) +
    circle(175, 86, 5, INK) + circle(200, 86, 5, INK) + circle(225, 86, 5, INK),
  // 2 This and That
  (a, a2) => rrect(150, 130, 100, 90, 12, a) +
    bubble(210, 55, 90, 60) + qmark(255, 92, 1.1, INK) +
    arrow(90, 175, 145, 175, a2, 7),
  // 3 Places
  (a, a2) => rrect(60, 120, 130, 110, 10, "#fff", a, 6) +
    pathf(`M 55 120 L 125 80 L 195 120 Z`, a) +
    pin(300, 90, 1.3, a2) + arrow(210, 175, 265, 150, INK, 6),
  // 4 Time & Daily Verbs
  (a) => clock(200, 150, 78, a),
  // 5 Going Places
  (a, a2) => rrect(70, 150, 200, 70, 18, a) + rrect(90, 165, 50, 34, 6, "#fff") +
    rrect(160, 165, 50, 34, 6, "#fff") + circle(110, 228, 14, INK) + circle(230, 228, 14, INK) +
    line(50, 250, 350, 250, LIGHT, 6) +
    pathf(`M 300 120 L 300 150 L 340 135 Z`, a2),
  // 6 Doing Things
  (a, a2) => line(90, 210, 310, 210, INK, 7) + line(120, 210, 120, 255, INK, 7) + line(280, 210, 280, 255, INK, 7) +
    circle(170, 190, 26, "#fff", a, 6) + circle(170, 190, 10, a) +
    rrect(230, 165, 34, 40, 6, a2) + line(264, 178, 280, 178, a2, 6),
  // 7 Tools & Giving
  (a, a2) => giftBox(150, 150, 100, 90, a) + heart(320, 90, 1.2, a2),
  // 8 Adjectives
  (a, a2) => mountain(60, 235, 150, 150, a) + flower(300, 200, 2.2, a2) + line(300, 214, 300, 250, "#65A30D", 6),
  // 9 Likes & Reasons
  (a, a2) => person(200, 250, 1.6, a) + heart(200, 90, 1.8, a2),
  // 10 Existence (shelf with books + a cat beside it)
  (a, a2) => rrect(70, 120, 120, 100, 8, "none", INK, 6) + line(70, 172, 190, 172, INK, 5) +
    rrect(84, 132, 15, 34, 3, a) + rrect(104, 130, 15, 36, 3, a2) + rrect(124, 134, 15, 32, 3, AC[5]) +
    rrect(150, 138, 15, 28, 3, a) +
    // cat
    pathf(`M 258 168 L 265 150 L 276 168 Z`, a) + pathf(`M 292 168 L 299 150 L 306 168 Z`, a) +
    circle(282, 182, 20, a) + circle(276, 180, 3, INK) + circle(288, 180, 3, INK) +
    pathf(`M 262 200 q 20 26 40 0 q 8 18 0 26 l -40 0 q -8 -8 0 -26 Z`, a) +
    pathf(`M 300 216 q 22 -2 16 -26`, "none", a, 6),
  // 11 Counting
  (a, a2) => apple(140, 190, 2, a) + apple(200, 190, 2, a2) + apple(260, 190, 2, a) +
    line(110, 235, 290, 235, LIGHT, 6),
  // 12 Past & Comparison
  (a, a2) => line(200, 70, 200, 150, INK, 6) + line(120, 110, 280, 90, INK, 6) +
    circle(120, 150, 34, a) + circle(280, 130, 20, a2) +
    line(120, 130, 120, 150, INK, 5) + line(280, 118, 280, 130, INK, 5) +
    rrect(185, 150, 30, 40, 4, INK),
  // 13 Wants & Purpose
  (a, a2) => rrect(90, 90, 150, 130, 10, "#fff", INK, 6) + star(165, 155, 2.2, a) +
    bubble(250, 70, 90, 58) + star(295, 100, 1.2, a2),
  // 14 The te-form (request)
  (a, a2) => person(150, 250, 1.5, a) +
    pathf(`M 150 250 q 60 0 70 -40`, "none", INK, 5) +
    bubble(240, 90, 100, 54) + line(258, 112, 322, 112, LIGHT, 6) + line(258, 124, 300, 124, LIGHT, 6),
  // 15 Permission
  (a, a2) => checkBadge(140, 150, 52, "#22C55E") + noEntry(280, 150, 50, "#F43F5E"),
  // 16 Connecting Actions
  (a, a2) => circle(90, 150, 24, a) + circle(200, 150, 24, a2) + circle(310, 150, 24, a) +
    arrow(118, 150, 172, 150, INK, 6) + arrow(228, 150, 282, 150, INK, 6),
  // 17 The nai-form
  (a, a2) => person(150, 250, 1.4, a) + line(150, 175, 150, 130, a, 8) + circle(150, 118, 12, a) +
    crossBadge(280, 130, 42, "#F43F5E"),
  // 18 Dictionary Form
  (a, a2) => pathf(`M 70 110 Q 200 80 200 120 Q 200 80 330 110 L 330 220 Q 200 190 200 230 Q 200 190 70 220 Z`, "#fff", INK, 6) +
    line(200, 120, 200, 230, INK, 5) + star(300, 90, 1.4, a2),
  // 19 The ta-form
  (a, a2) => bubble(90, 70, 150, 110) + pin(165, 95, 1.2, a) +
    person(300, 250, 1.2, a2),
  // 20 Plain / Casual
  (a, a2) => bubble(70, 80, 130, 70, a) + bubble(210, 130, 130, 70, a2),
  // 21 Opinions
  (a, a2) => person(160, 250, 1.5, a) +
    (() => { // cloud bubble
      const c = "#fff";
      return circle(280, 100, 34, c, INK, 5) + circle(320, 115, 22, c, INK, 5) + circle(250, 120, 22, c, INK, 5) +
        circle(215, 175, 7, c, INK, 4) + circle(232, 155, 11, c, INK, 4);
    })() + line(280, 96, 280, 112, a2, 6) + circle(280, 122, 4, a2),
  // 22 Describing Nouns
  (a, a2) => person(110, 250, 1.1, LIGHT) + person(290, 250, 1.1, LIGHT) + person(200, 250, 1.3, a) +
    circle(200, 150, 46, "none", a2, 7) + line(233, 183, 270, 220, a2, 8),
  // 23 When & If
  (a, a2) => pathf(`M 70 250 L 200 250 L 200 120`, "none", LIGHT, 20) +
    pathf(`M 70 250 L 200 250 L 200 120`, "none", INK, 6) +
    arrow(200, 160, 200, 120, a, 6) + clock(315, 90, 30, a2),
  // 24 Giving & Receiving
  (a, a2) => person(110, 245, 1.3, a) + person(290, 245, 1.3, a2) + heart(200, 140, 1.6, "#F43F5E") +
    arrow(150, 150, 185, 145, INK, 5) + arrow(250, 150, 215, 145, INK, 5),
  // 25 Conditionals
  (a, a2) => line(160, 250, 160, 120, INK, 8) +
    pathf(`M 160 130 L 250 130 L 270 150 L 250 170 L 160 170 Z`, a) +
    pathf(`M 160 90 L 60 90 L 40 110 L 60 130 L 160 130 Z`, a2),
];

for (let i = 0; i < 25; i++) {
  const lesson = i + 1;
  const bg = BG[i % BG.length];
  const a = AC[i % AC.length];
  const a2 = AC[(i + 3) % AC.length];
  const inner = scenes[i](a, a2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <rect x="0" y="0" width="${W}" height="${H}" rx="24" fill="${bg}"/>
  ${inner}
</svg>
`;
  const name = `hero-l${String(lesson).padStart(2, "0")}.svg`;
  writeFileSync(`${OUT}/${name}`, svg);
}

const readme = `# Lesson hero illustrations (original SVG)

These are **original** flat-style vector illustrations, one hero image per lesson,
generated by \`scripts/gen-lesson-images.mjs\`. They use only simple geometric
shapes — no third-party or textbook artwork. Captions live in
\`src/lib/lessonImages.ts\`; the lesson page shows \`/lesson-images/hero-l<NN>.svg\`.

- ${25} files: \`hero-l01.svg\` … \`hero-l25.svg\`.
- Regenerate any time with \`pnpm data:lesson-images\`.
- To restyle, edit the palette or scene functions in the generator and re-run.
`;
writeFileSync(`${OUT}/README.md`, readme);
console.log(`Wrote 25 SVGs + README to ${OUT}`);
