// Lesson 18 — dictionary form, V-ることができます, V-るまえに.
module.exports = {
  examples: {
    l18_dict_form: [
      {
        jp: "本を読むことが好きです。",
        en: "I like reading books.",
        vi: "Tôi thích đọc sách.",
      },
      {
        jp: "音楽を聞くことが好きです。",
        en: "I like listening to music.",
        vi: "Tôi thích nghe nhạc.",
      },
      {
        jp: "早く起きることは難しいです。",
        en: "Getting up early is difficult.",
        vi: "Dậy sớm thì khó.",
      },
    ],
    l18_koto_ga_dekimasu: [
      {
        jp: "わたしは日本語を話すことができます。",
        en: "I can speak Japanese.",
        vi: "Tôi có thể nói tiếng Nhật.",
      },
      {
        jp: "ミラーさんは漢字を読むことができます。",
        en: "Mr. Miller can read kanji.",
        vi: "Anh Miller có thể đọc chữ Hán.",
      },
      {
        jp: "ここで写真を撮ることができます。",
        en: "You can take photos here.",
        vi: "Bạn có thể chụp ảnh ở đây.",
      },
    ],
    l18_mae_ni: [
      {
        jp: "食べるまえに、手を洗います。",
        en: "Before eating, I wash my hands.",
        vi: "Trước khi ăn, tôi rửa tay.",
      },
      {
        jp: "寝るまえに、本を読みます。",
        en: "Before sleeping, I read a book.",
        vi: "Trước khi ngủ, tôi đọc sách.",
      },
      {
        jp: "日本へ来るまえに、日本語を勉強しました。",
        en: "Before coming to Japan, I studied Japanese.",
        vi: "Trước khi đến Nhật, tôi đã học tiếng Nhật.",
      },
    ],
  },
  explanations: {
    l18_dict_form: {
      en: {
        explanation: [
          "The dictionary form is the plain non-past — the form you look up in a dictionary. る-verbs are already there (食べる); う-verbs turn the ます-stem's -i sound into -u: 読みます → 読む, 話します → 話す.",
          "It appears before こと, まえに, and in casual speech, and it lets you turn a verb into a noun with こと: 読むこと ('reading').",
        ],
        pitfalls: [
          "行きます → 行く (not 行う); watch the group when converting from ます.",
          "する → する and 来ます → 来る are the irregulars to memorise.",
        ],
      },
      vi: {
        explanation: [
          "Thể từ điển là thể thường không quá khứ — dạng bạn tra trong từ điển. Động từ nhóm る đã sẵn (食べる); động từ nhóm う đổi âm -i của gốc ます thành -u: 読みます → 読む, 話します → 話す.",
          "Nó xuất hiện trước こと, まえに, và trong văn nói thân mật, và cho phép biến động từ thành danh từ bằng こと: 読むこと ('việc đọc').",
        ],
        pitfalls: [
          "行きます → 行く (không phải 行う); chú ý nhóm khi chuyển từ ます.",
          "する → する và 来ます → 来る là các từ bất quy tắc cần nhớ.",
        ],
      },
    },
    l18_koto_ga_dekimasu: {
      en: {
        explanation: [
          "[dictionary form] ことができます expresses ability or possibility — 'can do ~': 話すことができます ('can speak'), 撮ることができます ('can take (photos)').",
          "こと turns the action into a noun, and できます ('is possible') follows. The negative is ことができません.",
        ],
        pitfalls: [
          "Use the dictionary form before こと, not the ます-form: 読むことができます, not 読みますこと.",
          "For nouns like Japanese, you can also say 日本語ができます without こと.",
        ],
      },
      vi: {
        explanation: [
          "[thể từ điển] ことができます diễn tả khả năng hoặc tính khả thi — 'có thể ~': 話すことができます ('có thể nói'), 撮ることができます ('có thể chụp ảnh').",
          "こと biến hành động thành danh từ, rồi できます ('có thể') theo sau. Phủ định là ことができません.",
        ],
        pitfalls: [
          "Dùng thể từ điển trước こと, không dùng thể ます: 読むことができます, không phải 読みますこと.",
          "Với danh từ như tiếng Nhật, cũng có thể nói 日本語ができます mà không cần こと.",
        ],
      },
    },
    l18_mae_ni: {
      en: {
        explanation: [
          "[dictionary form] まえに means 'before doing ~': 食べるまえに ('before eating'). It always uses the dictionary form, whatever the tense of the main verb.",
          "With a noun, use の: 食事のまえに ('before the meal'); with a time span, use just the number: 三年まえに ('three years ago').",
        ],
        pitfalls: [
          "Keep the dictionary form even for past events: 来るまえに勉強しました, not 来たまえに.",
          "Nouns need の before まえに; verbs do not.",
        ],
      },
      vi: {
        explanation: [
          "[thể từ điển] まえに nghĩa 'trước khi làm ~': 食べるまえに ('trước khi ăn'). Nó luôn dùng thể từ điển, bất kể thì của động từ chính.",
          "Với danh từ, dùng の: 食事のまえに ('trước bữa ăn'); với khoảng thời gian, chỉ dùng con số: 三年まえに ('ba năm trước').",
        ],
        pitfalls: [
          "Giữ thể từ điển ngay cả với việc quá khứ: 来るまえに勉強しました, không phải 来たまえに.",
          "Danh từ cần の trước まえに; động từ thì không.",
        ],
      },
    },
  },
  exercises: {
    18: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "わたしは日本語を話す（　）ができます。",
          options: ["こと", "の", "もの", "とき"],
          answer: 0,
          explanation: {
            en: "ことができます expresses ability.",
            vi: "ことができます diễn tả khả năng.",
          },
        },
        {
          prompt: "ここで写真を（　）ことができます。（take — 撮ります）",
          options: ["撮る", "撮り", "撮って", "撮った"],
          answer: 0,
          explanation: {
            en: "Use the dictionary form before こと: 撮る.",
            vi: "Dùng thể từ điển trước こと: 撮る.",
          },
        },
        {
          prompt: "食べる（　）に、手を洗います。（before）",
          options: ["まえ", "あと", "とき", "から"],
          answer: 0,
          explanation: {
            en: "V-るまえに = before doing.",
            vi: "V-るまえに = trước khi làm.",
          },
        },
        {
          prompt: "寝る（　）、本を読みます。（before sleeping）",
          options: ["まえに", "あとで", "ながら", "ので"],
          answer: 0,
          explanation: {
            en: "まえに follows the dictionary form.",
            vi: "まえに theo sau thể từ điển.",
          },
        },
        {
          prompt: "読みます → dictionary form is（　）。",
          options: ["読む", "読る", "読い", "読んだ"],
          answer: 0,
          explanation: {
            en: "う-verb: 読みます → 読む.",
            vi: "Nhóm う: 読みます → 読む.",
          },
        },
      ],
    },
  },
};
