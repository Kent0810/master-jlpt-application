// Lesson 12 — past of nouns/な-adj, past of い-adj, comparisons.
module.exports = {
  examples: {
    l12_past_noun_adj: [
      { jp: "昨日は雨でした。", en: "It was rainy yesterday.", vi: "Hôm qua trời mưa." },
      { jp: "京都はにぎやかでした。", en: "Kyoto was lively.", vi: "Kyoto đã rất náo nhiệt." },
      { jp: "テストは簡単じゃありませんでした。", en: "The test was not easy.", vi: "Bài kiểm tra đã không dễ." },
    ],
    l12_past_i_adj: [
      { jp: "旅行は楽しかったです。", en: "The trip was fun.", vi: "Chuyến đi đã rất vui." },
      { jp: "映画はおもしろかったです。", en: "The movie was interesting.", vi: "Bộ phim đã rất thú vị." },
      { jp: "天気はよくなかったです。", en: "The weather was not good.", vi: "Thời tiết đã không tốt." },
    ],
    l12_comparison: [
      { jp: "東京は大阪より大きいです。", en: "Tokyo is bigger than Osaka.", vi: "Tokyo lớn hơn Osaka." },
      { jp: "「肉と魚とどちらが好きですか。」「魚のほうが好きです。」", en: "\"Which do you prefer, meat or fish?\" \"I prefer fish.\"", vi: "\"Bạn thích thịt hay cá hơn?\" \"Tôi thích cá hơn.\"" },
      { jp: "スポーツの中でサッカーがいちばん好きです。", en: "Among sports, I like soccer best.", vi: "Trong các môn thể thao, tôi thích bóng đá nhất." },
    ],
  },
  explanations: {
    l12_past_noun_adj: {
      en: {
        explanation: [
          "Nouns and な-adjectives form the past with でした (affirmative) and じゃありませんでした (negative): 雨でした ('it was rain'), 簡単じゃありませんでした ('it was not easy').",
          "The pattern mirrors the present: です → でした, じゃありません → じゃありませんでした. Only the copula changes.",
        ],
        pitfalls: [
          "Don't attach でした to an い-adjective (楽しいでした is wrong) — い-adjectives have their own past, below.",
          "The negative past is one block じゃありませんでした; では ありませんでした is its formal twin.",
        ],
      },
      vi: {
        explanation: [
          "Danh từ và tính từ な chia quá khứ bằng でした (khẳng định) và じゃありませんでした (phủ định): 雨でした ('trời đã mưa'), 簡単じゃありませんでした ('đã không dễ').",
          "Mẫu này song song với hiện tại: です → でした, じゃありません → じゃありませんでした. Chỉ hệ từ thay đổi.",
        ],
        pitfalls: [
          "Đừng gắn でした vào tính từ い (楽しいでした là sai) — tính từ い có dạng quá khứ riêng, ở dưới.",
          "Quá khứ phủ định là một khối じゃありませんでした; では ありませんでした là dạng trang trọng.",
        ],
      },
    },
    l12_past_i_adj: {
      en: {
        explanation: [
          "い-adjectives form the past by dropping い and adding かったです: 楽しい → 楽しかったです ('was fun'). The negative is くなかったです: 楽しくなかったです.",
          "いい is irregular here too: past よかったです, negative past よくなかったです.",
        ],
        pitfalls: [
          "Keep です after かった for politeness — 楽しかった alone is casual.",
          "Don't add でした: 楽しかったでした is a common mistake; かったです already carries the past.",
        ],
      },
      vi: {
        explanation: [
          "Tính từ い chia quá khứ bằng cách bỏ い và thêm かったです: 楽しい → 楽しかったです ('đã vui'). Phủ định là くなかったです: 楽しくなかったです.",
          "いい cũng bất quy tắc ở đây: quá khứ よかったです, quá khứ phủ định よくなかったです.",
        ],
        pitfalls: [
          "Giữ です sau かった cho lịch sự — 楽しかった đứng một mình là thân mật.",
          "Đừng thêm でした: 楽しかったでした là lỗi thường gặp; かったです đã mang nghĩa quá khứ.",
        ],
      },
    },
    l12_comparison: {
      en: {
        explanation: [
          "N1はN2より[adj] compares two things: 東京は大阪より大きいです ('Tokyo is bigger than Osaka'). より marks the standard you compare against.",
          "To ask 'which of two?', use どちら; to pick 'the most' from a group, use ～の中で…がいちばん[adj]: スポーツの中でサッカーがいちばん好きです.",
        ],
        pitfalls: [
          "より attaches to the thing you compare against (大阪より), not to the subject.",
          "For a choice between two, use どちら, not どれ (which is for three or more).",
        ],
      },
      vi: {
        explanation: [
          "N1はN2より[tính từ] so sánh hai vật: 東京は大阪より大きいです ('Tokyo lớn hơn Osaka'). より đánh dấu chuẩn để so sánh.",
          "Để hỏi 'cái nào trong hai?', dùng どちら; để chọn 'nhất' trong một nhóm, dùng ～の中で…がいちばん[tính từ]: スポーツの中でサッカーがいちばん好きです.",
        ],
        pitfalls: [
          "より gắn vào vật được đem ra so sánh (大阪より), không gắn vào chủ ngữ.",
          "Để chọn giữa hai, dùng どちら, không phải どれ (dùng cho ba trở lên).",
        ],
      },
    },
  },
  exercises: {
    12: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        { prompt: "昨日は雨（　）。（was）", options: ["でした", "です", "だった", "でしたです"], answer: 0, explanation: { en: "Noun past: 雨でした.", vi: "Quá khứ danh từ: 雨でした." } },
        { prompt: "旅行は楽し（　）です。（was fun）", options: ["かった", "い", "くない", "でした"], answer: 0, explanation: { en: "い-adjective past: 楽しかったです.", vi: "Quá khứ tính từ い: 楽しかったです." } },
        { prompt: "テストは簡単（　）。（was not）", options: ["じゃありませんでした", "くなかったです", "じゃありません", "でした"], answer: 0, explanation: { en: "な-adjective negative past: じゃありませんでした.", vi: "Quá khứ phủ định tính từ な: じゃありませんでした." } },
        { prompt: "東京は大阪（　）大きいです。（than）", options: ["より", "から", "まで", "と"], answer: 0, explanation: { en: "より marks the standard of comparison.", vi: "より đánh dấu chuẩn so sánh." } },
        { prompt: "スポーツの中でサッカーが（　）好きです。（best）", options: ["いちばん", "より", "どちら", "とても"], answer: 0, explanation: { en: "いちばん = 'the most / best'.", vi: "いちばん = 'nhất'." } },
      ],
    },
  },
};
