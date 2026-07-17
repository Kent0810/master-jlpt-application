// Lesson 15 — V-てもいいです, V-てはいけません, V-ています (state/habit).
module.exports = {
  examples: {
    l15_te_mo_ii: [
      {
        jp: "ここで写真を撮ってもいいです。",
        en: "You may take photos here.",
        vi: "Bạn có thể chụp ảnh ở đây.",
      },
      {
        jp: "「入ってもいいですか。」「はい、どうぞ。」",
        en: '"May I come in?" "Yes, please."',
        vi: '"Tôi vào được không?" "Vâng, mời vào."',
      },
      {
        jp: "鉛筆で書いてもいいです。",
        en: "You may write in pencil.",
        vi: "Bạn có thể viết bằng bút chì.",
      },
    ],
    l15_te_wa_ikemasen: [
      {
        jp: "ここでたばこを吸ってはいけません。",
        en: "You must not smoke here.",
        vi: "Không được hút thuốc ở đây.",
      },
      {
        jp: "ここに車を止めてはいけません。",
        en: "You must not park here.",
        vi: "Không được đỗ xe ở đây.",
      },
      {
        jp: "図書館で話してはいけません。",
        en: "You must not talk in the library.",
        vi: "Không được nói chuyện trong thư viện.",
      },
    ],
    l15_te_imasu_state: [
      {
        jp: "ミラーさんは東京に住んでいます。",
        en: "Mr. Miller lives in Tokyo.",
        vi: "Anh Miller sống ở Tokyo.",
      },
      {
        jp: "姉は銀行に勤めています。",
        en: "My older sister works at a bank.",
        vi: "Chị gái tôi làm ở ngân hàng.",
      },
      {
        jp: "わたしは結婚しています。",
        en: "I am married.",
        vi: "Tôi đã kết hôn.",
      },
    ],
  },
  explanations: {
    l15_te_mo_ii: {
      en: {
        explanation: [
          "V-てもいいです grants or asks permission — 'may / it's okay to ~': 撮ってもいいです ('you may take photos'). Add か to ask: 入ってもいいですか.",
          "A natural reply granting permission is ええ、いいですよ or はい、どうぞ; a refusal often uses ちょっと… to soften it.",
        ],
        pitfalls: [
          "Don't confuse てもいい (permission) with the ても 'even if' of Lesson 25 — here いいです follows.",
          "The も is part of the pattern; 撮ていいです without も is wrong.",
        ],
      },
      vi: {
        explanation: [
          "V-てもいいです cho phép hoặc xin phép — 'được ~ / có thể ~': 撮ってもいいです ('bạn được chụp ảnh'). Thêm か để hỏi: 入ってもいいですか.",
          "Câu trả lời cho phép tự nhiên là ええ、いいですよ hoặc はい、どうぞ; từ chối thường dùng ちょっと… để làm dịu.",
        ],
        pitfalls: [
          "Đừng nhầm てもいい (cho phép) với ても 'dù cho' ở Bài 25 — ở đây có いいです theo sau.",
          "も là một phần của mẫu; 撮ていいです thiếu も là sai.",
        ],
      },
    },
    l15_te_wa_ikemasen: {
      en: {
        explanation: [
          "V-てはいけません forbids an action — 'must not ~': 吸ってはいけません ('you must not smoke'). It is the opposite of てもいいです.",
          "In speech ては often contracts to ちゃ (吸っちゃいけません). はいけません is firm; signs may just say 禁止 ('prohibited').",
        ],
        pitfalls: [
          "The は here is the topic particle, pronounced 'wa'.",
          "It states a rule, so it can sound strong — soften real requests with ないでください when appropriate.",
        ],
      },
      vi: {
        explanation: [
          "V-てはいけません cấm một hành động — 'không được ~': 吸ってはいけません ('không được hút thuốc'). Đây là ngược lại của てもいいです.",
          "Trong văn nói ては thường rút thành ちゃ (吸っちゃいけません). はいけません mang tính dứt khoát; biển báo có thể chỉ ghi 禁止 ('cấm').",
        ],
        pitfalls: [
          "は ở đây là trợ từ chủ đề, đọc là 'wa'.",
          "Nó nêu một quy tắc nên có thể nghe mạnh — hãy làm dịu yêu cầu thật bằng ないでください khi phù hợp.",
        ],
      },
    },
    l15_te_imasu_state: {
      en: {
        explanation: [
          "With certain verbs, V-ています shows an ongoing state rather than an action in progress: 住んでいます ('lives'), 勤めています ('works for'), 結婚しています ('is married').",
          "These describe a situation that started and still holds — where you live, your job, your marital status — so English uses a simple present.",
        ],
        pitfalls: [
          "知っています ('know') follows this pattern, but its negative is 知りません, not 知っていません.",
          "Whether ています means 'is ~ing' or 'is in the state of' depends on the verb and context.",
        ],
      },
      vi: {
        explanation: [
          "Với một số động từ, V-ています diễn tả trạng thái kéo dài chứ không phải hành động đang diễn ra: 住んでいます ('sống'), 勤めています ('làm việc cho'), 結婚しています ('đã kết hôn').",
          "Chúng tả một tình trạng đã bắt đầu và vẫn còn — nơi bạn sống, công việc, tình trạng hôn nhân — nên tiếng Anh dùng thì hiện tại đơn.",
        ],
        pitfalls: [
          "知っています ('biết') theo mẫu này, nhưng phủ định là 知りません, không phải 知っていません.",
          "ています nghĩa 'đang ~' hay 'đang ở trạng thái' tùy động từ và ngữ cảnh.",
        ],
      },
    },
  },
  exercises: {
    15: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "ここで写真を撮って（　）です。（may）",
          options: ["もいい", "はいけません", "から", "ください"],
          answer: 0,
          explanation: {
            en: "てもいいです = permission.",
            vi: "てもいいです = cho phép.",
          },
        },
        {
          prompt: "ここでたばこを吸って（　）。（must not）",
          options: ["はいけません", "もいいです", "ください", "います"],
          answer: 0,
          explanation: {
            en: "てはいけません = prohibition.",
            vi: "てはいけません = cấm.",
          },
        },
        {
          prompt: "ミラーさんは東京に住んで（　）。（lives）",
          options: ["います", "ください", "もいいです", "はいけません"],
          answer: 0,
          explanation: {
            en: "住んでいます = ongoing state ('lives').",
            vi: "住んでいます = trạng thái ('sống').",
          },
        },
        {
          prompt: "「入ってもいいです（　）。」「はい、どうぞ。」",
          options: ["か", "ね", "よ", "の"],
          answer: 0,
          explanation: {
            en: "か asks for permission.",
            vi: "か dùng để xin phép.",
          },
        },
        {
          prompt: "図書館で話（　）はいけません。",
          options: ["して", "しって", "しいて", "しんで"],
          answer: 0,
          explanation: {
            en: "す-verb: 話します → 話して.",
            vi: "Động từ đuôi す: 話します → 話して.",
          },
        },
      ],
    },
  },
};
