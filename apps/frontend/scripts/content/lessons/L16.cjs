// Lesson 16 — V1て、V2 (and then), V-てから (after), adjective connection.
module.exports = {
  examples: {
    l16_te_connect: [
      { jp: "朝起きて、ごはんを食べて、会社へ行きます。", en: "I get up, eat, and go to work.", vi: "Tôi thức dậy, ăn cơm, rồi đi làm." },
      { jp: "図書館へ行って、本を借ります。", en: "I go to the library and borrow a book.", vi: "Tôi đến thư viện và mượn sách." },
      { jp: "手を洗って、昼ごはんを食べます。", en: "I wash my hands and eat lunch.", vi: "Tôi rửa tay rồi ăn trưa." },
    ],
    l16_te_kara: [
      { jp: "ごはんを食べてから、薬を飲みます。", en: "After eating, I take medicine.", vi: "Sau khi ăn cơm, tôi uống thuốc." },
      { jp: "仕事が終わってから、映画を見ます。", en: "After work ends, I watch a movie.", vi: "Sau khi tan làm, tôi xem phim." },
      { jp: "日本へ来てから、日本語を勉強しています。", en: "Since coming to Japan, I have been studying Japanese.", vi: "Từ khi đến Nhật, tôi vẫn đang học tiếng Nhật." },
    ],
    l16_adj_te: [
      { jp: "この部屋は広くて、きれいです。", en: "This room is spacious and clean.", vi: "Căn phòng này rộng và sạch." },
      { jp: "京都は静かで、有名です。", en: "Kyoto is quiet and famous.", vi: "Kyoto yên tĩnh và nổi tiếng." },
      { jp: "田中さんは親切で、ハンサムです。", en: "Mr. Tanaka is kind and handsome.", vi: "Ông Tanaka tốt bụng và đẹp trai." },
    ],
  },
  explanations: {
    l16_te_connect: {
      en: {
        explanation: [
          "V1て、V2 joins actions in sequence — 'do V1, and then V2'. Only the final verb shows the tense and politeness for the whole chain.",
          "You can link several actions in a row: 起きて、食べて、行きます. The order of the て-verbs is the order the actions happen.",
        ],
        pitfalls: [
          "Don't put ます on the middle verbs — only the last verb is 行きます, the rest are て-forms.",
          "The tense of the whole sentence comes from the last verb, so 食べて、行きました is all past.",
        ],
      },
      vi: {
        explanation: [
          "V1て、V2 nối các hành động theo trình tự — 'làm V1, rồi V2'. Chỉ động từ cuối thể hiện thì và độ lịch sự cho cả chuỗi.",
          "Bạn có thể nối nhiều hành động liên tiếp: 起きて、食べて、行きます. Thứ tự các động từ て là thứ tự hành động xảy ra.",
        ],
        pitfalls: [
          "Đừng gắn ます vào các động từ ở giữa — chỉ động từ cuối là 行きます, phần còn lại là thể て.",
          "Thì của cả câu lấy từ động từ cuối, nên 食べて、行きました là quá khứ toàn bộ.",
        ],
      },
    },
    l16_te_kara: {
      en: {
        explanation: [
          "V-てから means 'after doing ~', stressing that one action clearly follows another: 食べてから、薬を飲みます ('take medicine after eating').",
          "It can also mark a starting point in time — 'ever since': 日本へ来てから ('since coming to Japan').",
        ],
        pitfalls: [
          "Only one てから usually appears per sentence; for a plain list of steps use the simple て-form.",
          "Don't confuse this から with the reason から (Lesson 9); here it attaches to a て-form.",
        ],
      },
      vi: {
        explanation: [
          "V-てから nghĩa 'sau khi làm ~', nhấn mạnh một hành động rõ ràng theo sau hành động khác: 食べてから、薬を飲みます ('uống thuốc sau khi ăn').",
          "Nó cũng có thể đánh dấu mốc thời gian bắt đầu — 'kể từ khi': 日本へ来てから ('kể từ khi đến Nhật').",
        ],
        pitfalls: [
          "Thường chỉ một てから mỗi câu; muốn liệt kê các bước thì dùng thể て đơn giản.",
          "Đừng nhầm から này với から lý do (Bài 9); ở đây nó gắn với thể て.",
        ],
      },
    },
    l16_adj_te: {
      en: {
        explanation: [
          "To join adjectives, い-adjectives change い → くて (広い → 広くて) and な-adjectives/nouns add で (静か → 静かで): 広くてきれいです ('spacious and clean').",
          "いい is irregular: よくて. The connected adjectives should carry the same feeling (both positive or both negative); mixed feelings use が ('but').",
        ],
        pitfalls: [
          "Don't just stack adjectives with a plain い: 広いきれい is wrong; use 広くて.",
          "For a contrast (one good, one bad point), use が/けど, not くて/で.",
        ],
      },
      vi: {
        explanation: [
          "Để nối tính từ, tính từ い đổi い → くて (広い → 広くて) và tính từ な/danh từ thêm で (静か → 静かで): 広くてきれいです ('rộng và sạch').",
          "いい bất quy tắc: よくて. Các tính từ được nối nên cùng sắc thái (cùng tốt hoặc cùng xấu); ý trái ngược thì dùng が ('nhưng').",
        ],
        pitfalls: [
          "Đừng chỉ ghép tính từ bằng い thường: 広いきれい là sai; hãy dùng 広くて.",
          "Với ý tương phản (một tốt, một xấu), dùng が/けど, không dùng くて/で.",
        ],
      },
    },
  },
  exercises: {
    16: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        { prompt: "図書館へ（　）、本を借ります。（go — 行きます）", options: ["行って", "行きて", "行いて", "行くて"], answer: 0, explanation: { en: "行きます → 行って joins the next action.", vi: "行きます → 行って nối hành động sau." } },
        { prompt: "ごはんを食べて（　）、薬を飲みます。（after）", options: ["から", "まで", "ので", "が"], answer: 0, explanation: { en: "てから = 'after doing'.", vi: "てから = 'sau khi làm'." } },
        { prompt: "この部屋は広（　）、きれいです。（and）", options: ["くて", "いで", "で", "だ"], answer: 0, explanation: { en: "い-adjective join: 広い → 広くて.", vi: "Nối tính từ い: 広い → 広くて." } },
        { prompt: "京都は静か（　）、有名です。（and）", options: ["で", "くて", "て", "に"], answer: 0, explanation: { en: "な-adjective join: 静か → 静かで.", vi: "Nối tính từ な: 静か → 静かで." } },
        { prompt: "手を（　）、昼ごはんを食べます。（wash — 洗います）", options: ["洗って", "洗いて", "洗んで", "洗くて"], answer: 0, explanation: { en: "う-verb: 洗います → 洗って.", vi: "Động từ đuôi う: 洗います → 洗って." } },
      ],
    },
  },
};
