// Lesson 21 — ～と思います, ～と言いました, ～でしょう？
module.exports = {
  examples: {
    l21_to_omoimasu: [
      {
        jp: "あした雨が降ると思います。",
        en: "I think it will rain tomorrow.",
        vi: "Tôi nghĩ ngày mai trời sẽ mưa.",
      },
      {
        jp: "ミラーさんは会社にいると思います。",
        en: "I think Mr. Miller is at the office.",
        vi: "Tôi nghĩ anh Miller đang ở công ty.",
      },
      {
        jp: "この映画はおもしろいと思います。",
        en: "I think this movie is interesting.",
        vi: "Tôi nghĩ bộ phim này thú vị.",
      },
    ],
    l21_to_iimashita: [
      {
        jp: "田中さんはあした来ると言いました。",
        en: "Mr. Tanaka said he will come tomorrow.",
        vi: "Ông Tanaka nói ngày mai sẽ đến.",
      },
      {
        jp: "先生は「宿題をしてください」と言いました。",
        en: 'The teacher said, "Please do the homework."',
        vi: 'Thầy giáo nói "Hãy làm bài tập."',
      },
      {
        jp: "母は元気だと言いました。",
        en: "My mother said she is well.",
        vi: "Mẹ tôi nói bà khỏe.",
      },
    ],
    l21_deshou: [
      {
        jp: "この料理はおいしいでしょう？",
        en: "This food is delicious, isn't it?",
        vi: "Món này ngon nhỉ?",
      },
      {
        jp: "あなたも行くでしょう？",
        en: "You're going too, right?",
        vi: "Bạn cũng đi phải không?",
      },
      {
        jp: "田中さんは先生でしょう？",
        en: "Mr. Tanaka is a teacher, right?",
        vi: "Ông Tanaka là giáo viên nhỉ?",
      },
    ],
  },
  explanations: {
    l21_to_omoimasu: {
      en: {
        explanation: [
          "[plain-form clause] と思います states an opinion or guess — 'I think that ~': 雨が降ると思います ('I think it will rain'). The clause before と is always plain form.",
          "と marks the content of the thought. To disagree, use ～ないと思います ('I don't think ~') rather than negating 思います.",
        ],
        pitfalls: [
          "Use plain form before と, even when 思います is polite: おもしろいと思います, not おもしろいですと.",
          "For 'I don't think it's ~', put the negative inside: 行かないと思います.",
        ],
      },
      vi: {
        explanation: [
          "[mệnh đề thể thường] と思います nêu ý kiến hoặc phỏng đoán — 'tôi nghĩ rằng ~': 雨が降ると思います ('tôi nghĩ trời sẽ mưa'). Mệnh đề trước と luôn ở thể thường.",
          "と đánh dấu nội dung suy nghĩ. Để phản đối, dùng ～ないと思います ('tôi nghĩ không ~') thay vì phủ định 思います.",
        ],
        pitfalls: [
          "Dùng thể thường trước と, dù 思います lịch sự: おもしろいと思います, không phải おもしろいですと.",
          "Để nói 'tôi nghĩ không phải ~', đặt phủ định bên trong: 行かないと思います.",
        ],
      },
    },
    l21_to_iimashita: {
      en: {
        explanation: [
          "[clause] と言いました reports speech — 'said that ~'. For reported (indirect) speech the quoted clause is plain form: 来ると言いました.",
          "For a direct quotation, put the exact words in 「」 and keep them as spoken: 「宿題をしてください」と言いました.",
        ],
        pitfalls: [
          "Indirect speech uses plain form before と; don't leave です/ます inside an indirect quote.",
          "と here marks the quoted content, the same と as in と思います.",
        ],
      },
      vi: {
        explanation: [
          "[mệnh đề] と言いました thuật lại lời nói — 'nói rằng ~'. Với lời thuật gián tiếp, mệnh đề trích dẫn ở thể thường: 来ると言いました.",
          "Với trích dẫn trực tiếp, đặt nguyên văn trong 「」 và giữ đúng như đã nói: 「宿題をしてください」と言いました.",
        ],
        pitfalls: [
          "Lời gián tiếp dùng thể thường trước と; đừng để です/ます trong trích dẫn gián tiếp.",
          "と ở đây đánh dấu nội dung trích dẫn, cùng と như trong と思います.",
        ],
      },
    },
    l21_deshou: {
      en: {
        explanation: [
          "[plain form / noun] でしょう？ with rising intonation seeks agreement — 'right? / isn't it?': おいしいでしょう？ ('it's tasty, right?').",
          "Said flatly (not rising), でしょう instead expresses a guess — 'probably ~': あした晴れるでしょう ('it will probably be sunny').",
        ],
        pitfalls: [
          "The 'seeking agreement' meaning needs rising intonation; without it the sentence sounds like a prediction.",
          "でしょう follows plain form; drop だ after a noun: 先生でしょう？, not 先生だでしょう？.",
        ],
      },
      vi: {
        explanation: [
          "[thể thường / danh từ] でしょう？ với ngữ điệu lên tìm sự đồng tình — 'phải không? / nhỉ?': おいしいでしょう？ ('ngon nhỉ?').",
          "Nói giọng bằng (không lên), でしょう lại diễn tả phỏng đoán — 'chắc là ~': あした晴れるでしょう ('ngày mai chắc sẽ nắng').",
        ],
        pitfalls: [
          "Nghĩa 'tìm đồng tình' cần ngữ điệu lên; không có nó câu nghe như một dự đoán.",
          "でしょう theo sau thể thường; bỏ だ sau danh từ: 先生でしょう？, không phải 先生だでしょう？.",
        ],
      },
    },
  },
  exercises: {
    21: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "あした雨が降る（　）思います。",
          options: ["と", "を", "が", "の"],
          answer: 0,
          explanation: {
            en: "と marks the content of a thought.",
            vi: "と đánh dấu nội dung suy nghĩ.",
          },
        },
        {
          prompt: "この映画はおもしろい（　）思います。（plain before と）",
          options: ["と", "ですと", "だと", "のと"],
          answer: 0,
          explanation: {
            en: "い-adjective stays plain before と.",
            vi: "Tính từ い giữ thể thường trước と.",
          },
        },
        {
          prompt: "田中さんはあした来る（　）言いました。",
          options: ["と", "を", "は", "が"],
          answer: 0,
          explanation: {
            en: "と reports what was said.",
            vi: "と thuật lại lời đã nói.",
          },
        },
        {
          prompt: "この料理はおいしい（　）？（right?）",
          options: ["でしょう", "ますか", "です", "だか"],
          answer: 0,
          explanation: {
            en: "でしょう？ seeks agreement.",
            vi: "でしょう？ tìm sự đồng tình.",
          },
        },
        {
          prompt: "母は元気（　）と言いました。（plain noun/na-adj）",
          options: ["だ", "です", "の", "な"],
          answer: 0,
          explanation: {
            en: "Plain form uses だ before と.",
            vi: "Thể thường dùng だ trước と.",
          },
        },
      ],
    },
  },
};
