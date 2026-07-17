// Lesson 9 — が 好き/上手, が わかります/あります, から (reason).
module.exports = {
  examples: {
    l9_ga_suki: [
      {
        jp: "わたしは音楽が好きです。",
        en: "I like music.",
        vi: "Tôi thích âm nhạc.",
      },
      {
        jp: "ミラーさんは日本料理が好きです。",
        en: "Mr. Miller likes Japanese food.",
        vi: "Anh Miller thích món ăn Nhật.",
      },
      {
        jp: "田中さんはテニスが上手です。",
        en: "Mr. Tanaka is good at tennis.",
        vi: "Ông Tanaka giỏi quần vợt.",
      },
    ],
    l9_ga_wakarimasu: [
      {
        jp: "わたしは日本語が少しわかります。",
        en: "I understand a little Japanese.",
        vi: "Tôi hiểu tiếng Nhật một chút.",
      },
      {
        jp: "今日は時間がありません。",
        en: "I have no time today.",
        vi: "Hôm nay tôi không có thời gian.",
      },
      {
        jp: "お金がありませんから、買いません。",
        en: "I won't buy it because I have no money.",
        vi: "Vì không có tiền nên tôi không mua.",
      },
    ],
    l9_kara_reason: [
      {
        jp: "時間がありませんから、行きません。",
        en: "I won't go because I don't have time.",
        vi: "Vì không có thời gian nên tôi không đi.",
      },
      {
        jp: "おいしいですから、この店が好きです。",
        en: "I like this shop because it's tasty.",
        vi: "Vì ngon nên tôi thích quán này.",
      },
      {
        jp: "「どうして休みましたか。」「病気でしたから。」",
        en: '"Why were you absent?" "Because I was sick."',
        vi: '"Sao bạn nghỉ vậy?" "Vì tôi bị ốm."',
      },
    ],
  },
  explanations: {
    l9_ga_suki: {
      en: {
        explanation: [
          "With 好き (like), 嫌い (dislike), 上手 (good at), and 下手 (poor at), the thing liked or the skill is marked by が, not を: テニスが上手です.",
          "These words are な-adjectives, so they take です and negate with じゃありません: 好きじゃありません ('don't like').",
        ],
        pitfalls: [
          "Don't use を here — スポーツを好きです is wrong; say スポーツが好きです.",
          "上手 is normally used about others; about your own skill, prefer a modest できます or 好き.",
        ],
      },
      vi: {
        explanation: [
          "Với 好き (thích), 嫌い (ghét), 上手 (giỏi), và 下手 (kém), vật được thích hoặc kỹ năng được đánh dấu bằng が, không phải を: テニスが上手です.",
          "Những từ này là tính từ な, nên dùng です và phủ định bằng じゃありません: 好きじゃありません ('không thích').",
        ],
        pitfalls: [
          "Đừng dùng を ở đây — スポーツを好きです là sai; hãy nói スポーツが好きです.",
          "上手 thường dùng cho người khác; khi nói về kỹ năng của mình, nên khiêm tốn dùng できます hoặc 好き.",
        ],
      },
    },
    l9_ga_wakarimasu: {
      en: {
        explanation: [
          "The object of わかります (understand) and あります (have/there is) is also marked by が: 日本語がわかります, 時間があります.",
          "A useful group to remember: like/dislike, skill, understanding, and having all take が for their 'object', even though English uses a plain object.",
        ],
        pitfalls: [
          "わかります already means 'to be understandable', so use が, not を.",
          "あります for possession is for things; for people and animals you 'have', Japanese uses います.",
        ],
      },
      vi: {
        explanation: [
          "Đối tượng của わかります (hiểu) và あります (có) cũng được đánh dấu bằng が: 日本語がわかります, 時間があります.",
          "Một nhóm nên nhớ: thích/ghét, kỹ năng, sự hiểu, và sự sở hữu đều dùng が cho 'tân ngữ', dù tiếng Anh dùng tân ngữ thường.",
        ],
        pitfalls: [
          "わかります vốn nghĩa 'có thể hiểu được', nên dùng が, không phải を.",
          "あります chỉ sự sở hữu dùng cho vật; với người và động vật mà bạn 'có', tiếng Nhật dùng います.",
        ],
      },
    },
    l9_kara_reason: {
      en: {
        explanation: [
          "から after a clause means 'because ~'. The reason comes first, then the result: 時間がありませんから、行きません ('because I have no time, I won't go').",
          "The question どうして ('why?') is answered with a から clause. In speech you may end with just …から。 and leave the result implied.",
        ],
        pitfalls: [
          "This から (reason) follows a full clause; the から meaning 'from' (Lesson 4) follows a noun — don't mix them up.",
          "Keep the polite です/ます before から when the rest of the sentence is polite: ありませんから, not ないから.",
        ],
      },
      vi: {
        explanation: [
          "から sau một mệnh đề nghĩa 'vì ~'. Lý do đứng trước, rồi đến kết quả: 時間がありませんから、行きません ('vì không có thời gian nên tôi không đi').",
          "Câu hỏi どうして ('tại sao?') được trả lời bằng mệnh đề から. Khi nói, có thể kết thúc bằng …から。 và để ngỏ kết quả.",
        ],
        pitfalls: [
          "から (lý do) này đi sau một mệnh đề hoàn chỉnh; から nghĩa 'từ' (Bài 4) đi sau danh từ — đừng nhầm.",
          "Giữ です/ます lịch sự trước から khi phần còn lại của câu lịch sự: ありませんから, không phải ないから.",
        ],
      },
    },
  },
  exercises: {
    9: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "わたしは音楽（　）好きです。",
          options: ["が", "を", "は", "に"],
          answer: 0,
          explanation: {
            en: "好き marks its object with が.",
            vi: "好き đánh dấu đối tượng bằng が.",
          },
        },
        {
          prompt: "田中さんはテニス（　）上手です。",
          options: ["が", "を", "で", "に"],
          answer: 0,
          explanation: { en: "上手 also takes が.", vi: "上手 cũng dùng が." },
        },
        {
          prompt: "日本語（　）少しわかります。",
          options: ["が", "を", "は", "で"],
          answer: 0,
          explanation: {
            en: "わかります takes が.",
            vi: "わかります dùng が.",
          },
        },
        {
          prompt: "時間がありません（　）、行きません。",
          options: ["から", "が", "の", "まで"],
          answer: 0,
          explanation: {
            en: "から gives the reason ('because').",
            vi: "から nêu lý do ('vì').",
          },
        },
        {
          prompt: "スポーツ（　）好きです。",
          options: ["が", "を", "に", "へ"],
          answer: 0,
          explanation: {
            en: "Use が, not を, with 好き.",
            vi: "Dùng が, không phải を, với 好き.",
          },
        },
      ],
    },
  },
};
