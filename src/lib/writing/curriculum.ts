export interface BasicStroke {
  id: string;
  name: string;
  jp: string;
  direction: string;
  description: string;
  path: string;
}

export const BASIC_STROKES: BasicStroke[] = [
  {
    id: "ten",
    name: "Dot",
    jp: "点 (てん)",
    direction: "short, top → bottom-right",
    description: "A small tick. Press lightly and flick down to the right.",
    path: "M44,38 Q50,44 58,56",
  },
  {
    id: "yoko",
    name: "Horizontal",
    jp: "横画 (よこ)",
    direction: "left → right",
    description: "A straight line drawn from left to right, ending firmly.",
    path: "M16,50 L84,50",
  },
  {
    id: "tate",
    name: "Vertical",
    jp: "縦画 (たて)",
    direction: "top → bottom",
    description: "A straight line drawn downward from top to bottom.",
    path: "M50,14 L50,86",
  },
  {
    id: "hidari-barai",
    name: "Left sweep",
    jp: "左払い (はらい)",
    direction: "top-right → bottom-left",
    description: "A curving sweep that tapers off toward the lower left.",
    path: "M66,18 Q54,52 24,82",
  },
  {
    id: "migi-barai",
    name: "Right sweep",
    jp: "右払い (はらい)",
    direction: "top-left → bottom-right",
    description: "A broadening sweep pressing down toward the lower right.",
    path: "M38,18 Q52,52 80,80",
  },
  {
    id: "hane",
    name: "Hook",
    jp: "はね",
    direction: "down, then flick",
    description: "A vertical stroke that flicks back up at the very end.",
    path: "M50,14 L50,78 Q50,86 38,80",
  },
  {
    id: "ore",
    name: "Bend",
    jp: "折れ (おれ)",
    direction: "right, then turn down",
    description: "One continuous stroke: across to the right, then sharply down.",
    path: "M20,26 L72,26 L72,82",
  },
  {
    id: "hane-age",
    name: "Rising",
    jp: "提 (はねあげ)",
    direction: "bottom-left → top-right",
    description: "A short upward flick rising to the right.",
    path: "M24,76 L76,34",
  },
];

export interface StrokeRule {
  id: string;
  title: string;
  description: string;
  exampleChar: string;
}

export const STROKE_RULES: StrokeRule[] = [
  {
    id: "top-bottom",
    title: "Top to bottom",
    description: "Write from the top of the character to the bottom.",
    exampleChar: "三",
  },
  {
    id: "left-right",
    title: "Left to right",
    description: "Write from the left side to the right side.",
    exampleChar: "川",
  },
  {
    id: "horizontal-first",
    title: "Horizontal before vertical",
    description:
      "When strokes cross, the horizontal is usually written before the vertical.",
    exampleChar: "十",
  },
  {
    id: "center-first",
    title: "Centre before wings",
    description:
      "Draw a central stroke before the smaller strokes on either side.",
    exampleChar: "小",
  },
  {
    id: "outside-first",
    title: "Outside before inside",
    description: "Draw the outer enclosure before filling in the inside.",
    exampleChar: "日",
  },
  {
    id: "close-last",
    title: "Close the box last",
    description:
      "For enclosed shapes, the bottom stroke that seals the box comes last.",
    exampleChar: "国",
  },
  {
    id: "diagonal-right-first",
    title: "Right-to-left diagonal first",
    description:
      "A right-to-left diagonal is written before a left-to-right one.",
    exampleChar: "人",
  },
  {
    id: "vertical-through-last",
    title: "Piercing vertical last",
    description:
      "A vertical line that runs through the whole character is written last.",
    exampleChar: "中",
  },
];
