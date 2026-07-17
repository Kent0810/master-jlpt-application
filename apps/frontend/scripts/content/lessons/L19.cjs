// Lesson 19 — た-form, V-たことがあります, V-たり V-たり, ～く/になります.
module.exports = {
  examples: {
    l19_ta_form: [
      {
        jp: "きのう京都へ行った。",
        en: "I went to Kyoto yesterday.",
        vi: "Hôm qua tôi đã đi Kyoto.",
      },
      {
        jp: "ゆうべ映画を見た。",
        en: "I watched a movie last night.",
        vi: "Tối qua tôi đã xem phim.",
      },
      {
        jp: "けさパンを食べた。",
        en: "I ate bread this morning.",
        vi: "Sáng nay tôi đã ăn bánh mì.",
      },
    ],
    l19_ta_koto_ga_arimasu: [
      {
        jp: "日本へ行ったことがあります。",
        en: "I have been to Japan.",
        vi: "Tôi đã từng đến Nhật.",
      },
      {
        jp: "すしを食べたことがあります。",
        en: "I have eaten sushi before.",
        vi: "Tôi đã từng ăn sushi.",
      },
      {
        jp: "富士山に登ったことがあります。",
        en: "I have climbed Mt. Fuji.",
        vi: "Tôi đã từng leo núi Phú Sĩ.",
      },
    ],
    l19_tari_tari: [
      {
        jp: "日曜日は本を読んだり、音楽を聞いたりします。",
        en: "On Sundays I do things like read and listen to music.",
        vi: "Chủ nhật tôi đọc sách, nghe nhạc, v.v.",
      },
      {
        jp: "京都で写真を撮ったり、買い物をしたりしました。",
        en: "In Kyoto I took photos, went shopping, and so on.",
        vi: "Ở Kyoto tôi chụp ảnh, mua sắm, v.v.",
      },
      {
        jp: "休みの日はテレビを見たり、寝たりします。",
        en: "On days off I watch TV, sleep, and so on.",
        vi: "Ngày nghỉ tôi xem ti vi, ngủ, v.v.",
      },
    ],
    l19_narimasu: [
      {
        jp: "春になりました。",
        en: "It has become spring.",
        vi: "Đã sang xuân rồi.",
      },
      {
        jp: "日本語が上手になりました。",
        en: "I have become good at Japanese.",
        vi: "Tôi đã giỏi tiếng Nhật hơn.",
      },
      {
        jp: "寒くなりました。",
        en: "It has gotten cold.",
        vi: "Trời đã trở lạnh.",
      },
    ],
  },
  explanations: {
    l19_ta_form: {
      en: {
        explanation: [
          "The た-form is the plain past. It is made exactly like the て-form but ending in た/だ: 書いて → 書いた, 読んで → 読んだ, 食べて → 食べた.",
          "On its own it is casual past ('I went'); it is also the base for the たことがあります and たり patterns below.",
        ],
        pitfalls: [
          "The same sound changes as the て-form apply, including 行って → 行った.",
          "た-form is plain style; add でした/ました context or keep it casual, but don't mix ます onto it.",
        ],
      },
      vi: {
        explanation: [
          "Thể た là quá khứ thể thường. Nó được tạo giống hệt thể て nhưng kết thúc bằng た/だ: 書いて → 書いた, 読んで → 読んだ, 食べて → 食べた.",
          "Đứng một mình nó là quá khứ thân mật ('tôi đã đi'); nó cũng là gốc của các mẫu たことがあります và たり ở dưới.",
        ],
        pitfalls: [
          "Cùng biến âm như thể て, gồm cả 行って → 行った.",
          "Thể た là thể thường; đừng gắn ます vào nó.",
        ],
      },
    },
    l19_ta_koto_ga_arimasu: {
      en: {
        explanation: [
          "[た-form] ことがあります talks about past experience — 'have done ~ before': 行ったことがあります ('have been'), 食べたことがあります ('have eaten').",
          "The negative ことがありません means 'have never ~'. Use it for life experiences, not for what you did yesterday (that is just the past tense).",
        ],
        pitfalls: [
          "Use the た-form here, not the dictionary form: 見たことがあります.",
          "For a specific recent action, use plain past (きのう見ました), not this experience pattern.",
        ],
      },
      vi: {
        explanation: [
          "[thể た] ことがあります nói về kinh nghiệm quá khứ — 'đã từng ~': 行ったことがあります ('đã từng đến'), 食べたことがあります ('đã từng ăn').",
          "Phủ định ことがありません nghĩa 'chưa từng ~'. Dùng cho trải nghiệm cả đời, không dùng cho việc làm hôm qua (đó chỉ là thì quá khứ).",
        ],
        pitfalls: [
          "Dùng thể た ở đây, không dùng thể từ điển: 見たことがあります.",
          "Với hành động gần đây cụ thể, dùng quá khứ thường (きのう見ました), không dùng mẫu kinh nghiệm này.",
        ],
      },
    },
    l19_tari_tari: {
      en: {
        explanation: [
          "V-たり V-たりします lists some representative actions among others — 'do things like A and B': 読んだり、聞いたりします. It suggests the list is not exhaustive.",
          "Attach り to the た-form of each verb, and finish with します (or しました for past). Usually two examples are given.",
        ],
        pitfalls: [
          "The final verb します carries the tense; the たり verbs stay the same for past and non-past.",
          "Unlike the て-form chain, たり does not imply a fixed order — the actions are just examples.",
        ],
      },
      vi: {
        explanation: [
          "V-たり V-たりします liệt kê vài hành động tiêu biểu trong số nhiều — 'làm những việc như A và B': 読んだり、聞いたりします. Nó ngụ ý danh sách không đầy đủ.",
          "Gắn り vào thể た của mỗi động từ, và kết thúc bằng します (hoặc しました cho quá khứ). Thường nêu hai ví dụ.",
        ],
        pitfalls: [
          "Động từ cuối します mang thì; các động từ たり giữ nguyên cho quá khứ và hiện tại.",
          "Khác chuỗi thể て, たり không hàm ý thứ tự cố định — các hành động chỉ là ví dụ.",
        ],
      },
    },
    l19_narimasu: {
      en: {
        explanation: [
          "なります expresses change. い-adjectives change い → く: 寒い → 寒くなります ('gets cold'). な-adjectives and nouns add に: 上手 → 上手になります, 春 → 春になります.",
          "It focuses on the change itself ('become ~'), as opposed to します, which is doing something deliberately.",
        ],
        pitfalls: [
          "Use く for い-adjectives and に for な-adjectives/nouns — don't mix them up.",
          "いい → よくなります (irregular), not いくなります.",
        ],
      },
      vi: {
        explanation: [
          "なります diễn tả sự thay đổi. Tính từ い đổi い → く: 寒い → 寒くなります ('trở lạnh'). Tính từ な và danh từ thêm に: 上手 → 上手になります, 春 → 春になります.",
          "Nó nhấn vào sự thay đổi ('trở nên ~'), khác với します là chủ động làm gì đó.",
        ],
        pitfalls: [
          "Dùng く cho tính từ い và に cho tính từ な/danh từ — đừng nhầm.",
          "いい → よくなります (bất quy tắc), không phải いくなります.",
        ],
      },
    },
  },
  exercises: {
    19: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "日本へ（　）ことがあります。（have been — 行きます）",
          options: ["行った", "行って", "行く", "行き"],
          answer: 0,
          explanation: {
            en: "Experience uses the た-form: 行った.",
            vi: "Kinh nghiệm dùng thể た: 行った.",
          },
        },
        {
          prompt: "日曜日は本を読んだり、音楽を（　）します。",
          options: ["聞いたり", "聞いて", "聞く", "聞き"],
          answer: 0,
          explanation: {
            en: "たり…たりします lists actions.",
            vi: "たり…たりします liệt kê hành động.",
          },
        },
        {
          prompt: "寒く（　）。（has become cold）",
          options: ["なりました", "しました", "ありました", "いました"],
          answer: 0,
          explanation: {
            en: "い-adj + くなります = become.",
            vi: "Tính từ い + くなります = trở nên.",
          },
        },
        {
          prompt: "日本語が上手（　）なりました。",
          options: ["に", "く", "で", "と"],
          answer: 0,
          explanation: {
            en: "な-adjective + に + なります.",
            vi: "Tính từ な + に + なります.",
          },
        },
        {
          prompt: "食べます → た-form is（　）。",
          options: ["食べた", "食べて", "食べり", "食べって"],
          answer: 0,
          explanation: {
            en: "る-verb: 食べます → 食べた.",
            vi: "Nhóm る: 食べます → 食べた.",
          },
        },
      ],
    },
  },
};
