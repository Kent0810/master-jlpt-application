// Lesson 17 — ない-form, V-ないでください, V-なければなりません / なくてもいいです.
module.exports = {
  examples: {
    l17_nai_form: [
      { jp: "ここで写真を撮らないでください。", en: "Please don't take photos here.", vi: "Xin đừng chụp ảnh ở đây." },
      { jp: "無理をしないでください。", en: "Please don't overdo it.", vi: "Xin đừng làm quá sức." },
      { jp: "電気を消さないでください。", en: "Please don't turn off the light.", vi: "Xin đừng tắt đèn." },
    ],
    l17_naide_kudasai: [
      { jp: "ここに入らないでください。", en: "Please don't enter here.", vi: "Xin đừng vào đây." },
      { jp: "大きい声で話さないでください。", en: "Please don't speak loudly.", vi: "Xin đừng nói to." },
      { jp: "心配しないでください。", en: "Please don't worry.", vi: "Xin đừng lo lắng." },
    ],
    l17_nakereba: [
      { jp: "毎日薬を飲まなければなりません。", en: "I must take medicine every day.", vi: "Tôi phải uống thuốc mỗi ngày." },
      { jp: "あした早く起きなければなりません。", en: "I must get up early tomorrow.", vi: "Ngày mai tôi phải dậy sớm." },
      { jp: "日曜日は働かなくてもいいです。", en: "I don't have to work on Sundays.", vi: "Chủ nhật tôi không cần làm việc." },
    ],
  },
  explanations: {
    l17_nai_form: {
      en: {
        explanation: [
          "The ない-form is the plain negative and the base for several patterns. For う-verbs, change the final -u sound to -a and add ない: 飲む → 飲まない, 書く → 書かない.",
          "る-verbs just add ない (食べる → 食べない). The irregulars are する → しない and 来る → 来ない. あります is special: its negative is ない.",
        ],
        pitfalls: [
          "For う-verbs ending in う, the ない-form uses わ: 買う → 買わない, not 買あない.",
          "The ない-form is plain style; the patterns below add ください or なければ to make it usable politely.",
        ],
      },
      vi: {
        explanation: [
          "Thể ない là phủ định thể thường và là gốc của nhiều mẫu. Với động từ nhóm う, đổi âm -u cuối thành -a rồi thêm ない: 飲む → 飲まない, 書く → 書かない.",
          "Động từ nhóm る chỉ thêm ない (食べる → 食べない). Bất quy tắc là する → しない và 来る → 来ない. あります đặc biệt: phủ định là ない.",
        ],
        pitfalls: [
          "Với động từ đuôi う, thể ない dùng わ: 買う → 買わない, không phải 買あない.",
          "Thể ない là thể thường; các mẫu dưới thêm ください hoặc なければ để dùng lịch sự.",
        ],
      },
    },
    l17_naide_kudasai: {
      en: {
        explanation: [
          "V-ないでください asks someone not to do something — 'please don't ~': 入らないでください ('please don't enter'). It is the negative counterpart of てください.",
          "It is common on signs and in gentle warnings (心配しないでください, 'don't worry').",
        ],
        pitfalls: [
          "Use the plain ない-form before でください, not the polite ません.",
          "It is a request, not a rule; for a firm prohibition use てはいけません (Lesson 15).",
        ],
      },
      vi: {
        explanation: [
          "V-ないでください nhờ ai đừng làm gì đó — 'xin đừng ~': 入らないでください ('xin đừng vào'). Đây là dạng phủ định của てください.",
          "Nó hay gặp trên biển báo và lời nhắc nhẹ nhàng (心配しないでください, 'đừng lo').",
        ],
        pitfalls: [
          "Dùng thể ない thường trước でください, không dùng ません lịch sự.",
          "Đây là yêu cầu, không phải quy tắc; muốn cấm dứt khoát dùng てはいけません (Bài 15).",
        ],
      },
    },
    l17_nakereba: {
      en: {
        explanation: [
          "V-なければなりません expresses obligation — 'must ~': 飲まなければなりません ('must take'). Its opposite, V-なくてもいいです, means 'don't have to ~'.",
          "Both start from the ない-form: drop ない and add ければなりません, or add くてもいいです.",
        ],
        pitfalls: [
          "The 'must' pattern is a fixed long ending; in casual speech it shortens to なきゃ / なくちゃ.",
          "'Don't have to' is なくてもいいです — don't confuse it with てはいけません ('must not').",
        ],
      },
      vi: {
        explanation: [
          "V-なければなりません diễn tả nghĩa vụ — 'phải ~': 飲まなければなりません ('phải uống'). Ngược lại, V-なくてもいいです nghĩa 'không cần ~'.",
          "Cả hai xuất phát từ thể ない: bỏ ない rồi thêm ければなりません, hoặc thêm くてもいいです.",
        ],
        pitfalls: [
          "Mẫu 'phải' là một đuôi dài cố định; trong văn nói rút thành なきゃ / なくちゃ.",
          "'Không cần' là なくてもいいです — đừng nhầm với てはいけません ('không được').",
        ],
      },
    },
  },
  exercises: {
    17: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        { prompt: "ここに（　）でください。（don't enter — 入ります）", options: ["入らない", "入りない", "入れない", "入るない"], answer: 0, explanation: { en: "う-verb ない-form: 入る → 入らない.", vi: "Thể ない nhóm う: 入る → 入らない." } },
        { prompt: "心配し（　）でください。（don't worry）", options: ["ない", "なくて", "ません", "ず"], answer: 0, explanation: { en: "する → しない before でください.", vi: "する → しない trước でください." } },
        { prompt: "毎日薬を飲ま（　）なりません。（must）", options: ["なければ", "なくても", "ないで", "なく"], answer: 0, explanation: { en: "なければなりません = must.", vi: "なければなりません = phải." } },
        { prompt: "日曜日は働か（　）いいです。（don't have to）", options: ["なくても", "なければ", "ないで", "なく"], answer: 0, explanation: { en: "なくてもいいです = don't have to.", vi: "なくてもいいです = không cần." } },
        { prompt: "写真を（　）でください。（don't take — 撮ります）", options: ["撮らない", "撮りない", "撮るない", "撮れない"], answer: 0, explanation: { en: "う-verb: 撮る → 撮らない.", vi: "Nhóm う: 撮る → 撮らない." } },
      ],
    },
  },
};
