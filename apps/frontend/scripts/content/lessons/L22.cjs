// Lesson 22 — noun modification (relative clauses), どんな N.
module.exports = {
  examples: {
    l22_noun_modify: [
      { jp: "これはミラーさんが作った料理です。", en: "This is the dish that Mr. Miller made.", vi: "Đây là món ăn mà anh Miller đã làm." },
      { jp: "きのう買った本はおもしろいです。", en: "The book I bought yesterday is interesting.", vi: "Quyển sách tôi mua hôm qua thú vị." },
      { jp: "あそこにいる人は田中さんです。", en: "The person over there is Mr. Tanaka.", vi: "Người ở đằng kia là ông Tanaka." },
    ],
    l22_donna: [
      { jp: "どんな音楽が好きですか。", en: "What kind of music do you like?", vi: "Bạn thích loại nhạc nào?" },
      { jp: "日本はどんな国ですか。", en: "What kind of country is Japan?", vi: "Nhật Bản là đất nước như thế nào?" },
      { jp: "田中さんはどんな人ですか。", en: "What kind of person is Mr. Tanaka?", vi: "Ông Tanaka là người như thế nào?" },
    ],
  },
  explanations: {
    l22_noun_modify: {
      en: {
        explanation: [
          "A plain-form clause placed directly before a noun describes it, like an English relative clause: ミラーさんが作った料理 ('the dish Mr. Miller made'), あそこにいる人 ('the person over there').",
          "Inside the modifying clause, the subject is marked by が (or の), not は, because は marks the topic of the whole sentence.",
        ],
        pitfalls: [
          "The clause comes before the noun, with no の or って between them: 買った本, not 買ったの本.",
          "Use plain form in the clause even when the sentence ends politely: 買った本はおもしろいです.",
        ],
      },
      vi: {
        explanation: [
          "Một mệnh đề thể thường đặt ngay trước danh từ sẽ bổ nghĩa cho nó, như mệnh đề quan hệ trong tiếng Anh: ミラーさんが作った料理 ('món anh Miller làm'), あそこにいる人 ('người ở đằng kia').",
          "Trong mệnh đề bổ nghĩa, chủ ngữ được đánh dấu bằng が (hoặc の), không phải は, vì は đánh dấu chủ đề của cả câu.",
        ],
        pitfalls: [
          "Mệnh đề đứng trước danh từ, không có の hay って ở giữa: 買った本, không phải 買ったの本.",
          "Dùng thể thường trong mệnh đề dù câu kết thúc lịch sự: 買った本はおもしろいです.",
        ],
      },
    },
    l22_donna: {
      en: {
        explanation: [
          "どんな + noun asks 'what kind of ~?': どんな音楽 ('what kind of music'), どんな人 ('what kind of person'). It always attaches to a noun.",
          "Answer with a describing word plus the noun: にぎやかな町, おもしろい人 — often a relative clause or adjective.",
        ],
        pitfalls: [
          "どんな always needs a noun after it; it cannot stand alone like どれ.",
          "Don't confuse どんな ('what kind') with どう ('how'): どんな料理 vs どうですか.",
        ],
      },
      vi: {
        explanation: [
          "どんな + danh từ hỏi 'loại ~ nào / ~ như thế nào': どんな音楽 ('loại nhạc nào'), どんな人 ('người như thế nào'). Nó luôn gắn với một danh từ.",
          "Trả lời bằng một từ miêu tả cộng danh từ: にぎやかな町, おもしろい人 — thường là mệnh đề quan hệ hoặc tính từ.",
        ],
        pitfalls: [
          "どんな luôn cần danh từ theo sau; không thể đứng một mình như どれ.",
          "Đừng nhầm どんな ('loại nào') với どう ('như thế nào'): どんな料理 và どうですか.",
        ],
      },
    },
  },
  exercises: {
    22: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        { prompt: "これはミラーさん（　）作った料理です。", options: ["が", "は", "を", "も"], answer: 0, explanation: { en: "Inside a modifying clause the subject takes が.", vi: "Trong mệnh đề bổ nghĩa, chủ ngữ dùng が." } },
        { prompt: "きのう（　）本はおもしろいです。（bought — 買います）", options: ["買った", "買います", "買って", "買う"], answer: 0, explanation: { en: "Use plain past 買った before the noun.", vi: "Dùng quá khứ thể thường 買った trước danh từ." } },
        { prompt: "あそこに（　）人は田中さんです。（is there — います）", options: ["いる", "います", "いた", "あって"], answer: 0, explanation: { en: "Plain form いる modifies 人.", vi: "Thể thường いる bổ nghĩa cho 人." } },
        { prompt: "（　）音楽が好きですか。（what kind of）", options: ["どんな", "どう", "どれ", "どこ"], answer: 0, explanation: { en: "どんな + noun = 'what kind of'.", vi: "どんな + danh từ = 'loại nào'." } },
        { prompt: "日本は（　）国ですか。", options: ["どんな", "どこ", "どちら", "どう"], answer: 0, explanation: { en: "どんな attaches to the noun 国.", vi: "どんな gắn với danh từ 国." } },
      ],
    },
  },
};
