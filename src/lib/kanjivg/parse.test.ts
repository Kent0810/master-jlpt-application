import { describe, it, expect } from "vitest";
import { parseKanjiVg } from "./parse";

const HI_SVG = `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109 109">
<g>
<path id="kvg:065e5-s1" kvg:type="㇑" d="M31.5,24.5c1.12,1.12,1.74,2.75"/>
<path id="kvg:065e5-s2" kvg:type="㇕a" d="M33.48,26c0.8-0.05,37.67-3.01"/>
<path id="kvg:065e5-s3" kvg:type="㇐a" d="M34.22,55.25c7.78-0.5,35.9-2.5"/>
<path id="kvg:065e5-s4" kvg:type="㇐a" d="M34.23,86.5c10.52-0.75,34.15-2.12"/>
</g>
<g><text transform="matrix(1 0 0 1 25 30)">1</text></g>
</svg>`;

describe("parseKanjiVg", () => {
  it("extracts the viewBox", () => {
    expect(parseKanjiVg(HI_SVG).viewBox).toBe("0 0 109 109");
  });

  it("extracts one path per stroke in order", () => {
    const { strokes } = parseKanjiVg(HI_SVG);
    expect(strokes).toHaveLength(4);
    expect(strokes[0].startsWith("M31.5,24.5")).toBe(true);
    expect(strokes[3].startsWith("M34.23,86.5")).toBe(true);
  });

  it("does not pick up <text> stroke numbers as strokes", () => {
    const { strokes } = parseKanjiVg(HI_SVG);
    expect(strokes.every((d) => d.startsWith("M"))).toBe(true);
  });

  it("falls back to a default viewBox when absent", () => {
    expect(parseKanjiVg('<svg><path d="M0,0"/></svg>').viewBox).toBe(
      "0 0 109 109",
    );
  });
});
