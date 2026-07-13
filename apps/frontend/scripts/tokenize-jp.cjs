// Build-time Japanese tokenizer. Adds textbook-style word segmentation and
// spaced romaji to sentence data so the app can render 分かち書き (word-spaced)
// text with per-word furigana and easy-to-read romaji.
//
// Writes, per grammar example and per dialogue line:
//   tokens: Chunk[]   where Chunk = { t: string, f?: string }[]
//   romaji: string    (space-separated at word boundaries)
// and updates multi-word (phrase) vocab `romaji` to a spaced form.
//
// Uses kuromoji (IPADIC). Run once: node scripts/tokenize-jp.cjs
const fs = require("fs");
const path = require("path");
const kuromoji = require("kuromoji");
const wanakana = require("wanakana");

const DATA = path.join(__dirname, "..", "data");
const KANJI_RE = /[㐀-鿿々]/;
const PUNCT = {
  "。": ".",
  "、": ",",
  "？": "?",
  "！": "!",
  "．": ".",
  "，": ",",
};

const isKana = (ch) => wanakana.isKana(ch);
const hasKanji = (s) => KANJI_RE.test(s);
const toHira = (s) => wanakana.toHiragana(s);

// Independent (自立語) parts of speech that can start a bunsetsu chunk.
const INDEP = new Set([
  "名詞",
  "動詞",
  "形容詞",
  "副詞",
  "連体詞",
  "接続詞",
  "感動詞",
  "接頭詞",
]);
// Copula auxiliaries that read better as their own romaji word.
const COPULA = new Set(["です", "だ", "でした", "でしょ", "じゃ", "だっ"]);

// Split one morpheme into furigana segments: furigana sits only over the kanji
// core, with okurigana (leading/trailing kana) left plain.
function segmentsFor(surface, readingKata) {
  if (!hasKanji(surface)) return [{ t: surface }];
  const reading = toHira(readingKata || "");
  if (!reading || !wanakana.isKana(reading))
    return [{ t: surface, f: undefined }];

  let suf = 0;
  while (
    suf < surface.length &&
    suf < reading.length &&
    surface[surface.length - 1 - suf] === reading[reading.length - 1 - suf] &&
    isKana(surface[surface.length - 1 - suf])
  )
    suf++;
  const coreSurface = surface.slice(0, surface.length - suf);
  const suffix = surface.slice(surface.length - suf);
  const coreReading = reading.slice(0, reading.length - suf);

  let pre = 0;
  while (
    pre < coreSurface.length &&
    pre < coreReading.length &&
    coreSurface[pre] === coreReading[pre] &&
    isKana(coreSurface[pre])
  )
    pre++;
  const prefix = coreSurface.slice(0, pre);
  const kanji = coreSurface.slice(pre);
  const furi = coreReading.slice(pre);

  const parts = [];
  if (prefix) parts.push({ t: prefix });
  if (kanji) parts.push({ t: kanji, f: furi || undefined });
  if (suffix) parts.push({ t: suffix });
  return parts.length ? parts : [{ t: surface }];
}

function romajiFor(tok) {
  const s = tok.surface_form;
  if (tok.pos === "記号") return PUNCT[s] ?? "";
  const pron =
    tok.pronunciation && tok.pronunciation !== "*"
      ? tok.pronunciation
      : tok.reading;
  if (!pron || pron === "*" || !wanakana.isKana(toHira(pron))) return s;
  return wanakana.toRomaji(toHira(pron));
}

function startsNewChunk(tok, prev) {
  if (!prev) return true;
  if (prev.pos === "接頭詞") return false;
  if (!INDEP.has(tok.pos)) return false;
  if (tok.pos_detail_1 === "接尾" || tok.pos_detail_1 === "非自立")
    return false;
  return true;
}

