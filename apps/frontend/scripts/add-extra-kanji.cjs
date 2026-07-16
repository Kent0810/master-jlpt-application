// One-off: add the "extended N5" kanji that popular study lists (todaiedu 130,
// Dungmori 150) include but our core JLPT-N5 set (jlpt_old===4) lacks. Fetches
// the same davidluzgouveia dataset as fetch-kanji.ts, normalizes identically,
// attaches Vietnamese meanings, merges into n5-kanji.json and re-sorts.
const fs = require("fs");
const path = require("path");
const wanakana = require("wanakana");

const SRC =
  "https://raw.githubusercontent.com/davidluzgouveia/kanji-data/master/kanji.json";
const OUT = path.join(__dirname, "..", "data", "n5-kanji.json");

// video ∪ todaiedu, minus what we already have.
const EXTRA =
  "畑 秋 氷 泳 雪 雲 早 明 朝 犬 太 京 林 森 体 髪 不 石 夕 銀 米 帰 良 飯 合 牛 物 字 交 毛 海 元 兄 光 音 暗 親 門 問 運 軽 重 荷 歌 寺 待 貝 具 自 内 肉 田 町 好 士 売 界 画 草 茶 酒 方 旅 族 同 病 黒 赤 青 近 遠 夜 春 夏 冬 住 院 家 通 風 鳥 猫 心 頭 首 力 動 走 止 開".split(
    /\s+/,
  );

// Concise Vietnamese meanings (primary senses), parallel to `meanings`.
const VI = {
  畑: ["ruộng", "cánh đồng"], 秋: ["mùa thu"], 氷: ["băng", "nước đá"],
  泳: ["bơi"], 雪: ["tuyết"], 雲: ["mây"], 早: ["sớm", "nhanh"],
  明: ["sáng", "rõ ràng"], 朝: ["buổi sáng", "triều đại"], 犬: ["chó"],
  太: ["to", "mập"], 京: ["thủ đô", "kinh"], 林: ["rừng cây"],
  森: ["rừng"], 体: ["cơ thể", "thân thể"], 髪: ["tóc"],
  不: ["không", "phủ định"], 石: ["đá"], 夕: ["buổi chiều"], 銀: ["bạc"],
  米: ["gạo", "mét"], 帰: ["trở về"], 良: ["tốt", "giỏi"],
  飯: ["cơm", "bữa ăn"], 合: ["hợp", "vừa"], 牛: ["bò"],
  物: ["vật", "đồ vật"], 字: ["chữ", "ký tự"], 交: ["giao", "trộn lẫn"],
  毛: ["lông", "tóc"], 海: ["biển"], 元: ["gốc", "nguyên", "ban đầu"],
  兄: ["anh trai"], 光: ["ánh sáng"], 音: ["âm thanh"], 暗: ["tối"],
  親: ["cha mẹ", "thân thiết"], 門: ["cổng", "cửa"], 問: ["hỏi", "câu hỏi"],
  運: ["vận chuyển", "vận may"], 軽: ["nhẹ"], 重: ["nặng", "quan trọng"],
  荷: ["hành lý"], 歌: ["bài hát", "hát"], 寺: ["chùa"], 待: ["chờ đợi"],
  貝: ["vỏ sò", "con sò"], 具: ["dụng cụ"], 自: ["tự", "bản thân"],
  内: ["bên trong"], 肉: ["thịt"], 田: ["ruộng lúa"], 町: ["thị trấn", "phố"],
  好: ["thích", "tốt"], 士: ["kẻ sĩ", "samurai"], 売: ["bán"],
  界: ["thế giới", "ranh giới"], 画: ["bức tranh", "nét vẽ"], 草: ["cỏ"],
  茶: ["trà"], 酒: ["rượu"], 方: ["hướng", "phía", "người"],
  旅: ["chuyến đi", "du lịch"], 族: ["gia tộc", "dân tộc"], 同: ["giống", "cùng"],
  病: ["bệnh"], 黒: ["màu đen"], 赤: ["màu đỏ"], 青: ["màu xanh"],
  近: ["gần"], 遠: ["xa"], 夜: ["đêm"], 春: ["mùa xuân"], 夏: ["mùa hè"],
  冬: ["mùa đông"], 住: ["sống", "cư trú"], 院: ["viện"],
  家: ["nhà", "gia đình"], 通: ["đi qua", "thông"], 風: ["gió"],
  鳥: ["chim"], 猫: ["mèo"], 心: ["tim", "tâm", "lòng"], 頭: ["đầu"],
  首: ["cổ"], 力: ["sức mạnh", "lực"], 動: ["chuyển động"], 走: ["chạy"],
  止: ["dừng", "ngừng"], 開: ["mở"],
};

function normalize(char, e) {
  const unicode = char.codePointAt(0).toString(16);
  return {
    id: `kanji_${char}`,
    character: char,
    meanings: (e.meanings ?? []).map((m) => m.toLowerCase()),
    onyomi: (e.readings_on ?? []).map((r) => wanakana.toKatakana(r)),
    kunyomi: e.readings_kun ?? [],
    strokeCount: e.strokes,
    jlptLevel: "N5",
    kanjivgId: unicode.toLowerCase().padStart(5, "0"),
    exampleVocabIds: [],
    meaningsVi: VI[char],
  };
}

async function main() {
  const data = await (await fetch(SRC)).json();
  const existing = JSON.parse(fs.readFileSync(OUT, "utf8"));
  const have = new Set(existing.map((k) => k.character));

  let added = 0;
  const missingVi = [];
  for (const char of EXTRA) {
    if (have.has(char)) continue;
    if (!data[char]) throw new Error(`not in dataset: ${char}`);
    if (!VI[char]) missingVi.push(char);
    existing.push(normalize(char, data[char]));
    added++;
  }
  if (missingVi.length) throw new Error(`missing VI: ${missingVi.join(" ")}`);

  existing.sort((a, b) =>
    a.strokeCount === b.strokeCount
      ? a.character.localeCompare(b.character)
      : a.strokeCount - b.strokeCount,
  );

  fs.writeFileSync(OUT, JSON.stringify(existing, null, 2) + "\n", "utf8");
  console.log(`Added ${added}. Total now ${existing.length}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
