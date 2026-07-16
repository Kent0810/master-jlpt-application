// Lesson 10 — あります/います (existence), position nouns (上/下/中…).
module.exports = {
  examples: {
    l10_arimasu_imasu: [
      { jp: "机の上に本があります。", en: "There is a book on the desk.", vi: "Trên bàn có một quyển sách." },
      { jp: "部屋に猫がいます。", en: "There is a cat in the room.", vi: "Trong phòng có một con mèo." },
      { jp: "公園に子供がいます。", en: "There are children in the park.", vi: "Trong công viên có trẻ em." },
    ],
    l10_position: [
      { jp: "本は机の上にあります。", en: "The book is on the desk.", vi: "Quyển sách ở trên bàn." },
      { jp: "猫はいすの下にいます。", en: "The cat is under the chair.", vi: "Con mèo ở dưới ghế." },
      { jp: "銀行は郵便局の隣です。", en: "The bank is next to the post office.", vi: "Ngân hàng ở cạnh bưu điện." },
    ],
  },
  explanations: {
    l10_arimasu_imasu: {
      en: {
        explanation: [
          "あります and います both mean 'there is / exists'. Choose by what exists: あります for inanimate things and plants, います for people and animals.",
          "The full pattern is [place] に [thing] が あります/います. に marks where it is, が marks the thing that exists.",
        ],
        pitfalls: [
          "Use います for anything that moves on its own (people, pets, fish); あfor things (books, buildings, trees).",
          "Don't swap に and が: 机の上に本があります — に on the place, が on the book.",
        ],
      },
      vi: {
        explanation: [
          "あります và います đều nghĩa 'có / tồn tại'. Chọn theo cái tồn tại: あります cho vật vô tri và cây cối, います cho người và động vật.",
          "Mẫu đầy đủ là [nơi chốn] に [vật] が あります/います. に đánh dấu nơi, が đánh dấu vật tồn tại.",
        ],
        pitfalls: [
          "Dùng います cho thứ tự di chuyển (người, thú cưng, cá); あります cho vật (sách, tòa nhà, cây).",
          "Đừng đổi chỗ に và が: 机の上に本があります — に cho nơi chốn, が cho quyển sách.",
        ],
      },
    },
    l10_position: {
      en: {
        explanation: [
          "Position words join to a noun with の: 机の上 ('the top of the desk'), いすの下 ('under the chair'), 銀行の隣 ('next to the bank').",
          "To say where something is, use [thing] は [noun]の[position]に あります/います, or drop に…あります and end with です for a simple location: 銀行は郵便局の隣です.",
        ],
        pitfalls: [
          "The order is [reference]の[position]: 机の上, never 上の机.",
          "隣 is for things of the same kind side by side; そば/近く is a looser 'near'.",
        ],
      },
      vi: {
        explanation: [
          "Từ chỉ vị trí nối với danh từ bằng の: 机の上 ('mặt trên của bàn'), いすの下 ('dưới ghế'), 銀行の隣 ('cạnh ngân hàng').",
          "Để nói vật ở đâu, dùng [vật] は [danh từ]の[vị trí]に あります/います, hoặc bỏ に…あります và kết thúc bằng です cho vị trí đơn giản: 銀行は郵便局の隣です.",
        ],
        pitfalls: [
          "Trật tự là [mốc]の[vị trí]: 机の上, không bao giờ 上の机.",
          "隣 dùng cho vật cùng loại đứng cạnh nhau; そば/近く là 'gần' theo nghĩa rộng hơn.",
        ],
      },
    },
  },
  exercises: {
    10: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        { prompt: "机の上に本が（　）。", options: ["あります", "います", "です", "します"], answer: 0, explanation: { en: "Books are inanimate → あります.", vi: "Sách là vật vô tri → あります." } },
        { prompt: "部屋に猫が（　）。", options: ["います", "あります", "です", "します"], answer: 0, explanation: { en: "A cat is animate → います.", vi: "Con mèo là động vật → います." } },
        { prompt: "本は机（　）上にあります。", options: ["の", "に", "が", "を"], answer: 0, explanation: { en: "Position joins with の: 机の上.", vi: "Vị trí nối bằng の: 机の上." } },
        { prompt: "公園（　）子供がいます。", options: ["に", "で", "を", "へ"], answer: 0, explanation: { en: "に marks the place of existence.", vi: "に đánh dấu nơi tồn tại." } },
        { prompt: "銀行は郵便局の（　）です。（next to）", options: ["隣", "上", "中", "前"], answer: 0, explanation: { en: "隣 means 'next to'.", vi: "隣 nghĩa 'bên cạnh'." } },
      ],
    },
  },
};
