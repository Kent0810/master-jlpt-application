#!/usr/bin/env python3
"""Machine-translate English content meanings into Vietnamese and write them back
into the bundled data JSON as parallel `*Vi` fields.

Source: free Google Translate endpoint (no key). Vietnamese output is
machine-generated and may want human review. Fields added:
  - n5-vocab.json:   meaningsVi: string[]   (parallel to meanings)
  - n5-kanji.json:   meaningsVi: string[]
  - n5-grammar.json: meaningVi: string; examples[].vi (parallel to .en)
"""
import json, os, time, urllib.request, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")

def _tr_batch(lines):
    q = urllib.parse.quote("\n".join(lines))
    url = f"https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q={q}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    for attempt in range(5):
        try:
            data = json.load(urllib.request.urlopen(req, timeout=20))
            out = "".join(seg[0] for seg in data[0])
            return out.split("\n")
        except Exception as e:
            if attempt == 4:
                raise
            time.sleep(1.5 * (attempt + 1))

def build_map(strings):
    """Translate a set of unique strings; return {en: vi}. Batches, with a
    per-line fallback when a batch's line count doesn't round-trip."""
    uniq = sorted({s for s in strings if s and s.strip()})
    result = {}
    BATCH = 40
    for i in range(0, len(uniq), BATCH):
        chunk = uniq[i:i + BATCH]
        vi = _tr_batch(chunk)
        if len(vi) == len(chunk):
            for en, v in zip(chunk, vi):
                result[en] = v.strip()
        else:
            for en in chunk:
                result[en] = _tr_batch([en])[0].strip()
        print(f"  translated {min(i + BATCH, len(uniq))}/{len(uniq)}", flush=True)
        time.sleep(0.2)
    return result

def main():
    vocab = json.load(open(os.path.join(DATA, "n5-vocab.json"), encoding="utf-8"))
    kanji = json.load(open(os.path.join(DATA, "n5-kanji.json"), encoding="utf-8"))
    grammar = json.load(open(os.path.join(DATA, "n5-grammar.json"), encoding="utf-8"))

    strings = set()
    for v in vocab:
        strings.update(v.get("meanings", []))
    for k in kanji:
        strings.update(k.get("meanings", []))
    for g in grammar:
        strings.add(g.get("meaning", ""))
        for ex in g.get("examples", []):
            strings.add(ex.get("en", ""))

    print(f"Translating {len(strings)} unique strings…", flush=True)
    m = build_map(strings)

    def vi(s):
        return m.get(s, s)

    for v in vocab:
        v["meaningsVi"] = [vi(x) for x in v.get("meanings", [])]
    for k in kanji:
        k["meaningsVi"] = [vi(x) for x in k.get("meanings", [])]
    for g in grammar:
        g["meaningVi"] = vi(g.get("meaning", ""))
        for ex in g.get("examples", []):
            ex["vi"] = vi(ex.get("en", ""))

    json.dump(vocab, open(os.path.join(DATA, "n5-vocab.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    json.dump(kanji, open(os.path.join(DATA, "n5-kanji.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    json.dump(grammar, open(os.path.join(DATA, "n5-grammar.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("Done. Wrote meaningsVi / meaningVi / examples[].vi.", flush=True)

if __name__ == "__main__":
    main()
