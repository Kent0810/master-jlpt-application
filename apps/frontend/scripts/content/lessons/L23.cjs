// Lesson 23 — ～とき, ～と (natural result), [place]を (movement).
module.exports = {
  examples: {
    l23_toki: [
      {
        jp: "日本へ行くとき、この本を買いました。",
        en: "When I went to Japan, I bought this book.",
        vi: "Khi đi Nhật, tôi đã mua quyển sách này.",
      },
      {
        jp: "暇なとき、本を読みます。",
        en: "When I'm free, I read books.",
        vi: "Khi rảnh, tôi đọc sách.",
      },
      {
        jp: "若いとき、よく旅行しました。",
        en: "When I was young, I traveled a lot.",
        vi: "Khi còn trẻ, tôi hay đi du lịch.",
      },
    ],
    l23_to_conditional: [
      {
        jp: "このボタンを押すと、ドアが開きます。",
        en: "If you push this button, the door opens.",
        vi: "Nếu bấm nút này, cửa sẽ mở.",
      },
      {
        jp: "右へ曲がると、駅があります。",
        en: "If you turn right, there is the station.",
        vi: "Rẽ phải thì có nhà ga.",
      },
      {
        jp: "春になると、桜が咲きます。",
        en: "When spring comes, the cherry blossoms bloom.",
        vi: "Khi xuân đến, hoa anh đào nở.",
      },
    ],
    l23_wo_movement: [
      {
        jp: "次の角を右へ曲がります。",
        en: "Turn right at the next corner.",
        vi: "Rẽ phải ở góc tiếp theo.",
      },
      {
        jp: "ここでバスを降ります。",
        en: "I get off the bus here.",
        vi: "Tôi xuống xe buýt ở đây.",
      },
      {
        jp: "毎朝公園を散歩します。",
        en: "I take a walk in the park every morning.",
        vi: "Mỗi sáng tôi đi dạo trong công viên.",
      },
    ],
  },
  explanations: {
    l23_toki: {
      en: {
        explanation: [
          "[clause] とき means 'when ~'. The verb before とき may be non-past or past: 行くとき (as/before you go) vs 行ったとき (after you have gone). The tense shows the timing relative to the main clause.",
          "い-adjectives attach directly (若いとき), な-adjectives take な (暇なとき), and nouns take の (子供のとき, 'when I was a child').",
        ],
        pitfalls: [
          "行くとき (dictionary) = around the time of going; 行ったとき (past) = once you have arrived — choose by which action comes first.",
          "Don't forget な / の for な-adjectives and nouns before とき.",
        ],
      },
      vi: {
        explanation: [
          "[mệnh đề] とき nghĩa 'khi ~'. Động từ trước とき có thể là hiện tại hoặc quá khứ: 行くとき (khi/trước khi đi) so với 行ったとき (sau khi đã đi). Thì cho biết thời điểm so với mệnh đề chính.",
          "Tính từ い gắn trực tiếp (若いとき), tính từ な thêm な (暇なとき), danh từ thêm の (子供のとき, 'khi còn nhỏ').",
        ],
        pitfalls: [
          "行くとき (thể từ điển) = quanh lúc đi; 行ったとき (quá khứ) = sau khi đã đến — chọn theo hành động nào trước.",
          "Đừng quên な / の cho tính từ な và danh từ trước とき.",
        ],
      },
    },
    l23_to_conditional: {
      en: {
        explanation: [
          "[dictionary form] と marks an automatic or natural result — 'whenever/if ~, then ~': 押すと、開きます ('if you push it, it opens'). It suits machines, directions, and laws of nature.",
          "The verb before と is always the dictionary (or ない) form. The result clause cannot be a request or invitation.",
        ],
        pitfalls: [
          "Don't use と for a one-off plan with a request/command result — use たら or ば instead.",
          "Only the dictionary/ない form comes before this と, never the past た.",
        ],
      },
      vi: {
        explanation: [
          "[thể từ điển] と đánh dấu kết quả tự nhiên hoặc tất yếu — 'hễ/nếu ~ thì ~': 押すと、開きます ('bấm vào thì mở'). Nó hợp với máy móc, chỉ đường, và quy luật tự nhiên.",
          "Động từ trước と luôn ở thể từ điển (hoặc ない). Mệnh đề kết quả không thể là yêu cầu hay lời mời.",
        ],
        pitfalls: [
          "Đừng dùng と cho kế hoạch một lần có kết quả là yêu cầu/mệnh lệnh — hãy dùng たら hoặc ば.",
          "Chỉ thể từ điển/ない đứng trước と này, không bao giờ là quá khứ た.",
        ],
      },
    },
    l23_wo_movement: {
      en: {
        explanation: [
          "を also marks a place you move along, through, or away from, with verbs like 散歩します (stroll), 曲がります (turn), 通ります (pass), 降ります (get off), 出ます (leave).",
          "This is different from the を that marks a direct object; here nothing is 'done to' the place — you simply move over or out of it.",
        ],
        pitfalls: [
          "降ります takes を for getting off a vehicle (バスを降ります) but に for getting on is 乗ります (バスに乗ります).",
          "Don't switch this を to で; で would mark where an action happens, not the path of movement.",
        ],
      },
      vi: {
        explanation: [
          "を còn đánh dấu nơi bạn di chuyển dọc theo, xuyên qua, hoặc rời khỏi, với các động từ như 散歩します (đi dạo), 曲がります (rẽ), 通ります (đi qua), 降ります (xuống xe), 出ます (rời).",
          "Điều này khác với を đánh dấu tân ngữ trực tiếp; ở đây không có gì 'tác động lên' nơi chốn — bạn chỉ di chuyển qua hoặc ra khỏi nó.",
        ],
        pitfalls: [
          "降ります dùng を khi xuống xe (バスを降ります) nhưng lên xe là 乗ります với に (バスに乗ります).",
          "Đừng đổi を này thành で; で đánh dấu nơi hành động diễn ra, không phải lộ trình di chuyển.",
        ],
      },
    },
  },
  exercises: {
    23: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "暇な（　）、本を読みます。（when）",
          options: ["とき", "こと", "から", "まで"],
          answer: 0,
          explanation: {
            en: "な-adjective + な + とき.",
            vi: "Tính từ な + な + とき.",
          },
        },
        {
          prompt: "このボタンを押す（　）、ドアが開きます。（natural result）",
          options: ["と", "とき", "たら", "ので"],
          answer: 0,
          explanation: {
            en: "と marks an automatic result.",
            vi: "と đánh dấu kết quả tự nhiên.",
          },
        },
        {
          prompt: "ここでバス（　）降ります。",
          options: ["を", "に", "で", "へ"],
          answer: 0,
          explanation: {
            en: "降ります takes を for the vehicle.",
            vi: "降ります dùng を cho phương tiện.",
          },
        },
        {
          prompt: "毎朝公園（　）散歩します。",
          options: ["を", "で", "に", "へ"],
          answer: 0,
          explanation: {
            en: "を marks the path of movement.",
            vi: "を đánh dấu lộ trình di chuyển.",
          },
        },
        {
          prompt: "子供（　）とき、京都に住んでいました。（when a child）",
          options: ["の", "な", "だ", "が"],
          answer: 0,
          explanation: {
            en: "Nouns take の before とき.",
            vi: "Danh từ thêm の trước とき.",
          },
        },
      ],
    },
  },
};
