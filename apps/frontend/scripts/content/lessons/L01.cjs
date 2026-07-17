// Lesson 1 — introductions: は…です, じゃありません, か, も, の.
module.exports = {
  examples: {
    l1_wa_desu: [
      {
        jp: "田中さんは医者です。",
        en: "Mr. Tanaka is a doctor.",
        vi: "Ông Tanaka là bác sĩ.",
      },
      {
        jp: "わたしは会社員です。",
        en: "I am a company employee.",
        vi: "Tôi là nhân viên công ty.",
      },
      {
        jp: "あの人は銀行員です。",
        en: "That person is a bank clerk.",
        vi: "Người kia là nhân viên ngân hàng.",
      },
      {
        jp: "ミラーさんはアメリカ人です。",
        en: "Mr. Miller is American.",
        vi: "Anh Miller là người Mỹ.",
      },
    ],
    l1_ja_arimasen: [
      {
        jp: "わたしは医者じゃありません。",
        en: "I am not a doctor.",
        vi: "Tôi không phải là bác sĩ.",
      },
      {
        jp: "サントスさんは学生じゃありません。",
        en: "Mr. Santos is not a student.",
        vi: "Anh Santos không phải là sinh viên.",
      },
      {
        jp: "あの人は先生じゃありません。",
        en: "That person is not a teacher.",
        vi: "Người kia không phải là giáo viên.",
      },
      {
        jp: "田中さんは会社員じゃありません。",
        en: "Mr. Tanaka is not a company employee.",
        vi: "Ông Tanaka không phải là nhân viên công ty.",
      },
    ],
    l1_ka: [
      {
        jp: "あなたは学生ですか。",
        en: "Are you a student?",
        vi: "Bạn là sinh viên phải không?",
      },
      {
        jp: "田中さんは先生ですか。",
        en: "Is Mr. Tanaka a teacher?",
        vi: "Ông Tanaka là giáo viên phải không?",
      },
      {
        jp: "あの人は医者ですか。",
        en: "Is that person a doctor?",
        vi: "Người kia là bác sĩ phải không?",
      },
    ],
    l1_mo: [
      {
        jp: "田中さんも先生です。",
        en: "Mr. Tanaka is also a teacher.",
        vi: "Ông Tanaka cũng là giáo viên.",
      },
      {
        jp: "あの人もアメリカ人です。",
        en: "That person is also American.",
        vi: "Người kia cũng là người Mỹ.",
      },
      {
        jp: "サントスさんも会社員です。",
        en: "Mr. Santos is also a company employee.",
        vi: "Anh Santos cũng là nhân viên công ty.",
      },
    ],
    l1_no: [
      {
        jp: "あの人は日本語の先生です。",
        en: "That person is a Japanese-language teacher.",
        vi: "Người kia là giáo viên tiếng Nhật.",
      },
      {
        jp: "これは日本の車です。",
        en: "This is a Japanese car.",
        vi: "Đây là xe hơi của Nhật.",
      },
      {
        jp: "サントスさんはブラジルの会社員です。",
        en: "Mr. Santos is a company employee from Brazil.",
        vi: "Anh Santos là nhân viên công ty của Brazil.",
      },
    ],
  },

  explanations: {
    l1_wa_desu: {
      en: {
        explanation: [
          "です carries no meaning of its own beyond 'politeness + assertion'. It is not the verb 'to be' in the English sense — Japanese has separate words for existence (います / あります, learned later). です simply closes a polite statement about what the topic is.",
          "The pattern is fixed as [topic] は [noun] です. Japanese does not change です for singular or plural, and there is no word for 'a' or 'the' — わたしは学生です can mean 'I am a student' or 'I am the student' depending on context.",
        ],
        pitfalls: [
          "Don't pronounce です as 'des-u' with a strong final vowel — the う is nearly silent, so it sounds like 'des'.",
          "は as a topic marker is always written は but pronounced 'wa', never 'ha'.",
        ],
      },
      vi: {
        explanation: [
          "です tự bản thân không mang nghĩa gì ngoài 'lịch sự + khẳng định'. Nó không phải là động từ 'thì, là' theo kiểu tiếng Anh — tiếng Nhật có từ riêng để chỉ sự tồn tại (います / あります, học sau). です chỉ đơn giản khép lại một câu nói lịch sự về chủ đề.",
          "Mẫu câu cố định là [chủ đề] は [danh từ] です. Tiếng Nhật không đổi です theo số ít hay số nhiều, và không có mạo từ 'a' hay 'the' — わたしは学生です có thể là 'Tôi là một sinh viên' hoặc 'Tôi là sinh viên đó' tùy ngữ cảnh.",
        ],
        pitfalls: [
          "Đừng đọc です thành 'des-u' với nguyên âm cuối mạnh — âm う gần như câm, nghe như 'des'.",
          "は khi là trợ từ chủ đề luôn viết là は nhưng đọc là 'wa', không phải 'ha'.",
        ],
      },
    },
    l1_ja_arimasen: {
      en: {
        explanation: [
          "じゃありません is the casual-polite negative; では ありません is the same meaning but more formal, common in writing and announcements. Both are correct — choose じゃ in conversation, では in formal settings.",
          "Only the ending changes between positive and negative — the topic and noun stay in place: わたしは学生です → わたしは学生じゃありません.",
        ],
        pitfalls: [
          "じゃ is a contraction of では; never write じゃ as ぢゃ.",
          "Don't add です after ありません — じゃありませんです is wrong.",
        ],
      },
      vi: {
        explanation: [
          "じゃありません là dạng phủ định lịch sự thông thường; では ありません cùng nghĩa nhưng trang trọng hơn, hay dùng trong văn viết và thông báo. Cả hai đều đúng — dùng じゃ khi nói chuyện, では khi trang trọng.",
          "Chỉ có phần đuôi thay đổi giữa khẳng định và phủ định — chủ đề và danh từ giữ nguyên: わたしは学生です → わたしは学生じゃありません.",
        ],
        pitfalls: [
          "じゃ là dạng rút gọn của では; đừng viết じゃ thành ぢゃ.",
          "Đừng thêm です sau ありません — じゃありませんです là sai.",
        ],
      },
    },
    l1_ka: {
      en: {
        explanation: [
          "The word order does not change to form a question — unlike English, you don't invert the subject and verb. You keep the statement exactly as it is and add か at the very end.",
          "To answer, use はい (yes) or いいえ (no), often followed by the corrected statement: いいえ、学生じゃありません.",
        ],
        pitfalls: [
          "In writing, a full-stop 。 follows か; a Japanese question mark ？ is casual and usually omitted in textbooks.",
          "Your voice rises only slightly at the end — か already signals the question, so heavy English-style intonation sounds unnatural.",
        ],
      },
      vi: {
        explanation: [
          "Trật tự từ không đổi khi tạo câu hỏi — khác tiếng Anh, bạn không đảo chủ ngữ và động từ. Giữ nguyên câu trần thuật và thêm か ở cuối.",
          "Để trả lời, dùng はい (vâng) hoặc いいえ (không), thường kèm câu đã sửa lại: いいえ、学生じゃありません.",
        ],
        pitfalls: [
          "Trong văn viết, dấu chấm 。 đứng sau か; dấu hỏi ？ mang tính thân mật và thường được lược bỏ trong sách giáo khoa.",
          "Giọng chỉ lên nhẹ ở cuối — か đã báo hiệu câu hỏi rồi, nên lên giọng mạnh kiểu tiếng Anh nghe không tự nhiên.",
        ],
      },
    },
    l1_mo: {
      en: {
        explanation: [
          "も replaces は — you never write both together. It signals that the new comment matches something already said: after 'Miller is a company employee', サントスさんも会社員です means 'Santos, too, is a company employee.'",
          "Because も points back to shared information, it only makes sense when the listener already knows the first statement.",
        ],
        pitfalls: [
          "Don't say はも or もは — も takes the slot that は would occupy.",
          "も means 'also' only when the following comment is the same; for a different comment, keep は.",
        ],
      },
      vi: {
        explanation: [
          "も thay thế は — không bao giờ viết cả hai cùng lúc. Nó cho biết nhận xét mới trùng với điều đã nói: sau 'Miller là nhân viên công ty', サントスさんも会社員です nghĩa là 'Santos cũng là nhân viên công ty.'",
          "Vì も quy chiếu về thông tin đã chia sẻ, nó chỉ hợp lý khi người nghe đã biết câu đầu tiên.",
        ],
        pitfalls: [
          "Đừng nói はも hay もは — も chiếm đúng vị trí của は.",
          "も nghĩa 'cũng' chỉ khi nhận xét theo sau giống nhau; nếu nhận xét khác, giữ は.",
        ],
      },
    },
    l1_no: {
      en: {
        explanation: [
          "Read の from right to left: [A] の [B] is always a kind of B, with A describing it. 日本の車 is a car (that is Japanese), not a Japan.",
          "The same の covers possession (わたしの本, my book), origin or group (日本の車, a Japanese car), and attribute (日本語の先生, a Japanese-language teacher) — English needs several different words for these.",
        ],
        pitfalls: [
          "Don't drop の between two nouns — 日本車 exists as a set compound, but as a learner always link them with の.",
          "The order is owner-first: 'my teacher' is わたしの先生, never 先生のわたし.",
        ],
      },
      vi: {
        explanation: [
          "Đọc の từ phải sang trái: [A] の [B] luôn là một loại B, với A bổ nghĩa cho nó. 日本の車 là chiếc xe (của Nhật), không phải là nước Nhật.",
          "Cùng một の diễn tả sở hữu (わたしの本, sách của tôi), nguồn gốc hay nhóm (日本の車, xe của Nhật), và thuộc tính (日本語の先生, giáo viên tiếng Nhật) — tiếng Anh cần nhiều từ khác nhau cho những nghĩa này.",
        ],
        pitfalls: [
          "Đừng bỏ の giữa hai danh từ — 日本車 tồn tại như một từ ghép cố định, nhưng người học nên luôn nối bằng の.",
          "Thứ tự là người sở hữu đứng trước: 'giáo viên của tôi' là わたしの先生, không phải 先生のわたし.",
        ],
      },
    },
  },

  exercises: {
    1: {
      kind: "exercise",
      source: "authored",
      title: { en: "More practice", vi: "Luyện tập thêm" },
      items: [
        {
          prompt: "わたし（　）学生です。",
          options: ["は", "の", "も", "か"],
          answer: 0,
          explanation: {
            en: "は marks わたし as the topic: 'As for me, (I) am a student.'",
            vi: "は đánh dấu わたし là chủ đề: 'Về phần tôi, (tôi) là sinh viên.'",
          },
        },
        {
          prompt: "田中さんは先生です（　）。",
          options: ["か", "は", "の", "も"],
          answer: 0,
          explanation: {
            en: "か at the end turns the statement into a question.",
            vi: "か ở cuối biến câu trần thuật thành câu hỏi.",
          },
        },
        {
          prompt: "サントスさん（　）会社員です。（＝Santos also）",
          options: ["も", "は", "の", "か"],
          answer: 0,
          explanation: {
            en: "も means 'also' and replaces は.",
            vi: "も nghĩa là 'cũng' và thay thế は.",
          },
        },
        {
          prompt: "これは日本（　）車です。",
          options: ["の", "は", "も", "か"],
          answer: 0,
          explanation: {
            en: "の links 日本 and 車: 'a car of Japan' → a Japanese car.",
            vi: "の nối 日本 và 車: 'xe của Nhật' → xe Nhật.",
          },
        },
        {
          prompt: "「あなたは医者ですか。」「いいえ、医者（　）。」",
          options: ["じゃありません", "です", "も", "の"],
          answer: 0,
          explanation: {
            en: "The negative answer needs じゃありません ('is not').",
            vi: "Câu trả lời phủ định cần じゃありません ('không phải là').",
          },
        },
      ],
    },
  },
};
