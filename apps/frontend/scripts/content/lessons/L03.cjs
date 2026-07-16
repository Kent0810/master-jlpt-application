// Lesson 3 — ここ/そこ/あそこ, N は [place] です.
module.exports = {
  examples: {
    l3_koko_soko_asoko: [
      { jp: "ここは教室です。", en: "This place is a classroom.", vi: "Đây là phòng học." },
      { jp: "そこは食堂です。", en: "That place (by you) is the dining hall.", vi: "Chỗ đó là nhà ăn." },
      { jp: "あそこはトイレです。", en: "That place over there is the toilet.", vi: "Kia là nhà vệ sinh." },
    ],
    l3_wa_place: [
      { jp: "受付はあそこです。", en: "The reception is over there.", vi: "Quầy tiếp tân ở đằng kia." },
      { jp: "ミラーさんは事務所です。", en: "Mr. Miller is in the office.", vi: "Anh Miller đang ở văn phòng." },
      { jp: "トイレはそこです。", en: "The toilet is there.", vi: "Nhà vệ sinh ở đó." },
    ],
  },
  explanations: {
    l3_koko_soko_asoko: {
      en: {
        explanation: [
          "ここ・そこ・あそこ name places directly and follow the same near/mid/far logic as これ・それ・あれ: ここ where I am, そこ where you are, あそこ away from both. The question word is どこ ('where?').",
          "The polite equivalents こちら・そちら・あちら mean the same places but sound more formal, and also point in a direction — useful when guiding a guest ('this way, please').",
        ],
        pitfalls: [
          "Use どこ for 'where', not どれ (which one) — they are different question words.",
          "ここ is a place, so pair it with は…です, not with counting or with この.",
        ],
      },
      vi: {
        explanation: [
          "ここ・そこ・あそこ chỉ nơi chốn trực tiếp và theo cùng logic gần/vừa/xa như これ・それ・あれ: ここ nơi tôi, そこ nơi bạn, あそこ xa cả hai. Từ để hỏi là どこ ('ở đâu?').",
          "Các dạng lịch sự こちら・そちら・あちら chỉ cùng nơi chốn nhưng trang trọng hơn, và cũng chỉ hướng — tiện khi dẫn khách ('mời đi lối này').",
        ],
        pitfalls: [
          "Dùng どこ cho 'ở đâu', không phải どれ (cái nào) — chúng là hai từ hỏi khác nhau.",
          "ここ là nơi chốn, nên dùng với は…です, không dùng để đếm hay với この.",
        ],
      },
    },
    l3_wa_place: {
      en: {
        explanation: [
          "[Thing/Person] は [place] です says where something or someone is located. Here です stands in for 'is (at)', so 電話はあそこです means 'the phone is over there'.",
          "To ask where, replace the place with どこ: お手洗いはどこですか ('where is the restroom?'). The answer simply names the place.",
        ],
        pitfalls: [
          "This は…です location pattern is for a fixed location; use あります/います (Lesson 10) when you emphasise existence.",
          "The order is [thing] は [place] — don't reverse it to [place] は [thing].",
        ],
      },
      vi: {
        explanation: [
          "[Vật/Người] は [nơi chốn] です nói vật hay người ở đâu. Ở đây です thay cho 'ở (tại)', nên 電話はあそこです nghĩa là 'điện thoại ở đằng kia'.",
          "Để hỏi ở đâu, thay nơi chốn bằng どこ: お手洗いはどこですか ('nhà vệ sinh ở đâu?'). Câu trả lời chỉ cần nêu nơi chốn.",
        ],
        pitfalls: [
          "Mẫu vị trí は…です này dùng cho vị trí cố định; dùng あります/います (Bài 10) khi nhấn mạnh sự tồn tại.",
          "Trật tự là [vật] は [nơi chốn] — đừng đảo thành [nơi chốn] は [vật].",
        ],
      },
    },
  },
  exercises: {
    3: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        { prompt: "（　）は食堂です。（this place）", options: ["ここ", "これ", "この", "どこ"], answer: 0, explanation: { en: "ここ names a place ('this place').", vi: "ここ chỉ nơi chốn ('chỗ này')." } },
        { prompt: "受付は（　）です。（over there）", options: ["あそこ", "あれ", "あの", "どれ"], answer: 0, explanation: { en: "あそこ = 'over there' (far from both).", vi: "あそこ = 'đằng kia' (xa cả hai)." } },
        { prompt: "トイレ（　）どこですか。", options: ["は", "を", "も", "の"], answer: 0, explanation: { en: "は marks the topic before asking どこですか.", vi: "は đánh dấu chủ đề trước khi hỏi どこですか." } },
        { prompt: "「事務所はどこですか。」「（　）です。」", options: ["あそこ", "あれ", "どれ", "この"], answer: 0, explanation: { en: "Answer a どこ question by naming the place.", vi: "Trả lời câu hỏi どこ bằng cách nêu nơi chốn." } },
        { prompt: "ミラーさん（　）事務所です。", options: ["は", "を", "で", "に"], answer: 0, explanation: { en: "は…です states where Mr. Miller is.", vi: "は…です nói anh Miller ở đâu." } },
      ],
    },
  },
};
