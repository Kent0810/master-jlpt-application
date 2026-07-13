export interface ParsedKanji {
  viewBox: string;
  strokes: string[];
}

const PATH_D_RE = /<path\b[^>]*\bd="([^"]+)"/g;
const VIEWBOX_RE = /viewBox="([^"]+)"/;

export function parseKanjiVg(svg: string): ParsedKanji {
  const strokes: string[] = [];
  let m: RegExpExecArray | null;
  PATH_D_RE.lastIndex = 0;
  while ((m = PATH_D_RE.exec(svg)) !== null) {
    strokes.push(m[1]);
  }
  const viewBox = VIEWBOX_RE.exec(svg)?.[1] ?? "0 0 109 109";
  return { viewBox, strokes };
}
