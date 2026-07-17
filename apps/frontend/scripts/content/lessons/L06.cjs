// Lesson 6 — を (object), で (action place), Vませんか / Vましょう.
module.exports = {
  examples: {
    l6_wo_object: [
      {
        jp: "毎朝パンを食べます。",
        en: "I eat bread every morning.",
        vi: "Mỗi sáng tôi ăn bánh mì.",
      },
      {
        jp: "新聞を読みます。",
        en: "I read the newspaper.",
        vi: "Tôi đọc báo.",
      },
      { jp: "テレビを見ます。", en: "I watch TV.", vi: "Tôi xem ti vi." },
    ],
    l6_de_place: [
      {
        jp: "図書館で本を読みます。",
        en: "I read books at the library.",
        vi: "Tôi đọc sách ở thư viện.",
      },
      {
        jp: "食堂で昼ごはんを食べます。",
        en: "I eat lunch at the cafeteria.",
        vi: "Tôi ăn trưa ở nhà ăn.",
      },
      {
        jp: "うちで音楽を聞きます。",
        en: "I listen to music at home.",
        vi: "Tôi nghe nhạc ở nhà.",
      },
    ],
    l6_masenka_mashou: [
      {
        jp: "いっしょに昼ごはんを食べませんか。",
        en: "Won't you have lunch together?",
        vi: "Chúng ta cùng ăn trưa nhé?",
      },
      {
        jp: "いっしょに公園へ行きませんか。",
        en: "Won't you go to the park with me?",
        vi: "Chúng ta cùng đi công viên nhé?",
      },
      {
        jp: "ちょっと休みましょう。",
        en: "Let's take a short break.",
        vi: "Chúng ta nghỉ một chút nào.",
      },
    ],
  },
  explanations: {
    l6_wo_object: {
      en: {
        explanation: [
          "を marks the direct object — the thing the action is done to: パンを食べます ('eat bread'), 本を読みます ('read a book').",
          "を is a grammatical marker, so it is written with the special kana を but pronounced 'o'. Only this particle uses that kana.",
        ],
        pitfalls: [
          "Pronounce を as 'o', never 'wo'.",
          "Some verbs that look like they take an object actually take が (好き, わかります) — learn those separately.",
        ],
      },
      vi: {
        explanation: [
          "を đánh dấu tân ngữ trực tiếp — vật chịu tác động của hành động: パンを食べます ('ăn bánh mì'), 本を読みます ('đọc sách').",
          "を là ký hiệu ngữ pháp, nên viết bằng kana đặc biệt を nhưng đọc là 'o'. Chỉ trợ từ này mới dùng kana đó.",
        ],
        pitfalls: [
          "Đọc を là 'o', không bao giờ 'wo'.",
          "Một số động từ trông như có tân ngữ nhưng lại dùng が (好き, わかります) — học riêng những từ đó.",
        ],
      },
    },
    l6_de_place: {
      en: {
        explanation: [
          "で marks the place where an action happens: 図書館で読みます ('read at the library'), 食堂で食べます ('eat in the cafeteria').",
          "Contrast this with に, which marks a location of existence (Lesson 10). で = an action venue; に = where something simply is.",
        ],
        pitfalls: [
          "Don't confuse this で with the 'by means of' で (Lesson 5) — same particle, different job, told apart by context.",
          "The action place usually comes before the object: 食堂で昼ごはんを食べます.",
        ],
      },
      vi: {
        explanation: [
          "で đánh dấu nơi diễn ra hành động: 図書館で読みます ('đọc ở thư viện'), 食堂で食べます ('ăn ở nhà ăn').",
          "So sánh với に, vốn đánh dấu vị trí tồn tại (Bài 10). で = nơi diễn ra hành động; に = nơi vật đơn thuần ở đó.",
        ],
        pitfalls: [
          "Đừng nhầm で này với で 'bằng phương tiện' (Bài 5) — cùng trợ từ, khác chức năng, phân biệt qua ngữ cảnh.",
          "Nơi hành động thường đứng trước tân ngữ: 食堂で昼ごはんを食べます.",
        ],
      },
    },
    l6_masenka_mashou: {
      en: {
        explanation: [
          "Vませんか invites the listener to do something ('won't you ~?'); it is warmer than a plain ます statement. Vましょう proposes doing it together ('let's ~').",
          "A natural flow is to invite with ませんか and, once agreed, confirm with ましょう: 食べませんか → ええ、食べましょう.",
        ],
        pitfalls: [
          "ませんか here is an invitation, not a real negative question — answer ええ (yes) to accept.",
          "ましょう assumes the other person will join; don't use it for what only you will do.",
        ],
      },
      vi: {
        explanation: [
          "Vませんか mời người nghe làm gì đó ('bạn ~ không?'); ấm áp hơn câu ます thường. Vましょう đề nghị cùng làm ('cùng ~ nào').",
          "Trình tự tự nhiên là mời bằng ませんか, khi đồng ý thì chốt bằng ましょう: 食べませんか → ええ、食べましょう.",
        ],
        pitfalls: [
          "ませんか ở đây là lời mời, không phải câu hỏi phủ định thật — trả lời ええ (vâng) để nhận lời.",
          "ましょう giả định người kia sẽ tham gia; đừng dùng cho việc chỉ mình bạn làm.",
        ],
      },
    },
  },
  exercises: {
    6: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "パン（　）食べます。",
          options: ["を", "が", "で", "に"],
          answer: 0,
          explanation: {
            en: "を marks the direct object.",
            vi: "を đánh dấu tân ngữ trực tiếp.",
          },
        },
        {
          prompt: "図書館（　）本を読みます。",
          options: ["で", "に", "を", "へ"],
          answer: 0,
          explanation: {
            en: "で marks where the action happens.",
            vi: "で đánh dấu nơi diễn ra hành động.",
          },
        },
        {
          prompt: "いっしょに昼ごはんを食べ（　）。（won't you…?）",
          options: ["ませんか", "ましょう", "ました", "ません"],
          answer: 0,
          explanation: {
            en: "Vませんか is an invitation.",
            vi: "Vませんか là lời mời.",
          },
        },
        {
          prompt: "ちょっと休み（　）。（let's…）",
          options: ["ましょう", "ませんか", "ました", "ます"],
          answer: 0,
          explanation: {
            en: "Vましょう proposes doing it together.",
            vi: "Vましょう đề nghị cùng làm.",
          },
        },
        {
          prompt: "うち（　）音楽を聞きます。",
          options: ["で", "を", "へ", "が"],
          answer: 0,
          explanation: {
            en: "で marks the place of the action.",
            vi: "で đánh dấu nơi hành động.",
          },
        },
      ],
    },
  },
};
