import type { StudyItem } from "@/lib/study/deck";

export interface Tile {
  key: string;
  itemId: string;
  kind: "front" | "meaning";
  text: string;
}

function frontText(item: StudyItem): string {
  return item.kind === "kanji" ? item.kanji!.character : item.vocab!.word;
}

function meaningText(item: StudyItem): string {
  return item.kind === "kanji"
    ? item.kanji!.meanings.join(", ")
    : item.vocab!.meanings.join(", ");
}

export function buildTiles(items: StudyItem[]): Tile[] {
  return items.flatMap((item) => [
    {
      key: `${item.id}-front`,
      itemId: item.id,
      kind: "front" as const,
      text: frontText(item),
    },
    {
      key: `${item.id}-meaning`,
      itemId: item.id,
      kind: "meaning" as const,
      text: meaningText(item),
    },
  ]);
}

export function isPair(a: Tile, b: Tile): boolean {
  return a.itemId === b.itemId && a.kind !== b.kind;
}
