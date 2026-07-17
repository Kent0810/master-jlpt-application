// Lesson 25 — ～たら (if / when), ～ても (even if).
module.exports = {
  examples: {
    l25_tara: [
      {
        jp: "お金があったら、旅行します。",
        en: "If I have money, I'll travel.",
        vi: "Nếu có tiền, tôi sẽ đi du lịch.",
      },
      {
        jp: "日本へ行ったら、京都を見たいです。",
        en: "When I go to Japan, I want to see Kyoto.",
        vi: "Khi đi Nhật, tôi muốn thăm Kyoto.",
      },
      {
        jp: "安かったら、買います。",
        en: "If it's cheap, I'll buy it.",
        vi: "Nếu rẻ, tôi sẽ mua.",
      },
    ],
    l25_temo: [
      {
        jp: "雨が降っても、行きます。",
        en: "Even if it rains, I'll go.",
        vi: "Dù trời mưa, tôi vẫn đi.",
      },
      {
        jp: "高くても、買います。",
        en: "Even if it's expensive, I'll buy it.",
        vi: "Dù đắt, tôi vẫn mua.",
      },
      {
        jp: "日曜日でも、働きます。",
        en: "Even on Sundays, I work.",
        vi: "Dù là chủ nhật, tôi vẫn làm việc.",
      },
    ],
  },
  explanations: {
    l25_tara: {
      en: {
        explanation: [
          "V-たら is a conditional — 'if / once ~ happens, then ~'. Make it by adding ら to the plain past た-form: 行った → 行ったら, あった → あったら, 安かった → 安かったら.",
          "It works for both real conditions ('if it's cheap') and 'when' a future event completes ('once I get to Japan'). The main clause can be a plan, wish, or request.",
        ],
        pitfalls: [
          "Build たら from the た-form, so the same sound changes apply: 飲んだら, 書いたら.",
          "Unlike と, たら allows a request or intention in the result: 日本へ行ったら、京都を見たいです.",
        ],
      },
      vi: {
        explanation: [
          "V-たら là câu điều kiện — 'nếu / một khi ~ xảy ra thì ~'. Tạo bằng cách thêm ら vào thể quá khứ た: 行った → 行ったら, あった → あったら, 安かった → 安かったら.",
          "Nó dùng cho cả điều kiện thực ('nếu rẻ') và 'khi' một việc tương lai hoàn tất ('một khi đến Nhật'). Mệnh đề chính có thể là kế hoạch, mong muốn, hay yêu cầu.",
        ],
        pitfalls: [
          "Tạo たら từ thể た, nên áp dụng cùng biến âm: 飲んだら, 書いたら.",
          "Khác với と, たら cho phép yêu cầu hoặc ý định ở kết quả: 日本へ行ったら、京都を見たいです.",
        ],
      },
    },
    l25_temo: {
      en: {
        explanation: [
          "V-ても means 'even if ~'. Make it from the て-form plus も: 降っても ('even if it rains'). い-adjectives use くても (高くても), nouns/な-adjectives use でも (日曜日でも).",
          "The main clause states what happens regardless of the condition — the outcome is unaffected: 高くても、買います ('even if it's expensive, I'll buy it').",
        ],
        pitfalls: [
          "Don't confuse ても 'even if' with てもいい 'may' (Lesson 15) — here no いい follows.",
          "Use くても / でも for adjectives and nouns, not just the plain ても.",
        ],
      },
      vi: {
        explanation: [
          "V-ても nghĩa 'dù ~'. Tạo từ thể て cộng も: 降っても ('dù trời mưa'). Tính từ い dùng くても (高くても), danh từ/tính từ な dùng でも (日曜日でも).",
          "Mệnh đề chính nêu điều vẫn xảy ra bất kể điều kiện — kết quả không đổi: 高くても、買います ('dù đắt, tôi vẫn mua').",
        ],
        pitfalls: [
          "Đừng nhầm ても 'dù' với てもいい 'được phép' (Bài 15) — ở đây không có いい theo sau.",
          "Dùng くても / でも cho tính từ và danh từ, không chỉ ても đơn thuần.",
        ],
      },
    },
  },
  exercises: {
    25: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "お金が（　）、旅行します。（if there is — あります）",
          options: ["あったら", "あると", "あって", "あるなら"],
          answer: 0,
          explanation: {
            en: "たら from the た-form: あった → あったら.",
            vi: "たら từ thể た: あった → あったら.",
          },
        },
        {
          prompt: "安（　）、買います。（if cheap）",
          options: ["かったら", "いたら", "くても", "ければ"],
          answer: 0,
          explanation: {
            en: "い-adjective たら: 安かったら.",
            vi: "たら tính từ い: 安かったら.",
          },
        },
        {
          prompt: "雨が降（　）、行きます。（even if）",
          options: ["っても", "ったら", "ると", "って"],
          answer: 0,
          explanation: {
            en: "ても from the て-form: 降っても.",
            vi: "ても từ thể て: 降っても.",
          },
        },
        {
          prompt: "高（　）、買います。（even if expensive）",
          options: ["くても", "かったら", "いても", "ければ"],
          answer: 0,
          explanation: {
            en: "い-adjective ても: 高くても.",
            vi: "ても tính từ い: 高くても.",
          },
        },
        {
          prompt: "日曜日（　）、働きます。（even on）",
          options: ["でも", "ても", "だら", "なら"],
          answer: 0,
          explanation: {
            en: "Noun + でも = 'even'.",
            vi: "Danh từ + でも = 'dù'.",
          },
        },
      ],
    },
  },
};
