// Lesson 24 — くれます (gives to me), V-てあげます/てもらいます/てくれます.
module.exports = {
  examples: {
    l24_kuremasu: [
      { jp: "田中さんがわたしに本をくれました。", en: "Mr. Tanaka gave me a book.", vi: "Ông Tanaka đã cho tôi một quyển sách." },
      { jp: "友達が花をくれました。", en: "A friend gave me flowers.", vi: "Một người bạn đã tặng tôi hoa." },
      { jp: "母がセーターをくれました。", en: "My mother gave me a sweater.", vi: "Mẹ tôi đã cho tôi một chiếc áo len." },
    ],
    l24_te_giving: [
      { jp: "わたしは友達に日本語を教えてあげました。", en: "I taught my friend Japanese (for them).", vi: "Tôi đã dạy tiếng Nhật cho bạn." },
      { jp: "ミラーさんに写真を撮ってもらいました。", en: "I had Mr. Miller take a photo (for me).", vi: "Tôi đã nhờ anh Miller chụp ảnh giúp." },
      { jp: "田中さんが手伝ってくれました。", en: "Mr. Tanaka helped me (for my benefit).", vi: "Ông Tanaka đã giúp tôi." },
    ],
  },
  explanations: {
    l24_kuremasu: {
      en: {
        explanation: [
          "くれます means 'give', but only when the receiver is me or my in-group: 田中さんがわたしに本をくれました ('Mr. Tanaka gave me a book'). The giver is the subject (が), and に marks me.",
          "Compare with あげます (Lesson 7), which is used when I or someone else gives to a third person. Japanese picks the verb by direction of the gift.",
        ],
        pitfalls: [
          "Don't use あげます for something given to you — that is くれます or もらいます.",
          "The receiver of くれます must be the speaker or the speaker's side; you can't say 'A gave B' with くれます unless B is your in-group.",
        ],
      },
      vi: {
        explanation: [
          "くれます nghĩa 'cho', nhưng chỉ khi người nhận là tôi hoặc người thân của tôi: 田中さんがわたしに本をくれました ('ông Tanaka cho tôi một quyển sách'). Người cho là chủ ngữ (が), còn に đánh dấu tôi.",
          "So với あげます (Bài 7), dùng khi tôi hoặc ai đó cho người thứ ba. Tiếng Nhật chọn động từ theo hướng của món quà.",
        ],
        pitfalls: [
          "Đừng dùng あげます cho thứ được cho bạn — đó là くれます hoặc もらいます.",
          "Người nhận của くれます phải là người nói hoặc phe của người nói; không thể nói 'A cho B' bằng くれます trừ khi B là người thân của bạn.",
        ],
      },
    },
    l24_te_giving: {
      en: {
        explanation: [
          "Adding a giving verb to a て-form expresses doing a favour: V-てあげます (do for someone), V-てもらいます (have someone do for you), V-てくれます (someone does for you).",
          "The particles follow the base verb: 教えてあげます takes に for the person helped; 撮ってもらいます takes に for the person who does it.",
        ],
        pitfalls: [
          "てあげます can sound patronising if said to a superior about a favour you did them — use it carefully.",
          "Match the direction: use てくれます when the favour comes toward you, てもらいます when you request it.",
        ],
      },
      vi: {
        explanation: [
          "Thêm động từ cho/nhận vào thể て diễn tả việc làm ơn: V-てあげます (làm giúp ai), V-てもらいます (nhờ ai làm cho mình), V-てくれます (ai đó làm cho mình).",
          "Trợ từ theo động từ gốc: 教えてあげます dùng に cho người được giúp; 撮ってもらいます dùng に cho người thực hiện.",
        ],
        pitfalls: [
          "てあげます có thể nghe kẻ cả nếu nói với người trên về việc bạn giúp họ — hãy dùng thận trọng.",
          "Khớp hướng: dùng てくれます khi ơn hướng về bạn, てもらいます khi bạn nhờ.",
        ],
      },
    },
  },
  exercises: {
    24: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        { prompt: "田中さんがわたしに本を（　）。（gave me）", options: ["くれました", "あげました", "もらいました", "しました"], answer: 0, explanation: { en: "Given to me → くれました.", vi: "Cho tôi → くれました." } },
        { prompt: "田中さんがわたし（　）本をくれました。", options: ["に", "が", "を", "で"], answer: 0, explanation: { en: "に marks the receiver (me).", vi: "に đánh dấu người nhận (tôi)." } },
        { prompt: "わたしは友達に日本語を教えて（　）。（did for them）", options: ["あげました", "くれました", "もらいました", "いました"], answer: 0, explanation: { en: "Do a favour for someone → てあげます.", vi: "Làm ơn cho ai → てあげます." } },
        { prompt: "ミラーさんに写真を撮って（　）。（had them do for me）", options: ["もらいました", "あげました", "くれました", "しました"], answer: 0, explanation: { en: "Have someone do for you → てもらいます.", vi: "Nhờ ai làm cho mình → てもらいます." } },
        { prompt: "田中さんが手伝って（　）。（did for me）", options: ["くれました", "あげました", "もらいました", "いました"], answer: 0, explanation: { en: "Someone does for me → てくれます.", vi: "Ai đó làm cho tôi → てくれます." } },
      ],
    },
  },
};
