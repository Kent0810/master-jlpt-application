// Lesson 8 — い-adjectives, な-adjectives, が (but).
module.exports = {
  examples: {
    l8_i_adj: [
      {
        jp: "この本はおもしろいです。",
        en: "This book is interesting.",
        vi: "Quyển sách này thú vị.",
      },
      {
        jp: "日本語は難しいです。",
        en: "Japanese is difficult.",
        vi: "Tiếng Nhật thì khó.",
      },
      {
        jp: "今日は暑くないです。",
        en: "It is not hot today.",
        vi: "Hôm nay trời không nóng.",
      },
    ],
    l8_na_adj: [
      {
        jp: "京都は有名です。",
        en: "Kyoto is famous.",
        vi: "Kyoto thì nổi tiếng.",
      },
      {
        jp: "この町はにぎやかです。",
        en: "This town is lively.",
        vi: "Thị trấn này náo nhiệt.",
      },
      {
        jp: "田中さんは親切な人です。",
        en: "Mr. Tanaka is a kind person.",
        vi: "Ông Tanaka là người tốt bụng.",
      },
    ],
    l8_ga_but: [
      {
        jp: "この部屋は狭いですが、きれいです。",
        en: "This room is small, but it is clean.",
        vi: "Căn phòng này chật, nhưng sạch sẽ.",
      },
      {
        jp: "日本語は難しいですが、おもしろいです。",
        en: "Japanese is difficult, but interesting.",
        vi: "Tiếng Nhật khó, nhưng thú vị.",
      },
      {
        jp: "この店は安いですが、おいしいです。",
        en: "This shop is cheap, but tasty.",
        vi: "Quán này rẻ, nhưng ngon.",
      },
    ],
  },
  explanations: {
    l8_i_adj: {
      en: {
        explanation: [
          "い-adjectives end in い and describe a noun directly: おもしろい本 ('an interesting book'). With です they form a polite statement: この本はおもしろいです.",
          "The negative drops the final い and adds くない(です): 暑い → 暑くないです ('is not hot'). いい ('good') is irregular: its negative is よくないです.",
        ],
        pitfalls: [
          "Don't say おもしろいじゃありません — い-adjectives negate with くない, not じゃありません.",
          "The い is part of the word; keep it when placing the adjective before a noun (新しい車, not 新し車).",
        ],
      },
      vi: {
        explanation: [
          "Tính từ đuôi い kết thúc bằng い và bổ nghĩa trực tiếp cho danh từ: おもしろい本 ('quyển sách thú vị'). Với です tạo câu lịch sự: この本はおもしろいです.",
          "Phủ định bỏ い cuối và thêm くない(です): 暑い → 暑くないです ('không nóng'). いい ('tốt') bất quy tắc: phủ định là よくないです.",
        ],
        pitfalls: [
          "Đừng nói おもしろいじゃありません — tính từ い phủ định bằng くない, không phải じゃありません.",
          "い là một phần của từ; giữ nó khi đặt tính từ trước danh từ (新しい車, không phải 新し車).",
        ],
      },
    },
    l8_na_adj: {
      en: {
        explanation: [
          "な-adjectives behave like nouns: with です they state a quality (静かです), and they take な when placed before a noun (静かな所, 'a quiet place').",
          "Their negative is the noun-style じゃありません: 有名じゃありません ('is not famous'). This is why they are grouped with nouns rather than with い-adjectives.",
        ],
        pitfalls: [
          "Don't forget the な before a noun: 親切な人, not 親切人.",
          "Drop the な when the adjective ends the sentence: この町はにぎやかです, not にぎやかなです.",
        ],
      },
      vi: {
        explanation: [
          "Tính từ đuôi な hoạt động như danh từ: với です nêu tính chất (静かです), và thêm な khi đứng trước danh từ (静かな所, 'nơi yên tĩnh').",
          "Phủ định theo kiểu danh từ じゃありません: 有名じゃありません ('không nổi tiếng'). Vì vậy chúng được xếp cùng danh từ chứ không cùng tính từ い.",
        ],
        pitfalls: [
          "Đừng quên な trước danh từ: 親切な人, không phải 親切人.",
          "Bỏ な khi tính từ kết thúc câu: この町はにぎやかです, không phải にぎやかなです.",
        ],
      },
    },
    l8_ga_but: {
      en: {
        explanation: [
          "The clause-final が joins two clauses with a contrast — 'X, but Y'. It comes after the です/ます of the first clause: 狭いですが、きれいです.",
          "This が is different from the subject-marker が; here it works like 'but' and always sits between two full clauses.",
        ],
        pitfalls: [
          "Keep です/ます before this が — 狭いが、… is plain style and clashes with polite です elsewhere in the sentence.",
          "Don't confuse it with けど (casual 'but'); が is the polite written choice.",
        ],
      },
      vi: {
        explanation: [
          "が cuối mệnh đề nối hai mệnh đề với ý tương phản — 'X, nhưng Y'. Nó đứng sau です/ます của mệnh đề đầu: 狭いですが、きれいです.",
          "が này khác với が đánh dấu chủ ngữ; ở đây nó nghĩa 'nhưng' và luôn nằm giữa hai mệnh đề hoàn chỉnh.",
        ],
        pitfalls: [
          "Giữ です/ます trước が này — 狭いが、… là thể thường và không hợp với です lịch sự ở phần khác của câu.",
          "Đừng nhầm với けど ('nhưng' thân mật); が là lựa chọn lịch sự trong văn viết.",
        ],
      },
    },
  },
  exercises: {
    8: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "今日は暑（　）です。（is not hot）",
          options: ["くない", "じゃない", "ない", "くありません"],
          answer: 0,
          explanation: {
            en: "い-adjective negative: 暑い → 暑くないです.",
            vi: "Phủ định tính từ い: 暑い → 暑くないです.",
          },
        },
        {
          prompt: "田中さんは親切（　）人です。",
          options: ["な", "い", "の", "だ"],
          answer: 0,
          explanation: {
            en: "な-adjectives take な before a noun.",
            vi: "Tính từ な thêm な trước danh từ.",
          },
        },
        {
          prompt: "京都は有名（　）。（is not famous）",
          options: ["じゃありません", "くないです", "ないです", "ません"],
          answer: 0,
          explanation: {
            en: "な-adjectives negate like nouns: じゃありません.",
            vi: "Tính từ な phủ định như danh từ: じゃありません.",
          },
        },
        {
          prompt: "この部屋は狭いです（　）、きれいです。",
          options: ["が", "から", "の", "も"],
          answer: 0,
          explanation: {
            en: "が joins clauses with a contrast ('but').",
            vi: "が nối mệnh đề với ý tương phản ('nhưng').",
          },
        },
        {
          prompt: "この本は（　）です。（interesting）",
          options: ["おもしろい", "おもしろな", "おもしろく", "おもしろの"],
          answer: 0,
          explanation: {
            en: "い-adjectives keep い before です.",
            vi: "Tính từ い giữ い trước です.",
          },
        },
      ],
    },
  },
};
