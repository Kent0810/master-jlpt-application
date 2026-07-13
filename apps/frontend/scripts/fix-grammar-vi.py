#!/usr/bin/env python3
"""Replace the machine-translated grammar `meaningVi` with hand-authored, natural
Vietnamese explanations (proper grammar terms). Keyed by grammar id."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.path.join(ROOT, "data", "n5-grammar.json")

VI = {
    "l1_wa_desu": "は đánh dấu chủ đề, です là đuôi câu lịch sự — 'X là Y'.",
    "l1_ja_arimasen": "Dạng phủ định lịch sự của です — 'không phải là'. じゃ là dạng nói của では.",
    "l1_ka": "Thêm か vào cuối câu để tạo câu hỏi. Không cần dấu chấm hỏi.",
    "l1_mo": "も thay cho は, nghĩa là 'cũng', khi phần thông tin giống câu trước.",
    "l1_no": "の nối hai danh từ: sở hữu, nhóm hoặc đặc điểm — 'Y của X'.",
    "l2_kore_sore_are": "これ・それ・あれ = 'cái này / cái đó / cái kia', dùng độc lập làm chủ ngữ.",
    "l2_kono_sono_ano": "この・その・あの đứng ngay trước danh từ — 'quyển sách này'. Không dùng một mình.",
    "l2_sou_desu": "Trả lời câu hỏi có/không: はい、そうです ('vâng, đúng vậy'), いいえ、ちがいます ('không, không phải').",
    "l2_ka_ka": "Đưa ra lựa chọn giữa hai thứ — 'là A hay B?'.",
    "l3_koko_soko_asoko": "ここ・そこ・あそこ = 'ở đây / ở đó / ở kia'. こちら・そちら・あちら là dạng lịch sự.",
    "l3_wa_place": "Nói vị trí của một vật hoặc một người.",
    "l4_time": "Nói giờ. Thêm に vào mốc thời gian để nói 'lúc' khi có động từ theo sau.",
    "l4_kara_made": "'Từ ~ đến ~', dùng cho thời gian và địa điểm.",
    "l4_verb_polite": "Bốn đuôi động từ lịch sự: khẳng định/phủ định ở hiện tại và quá khứ.",
    "l5_e_ikimasu": "へ (đọc là 'e') đánh dấu điểm đến với 行きます / 来ます / 帰ります.",
    "l5_de_vehicle": "で đánh dấu phương tiện di chuyển — 'bằng tàu / bằng xe'.",
    "l5_to_person": "と đánh dấu người cùng làm việc gì đó với mình.",
    "l6_wo_object": "を đánh dấu tân ngữ trực tiếp của động từ.",
    "l6_de_place": "で đánh dấu nơi diễn ra hành động.",
    "l6_masenka_mashou": "Vませんか để mời ('bạn ~ không?'); Vましょう để rủ cùng làm ('cùng ~ nào').",
    "l7_de_tool": "で cũng đánh dấu công cụ, ngôn ngữ hay cách thức dùng để làm gì.",
    "l7_agemasu_moraimasu": "あげます = cho (ai đó); もらいます = nhận (từ ai đó). に đánh dấu người kia.",
    "l7_mou_mashita": "'Đã ~ rồi'. Trả lời もう~ましたか bằng はい、~ました hoặc いいえ、まだです.",
    "l8_i_adj": "Tính từ đuôi い. Dùng với です; phủ định bỏ い → くないです.",
    "l8_na_adj": "Tính từ cần thêm な trước danh từ. Phủ định là じゃありません như danh từ.",
    "l8_ga_but": "Nối hai vế có ý tương phản — 'X, nhưng Y'.",
    "l9_ga_suki": "Với thích, ghét, giỏi, kém (好き・嫌い・上手・下手), đối tượng dùng が chứ không dùng を.",
    "l9_ga_wakarimasu": "Đối tượng của わかります (hiểu) và あります (có) cũng dùng が.",
    "l9_kara_reason": "'Vì ~'. Đặt ở cuối vế lý do. どうして hỏi 'tại sao?'.",
    "l10_arimasu_imasu": "あります cho vật/cây, います cho người/động vật — 'có ~'.",
    "l10_position": "Từ chỉ vị trí nối bằng の — trên, dưới, trong, trước, sau, bên cạnh.",
    "l11_counters": "Số đi kèm lượng từ tùy vật được đếm: ～つ (đồ vật), ～人 (người), ～枚 (vật mỏng), ～台 (máy móc).",
    "l11_frequency": "Diễn tả tần suất — 'X lần trong mỗi khoảng thời gian'.",
    "l12_past_noun_adj": "Dạng quá khứ: でした (khẳng định) và じゃありませんでした (phủ định).",
    "l12_past_i_adj": "Quá khứ của tính từ い: bỏ い → かったです (khẳng định), くなかったです (phủ định).",
    "l12_comparison": "So sánh: N1はN2より (hơn), どちらが (cái nào hơn), いちばん (nhất).",
    "l13_hoshii": "Diễn tả muốn có một vật — 'tôi muốn ~'. Vật được đánh dấu bằng が.",
    "l13_tai": "Diễn tả muốn làm gì đó. Thay ます bằng たいです.",
    "l13_ni_purpose": "Nói mục đích của việc đi đâu đó — 'đi đến ~ để làm ~'.",
    "l14_te_form": "Thể kết nối quan trọng, dùng cho yêu cầu, thể tiếp diễn và nối câu. Cách chia tùy nhóm động từ.",
    "l14_te_kudasai": "Lời đề nghị lịch sự — 'xin hãy ~'.",
    "l14_te_imasu": "Hành động đang diễn ra ngay lúc này — 'đang ~'.",
    "l15_te_mo_ii": "Cho phép hoặc xin phép — 'được phép ~'.",
    "l15_te_wa_ikemasen": "Cấm làm gì đó — 'không được ~'.",
    "l15_te_imasu_state": "Cũng diễn tả trạng thái kéo dài hoặc thói quen, ví dụ nghề nghiệp hay nơi ở.",
    "l16_te_connect": "Nối các hành động theo trình tự — 'làm V1 rồi V2'. Thì do động từ cuối quyết định.",
    "l16_te_kara": "'Sau khi ~'. Nhấn mạnh một việc xảy ra sau một việc khác.",
    "l16_adj_te": "Nối tính từ: tính từ い → くて, tính từ な/danh từ → で — 'vừa A vừa B'.",
    "l17_nai_form": "Thể phủ định thông thường, là gốc cho các mẫu câu bên dưới.",
    "l17_naide_kudasai": "Đề nghị đừng làm gì đó — 'xin đừng ~'.",
    "l17_nakereba": "Nghĩa vụ ('phải ~') và ngược lại ('không cần ~').",
    "l18_dict_form": "Thể nguyên dạng (hiện tại), dùng trước こと, まえに và trong lối nói thân mật.",
    "l18_koto_ga_dekimasu": "Diễn tả khả năng — 'có thể ~'.",
    "l18_mae_ni": "'Trước khi ~'. Luôn dùng thể từ điển dù thì chính là gì.",
    "l19_ta_form": "Thể quá khứ thông thường, chia như thể て. Là gốc cho các mẫu câu bên dưới.",
    "l19_ta_koto_ga_arimasu": "Nói về kinh nghiệm — 'đã từng ~'.",
    "l19_tari_tari": "Liệt kê vài hành động tiêu biểu — 'làm những việc như A và B'.",
    "l19_narimasu": "Diễn tả sự thay đổi: tính từ い → くなります, tính từ な/danh từ → になります — 'trở nên ~'.",
    "l20_plain_form": "Lối nói thân mật với bạn bè, người thân. Động từ dùng thể từ điển/ない/た; です thành だ.",
    "l21_to_omoimasu": "Nêu ý kiến hoặc phỏng đoán — 'tôi nghĩ rằng ~'. Vế trước と ở thể thông thường.",
    "l21_to_iimashita": "Thuật lại lời nói — 'đã nói rằng ~'. Phần trích dẫn ở thể thông thường.",
    "l21_deshou": "Tìm sự đồng tình — 'đúng không?'. Nói với ngữ điệu lên giọng.",
    "l22_noun_modify": "Một vế ở thể thông thường đặt ngay trước danh từ để bổ nghĩa — 'cái ~ mà ...'.",
    "l22_donna": "Hỏi 'loại ~ nào?'.",
    "l23_toki": "'Khi ~'. Vế trước とき có thể ở thể hiện tại hoặc quá khứ tùy thời điểm.",
    "l23_to_conditional": "'Hễ / nếu ~ thì ~' cho một kết quả tự nhiên, tất yếu.",
    "l23_wo_movement": "を đánh dấu nơi mình đi qua, rời khỏi, hoặc rẽ.",
    "l24_kuremasu": "Dùng khi ai đó cho tôi hoặc người thân của tôi, khác với あげます.",
    "l24_te_giving": "Cho và nhận hành động (sự giúp đỡ): làm giúp ai / được ai làm cho / ai đó làm cho tôi.",
    "l25_tara": "Câu điều kiện — 'nếu / một khi ~ thì ~'. Tạo từ thể た cộng ら.",
    "l25_temo": "'Dù cho ~'. Tạo từ thể て cộng も.",
}

def main():
    data = json.load(open(PATH, encoding="utf-8"))
    missing = []
    for g in data:
        if g["id"] in VI:
            g["meaningVi"] = VI[g["id"]]
        else:
            missing.append(g["id"])
    json.dump(data, open(PATH, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"Updated {len(data) - len(missing)}/{len(data)} grammar meaningVi.")
    if missing:
        print("No hand translation for:", missing)

if __name__ == "__main__":
    main()
