// Lesson 4 — telling time & …に, から…まで, polite verb forms.
module.exports = {
  examples: {
    l4_time: [
      { jp: "今何時ですか。", en: "What time is it now?", vi: "Bây giờ là mấy giờ?" },
      { jp: "毎朝7時に起きます。", en: "I get up at seven every morning.", vi: "Mỗi sáng tôi thức dậy lúc 7 giờ." },
      { jp: "毎晩11時に寝ます。", en: "I go to bed at eleven every night.", vi: "Mỗi tối tôi đi ngủ lúc 11 giờ." },
    ],
    l4_kara_made: [
      { jp: "銀行は9時から3時までです。", en: "The bank is open from nine to three.", vi: "Ngân hàng mở cửa từ 9 giờ đến 3 giờ." },
      { jp: "会社は月曜日から金曜日までです。", en: "Work is from Monday to Friday.", vi: "Công ty làm việc từ thứ Hai đến thứ Sáu." },
    ],
    l4_verb_polite: [
      { jp: "毎日勉強します。", en: "I study every day.", vi: "Tôi học mỗi ngày." },
      { jp: "昨日働きました。", en: "I worked yesterday.", vi: "Hôm qua tôi đã làm việc." },
      { jp: "日曜日は働きません。", en: "I don't work on Sundays.", vi: "Chủ nhật tôi không làm việc." },
    ],
  },
  explanations: {
    l4_time: {
      en: {
        explanation: [
          "Times are stated with 時 (o'clock) and 分 (minute): 7時, 30分. To ask the time, use 何時 ('what time'). 今 ('now') often begins the sentence.",
          "The particle に marks a clock time when an action follows: 7時に起きます ('I get up at 7'). Relative time words like 今日, あした, 毎朝 take no に.",
        ],
        pitfalls: [
          "Don't add に to 今, けさ, まいにち and similar words — に is only for specific clock times, days, and dates.",
          "The counters change shape: 4時 is よじ (not よんじ) and 9時 is くじ (not きゅうじ).",
        ],
      },
      vi: {
        explanation: [
          "Giờ được nói bằng 時 (giờ) và 分 (phút): 7時, 30分. Để hỏi giờ, dùng 何時 ('mấy giờ'). 今 ('bây giờ') thường mở đầu câu.",
          "Trợ từ に đánh dấu giờ đồng hồ khi có hành động theo sau: 7時に起きます ('tôi thức dậy lúc 7 giờ'). Các từ chỉ thời gian tương đối như 今日, あした, 毎朝 không cần に.",
        ],
        pitfalls: [
          "Đừng thêm に vào 今, けさ, まいにち… — に chỉ dùng cho giờ đồng hồ, ngày và ngày tháng cụ thể.",
          "Cách đọc lượng từ thay đổi: 4時 là よじ (không phải よんじ) và 9時 là くじ (không phải きゅうじ).",
        ],
      },
    },
    l4_kara_made: {
      en: {
        explanation: [
          "から marks a starting point and まで an ending point, for both time and place: 9時から5時まで ('from 9 to 5'), 東京から大阪まで ('from Tokyo to Osaka').",
          "You can use either half alone — 9時から ('from 9 o'clock on') or 5時まで ('until 5') — when only one end matters.",
        ],
        pitfalls: [
          "から attaches after the start word and まで after the end word — don't put them before.",
          "For 'to' a destination you go to, use へ/に with a motion verb; から…まで is for a range, not for arriving somewhere.",
        ],
      },
      vi: {
        explanation: [
          "から đánh dấu điểm bắt đầu và まで điểm kết thúc, cho cả thời gian lẫn nơi chốn: 9時から5時まで ('từ 9 đến 5 giờ'), 東京から大阪まで ('từ Tokyo đến Osaka').",
          "Bạn có thể dùng riêng một vế — 9時から ('từ 9 giờ trở đi') hoặc 5時まで ('đến 5 giờ') — khi chỉ một đầu quan trọng.",
        ],
        pitfalls: [
          "から đứng sau từ chỉ điểm đầu và まで đứng sau từ chỉ điểm cuối — đừng đặt trước.",
          "Để chỉ 'đến' một đích bạn đi tới, dùng へ/に với động từ chuyển động; から…まで là chỉ khoảng, không phải để diễn tả sự đến nơi.",
        ],
      },
    },
    l4_verb_polite: {
      en: {
        explanation: [
          "The polite ます-form has four endings that cover tense and polarity: ます (non-past +), ません (non-past −), ました (past +), ませんでした (past −).",
          "Japanese non-past covers both present habits and the future: 働きます can mean 'I work' or 'I will work', decided by context and time words.",
        ],
        pitfalls: [
          "The negative past is one long ending ませんでした — don't say ましたじゃない.",
          "There is no separate future tense; don't look for one — 毎日 vs あした tells you which time is meant.",
        ],
      },
      vi: {
        explanation: [
          "Thể lịch sự ます có bốn đuôi bao trùm thì và tính khẳng định/phủ định: ます (hiện tại +), ません (hiện tại −), ました (quá khứ +), ませんでした (quá khứ −).",
          "Thì hiện tại của tiếng Nhật bao gồm cả thói quen hiện tại lẫn tương lai: 働きます có thể là 'tôi làm việc' hoặc 'tôi sẽ làm việc', tùy ngữ cảnh và từ chỉ thời gian.",
        ],
        pitfalls: [
          "Quá khứ phủ định là một đuôi dài ませんでした — đừng nói ましたじゃない.",
          "Không có thì tương lai riêng; đừng tìm nó — 毎日 và あした cho biết thời điểm nào được nói đến.",
        ],
      },
    },
  },
  exercises: {
    4: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        { prompt: "毎朝7時（　）起きます。", options: ["に", "で", "を", "へ"], answer: 0, explanation: { en: "に marks a specific clock time before a verb.", vi: "に đánh dấu giờ cụ thể trước động từ." } },
        { prompt: "今（　）ですか。（what time）", options: ["何時", "何", "どこ", "だれ"], answer: 0, explanation: { en: "何時 asks 'what time'.", vi: "何時 hỏi 'mấy giờ'." } },
        { prompt: "銀行は9時（　）3時までです。", options: ["から", "まで", "に", "と"], answer: 0, explanation: { en: "から marks the start of the range.", vi: "から đánh dấu điểm bắt đầu của khoảng." } },
        { prompt: "昨日働き（　）。（past affirmative）", options: ["ました", "ます", "ません", "ませんでした"], answer: 0, explanation: { en: "ました is the polite past affirmative.", vi: "ました là quá khứ khẳng định lịch sự." } },
        { prompt: "日曜日は働き（　）。（don't / non-past negative）", options: ["ません", "ました", "ませんでした", "ます"], answer: 0, explanation: { en: "ません is the non-past negative.", vi: "ません là phủ định hiện tại." } },
      ],
    },
  },
};