function romajiSpaceBefore(tok, prev) {
  if (!prev) return false;
  if (tok.pos === "記号") return false;
  if (prev.pos === "接頭詞") return false;
  if (tok.pos === "助詞") return true;
  if (tok.pos === "助動詞") return COPULA.has(tok.surface_form);
  if (!INDEP.has(tok.pos)) return false;
  if (tok.pos_detail_1 === "接尾" || tok.pos_detail_1 === "非自立")
    return false;
  return true;
}

function analyze(tokenizer, jp) {
  const morphemes = tokenizer.tokenize(jp);
  const chunks = [];
  let cur = null;
  let romaji = "";
  morphemes.forEach((tok, i) => {
    const prev = i > 0 ? morphemes[i - 1] : null;
    if (startsNewChunk(tok, prev) || !cur) {
      cur = [];
      chunks.push(cur);
    }
    for (const seg of segmentsFor(tok.surface_form, tok.reading)) cur.push(seg);

    const ro = romajiFor(tok);
    if (ro) {
      if (tok.pos === "記号") romaji += ro;
      else
        romaji +=
          (romajiSpaceBefore(tok, prev) || romaji === ""
            ? romaji === ""
              ? ""
              : " "
            : "") + ro;
    }
  });
  // Merge adjacent plain segments inside each chunk for tidiness.
  const merged = chunks.map((chunk) => {
    const out = [];
    for (const seg of chunk) {
      if (!seg.f && out.length && !out[out.length - 1].f)
        out[out.length - 1].t += seg.t;
      else out.push({ ...seg });
    }
    return out;
  });
  return { tokens: merged, romaji: romaji.trim() };
}

function romajiWordCount(tokenizer, s) {
  const m = tokenizer.tokenize(s);
  let n = 0;
  m.forEach((tok, i) => {
    if (tok.pos === "記号") return;
    if (i === 0 || romajiSpaceBefore(tok, m[i - 1])) n++;
  });
  return n;
}

kuromoji
  .builder({
    dicPath: path.join(__dirname, "..", "node_modules", "kuromoji", "dict"),
  })
  .build((err, tokenizer) => {
    if (err) throw err;

    // Grammar examples
    const gPath = path.join(DATA, "n5-grammar.json");
    const grammar = JSON.parse(fs.readFileSync(gPath, "utf8"));
    let gCount = 0;
    for (const g of grammar) {
      for (const ex of g.examples) {
        const { tokens, romaji } = analyze(tokenizer, ex.jp);
        ex.tokens = tokens;
        ex.romaji = romaji;
        gCount++;
      }
    }
    fs.writeFileSync(gPath, JSON.stringify(grammar, null, 2) + "\n");

    // Dialogue lines
    const dPath = path.join(DATA, "n5-dialogues.json");
    const dialogues = JSON.parse(fs.readFileSync(dPath, "utf8"));
    let dCount = 0;
    for (const d of dialogues) {
      for (const line of d.lines) {
        const { tokens, romaji } = analyze(tokenizer, line.jp);
        line.tokens = tokens;
        line.romaji = romaji;
        dCount++;
      }
    }
    fs.writeFileSync(dPath, JSON.stringify(dialogues, null, 2) + "\n");

    // Vocab: space the romaji of phrase entries (leave single words untouched).
    const vPath = path.join(DATA, "n5-vocab.json");
    const vocab = JSON.parse(fs.readFileSync(vPath, "utf8"));
    let vCount = 0;
    for (const v of vocab) {
      const surface = (v.word || "")
        .replace(/[（(].*?[）)]/g, "")
        .replace(/[～\[\]［］]/g, "")
        .trim();
      if (!surface) continue;
      if (romajiWordCount(tokenizer, surface) > 1) {
        const { romaji } = analyze(tokenizer, surface);
        if (romaji && /\s/.test(romaji)) {
          v.romaji = romaji;
          vCount++;
        }
      }
    }
    fs.writeFileSync(vPath, JSON.stringify(vocab, null, 2) + "\n");

    console.log(
      `tokens added: ${gCount} grammar examples, ${dCount} dialogue lines; ${vCount} vocab romaji spaced.`,
    );
  });
