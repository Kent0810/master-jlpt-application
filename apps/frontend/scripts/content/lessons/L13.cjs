// Lesson 13 — が ほしいです, V-たいです, へ V に 行きます (purpose).
module.exports = {
  examples: {
    l13_hoshii: [
      {
        jp: "新しいパソコンがほしいです。",
        en: "I want a new computer.",
        vi: "Tôi muốn có một chiếc máy tính mới.",
      },
      {
        jp: "車がほしいです。",
        en: "I want a car.",
        vi: "Tôi muốn có một chiếc xe hơi.",
      },
      {
        jp: "今、時間がほしいです。",
        en: "I want time right now.",
        vi: "Bây giờ tôi muốn có thời gian.",
      },
    ],
    l13_tai: [
      {
        jp: "日本へ行きたいです。",
        en: "I want to go to Japan.",
        vi: "Tôi muốn đi Nhật.",
      },
      {
        jp: "すしを食べたいです。",
        en: "I want to eat sushi.",
        vi: "Tôi muốn ăn sushi.",
      },
      {
        jp: "今日は何もしたくないです。",
        en: "I don't want to do anything today.",
        vi: "Hôm nay tôi không muốn làm gì cả.",
      },
    ],
    l13_ni_purpose: [
      {
        jp: "デパートへかばんを買いに行きます。",
        en: "I go to the department store to buy a bag.",
        vi: "Tôi đến cửa hàng bách hóa để mua cặp.",
      },
      {
        jp: "日本へ日本語を勉強しに行きます。",
        en: "I go to Japan to study Japanese.",
        vi: "Tôi đi Nhật để học tiếng Nhật.",
      },
      {
        jp: "レストランへ昼ごはんを食べに行きます。",
        en: "I go to the restaurant to eat lunch.",
        vi: "Tôi đến nhà hàng để ăn trưa.",
      },
    ],
  },
  explanations: {
    l13_hoshii: {
      en: {
        explanation: [
          "N が ほしいです expresses wanting a thing — 'I want ~'. The thing wanted is marked by が: 車がほしいです.",
          "ほしい is an い-adjective, so it negates as ほしくないです and pasts as ほしかったです.",
        ],
        pitfalls: [
          "ほしい is for wanting things; to want to do an action, use V-たい (below).",
          "Traditionally ほしい describes your own or the listener's desire; for a third person you add ～がっています.",
        ],
      },
      vi: {
        explanation: [
          "N が ほしいです diễn tả muốn có một vật — 'tôi muốn ~'. Vật được muốn đánh dấu bằng が: 車がほしいです.",
          "ほしい là tính từ い, nên phủ định là ほしくないです và quá khứ là ほしかったです.",
        ],
        pitfalls: [
          "ほしい dùng để muốn vật; muốn làm một hành động thì dùng V-たい (ở dưới).",
          "Theo truyền thống ほしい tả mong muốn của bản thân hoặc người nghe; với ngôi thứ ba thêm ～がっています.",
        ],
      },
    },
    l13_tai: {
      en: {
        explanation: [
          "V-ますstem + たいです expresses wanting to do an action: 行きます → 行きたいです ('want to go'), 食べます → 食べたいです.",
          "たい inflects like an い-adjective: negative 食べたくないです, past 食べたかったです. The object can take を or が.",
        ],
        pitfalls: [
          "Drop ます before adding たい: 食べたい, not 食べますたい.",
          "Like ほしい, たい states your own wish; don't use it directly for what someone else wants to do.",
        ],
      },
      vi: {
        explanation: [
          "V-thể ます (bỏ ます) + たいです diễn tả muốn làm một hành động: 行きます → 行きたいです ('muốn đi'), 食べます → 食べたいです.",
          "たい chia như tính từ い: phủ định 食べたくないです, quá khứ 食べたかったです. Tân ngữ có thể dùng を hoặc が.",
        ],
        pitfalls: [
          "Bỏ ます trước khi thêm たい: 食べたい, không phải 食べますたい.",
          "Như ほしい, たい nêu mong muốn của bản thân; đừng dùng trực tiếp cho điều người khác muốn làm.",
        ],
      },
    },
    l13_ni_purpose: {
      en: {
        explanation: [
          "[place]へ [V-ますstem / action noun] に 行きます states the purpose of going: 買いに行きます ('go in order to buy'), 食事に行きます ('go to have a meal').",
          "The verb before に is the ます-stem (買います→買い); a する-noun like 勉強 can take に directly or as 勉強しに.",
        ],
        pitfalls: [
          "Use the ます-stem before this に, not the dictionary form: 見に行きます, not 見るに行きます.",
          "The main verb is one of motion (行きます/来ます/帰ります); に marks the purpose, へ the destination.",
        ],
      },
      vi: {
        explanation: [
          "[nơi chốn]へ [thể ます bỏ ます / danh từ hành động] に 行きます nêu mục đích của việc đi: 買いに行きます ('đi để mua'), 食事に行きます ('đi để ăn').",
          "Động từ trước に là thể ます bỏ ます (買います→買い); danh từ する như 勉強 có thể dùng に trực tiếp hoặc 勉強しに.",
        ],
        pitfalls: [
          "Dùng thể ます bỏ ます trước に này, không dùng thể từ điển: 見に行きます, không phải 見るに行きます.",
          "Động từ chính là động từ chuyển động (行きます/来ます/帰ります); に đánh dấu mục đích, へ đánh dấu đích đến.",
        ],
      },
    },
  },
  exercises: {
    13: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "新しいパソコン（　）ほしいです。",
          options: ["が", "を", "に", "へ"],
          answer: 0,
          explanation: {
            en: "ほしい marks the wanted thing with が.",
            vi: "ほしい đánh dấu vật muốn có bằng が.",
          },
        },
        {
          prompt: "日本へ行き（　）です。（want to go）",
          options: ["たい", "ほしい", "ましょう", "ません"],
          answer: 0,
          explanation: {
            en: "V-stem + たい = want to do.",
            vi: "Thể V + たい = muốn làm.",
          },
        },
        {
          prompt: "今日は何もし（　）です。（don't want to）",
          options: ["たくない", "たい", "ません", "ないたい"],
          answer: 0,
          explanation: {
            en: "たい negative: したくないです.",
            vi: "Phủ định たい: したくないです.",
          },
        },
        {
          prompt: "デパートへかばんを買い（　）行きます。",
          options: ["に", "を", "で", "へ"],
          answer: 0,
          explanation: {
            en: "に marks the purpose of going.",
            vi: "に đánh dấu mục đích của việc đi.",
          },
        },
        {
          prompt: "車（　）ほしいです。",
          options: ["が", "を", "は", "に"],
          answer: 0,
          explanation: { en: "Use が with ほしい.", vi: "Dùng が với ほしい." },
        },
      ],
    },
  },
};
