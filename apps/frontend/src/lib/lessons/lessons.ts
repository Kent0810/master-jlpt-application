import { getGrammarByLesson, getVocabByLesson } from "@/lib/data";
import { getAlignment } from "@/lib/data/alignments";
import type { Grammar, Vocabulary } from "@/lib/data/types";
import dialoguesJson from "../../../data/n5-dialogues.json";

import type { TokenChunk, AlignmentParts } from "@/lib/data/types";

export interface DialogueLine {
  sp: string;
  jp: string;
  reading: string;
  en: string;
  vi: string;
  tokens?: TokenChunk[];
  romaji?: string;
  romajiChunks?: string[];
  alignEn?: AlignmentParts;
  alignVi?: AlignmentParts;
}

export interface Dialogue {
  lesson: number;
  lines: DialogueLine[];
}

// Attach the separately-authored word alignments (keyed d{lesson}:{lineIdx})
// so each line carries its translation-highlight data.
const DIALOGUES = (dialoguesJson as Dialogue[]).map((d) => ({
  ...d,
  lines: d.lines.map((line, i) => {
    const align = getAlignment(`d${d.lesson}:${i}`);
    return align ? { ...line, alignEn: align.en, alignVi: align.vi } : line;
  }),
}));

export function getDialogue(lesson: number): Dialogue | undefined {
  return DIALOGUES.find((d) => d.lesson === lesson);
}

export interface LessonMeta {
  lesson: number;
  titleEn: string;
  titleVi: string;
  titleJp: string;
  focus: string;
  focusVi: string;
  // Original one-line recap of what the matching Minna lesson covers (our own
  // wording — no textbook text is reproduced).
  recap: string;
  recapVi: string;
}

// The app's lessons follow Minna no Nihongo Shokyū I (© 3A Corporation) 1:1, so
// each app lesson N corresponds to textbook 第N課. This is a citation only — it
// points the learner to the physical book; no textbook content is copied in.
export function getBookReference(lesson: number): {
  jp: string;
  en: string;
  vi: string;
} {
  return {
    jp: `みんなの日本語 初級Ⅰ · 第${lesson}課`,
    en: `Minna no Nihongo Shokyū I · Lesson ${lesson}`,
    vi: `Minna no Nihongo Sơ cấp I · Bài ${lesson}`,
  };
}

