// Generates 71 original flat-style SVG illustrations, one per N5 grammar point,
// shown inline in each lesson's Grammar section. Original artwork — simple
// geometric shapes only, no third-party art (same approach as
// gen-lesson-images.mjs). Captions live in src/lib/grammarImages.ts.
// Regenerate with `pnpm data:grammar-images`.
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = process.argv[2] || "public/grammar-images";
mkdirSync(OUT, { recursive: true });

const BG = [
  "#EFF6FF",
  "#F0FDF4",
  "#FFF1F2",
  "#FFFBEB",
  "#F5F3FF",
  "#ECFEFF",
  "#FDF2F8",
  "#F7FEE7",
];
const AC = [
  "#3B82F6",
  "#22C55E",
  "#F43F5E",
  "#F59E0B",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#65A30D",
];
const INK = "#334155";
const LIGHT = "#CBD5E1";
const W = 400,
  H = 300;

// ---- base helpers (mirrors gen-lesson-images.mjs) ------------------------
const g = (attrs, inner) => `<g ${attrs}>${inner}</g>`;
const ink = (inner) =>
  g(
    `fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`,
    inner,
  );
const circle = (cx, cy, r, fill = "none", stroke = "none", sw = 6) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const rrect = (x, y, w, h, r, fill = "none", stroke = "none", sw = 6) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line = (x1, y1, x2, y2, stroke = INK, sw = 6) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
const pathf = (d, fill, stroke = "none", sw = 6) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;

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

function bubble(x, y, w, h, fill = "#fff", stroke = INK) {
  const tail = `M ${x + 20} ${y + h} L ${x + 12} ${y + h + 16} L ${x + 36} ${y + h} Z`;
  return rrect(x, y, w, h, 14, fill, stroke, 5) + pathf(tail, fill, stroke, 5);
}

function qmark(cx, cy, s = 1, color = INK) {
  const d = `M ${cx - 11 * s} ${cy - 8 * s}
    Q ${cx - 11 * s} ${cy - 24 * s} ${cx + 3 * s} ${cy - 24 * s}
    Q ${cx + 16 * s} ${cy - 24 * s} ${cx + 16 * s} ${cy - 10 * s}
    Q ${cx + 16 * s} ${cy - 1 * s} ${cx + 3 * s} ${cy + 4 * s}
    L ${cx + 3 * s} ${cy + 10 * s}`;
  return (
    pathf(d, "none", color, 6) + circle(cx + 3 * s, cy + 22 * s, 4 * s, color)
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
    pts.push(
      `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`,
    );
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
  const a1 = ang + Math.PI - 0.5,
    a2 = ang + Math.PI + 0.5;
  return (
    line(x1, y1, x2, y2, color, sw) +
    line(x2, y2, x2 + hl * Math.cos(a1), y2 + hl * Math.sin(a1), color, sw) +
    line(x2, y2, x2 + hl * Math.cos(a2), y2 + hl * Math.sin(a2), color, sw)
  );
}

function checkBadge(cx, cy, r, color = "#22C55E") {
  return (
    circle(cx, cy, r, color) +
    ink(
      `<path d="M ${cx - r * 0.45} ${cy} L ${cx - r * 0.1} ${cy + r * 0.4} L ${cx + r * 0.5} ${cy - r * 0.4}" stroke="#fff"/>`,
    )
  );
}
function crossBadge(cx, cy, r, color = "#F43F5E") {
  return (
    circle(cx, cy, r, color) +
    g(
      `stroke="#fff" stroke-width="6" stroke-linecap="round"`,
      line(cx - r * 0.4, cy - r * 0.4, cx + r * 0.4, cy + r * 0.4, "#fff") +
        line(cx + r * 0.4, cy - r * 0.4, cx - r * 0.4, cy + r * 0.4, "#fff"),
    )
  );
}
function noEntry(cx, cy, r, color = "#F43F5E") {
  return (
    circle(cx, cy, r, "none", color, 8) +
    line(cx - r * 0.55, cy, cx + r * 0.55, cy, color, 8)
  );
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
    pathf(
      `M ${x + w / 2} ${y - 8} q -18 -20 -26 -2 q 14 4 26 2 q 12 2 26 -2 q -8 -18 -26 2 Z`,
      color,
    )
  );
}

