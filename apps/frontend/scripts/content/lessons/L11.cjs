// Lesson 11 — counters (～つ/～人/～枚…), frequency ([period]に～回).
module.exports = {
  examples: {
    l11_counters: [
      {
        jp: "りんごを二つ買いました。",
        en: "I bought two apples.",
        vi: "Tôi đã mua hai quả táo.",
      },
      {
        jp: "切手を三枚ください。",
        en: "Three stamps, please.",
        vi: "Cho tôi ba con tem.",
      },
      {
        jp: "教室に学生が五人います。",
        en: "There are five students in the classroom.",
        vi: "Trong phòng học có năm sinh viên.",
      },
    ],
    l11_frequency: [
      {
        jp: "一週間に一回日本語を勉強します。",
        en: "I study Japanese once a week.",
        vi: "Tôi học tiếng Nhật một lần mỗi tuần.",
      },
      {
        jp: "一日に三回ごはんを食べます。",
        en: "I eat three meals a day.",
        vi: "Tôi ăn ba bữa mỗi ngày.",
      },
      {
        jp: "一か月に二回映画を見ます。",
        en: "I watch a movie twice a month.",
        vi: "Tôi xem phim hai lần mỗi tháng.",
      },
    ],
  },
  explanations: {
    l11_counters: {
      en: {
        explanation: [
          "Japanese counts with a number plus a counter that matches the kind of thing: ～つ for general objects, ～人 for people, ～枚 for flat items, ～本 for long items, ～台 for machines.",
          "The number-and-counter usually goes right before the verb, after the object: りんごを二つ買います ('buy two apples').",
        ],
        pitfalls: [
          "Watch the sound changes: 一つ (ひとつ), 三枚 (さんまい) but 一枚 (いちまい); people are 一人 (ひとり), 二人 (ふたり).",
          "The ～つ series only goes up to 十 (とお); from eleven use the number alone or another counter.",
        ],
      },
      vi: {
        explanation: [
          "Tiếng Nhật đếm bằng một con số cộng với lượng từ hợp với loại vật: ～つ cho vật nói chung, ～人 cho người, ～枚 cho vật mỏng dẹt, ～本 cho vật dài, ～台 cho máy móc.",
          "Cụm số-và-lượng từ thường đứng ngay trước động từ, sau tân ngữ: りんごを二つ買います ('mua hai quả táo').",
        ],
        pitfalls: [
          "Chú ý biến âm: 一つ (ひとつ), 三枚 (さんまい) nhưng 一枚 (いちまい); người là 一人 (ひとり), 二人 (ふたり).",
          "Dãy ～つ chỉ đếm đến 十 (とお); từ mười một trở đi dùng số trần hoặc lượng từ khác.",
        ],
      },
    },
    l11_frequency: {
      en: {
        explanation: [
          "To state frequency, mark the period with に and add the count with ～回: 一週間に二回 ('twice a week'), 一日に三回 ('three times a day').",
          "The period comes first with に, then the frequency, then the verb: 一か月に一回旅行します.",
        ],
        pitfalls: [
          "Don't drop に after the period — 一週間二回 is incomplete; say 一週間に二回.",
          "～回 counts occasions; don't confuse it with ～階 (floors) or ～時 (o'clock).",
        ],
      },
      vi: {
        explanation: [
          "Để nói tần suất, đánh dấu khoảng thời gian bằng に và thêm số lần với ～回: 一週間に二回 ('hai lần mỗi tuần'), 一日に三回 ('ba lần mỗi ngày').",
          "Khoảng thời gian đứng trước với に, rồi đến tần suất, rồi động từ: 一か月に一回旅行します.",
        ],
        pitfalls: [
          "Đừng bỏ に sau khoảng thời gian — 一週間二回 là chưa đủ; hãy nói 一週間に二回.",
          "～回 đếm số lần; đừng nhầm với ～階 (tầng) hay ～時 (giờ).",
        ],
      },
    },
  },
  exercises: {
    11: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "りんごを（　）買いました。（two things）",
          options: ["二つ", "二枚", "二人", "二回"],
          answer: 0,
          explanation: {
            en: "General objects use ～つ: 二つ.",
            vi: "Vật nói chung dùng ～つ: 二つ.",
          },
        },
        {
          prompt: "切手を（　）ください。（three flat items）",
          options: ["三枚", "三つ", "三人", "三本"],
          answer: 0,
          explanation: {
            en: "Flat items (stamps) use ～枚.",
            vi: "Vật mỏng dẹt (tem) dùng ～枚.",
          },
        },
        {
          prompt: "教室に学生が（　）います。（five people）",
          options: ["五人", "五つ", "五枚", "五回"],
          answer: 0,
          explanation: {
            en: "People are counted with ～人.",
            vi: "Người đếm bằng ～人.",
          },
        },
        {
          prompt: "一週間（　）一回勉強します。",
          options: ["に", "で", "を", "へ"],
          answer: 0,
          explanation: {
            en: "に marks the period for frequency.",
            vi: "に đánh dấu khoảng thời gian cho tần suất.",
          },
        },
        {
          prompt: "一日に三（　）ごはんを食べます。（times）",
          options: ["回", "枚", "人", "つ"],
          answer: 0,
          explanation: {
            en: "～回 counts occasions ('times').",
            vi: "～回 đếm số lần ('lần').",
          },
        },
      ],
    },
  },
};
