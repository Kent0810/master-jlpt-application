// Lesson 5 — へ 行きます, で (vehicle), と (person).
module.exports = {
  examples: {
    l5_e_ikimasu: [
      {
        jp: "あした東京へ行きます。",
        en: "I will go to Tokyo tomorrow.",
        vi: "Ngày mai tôi sẽ đi Tokyo.",
      },
      {
        jp: "先週京都へ行きました。",
        en: "I went to Kyoto last week.",
        vi: "Tuần trước tôi đã đi Kyoto.",
      },
      {
        jp: "6時にうちへ帰ります。",
        en: "I will go home at six.",
        vi: "Tôi sẽ về nhà lúc 6 giờ.",
      },
    ],
    l5_de_vehicle: [
      {
        jp: "電車で会社へ行きます。",
        en: "I go to work by train.",
        vi: "Tôi đi làm bằng tàu điện.",
      },
      {
        jp: "バスで学校へ行きます。",
        en: "I go to school by bus.",
        vi: "Tôi đi học bằng xe buýt.",
      },
      {
        jp: "飛行機で日本へ来ました。",
        en: "I came to Japan by plane.",
        vi: "Tôi đã đến Nhật bằng máy bay.",
      },
    ],
    l5_to_person: [
      {
        jp: "友達と京都へ行きます。",
        en: "I will go to Kyoto with a friend.",
        vi: "Tôi sẽ đi Kyoto với bạn.",
      },
      {
        jp: "家族と日本へ来ました。",
        en: "I came to Japan with my family.",
        vi: "Tôi đã đến Nhật cùng gia đình.",
      },
      {
        jp: "田中さんとうちへ帰ります。",
        en: "I will go home with Mr. Tanaka.",
        vi: "Tôi sẽ về nhà cùng ông Tanaka.",
      },
    ],
  },
  explanations: {
    l5_e_ikimasu: {
      en: {
        explanation: [
          "へ (read 'e' here) marks the direction or destination of movement and pairs with 行きます (go), 来ます (come), and 帰ります (return home).",
          "行きます and 来ます depend on the speaker's position: 行きます moves away from where you are, 来ます moves toward it. 帰ります is specifically going back to a home base.",
        ],
        pitfalls: [
          "As a destination particle, へ is pronounced 'e', not 'he'.",
          "に can also mark the destination with these verbs; へ stresses the direction, に the arrival point, but for N5 they are interchangeable here.",
        ],
      },
      vi: {
        explanation: [
          "へ (ở đây đọc là 'e') đánh dấu hướng hoặc đích của chuyển động và đi với 行きます (đi), 来ます (đến), 帰ります (về nhà).",
          "行きます và 来ます phụ thuộc vào vị trí người nói: 行きます rời khỏi nơi bạn đang ở, 来ます tiến về phía đó. 帰ります là quay về một nơi gốc như nhà.",
        ],
        pitfalls: [
          "Là trợ từ chỉ đích, へ đọc là 'e', không phải 'he'.",
          "に cũng có thể đánh dấu đích với các động từ này; へ nhấn hướng, に nhấn điểm đến, nhưng ở N5 chúng thay thế được cho nhau ở đây.",
        ],
      },
    },
    l5_de_vehicle: {
      en: {
        explanation: [
          "で after a vehicle names the means of transport: 電車で ('by train'), バスで ('by bus'), 飛行機で ('by plane').",
          "The one exception is going on foot: use 歩いて (歩いて行きます, 'go on foot'), never 足で.",
        ],
        pitfalls: [
          "Don't use で for walking — 'on foot' is 歩いて, a verb form, not a vehicle.",
          "The vehicle phrase usually comes before the destination: 電車で東京へ行きます.",
        ],
      },
      vi: {
        explanation: [
          "で đứng sau phương tiện chỉ cách di chuyển: 電車で ('bằng tàu điện'), バスで ('bằng xe buýt'), 飛行機で ('bằng máy bay').",
          "Ngoại lệ duy nhất là đi bộ: dùng 歩いて (歩いて行きます, 'đi bộ'), không bao giờ dùng 足で.",
        ],
        pitfalls: [
          "Đừng dùng で cho đi bộ — 'đi bộ' là 歩いて, một dạng động từ, không phải phương tiện.",
          "Cụm phương tiện thường đứng trước đích: 電車で東京へ行きます.",
        ],
      },
    },
    l5_to_person: {
      en: {
        explanation: [
          "と links the person you do something together with: 友達と行きます ('go with a friend'). It sits right after that person.",
          "To say you do it alone, use 一人で (一人で行きます), which uses で, not と.",
        ],
        pitfalls: [
          "This と means 'together with (a person)'; the と that means 'and' joins nouns, e.g. パンと卵.",
          "'Alone' is 一人で with で — don't say 一人と.",
        ],
      },
      vi: {
        explanation: [
          "と nối người mà bạn cùng làm việc gì đó: 友達と行きます ('đi với bạn'). Nó đứng ngay sau người đó.",
          "Để nói làm một mình, dùng 一人で (一人で行きます), dùng で chứ không phải と.",
        ],
        pitfalls: [
          "と này nghĩa 'cùng với (người)'; と nghĩa 'và' dùng để nối danh từ, ví dụ パンと卵.",
          "'Một mình' là 一人で với で — đừng nói 一人と.",
        ],
      },
    },
  },
  exercises: {
    5: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "あした東京（　）行きます。",
          options: ["へ", "で", "を", "が"],
          answer: 0,
          explanation: {
            en: "へ marks the destination of movement.",
            vi: "へ đánh dấu đích của chuyển động.",
          },
        },
        {
          prompt: "電車（　）会社へ行きます。",
          options: ["で", "へ", "と", "に"],
          answer: 0,
          explanation: {
            en: "で marks the means of transport.",
            vi: "で đánh dấu phương tiện đi lại.",
          },
        },
        {
          prompt: "友達（　）京都へ行きます。",
          options: ["と", "で", "へ", "を"],
          answer: 0,
          explanation: {
            en: "と marks the person you go with.",
            vi: "と đánh dấu người bạn đi cùng.",
          },
        },
        {
          prompt: "うち（　）帰ります。",
          options: ["へ", "で", "を", "が"],
          answer: 0,
          explanation: {
            en: "帰ります takes へ for the destination.",
            vi: "帰ります dùng へ cho đích đến.",
          },
        },
        {
          prompt: "一人（　）行きます。（alone）",
          options: ["で", "と", "へ", "に"],
          answer: 0,
          explanation: {
            en: "'Alone' is 一人で, using で.",
            vi: "'Một mình' là 一人で, dùng で.",
          },
        },
      ],
    },
  },
};