// Themes mirror the syllabus/progression of Minna no Nihongo Shokyū I (lessons
// 1–25). All titles and summaries are original; no textbook text is reproduced.
export const LESSON_META: LessonMeta[] = [
  {
    lesson: 1,
    titleEn: "Introductions",
    titleVi: "Giới thiệu",
    titleJp: "はじめまして",
    focus: "は・です・か・も・の — saying who you are",
    focusVi: "は・です・か・も・の — nói bạn là ai",
    recap:
      "Meeting people for the first time: give your name, nationality and job with は…です, ask questions with か, and ask who someone is (だれ/どなた) and their age (何歳/おいくつ).",
    recapVi:
      "Làm quen lần đầu: nói tên, quốc tịch và nghề nghiệp bằng は…です, đặt câu hỏi với か, và hỏi ai đó là ai (だれ/どなた) cùng tuổi của họ (何歳/おいくつ).",
  },
  {
    lesson: 2,
    titleEn: "This and That",
    titleVi: "Cái này và cái kia",
    titleJp: "これ・それ・あれ",
    focus: "Pointing out things and asking what they are",
    focusVi: "Chỉ đồ vật và hỏi đó là gì",
    recap:
      "Naming the things around you and saying whose they are with これ/それ/あれ and の.",
    recapVi:
      "Gọi tên đồ vật xung quanh và nói của ai bằng これ/それ/あれ và の.",
  },
  {
    lesson: 3,
    titleEn: "Places",
    titleVi: "Địa điểm",
    titleJp: "ここ・そこ・あそこ",
    focus: "Where things and places are",
    focusVi: "Vị trí của đồ vật và nơi chốn",
    recap:
      "Locating places and things with ここ/そこ/あそこ — floors, sections and prices in a store.",
    recapVi:
      "Xác định nơi chốn và đồ vật với ここ/そこ/あそこ — tầng, khu vực và giá tiền trong cửa hàng.",
  },
  {
    lesson: 4,
    titleEn: "Time & Daily Verbs",
    titleVi: "Thời gian & động từ",
    titleJp: "じかんとどうし",
    focus: "Telling time and the polite verb forms",
    focusVi: "Xem giờ và thể động từ lịch sự",
    recap:
      "Telling the time and days, and describing your daily routine with polite ます-verbs.",
    recapVi:
      "Xem giờ, thứ ngày và mô tả sinh hoạt hằng ngày bằng động từ thể lịch sự ます.",
  },
  {
    lesson: 5,
    titleEn: "Going Places",
    titleVi: "Đi lại",
    titleJp: "でかけます",
    focus: "へ・で・と — movement, transport, company",
    focusVi: "へ・で・と — di chuyển, phương tiện, đi cùng ai",
    recap:
      "Talking about coming and going: destinations with へ, transport with で, and who you go with using と.",
    recapVi:
      "Nói về việc đi và đến: điểm đến với へ, phương tiện với で, và đi cùng ai với と.",
  },
  {
    lesson: 6,
    titleEn: "Doing Things",
    titleVi: "Hành động",
    titleJp: "こうい",
    focus: "を・で — objects, places, and invitations",
    focusVi: "を・で — tân ngữ, nơi chốn và lời mời",
    recap:
      "Everyday actions on objects (を) and at places (で) — eating, drinking, and inviting someone with ませんか.",
    recapVi:
      "Hành động thường ngày với tân ngữ (を) và nơi chốn (で) — ăn, uống và rủ ai đó bằng ませんか.",
  },
  {
    lesson: 7,
    titleEn: "Tools & Giving",
    titleVi: "Công cụ & trao nhận",
    titleJp: "どうぐとやりとり",
    focus: "で (means), あげます・もらいます, もう",
    focusVi: "で (phương tiện), あげます・もらいます, もう",
    recap:
      "Doing things with a tool or language using で, and giving and receiving things (あげます / もらいます).",
    recapVi:
      "Làm việc gì đó bằng công cụ hay ngôn ngữ với で, và cho / nhận đồ vật (あげます / もらいます).",
  },
  {
    lesson: 8,
    titleEn: "Adjectives",
    titleVi: "Tính từ",
    titleJp: "けいようし",
    focus: "い- and な-adjectives; ～が (but)",
    focusVi: "Tính từ い và な; ～が (nhưng)",
    recap:
      "Describing people and things with い- and な-adjectives, and joining contrasting ideas with が.",
    recapVi:
      "Miêu tả người và vật bằng tính từ い và な, và nối ý tương phản với が.",
  },
  {
    lesson: 9,
    titleEn: "Likes & Reasons",
    titleVi: "Sở thích & lý do",
    titleJp: "すきなこと",
    focus: "～が好き, わかります, から (reason)",
    focusVi: "～が好き, わかります, から (lý do)",
    recap:
      "Saying what you like or understand with が, and giving reasons with から.",
    recapVi: "Nói điều mình thích hay hiểu với が, và nêu lý do với から.",
  },
  {
    lesson: 10,
    titleEn: "Existence",
    titleVi: "Tồn tại",
    titleJp: "あります・います",
    focus: "There is ~; positions (上・下・中)",
    focusVi: "Có ~; vị trí (上・下・中)",
    recap:
      "Saying what exists where with あります (things) and います (people/animals), plus position words.",
    recapVi:
      "Nói cái gì tồn tại ở đâu với あります (vật) và います (người/động vật), cùng từ chỉ vị trí.",
  },
  {
    lesson: 11,
    titleEn: "Counting",
    titleVi: "Đếm số",
    titleJp: "かぞえかた",
    focus: "Counters and frequency",
    focusVi: "Lượng từ và tần suất",
    recap:
      "Counting people, things and how often, using counters and spans of time.",
    recapVi:
      "Đếm người, vật và mức độ thường xuyên, dùng lượng từ và khoảng thời gian.",
  },
  {
    lesson: 12,
    titleEn: "Past & Comparison",
    titleVi: "Quá khứ & so sánh",
    titleJp: "かこ・ひかく",
    focus: "Past tense and comparing things",
    focusVi: "Thì quá khứ và so sánh",
    recap:
      "Talking about the past and comparing two things with より and のほうが.",
    recapVi: "Nói về quá khứ và so sánh hai đối tượng với より và のほうが.",
  },
  {
    lesson: 13,
    titleEn: "Wants & Purpose",
    titleVi: "Mong muốn & mục đích",
    titleJp: "ほしい・したい",
    focus: "ほしい, ～たい, going somewhere to do something",
    focusVi: "ほしい, ～たい, đi đâu đó để làm gì",
    recap:
      "Expressing what you want with ほしい and ～たい, and going somewhere in order to do something.",
    recapVi:
      "Diễn đạt điều mình muốn với ほしい và ～たい, và đi đâu đó để làm gì.",
  },
  {
    lesson: 14,
    titleEn: "The て-form",
    titleVi: "Thể て",
    titleJp: "てフォーム",
    focus: "Requests and the progressive ～ています",
    focusVi: "Yêu cầu và thể tiếp diễn ～ています",
    recap:
      "Introducing the て-form: making requests with ～てください and describing ongoing actions with ～ています.",
    recapVi:
      "Giới thiệu thể て: đưa ra yêu cầu với ～てください và mô tả hành động đang diễn ra với ～ています.",
  },
  {
    lesson: 15,
    titleEn: "Permission",
    titleVi: "Cho phép & cấm",
    titleJp: "きょか・きんし",
    focus: "～てもいい, ～てはいけません, states",
    focusVi: "～てもいい, ～てはいけません, trạng thái",
    recap:
      "Asking for and granting permission with ～てもいい, and stating what is not allowed with ～てはいけません.",
    recapVi:
      "Xin và cho phép với ～てもいい, và nêu điều không được phép với ～てはいけません.",
  },
  {
    lesson: 16,
    titleEn: "Connecting Actions",
    titleVi: "Nối hành động",
    titleJp: "つなぐ",
    focus: "Sequencing with て; ～てから; adjectives",
    focusVi: "Nối bằng て; ～てから; tính từ",
    recap:
      "Linking several actions in order with the て-form and ～てから, and connecting adjectives.",
    recapVi:
      "Nối nhiều hành động theo trình tự bằng thể て và ～てから, và nối các tính từ.",
  },
  {
    lesson: 17,
    titleEn: "The ない-form",
    titleVi: "Thể ない",
    titleJp: "ないフォーム",
    focus: "～ないでください, obligation, permission",
    focusVi: "～ないでください, bắt buộc, cho phép",
    recap:
      "The ない-form: asking someone not to do something, and talking about obligation and permission.",
    recapVi:
      "Thể ない: nhờ ai đó đừng làm gì, và nói về nghĩa vụ và sự cho phép.",
  },
  {
    lesson: 18,
    titleEn: "Dictionary Form",
    titleVi: "Thể từ điển",
    titleJp: "じしょけい",
    focus: "Ability (できます), こと, ～まえに",
    focusVi: "Khả năng (できます), こと, ～まえに",
    recap:
      "The dictionary form: ability with できます, turning verbs into nouns with こと, and ～まえに (before).",
    recapVi:
      "Thể từ điển: khả năng với できます, biến động từ thành danh từ với こと, và ～まえに (trước khi).",
  },
  {
    lesson: 19,
    titleEn: "The た-form",
    titleVi: "Thể た",
    titleJp: "たフォーム",
    focus: "Experience, listing (～たり), change (なります)",
    focusVi: "Kinh nghiệm, liệt kê (～たり), thay đổi (なります)",
    recap:
      "The た-form: past experience with ～たことがあります, listing examples with ～たり, and change with なります.",
    recapVi:
      "Thể た: kinh nghiệm quá khứ với ～たことがあります, liệt kê ví dụ với ～たり, và thay đổi với なります.",
  },
  {
    lesson: 20,
    titleEn: "Plain / Casual",
    titleVi: "Thể thông thường",
    titleJp: "ふつうけい",
    focus: "Casual speech style with friends",
    focusVi: "Cách nói thân mật với bạn bè",
    recap:
      "The plain (casual) style used when talking with friends and family instead of ます/です.",
    recapVi:
      "Thể thông thường (thân mật) dùng khi nói với bạn bè và người thân thay cho ます/です.",
  },
  {
    lesson: 21,
    titleEn: "Opinions",
    titleVi: "Ý kiến",
    titleJp: "いけん",
    focus: "～と思います, ～と言いました, ～でしょう",
    focusVi: "～と思います, ～と言いました, ～でしょう",
    recap:
      "Giving opinions and reporting speech with ～と思います and ～と言いました, and softening with ～でしょう.",
    recapVi:
      "Nêu ý kiến và thuật lại lời nói với ～と思います và ～と言いました, và làm nhẹ giọng với ～でしょう.",
  },
  {
    lesson: 22,
    titleEn: "Describing Nouns",
    titleVi: "Bổ nghĩa danh từ",
    titleJp: "めいしのしゅうしょく",
    focus: "Relative clauses; どんな",
    focusVi: "Mệnh đề quan hệ; どんな",
    recap:
      "Describing a noun with a whole clause (relative clauses), and asking what kind with どんな.",
    recapVi:
      "Miêu tả danh từ bằng cả một mệnh đề (mệnh đề quan hệ), và hỏi loại nào với どんな.",
  },
  {
    lesson: 23,
    titleEn: "When & If",
    titleVi: "Khi & nếu",
    titleJp: "とき・と",
    focus: "～とき, ～と, movement を",
    focusVi: "～とき, ～と, を chỉ di chuyển",
    recap:
      "Talking about when and if with ～とき and ～と, and moving through or along places with を.",
    recapVi:
      "Nói về khi nào và nếu với ～とき và ～と, và di chuyển qua/dọc nơi chốn với を.",
  },
  {
    lesson: 24,
    titleEn: "Giving & Receiving",
    titleVi: "Cho & nhận",
    titleJp: "やりもらい",
    focus: "くれます and favours (～てあげます 等)",
    focusVi: "くれます và hành động giúp đỡ (～てあげます...)",
    recap:
      "Giving and receiving favours: くれます, plus the て-form giving/receiving verbs (～てあげます / ～てもらいます / ～てくれます).",
    recapVi:
      "Cho và nhận sự giúp đỡ: くれます, cùng các động từ cho/nhận thể て (～てあげます / ～てもらいます / ～てくれます).",
  },
  {
    lesson: 25,
    titleEn: "Conditionals",
    titleVi: "Câu điều kiện",
    titleJp: "じょうけん",
    focus: "～たら (if), ～ても (even if)",
    focusVi: "～たら (nếu), ～ても (dù cho)",
    recap:
      "Conditionals that round out Book I: ～たら (if/when) and ～ても (even if).",
    recapVi:
      "Câu điều kiện khép lại Quyển I: ～たら (nếu/khi) và ～ても (dù cho).",
  },
];

export interface LessonContent {
  meta: LessonMeta;
  grammar: Grammar[];
  vocab: Vocabulary[];
}

export function getLessonMeta(lesson: number): LessonMeta | undefined {
  return LESSON_META.find((l) => l.lesson === lesson);
}

export function getLessonContent(lesson: number): LessonContent | undefined {
  const meta = getLessonMeta(lesson);
  if (!meta) return undefined;
  return {
    meta,
    grammar: getGrammarByLesson(lesson),
    vocab: getVocabByLesson(lesson),
  };
}
