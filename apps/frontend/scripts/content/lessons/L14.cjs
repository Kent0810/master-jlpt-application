// Lesson 14 — て-form, V-てください, V-ています (progressive).
module.exports = {
  examples: {
    l14_te_form: [
      { jp: "パスポートを見せてください。", en: "Please show me your passport.", vi: "Vui lòng cho tôi xem hộ chiếu." },
      { jp: "ここに名前を書いてください。", en: "Please write your name here.", vi: "Xin hãy viết tên vào đây." },
      { jp: "ゆっくり話してください。", en: "Please speak slowly.", vi: "Xin hãy nói chậm rãi." },
    ],
    l14_te_kudasai: [
      { jp: "ちょっと待ってください。", en: "Please wait a moment.", vi: "Xin đợi một chút." },
      { jp: "この漢字を教えてください。", en: "Please teach me this kanji.", vi: "Xin hãy dạy tôi chữ kanji này." },
      { jp: "窓を開けてください。", en: "Please open the window.", vi: "Xin hãy mở cửa sổ." },
    ],
    l14_te_imasu: [
      { jp: "今、雨が降っています。", en: "It is raining now.", vi: "Bây giờ trời đang mưa." },
      { jp: "ミラーさんは電話をかけています。", en: "Mr. Miller is making a phone call.", vi: "Anh Miller đang gọi điện thoại." },
      { jp: "田中さんは本を読んでいます。", en: "Mr. Tanaka is reading a book.", vi: "Ông Tanaka đang đọc sách." },
    ],
  },
  explanations: {
    l14_te_form: {
      en: {
        explanation: [
          "The て-form is a connecting form with no tense of its own. It is the base for many patterns: requests (てください), the progressive (ています), permission, and joining clauses.",
          "It is made from the verb group: う/つ/る → って, む/ぶ/ぬ → んで, く → いて, ぐ → いで, す → して; the irregulars are します→して and 来ます→来て. 行きます is special: 行って.",
        ],
        pitfalls: [
          "行きます becomes 行って, not 行いて — memorise this exception.",
          "The て-form alone is not a full sentence; it must lead into another verb or ください.",
        ],
      },
      vi: {
        explanation: [
          "Thể て là dạng nối, tự nó không mang thì. Nó là gốc của nhiều mẫu: yêu cầu (てください), tiếp diễn (ています), cho phép, và nối mệnh đề.",
          "Nó được tạo theo nhóm động từ: う/つ/る → って, む/ぶ/ぬ → んで, く → いて, ぐ → いで, す → して; bất quy tắc là します→して và 来ます→来て. 行きます đặc biệt: 行って.",
        ],
        pitfalls: [
          "行きます thành 行って, không phải 行いて — hãy nhớ ngoại lệ này.",
          "Thể て một mình không phải câu hoàn chỉnh; phải dẫn tới một động từ khác hoặc ください.",
        ],
      },
    },
    l14_te_kudasai: {
      en: {
        explanation: [
          "V-てください makes a polite request or instruction — 'please do ~': 待ってください ('please wait'), 見せてください ('please show me').",
          "It suits asking someone to do something for you, and giving directions or classroom instructions.",
        ],
        pitfalls: [
          "It is polite but still a direct request; for a softer ask, use ～ていただけませんか (learned later).",
          "The negative 'please don't ~' is a different form: V-ないでください (Lesson 17).",
        ],
      },
      vi: {
        explanation: [
          "V-てください tạo lời yêu cầu hoặc chỉ dẫn lịch sự — 'xin hãy ~': 待ってください ('xin đợi'), 見せてください ('xin cho tôi xem').",
          "Nó hợp để nhờ ai làm gì cho mình, và để chỉ đường hay ra chỉ dẫn trong lớp.",
        ],
        pitfalls: [
          "Nó lịch sự nhưng vẫn là yêu cầu trực tiếp; muốn nhẹ hơn, dùng ～ていただけませんか (học sau).",
          "Phủ định 'xin đừng ~' là dạng khác: V-ないでください (Bài 17).",
        ],
      },
    },
    l14_te_imasu: {
      en: {
        explanation: [
          "V-ています describes an action in progress right now — 'is ~ing': 雨が降っています ('it is raining'), 読んでいます ('is reading').",
          "It is built from the て-form plus います. In casual speech the い often drops: 食べてる.",
        ],
        pitfalls: [
          "Some verbs with ています express a resulting state, not an action in progress (Lesson 15) — context decides.",
          "Don't forget います is for this pattern regardless of the subject; it is not the 'exist' います here.",
        ],
      },
      vi: {
        explanation: [
          "V-ています tả một hành động đang diễn ra ngay lúc này — 'đang ~': 雨が降っています ('trời đang mưa'), 読んでいます ('đang đọc').",
          "Nó ghép từ thể て cộng います. Trong văn nói thân mật い thường bị lược: 食べてる.",
        ],
        pitfalls: [
          "Một số động từ với ています diễn tả trạng thái kết quả, không phải hành động đang diễn ra (Bài 15) — ngữ cảnh quyết định.",
          "Đừng quên います dùng cho mẫu này bất kể chủ ngữ; đây không phải います 'tồn tại'.",
        ],
      },
    },
  },
  exercises: {
    14: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        { prompt: "ちょっと（　）ください。（wait — 待ちます）", options: ["待って", "待ちて", "待いて", "待んで"], answer: 0, explanation: { en: "つ-verb: 待ちます → 待って.", vi: "Động từ đuôi つ: 待ちます → 待って." } },
        { prompt: "ここに名前を書いて（　）。", options: ["ください", "います", "あります", "です"], answer: 0, explanation: { en: "V-てください = please do.", vi: "V-てください = xin hãy làm." } },
        { prompt: "今、雨が降って（　）。（is …ing）", options: ["います", "ください", "あります", "です"], answer: 0, explanation: { en: "V-ています = action in progress.", vi: "V-ています = hành động đang diễn ra." } },
        { prompt: "本を（　）います。（reading — 読みます）", options: ["読んで", "読みて", "読くて", "読んて"], answer: 0, explanation: { en: "む-verb: 読みます → 読んで.", vi: "Động từ đuôi む: 読みます → 読んで." } },
        { prompt: "（　）ください。（go — 行きます）", options: ["行って", "行きて", "行いて", "行んで"], answer: 0, explanation: { en: "行きます is irregular: 行って.", vi: "行きます bất quy tắc: 行って." } },
      ],
    },
  },
};
