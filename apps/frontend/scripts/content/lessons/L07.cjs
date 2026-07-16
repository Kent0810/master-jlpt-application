// Lesson 7 — で (tool/method), あげます/もらいます, もう…ました.
module.exports = {
  examples: {
    l7_de_tool: [
      { jp: "はしでごはんを食べます。", en: "I eat rice with chopsticks.", vi: "Tôi ăn cơm bằng đũa." },
      { jp: "日本語でレポートを書きます。", en: "I write the report in Japanese.", vi: "Tôi viết báo cáo bằng tiếng Nhật." },
      { jp: "ペンで手紙を書きます。", en: "I write a letter with a pen.", vi: "Tôi viết thư bằng bút." },
    ],
    l7_agemasu_moraimasu: [
      { jp: "山田さんに花をあげます。", en: "I give flowers to Ms. Yamada.", vi: "Tôi tặng hoa cho chị Yamada." },
      { jp: "友達に本をもらいました。", en: "I received a book from a friend.", vi: "Tôi được bạn tặng một quyển sách." },
      { jp: "先生に辞書をもらいました。", en: "I received a dictionary from the teacher.", vi: "Tôi được thầy tặng một quyển từ điển." },
    ],
    l7_mou_mashita: [
      { jp: "もう昼ごはんを食べました。", en: "I have already eaten lunch.", vi: "Tôi đã ăn trưa rồi." },
      { jp: "もうレポートを書きました。", en: "I have already written the report.", vi: "Tôi đã viết báo cáo rồi." },
      { jp: "「もうメールを送りましたか。」「はい、送りました。」", en: "\"Have you sent the email yet?\" \"Yes, I sent it.\"", vi: "\"Bạn đã gửi email chưa?\" \"Rồi, tôi gửi rồi.\"" },
    ],
  },
  explanations: {
    l7_de_tool: {
      en: {
        explanation: [
          "で also marks the tool, method, or language used to do something: はしで ('with chopsticks'), 日本語で ('in Japanese'), メールで ('by email').",
          "This is the same particle as the 'action place' で and the 'vehicle' で — think of them all as 'the means by which': the location, transport, or instrument that enables the action.",
        ],
        pitfalls: [
          "For a language, で marks the medium (日本語で話します, 'speak in Japanese'); を would mark it as the subject of study.",
          "Put the tool phrase before the object: ペンで手紙を書きます.",
        ],
      },
      vi: {
        explanation: [
          "で cũng đánh dấu công cụ, cách thức, hoặc ngôn ngữ dùng để làm gì đó: はしで ('bằng đũa'), 日本語で ('bằng tiếng Nhật'), メールで ('bằng email').",
          "Đây cùng là trợ từ với で 'nơi hành động' và で 'phương tiện' — hãy xem tất cả là 'bằng cái mà': nơi chốn, phương tiện, hay công cụ giúp thực hiện hành động.",
        ],
        pitfalls: [
          "Với ngôn ngữ, で đánh dấu phương tiện (日本語で話します, 'nói bằng tiếng Nhật'); を lại đánh dấu nó là đối tượng học.",
          "Đặt cụm công cụ trước tân ngữ: ペンで手紙を書きます.",
        ],
      },
    },
    l7_agemasu_moraimasu: {
      en: {
        explanation: [
          "あげます = give (from the giver's side); もらいます = receive (from the receiver's side). に marks the other person — the receiver with あげます, the giver with もらいます.",
          "Choose the verb by whose viewpoint you take: わたしは友達に花をあげます (I give) vs わたしは友達に花をもらいます (I receive).",
        ],
        pitfalls: [
          "Don't use あげます for something given to you — that is もらいます or くれます (Lesson 24).",
          "With もらいます, から can replace に for the giver (友達からもらいます); with あげます, only に.",
        ],
      },
      vi: {
        explanation: [
          "あげます = cho/tặng (từ phía người cho); もらいます = nhận (từ phía người nhận). に đánh dấu người còn lại — người nhận với あげます, người cho với もらいます.",
          "Chọn động từ theo góc nhìn: わたしは友達に花をあげます (tôi cho) so với わたしは友達に花をもらいます (tôi nhận).",
        ],
        pitfalls: [
          "Đừng dùng あげます cho thứ được cho bạn — đó là もらいます hoặc くれます (Bài 24).",
          "Với もらいます, から có thể thay に cho người cho (友達からもらいます); với あげます chỉ dùng に.",
        ],
      },
    },
    l7_mou_mashita: {
      en: {
        explanation: [
          "もう + past ました means 'have already done ~'. It reports that something is finished as of now.",
          "The question もう～ましたか asks 'have you ~ yet?'. Answer はい、～ました if done, or いいえ、まだです ('no, not yet') if not.",
        ],
        pitfalls: [
          "The 'not yet' answer is いいえ、まだです — not いいえ、～ませんでした, which would mean 'no, I didn't (in the past)'.",
          "もう with a non-past verb shifts to mean 'anymore/already will'; the 'already done' meaning needs the past ました.",
        ],
      },
      vi: {
        explanation: [
          "もう + quá khứ ました nghĩa 'đã ~ rồi'. Nó cho biết việc gì đó đã hoàn tất tính đến hiện tại.",
          "Câu hỏi もう～ましたか hỏi 'bạn đã ~ chưa?'. Trả lời はい、～ました nếu xong, hoặc いいえ、まだです ('chưa') nếu chưa.",
        ],
        pitfalls: [
          "Câu 'chưa' là いいえ、まだです — không phải いいえ、～ませんでした, vốn nghĩa 'không, tôi đã không (làm)'.",
          "もう với động từ hiện tại chuyển sang nghĩa 'nữa/sắp'; nghĩa 'đã làm xong' cần quá khứ ました.",
        ],
      },
    },
  },
  exercises: {
    7: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        { prompt: "はし（　）ごはんを食べます。", options: ["で", "を", "に", "と"], answer: 0, explanation: { en: "で marks the tool used.", vi: "で đánh dấu công cụ được dùng." } },
        { prompt: "山田さん（　）花をあげます。", options: ["に", "を", "で", "が"], answer: 0, explanation: { en: "に marks the receiver with あげます.", vi: "に đánh dấu người nhận với あげます." } },
        { prompt: "友達に本を（　）。（received）", options: ["もらいました", "あげました", "書きました", "見ました"], answer: 0, explanation: { en: "もらいました = received.", vi: "もらいました = đã nhận." } },
        { prompt: "「もう食べましたか。」「いいえ、（　）。」", options: ["まだです", "そうです", "食べました", "ちがいます"], answer: 0, explanation: { en: "'Not yet' is いいえ、まだです.", vi: "'Chưa' là いいえ、まだです." } },
        { prompt: "日本語（　）レポートを書きます。", options: ["で", "を", "に", "へ"], answer: 0, explanation: { en: "で marks the language/method.", vi: "で đánh dấu ngôn ngữ/cách thức." } },
      ],
    },
  },
};
