// Lesson 2 — これ/それ/あれ, この/その/あの N, そうです/ちがいます, A or B.
module.exports = {
  examples: {
    l2_kore_sore_are: [
      { jp: "これは本です。", en: "This is a book.", vi: "Đây là quyển sách." },
      { jp: "それは傘です。", en: "That is an umbrella.", vi: "Đó là cái ô." },
      {
        jp: "あれは時計です。",
        en: "That (over there) is a clock.",
        vi: "Kia là cái đồng hồ.",
      },
    ],
    l2_kono_sono_ano: [
      {
        jp: "この本はわたしのです。",
        en: "This book is mine.",
        vi: "Quyển sách này là của tôi.",
      },
      {
        jp: "そのかばんはミラーさんのです。",
        en: "That bag is Mr. Miller's.",
        vi: "Cái cặp đó là của anh Miller.",
      },
      {
        jp: "あの人は田中さんです。",
        en: "That person is Mr. Tanaka.",
        vi: "Người kia là ông Tanaka.",
      },
    ],
    l2_sou_desu: [
      {
        jp: "「これはあなたの傘ですか。」「はい、そうです。」",
        en: '"Is this your umbrella?" "Yes, it is."',
        vi: '"Đây là cái ô của bạn phải không?" "Vâng, đúng vậy."',
      },
      {
        jp: "「それは英語の本ですか。」「いいえ、ちがいます。」",
        en: '"Is that an English book?" "No, it isn\'t."',
        vi: '"Đó là sách tiếng Anh phải không?" "Không, không phải."',
      },
    ],
    l2_ka_ka: [
      {
        jp: "これは鉛筆ですか、ボールペンですか。",
        en: "Is this a pencil or a ballpoint pen?",
        vi: "Đây là bút chì hay bút bi?",
      },
      {
        jp: "あれはテレビですか、ラジオですか。",
        en: "Is that (over there) a TV or a radio?",
        vi: "Kia là ti vi hay radio?",
      },
    ],
  },
  explanations: {
    l2_kore_sore_are: {
      en: {
        explanation: [
          "これ・それ・あれ are pronouns that stand alone as a whole noun phrase — 'this one', 'that one'. Distance is from the speaker and listener: これ near me, それ near you, あれ away from both.",
          "The matching question word is どれ ('which one?'). これ・それ・あれ・どれ form a neat set you will meet again with places (ここ) and directions (こちら).",
        ],
        pitfalls: [
          "Don't put a noun straight after これ — 'this book' is この本, not これ本.",
          "それ is chosen by where the listener is, not by whether the thing is 'medium distance'.",
        ],
      },
      vi: {
        explanation: [
          "これ・それ・あれ là đại từ đứng một mình như cả một cụm danh từ — 'cái này', 'cái đó'. Khoảng cách tính từ người nói và người nghe: これ gần tôi, それ gần bạn, あれ xa cả hai.",
          "Từ để hỏi tương ứng là どれ ('cái nào?'). これ・それ・あれ・どれ tạo thành một bộ gọn gàng bạn sẽ gặp lại với nơi chốn (ここ) và phương hướng (こちら).",
        ],
        pitfalls: [
          "Đừng đặt danh từ ngay sau これ — 'quyển sách này' là この本, không phải これ本.",
          "Chọn それ dựa vào vị trí người nghe, không phải vì vật ở 'khoảng cách trung bình'.",
        ],
      },
    },
    l2_kono_sono_ano: {
      en: {
        explanation: [
          "この・その・あの must be followed immediately by a noun — they are the 'attached' partners of これ・それ・あれ. この本 = 'this book', あの人 = 'that person'.",
          "Use them the moment you want to name the thing: これはかばんです ('this is a bag') → このかばんは新しいです ('this bag is new').",
        ],
        pitfalls: [
          "Never use この・その・あの on their own — they always need a noun after them.",
          "あの人 (that person) is neutral-polite; あいつ is rude. Stick with あの人 or あの方.",
        ],
      },
      vi: {
        explanation: [
          "この・その・あの phải đi liền ngay trước một danh từ — chúng là 'phiên bản đi kèm' của これ・それ・あれ. この本 = 'quyển sách này', あの人 = 'người kia'.",
          "Dùng chúng khi bạn muốn gọi tên vật: これはかばんです ('đây là cái cặp') → このかばんは新しいです ('cái cặp này thì mới').",
        ],
        pitfalls: [
          "Đừng bao giờ dùng この・その・あの một mình — luôn cần danh từ đứng sau.",
          "あの人 (người kia) mang sắc thái lịch sự trung tính; あいつ thì thô lỗ. Hãy dùng あの人 hoặc あの方.",
        ],
      },
    },
    l2_sou_desu: {
      en: {
        explanation: [
          "そうです confirms a yes/no question about what something is; ちがいます ('it's different / that's wrong') denies it. They answer noun-based ですか questions.",
          "For a softer denial, say いいえ、ちがいます rather than a bare いいえ. In casual speech そうです becomes そう, and ちがいます becomes ちがう.",
        ],
        pitfalls: [
          "そうです only works for 'X is Y' questions — don't use it to answer action-verb questions (use はい、～ます).",
          "ちがいます, not じゃありません, is the natural 'no' to a 'is this X?' identification question.",
        ],
      },
      vi: {
        explanation: [
          "そうです xác nhận một câu hỏi có/không về việc vật là gì; ちがいます ('khác / không đúng') phủ nhận điều đó. Chúng trả lời câu hỏi ですか dựa trên danh từ.",
          "Để phủ nhận nhẹ nhàng hơn, nói いいえ、ちがいます thay vì chỉ いいえ. Trong văn nói thân mật そうです thành そう, còn ちがいます thành ちがう.",
        ],
        pitfalls: [
          "そうです chỉ dùng cho câu hỏi 'X là Y' — đừng dùng để trả lời câu hỏi động từ hành động (dùng はい、～ます).",
          "ちがいます, chứ không phải じゃありません, mới là câu 'không' tự nhiên cho câu hỏi nhận dạng 'đây có phải X không?'.",
        ],
      },
    },
    l2_ka_ka: {
      en: {
        explanation: [
          "Repeating か after each option offers a choice: AですかBですか = 'is it A, or B?'. The listener answers by naming one option, not with はい/いいえ.",
          "Each option keeps its own です before か. Intonation rises on both A and B.",
        ],
        pitfalls: [
          "Don't answer an A-or-B question with はい or いいえ — say which one: 鉛筆です.",
          "Don't drop the second です: これは鉛筆ですか、ボールペンか is incomplete.",
        ],
      },
      vi: {
        explanation: [
          "Lặp lại か sau mỗi lựa chọn để đưa ra sự chọn lựa: AですかBですか = 'là A, hay B?'. Người nghe trả lời bằng cách nêu một lựa chọn, không dùng はい/いいえ.",
          "Mỗi lựa chọn giữ です riêng trước か. Ngữ điệu lên ở cả A và B.",
        ],
        pitfalls: [
          "Đừng trả lời câu hỏi A-hay-B bằng はい hay いいえ — hãy nói cái nào: 鉛筆です.",
          "Đừng bỏ です thứ hai: これは鉛筆ですか、ボールペンか là chưa hoàn chỉnh.",
        ],
      },
    },
  },
  exercises: {
    2: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "（　）は本です。（this one）",
          options: ["これ", "この", "ここ", "こちら"],
          answer: 0,
          explanation: {
            en: "これ stands alone as 'this one'; この needs a noun after it.",
            vi: "これ đứng một mình nghĩa 'cái này'; この cần danh từ theo sau.",
          },
        },
        {
          prompt: "（　）本はわたしのです。（this book）",
          options: ["この", "これ", "それ", "あれ"],
          answer: 0,
          explanation: {
            en: "Before a noun you use この, not これ.",
            vi: "Trước danh từ dùng この, không phải これ.",
          },
        },
        {
          prompt: "「これはあなたの傘ですか。」「はい、（　）。」",
          options: ["そうです", "ちがいます", "です", "います"],
          answer: 0,
          explanation: {
            en: "はい pairs with そうです to confirm.",
            vi: "はい đi với そうです để xác nhận.",
          },
        },
        {
          prompt: "「先生ですか。」「いいえ、（　）。」",
          options: ["ちがいます", "そうです", "はい", "です"],
          answer: 0,
          explanation: {
            en: "ちがいます is the natural 'no' to an identification question.",
            vi: "ちがいます là câu 'không' tự nhiên cho câu hỏi nhận dạng.",
          },
        },
        {
          prompt: "これは鉛筆です（　）、ボールペンですか。",
          options: ["か", "の", "は", "も"],
          answer: 0,
          explanation: {
            en: "か after each option makes an 'A or B' question.",
            vi: "か sau mỗi lựa chọn tạo câu hỏi 'A hay B'.",
          },
        },
      ],
    },
  },
};