function apple(cx, cy, s, color) {
  return (
    circle(cx, cy, 14 * s, color) +
    line(cx, cy - 14 * s, cx + 3, cy - 22 * s, "#65A30D", 4)
  );
}

function flower(cx, cy, s, color) {
  let petals = "";
  for (let i = 0; i < 5; i++) {
    const a = ((Math.PI * 2) / 5) * i - Math.PI / 2;
    petals += circle(
      cx + 13 * s * Math.cos(a),
      cy + 13 * s * Math.sin(a),
      8 * s,
      color,
    );
  }
  return petals + circle(cx, cy, 7 * s, "#FFFBEB");
}

// ---- extra helpers for grammar scenes ------------------------------------
function equalsSign(cx, cy, s, color) {
  return (
    line(cx - 18 * s, cy - 6 * s, cx + 18 * s, cy - 6 * s, color, 7) +
    line(cx - 18 * s, cy + 6 * s, cx + 18 * s, cy + 6 * s, color, 7)
  );
}
function plusSign(cx, cy, s, color) {
  return (
    line(cx - 16 * s, cy, cx + 16 * s, cy, color, 7) +
    line(cx, cy - 16 * s, cx, cy + 16 * s, color, 7)
  );
}
function nameTag(cx, cy, s, color) {
  const w = 60 * s,
    h = 34 * s;
  return (
    line(cx, cy - h / 2 - 14 * s, cx - 10 * s, cy - h / 2, LIGHT, 4) +
    line(cx, cy - h / 2 - 14 * s, cx + 10 * s, cy - h / 2, LIGHT, 4) +
    rrect(cx - w / 2, cy - h / 2, w, h, 8, "#fff", color, 5) +
    line(cx - w / 2 + 10, cy, cx + w / 2 - 10, cy, color, 4)
  );
}
function book(cx, cy, s, color) {
  const w = 34 * s,
    h = 40 * s;
  const d = `M ${cx} ${cy - h / 2}
    C ${cx - w} ${cy - h / 2 - 6 * s} ${cx - w} ${cy + h / 2 - 6 * s} ${cx} ${cy + h / 2}
    C ${cx + w} ${cy + h / 2 - 6 * s} ${cx + w} ${cy - h / 2 - 6 * s} ${cx} ${cy - h / 2} Z`;
  return (
    pathf(d, "#fff", color, 5) + line(cx, cy - h / 2, cx, cy + h / 2, color, 4)
  );
}
function scaleBalance(cx, topY, s, color) {
  const barW = 70 * s;
  return (
    line(cx, topY, cx, topY + 50 * s, color, 6) +
    line(cx - barW / 2, topY + 8 * s, cx + barW / 2, topY + 8 * s, color, 6) +
    circle(cx - barW / 2, topY + 24 * s, 12 * s, "none", color, 5) +
    circle(cx + barW / 2, topY + 24 * s, 12 * s, "none", color, 5) +
    line(cx - barW / 2, topY + 12 * s, cx - barW / 2, topY + 14 * s, color, 4) +
    line(cx + barW / 2, topY + 12 * s, cx + barW / 2, topY + 14 * s, color, 4)
  );
}
function lightbulb(cx, cy, s, color) {
  const rays = [0, 1, 2, 3, 4]
    .map((i) => {
      const a = -Math.PI / 2 + (i - 2) * 0.55;
      const x1 = cx + 22 * s * Math.cos(a),
        y1 = cy - 4 * s + 22 * s * Math.sin(a);
      const x2 = cx + 32 * s * Math.cos(a),
        y2 = cy - 4 * s + 32 * s * Math.sin(a);
      return line(x1, y1, x2, y2, color, 4);
    })
    .join("");
  return (
    rays +
    circle(cx, cy - 4 * s, 18 * s, "#FFFBEB", color, 5) +
    rrect(cx - 8 * s, cy + 12 * s, 16 * s, 10 * s, 3, "#fff", color, 4)
  );
}
function podium(cx, baseY, s, colors) {
  const heights = [34 * s, 54 * s, 22 * s];
  const w = 34 * s;
  return colors
    .map((c, i) => {
      const x = cx + (i - 1) * (w + 6 * s);
      const h = heights[i];
      return rrect(x - w / 2, baseY - h, w, h, 4, c);
    })
    .join("");
}
function passport(cx, cy, s, color) {
  const w = 46 * s,
    h = 60 * s;
  return (
    rrect(cx - w / 2, cy - h / 2, w, h, 6, color) +
    circle(cx, cy - 4 * s, 10 * s, "none", "#fff", 4) +
    star(cx + 16 * s, cy + 18 * s, 0.9, "#F59E0B")
  );
}
function suitcase(cx, cy, s, color) {
  const w = 60 * s,
    h = 40 * s;
  return (
    rrect(
      cx - 10 * s,
      cy - h / 2 - 10 * s,
      20 * s,
      10 * s,
      3,
      "none",
      color,
      5,
    ) +
    rrect(cx - w / 2, cy - h / 2, w, h, 8, color) +
    line(cx, cy - h / 2 + 8 * s, cx, cy + h / 2 - 8 * s, "#fff", 4)
  );
}
function glasses(cx, cy, s, colorA, colorB) {
  const glass = (x, color) =>
    pathf(
      `M ${x - 12 * s} ${cy - 20 * s} L ${x + 12 * s} ${cy - 20 * s} L ${x + 6 * s} ${cy + 18 * s} L ${x - 6 * s} ${cy + 18 * s} Z`,
      color,
    );
  return glass(cx - 14 * s, colorA) + glass(cx + 14 * s, colorB);
}
function pencilTool(cx, cy, s, color) {
  const d = `M ${cx - 6 * s} ${cy + 30 * s} L ${cx - 6 * s} ${cy - 20 * s} L ${cx} ${cy - 34 * s} L ${cx + 6 * s} ${cy - 20 * s} L ${cx + 6 * s} ${cy + 30 * s} Z`;
  return (
    pathf(d, color) +
    line(cx - 6 * s, cy + 22 * s, cx + 6 * s, cy + 22 * s, "#fff", 3)
  );
}
function puzzlePieces(cx, cy, s, colorA, colorB) {
  return (
    rrect(cx - 34 * s, cy - 16 * s, 32 * s, 32 * s, 6, colorA) +
    circle(cx - 2 * s, cy, 9 * s, colorA) +
    rrect(cx + 2 * s, cy - 16 * s, 32 * s, 32 * s, 6, colorB)
  );
}
function cloud(cx, cy, s, color) {
  return (
    circle(cx, cy, 22 * s, "#fff", color, 5) +
    circle(cx + 26 * s, cy + 8 * s, 15 * s, "#fff", color, 5) +
    circle(cx - 24 * s, cy + 10 * s, 14 * s, "#fff", color, 5) +
    circle(cx - 4 * s, cy - 34 * s, 6 * s, "#fff", color, 4) +
    circle(cx + 8 * s, cy - 46 * s, 4 * s, "#fff", color, 3)
  );
}
function signpostFork(cx, baseY, s, colorA, colorB) {
  return (
    line(cx, baseY, cx, baseY - 70 * s, INK, 6) +
    pathf(
      `M ${cx} ${baseY - 50 * s} L ${cx + 46 * s} ${baseY - 50 * s} L ${cx + 58 * s} ${baseY - 40 * s} L ${cx + 46 * s} ${baseY - 30 * s} L ${cx} ${baseY - 30 * s} Z`,
      colorA,
    ) +
    pathf(
      `M ${cx} ${baseY - 26 * s} L ${cx - 46 * s} ${baseY - 26 * s} L ${cx - 58 * s} ${baseY - 16 * s} L ${cx - 46 * s} ${baseY - 6 * s} L ${cx} ${baseY - 6 * s} Z`,
      colorB,
    )
  );
}
function autoDoor(cx, cy, s, color) {
  const w = 26 * s,
    h = 50 * s;
  return (
    rrect(cx - w - 6 * s, cy - h / 2, w, h, 3, "none", color, 5) +
    rrect(cx + 6 * s, cy - h / 2, w, h, 3, "none", color, 5) +
    arrow(cx - 14 * s, cy, cx - 30 * s, cy, color, 4) +
    arrow(cx + 14 * s, cy, cx + 30 * s, cy, color, 4)
  );
}
function cornerArrow(cx, cy, s, color) {
  const d = `M ${cx - 40 * s} ${cy + 30 * s} L ${cx - 40 * s} ${cy - 10 * s} L ${cx + 20 * s} ${cy - 10 * s}`;
  return (
    pathf(d, "none", color, 7) +
    arrow(cx + 2 * s, cy - 10 * s, cx + 26 * s, cy - 10 * s, color, 7)
  );
}
function umbrella(cx, cy, s, color) {
  const d = `M ${cx - 34 * s} ${cy} Q ${cx - 34 * s} ${cy - 34 * s} ${cx} ${cy - 34 * s} Q ${cx + 34 * s} ${cy - 34 * s} ${cx + 34 * s} ${cy} Q ${cx + 20 * s} ${cy - 12 * s} ${cx + 6 * s} ${cy} Q ${cx - 6 * s} ${cy - 12 * s} ${cx - 20 * s} ${cy} Q ${cx - 34 * s} ${cy - 12 * s} ${cx - 34 * s} ${cy} Z`;
  return (
    pathf(d, color) +
    line(cx, cy, cx, cy + 34 * s, INK, 5) +
    line(cx, cy + 34 * s, cx + 8 * s, cy + 34 * s, INK, 5)
  );
}
function rainLines(cx, cy, s, color) {
  let out = "";
  for (let i = -2; i <= 2; i++) {
    out += line(
      cx + i * 16 * s,
      cy,
      cx + i * 16 * s - 5 * s,
      cy + 14 * s,
      color,
      4,
    );
  }
  return out;
}
function motionLines(cx, cy, color) {
  return (
    line(cx - 30, cy, cx - 12, cy, color, 4) +
    line(cx - 30, cy + 10, cx - 16, cy + 10, color, 4)
  );
}
function calendar(cx, cy, s, color) {
  const w = 50 * s,
    h = 44 * s;
  return (
    rrect(cx - w / 2, cy - h / 2, w, h, 5, "#fff", color, 5) +
    line(
      cx - w / 2,
      cy - h / 2 + 12 * s,
      cx + w / 2,
      cy - h / 2 + 12 * s,
      color,
      4,
    ) +
    line(
      cx - w / 4,
      cy - h / 2 - 6 * s,
      cx - w / 4,
      cy - h / 2 + 4 * s,
      color,
      4,
    ) +
    line(
      cx + w / 4,
      cy - h / 2 - 6 * s,
      cx + w / 4,
      cy - h / 2 + 4 * s,
      color,
      4,
    ) +
    circle(cx - 8 * s, cy + 8 * s, 3 * s, color) +
    circle(cx + 8 * s, cy + 8 * s, 3 * s, color)
  );
}
function checklist(cx, cy, s, color) {
  const w = 56 * s,
    h = 50 * s;
  const row = (dy) =>
    checkBadge(cx - w / 2 + 8 * s, cy + dy, 6 * s, color) +
    line(cx - w / 2 + 20 * s, cy + dy, cx + w / 2 - 8 * s, cy + dy, LIGHT, 4);
  return (
    rrect(cx - w / 2, cy - h / 2, w, h, 6, "#fff", INK, 5) +
    row(-h / 2 + 14 * s) +
    row(0) +
    row(h / 2 - 14 * s)
  );
}
function handshakeArc(cx, cy, s, color) {
  return pathf(
    `M ${cx - 30 * s} ${cy} Q ${cx} ${cy - 24 * s} ${cx + 30 * s} ${cy}`,
    "none",
    color,
    6,
  );
}

