// Lesson 20 — plain (casual) form.
module.exports = {
  examples: {
    l20_plain_form: [
      {
        jp: "あした映画を見る。",
        en: "I'll watch a movie tomorrow.",
        vi: "Ngày mai tôi sẽ xem phim.",
      },
      {
        jp: "きのうは楽しかった。",
        en: "Yesterday was fun.",
        vi: "Hôm qua rất vui.",
      },
      {
        jp: "今日は日曜日だ。",
        en: "Today is Sunday.",
        vi: "Hôm nay là chủ nhật.",
      },
    ],
  },
  explanations: {
    l20_plain_form: {
      en: {
        explanation: [
          "Plain (casual) form is the style used with family and close friends. Verbs use the dictionary/ない/た forms, い-adjectives drop です, and nouns/な-adjectives take だ (or nothing in questions).",
          "Polite です/ます and plain form carry the same meaning; only the level of formality differs. Choose by your relationship with the listener.",
        ],
        pitfalls: [
          "In casual questions, だ is usually dropped: 学生？ rather than 学生だ？.",
          "Don't mix styles within one sentence — keep either all polite or all plain.",
        ],
      },
      vi: {
        explanation: [
          "Thể thường (thân mật) là văn phong dùng với gia đình và bạn thân. Động từ dùng thể từ điển/ない/た, tính từ い bỏ です, còn danh từ/tính từ な thêm だ (hoặc không gì trong câu hỏi).",
          "です/ます lịch sự và thể thường mang cùng nghĩa; chỉ khác mức trang trọng. Chọn theo quan hệ với người nghe.",
        ],
        pitfalls: [
          "Trong câu hỏi thân mật, だ thường được bỏ: 学生？ thay vì 学生だ？.",
          "Đừng trộn văn phong trong một câu — hoặc toàn lịch sự, hoặc toàn thể thường.",
        ],
      },
    },
  },
  exercises: {
    20: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "あした映画を（　）。（plain: 見ます）",
          options: ["見る", "見た", "見て", "見ない"],
          answer: 0,
          explanation: {
            en: "Plain non-past of 見ます is 見る.",
            vi: "Thể thường hiện tại của 見ます là 見る.",
          },
        },
        {
          prompt: "きのうは（　）。（plain: 楽しいでした ✗）",
          options: ["楽しかった", "楽しいだ", "楽しいた", "楽しくた"],
          answer: 0,
          explanation: {
            en: "い-adj plain past: 楽しかった.",
            vi: "Quá khứ thể thường tính từ い: 楽しかった.",
          },
        },
        {
          prompt: "今日は日曜日（　）。（plain）",
          options: ["だ", "です", "である", "の"],
          answer: 0,
          explanation: {
            en: "Nouns take だ in plain form.",
            vi: "Danh từ thêm だ ở thể thường.",
          },
        },
        {
          prompt: "行きます → plain non-past（　）。",
          options: ["行く", "行った", "行かない", "行って"],
          answer: 0,
          explanation: {
            en: "Dictionary form 行く is the plain non-past.",
            vi: "Thể từ điển 行く là thể thường hiện tại.",
          },
        },
        {
          prompt: "食べません → plain（　）。",
          options: ["食べない", "食べる", "食べた", "食べなかった"],
          answer: 0,
          explanation: {
            en: "Plain non-past negative: 食べない.",
            vi: "Phủ định hiện tại thể thường: 食べない.",
          },
        },
      ],
    },
  },
};