// ---- scenes ---------------------------------------------------------------
// keyed by grammar id; each: (a, a2) => inner svg string
const SCENES = {
  // Lesson 1
  l1_wa_desu: (a, a2) =>
    person(150, 245, 1.4, a) +
    bubble(190, 90, 110, 56) +
    nameTag(245, 118, 1, INK),
  l1_ja_arimasen: (a) =>
    person(200, 245, 1.6, a) + crossBadge(280, 110, 40, "#F43F5E"),
  l1_ka: (a) => qmark(200, 150, 2.4, a),
  l1_mo: (a, a2) =>
    person(140, 245, 1.3, a) +
    person(260, 245, 1.3, a2) +
    equalsSign(200, 150, 1.6, INK),
  l1_no: (a) => nameTag(200, 150, 1.8, a),

  // Lesson 2
  l2_kore_sore_are: (a) =>
    person(140, 245, 1.4, a) +
    line(160, 205, 260, 170, INK, 6) +
    circle(275, 160, 16, "none", a, 6),
  l2_kono_sono_ano: (a, a2) =>
    person(130, 245, 1.3, a) +
    book(250, 165, 1.3, a2) +
    line(155, 200, 225, 175, INK, 5),
  l2_sou_desu: (a, a2) =>
    checkBadge(150, 155, 46, "#22C55E") + crossBadge(280, 155, 42, "#F43F5E"),
  l2_ka_ka: (a, a2) =>
    bubble(70, 90, 100, 56, "#fff", a) +
    bubble(230, 90, 100, 56, "#fff", a2) +
    qmark(325, 90, 1, INK),

  // Lesson 3
  l3_koko_soko_asoko: (a, a2) =>
    rrect(70, 110, 260, 130, 10, "#fff", LIGHT, 5) + pin(200, 90, 1.4, a),
  l3_wa_place: (a) =>
    rrect(80, 130, 240, 100, 10, "#fff", LIGHT, 5) + pin(300, 100, 1.2, a),

  // Lesson 4
  l4_time: (a) => clock(200, 150, 78, a),
  l4_kara_made: (a, a2) =>
    pin(110, 90, 1, a) +
    pin(300, 90, 1, a2) +
    arrow(140, 130, 280, 130, INK, 6),
  l4_verb_polite: (a) =>
    line(70, 150, 330, 150, LIGHT, 6) +
    arrow(70, 150, 330, 150, a, 6) +
    clock(340, 150, 20, INK),

  // Lesson 5
  l5_e_ikimasu: (a) =>
    suitcase(150, 175, 1.6, a) + arrow(210, 175, 320, 175, INK, 7),
  l5_de_vehicle: (a, a2) =>
    rrect(90, 150, 100, 55, 14, a) +
    circle(112, 210, 12, INK) +
    circle(168, 210, 12, INK) +
    rrect(230, 150, 100, 55, 14, a2) +
    circle(252, 210, 12, INK) +
    circle(308, 210, 12, INK),
  l5_to_person: (a, a2) =>
    person(160, 245, 1.3, a) +
    person(230, 245, 1.3, a2) +
    line(190, 220, 205, 220, INK, 5),

  // Lesson 6
  l6_wo_object: (a) =>
    person(150, 245, 1.4, a) +
    book(240, 190, 1.4, "#8B5CF6") +
    line(180, 210, 220, 195, INK, 5),
  l6_de_place: (a) =>
    rrect(90, 110, 220, 130, 12, "#fff", LIGHT, 5) +
    circle(200, 175, 22, a) +
    line(178, 175, 222, 175, "#fff", 5),
  l6_masenka_mashou: (a, a2) => glasses(200, 150, 1.6, a, a2),

  // Lesson 7
  l7_de_tool: (a) =>
    person(160, 245, 1.4, a) + pencilTool(240, 180, 1.4, "#8B5CF6"),
  l7_agemasu_moraimasu: (a, a2) =>
    person(110, 245, 1.2, a) +
    person(290, 245, 1.2, a2) +
    giftBox(170, 165, 60, 50, a),
  l7_mou_mashita: (a) => checkBadge(200, 150, 56, a),

  // Lesson 8
  l8_i_adj: (a, a2) => circle(140, 190, 46, a) + circle(280, 200, 18, a2),
  l8_na_adj: (a) => person(200, 245, 1.6, a) + star(200, 100, 1.3, "#F59E0B"),
  l8_ga_but: (a, a2) => scaleBalance(200, 100, 1.6, INK),

  // Lesson 9
  l9_ga_suki: (a) => person(200, 245, 1.5, a) + heart(200, 100, 1.8, "#F43F5E"),
  l9_ga_wakarimasu: (a) => lightbulb(200, 150, 2, a),
  l9_kara_reason: (a, a2) =>
    person(150, 245, 1.4, a) +
    bubble(210, 100, 120, 56) +
    arrow(220, 150, 270, 150, a2, 5),

  // Lesson 10
  l10_arimasu_imasu: (a, a2) =>
    rrect(70, 120, 120, 100, 8, "none", INK, 6) +
    line(70, 172, 190, 172, INK, 5) +
    apple(120, 150, 1, a) +
    circle(282, 182, 20, a2) +
    circle(276, 180, 3, INK) +
    circle(288, 180, 3, INK),
  l10_position: (a) =>
    rrect(140, 130, 120, 90, 10, "none", INK, 6) +
    circle(200, 110, 14, a) +
    circle(200, 250, 14, a),

  // Lesson 11
  l11_counters: (a, a2) =>
    apple(150, 190, 2, a) + apple(210, 190, 2, a2) + apple(270, 190, 2, a),
  l11_frequency: (a) => calendar(200, 150, 2, a),

  // Lesson 12
  l12_past_noun_adj: (a) =>
    clock(180, 150, 60, LIGHT) + arrow(230, 190, 260, 220, a, 5),
  l12_past_i_adj: (a, a2) =>
    rrect(150, 100, 100, 80, 8, "#fff", a, 5) + heart(200, 140, 1, a2),
  l12_comparison: (a, a2) => podium(200, 230, 1.4, [a2, a, "#F59E0B"]),

  // Lesson 13
  l13_hoshii: (a) => person(180, 245, 1.3, LIGHT) + star(260, 150, 1.8, a),
  l13_tai: (a) => checklist(200, 150, 1.6, a),
  l13_ni_purpose: (a, a2) =>
    suitcase(150, 175, 1.3, a) +
    arrow(200, 175, 260, 175, INK, 6) +
    rrect(280, 140, 60, 70, 8, "#fff", a2, 5),

  // Lesson 14
  l14_te_form: (a, a2) => puzzlePieces(200, 160, 1.6, a, a2),
  l14_te_kudasai: (a) => person(180, 245, 1.4, a) + bubble(240, 100, 100, 54),
  l14_te_imasu: (a) => person(200, 245, 1.5, a) + motionLines(160, 210, INK),

  // Lesson 15
  l15_te_mo_ii: (a) => checkBadge(200, 150, 60, "#22C55E"),
  l15_te_wa_ikemasen: (a) => noEntry(200, 150, 56, "#F43F5E"),
  l15_te_imasu_state: (a) =>
    calendar(150, 150, 1.6, a) + checkBadge(260, 150, 26, "#22C55E"),

  // Lesson 16
  l16_te_connect: (a) => checklist(200, 150, 1.8, a),
  l16_te_kara: (a, a2) =>
    circle(140, 150, 26, a) +
    arrow(168, 150, 232, 150, INK, 6) +
    circle(260, 150, 26, a2),
  l16_adj_te: (a, a2) =>
    circle(160, 150, 30, a) +
    plusSign(200, 150, 1.2, INK) +
    circle(240, 150, 30, a2),

  // Lesson 17
  l17_nai_form: (a) => crossBadge(200, 150, 60, "#F43F5E"),
  l17_naide_kudasai: (a) =>
    person(200, 245, 1.5, a) + noEntry(280, 130, 34, "#F43F5E"),
  l17_nakereba: (a, a2) =>
    scaleBalance(200, 100, 1.6, INK) + qmark(200, 220, 1, a2),

  // Lesson 18
  l18_dict_form: (a) => book(200, 150, 2.4, a),
  l18_koto_ga_dekimasu: (a) =>
    person(200, 245, 1.5, a) + star(200, 110, 1.6, "#F59E0B"),
  l18_mae_ni: (a) =>
    clock(200, 150, 60, LIGHT) + arrow(250, 110, 280, 90, a, 5),

  // Lesson 19
  l19_ta_form: (a) => checkBadge(200, 150, 60, a),
  l19_ta_koto_ga_arimasu: (a) => passport(200, 150, 2, a),
  l19_tari_tari: (a, a2) =>
    star(150, 150, 1.6, a) +
    heart(210, 150, 1.4, a2) +
    circle(270, 150, 22, "#F59E0B"),
  l19_narimasu: (a, a2) =>
    circle(140, 170, 22, LIGHT) +
    arrow(180, 170, 240, 170, INK, 6) +
    circle(280, 170, 34, a),

  // Lesson 20
  l20_plain_form: (a, a2) =>
    bubble(80, 100, 120, 66, "#fff", a) + bubble(210, 150, 120, 66, "#fff", a2),

  // Lesson 21
  l21_to_omoimasu: (a) => person(150, 245, 1.4, a) + cloud(270, 130, 1, INK),
  l21_to_iimashita: (a) => person(150, 245, 1.4, a) + bubble(220, 90, 110, 56),
  l21_deshou: (a) => person(200, 245, 1.5, a) + qmark(200, 110, 1.4, a),

  // Lesson 22
  l22_noun_modify: (a, a2) =>
    person(140, 245, 1.3, a) +
    rrect(220, 150, 90, 70, 8, "#fff", a2, 5) +
    arrow(180, 210, 220, 190, INK, 5),
  l22_donna: (a) =>
    qmark(150, 150, 1.6, a) +
    circle(240, 130, 16, a) +
    circle(270, 160, 12, "#F59E0B") +
    circle(240, 190, 10, "#22C55E"),

  // Lesson 23
  l23_toki: (a) => clock(200, 150, 70, a),
  l23_to_conditional: (a) => autoDoor(200, 150, 2, a),
  l23_wo_movement: (a) => cornerArrow(220, 170, 2.4, a),

  // Lesson 24
  l24_kuremasu: (a, a2) =>
    person(140, 245, 1.3, a2) +
    person(260, 245, 1.3, a) +
    giftBox(175, 165, 50, 44, "#F43F5E") +
    arrow(230, 185, 205, 180, INK, 5),
  l24_te_giving: (a, a2) =>
    person(150, 245, 1.3, a) +
    person(250, 245, 1.3, a2) +
    handshakeArc(200, 200, 1.4, INK),

  // Lesson 25
  l25_tara: (a, a2) => signpostFork(200, 250, 1.3, a, a2),
  l25_temo: (a) =>
    umbrella(200, 150, 1.6, a) + rainLines(200, 90, 1.3, "#38BDF8"),
};

let count = 0;
for (const [id, scene] of Object.entries(SCENES)) {
  const idx = count;
  const bg = BG[idx % BG.length];
  const a = AC[idx % AC.length];
  const a2 = AC[(idx + 3) % AC.length];
  const inner = scene(a, a2);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <rect x="0" y="0" width="${W}" height="${H}" rx="24" fill="${bg}"/>
  ${inner}
</svg>
`;
  writeFileSync(`${OUT}/${id}.svg`, svg);
  count++;
}

const readme = `# Grammar illustrations (original SVG)

These are **original** flat-style vector illustrations, one per N5 grammar
point, generated by \`scripts/gen-grammar-images.mjs\`. They use only simple
geometric shapes — no third-party or textbook artwork. Captions live in
\`src/lib/grammarImages.ts\`; each lesson's Grammar section shows
\`/grammar-images/<id>.svg\`.

- ${count} files, one per grammar id in \`data/n5-grammar.json\`.
- Regenerate any time with \`pnpm data:grammar-images\`.
- To restyle, edit the palette or scene functions in the generator and re-run.
`;
writeFileSync(`${OUT}/README.md`, readme);
console.log(`Wrote ${count} SVGs + README to ${OUT}`);
