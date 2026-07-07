import { describe, it, expect } from "vitest";
import { guessPartOfSpeech } from "./pos";

describe("guessPartOfSpeech", () => {
  it("detects ichidan verbs", () => {
    expect(guessPartOfSpeech("食べる", "たべる")).toBe("ichidan-verb");
    expect(guessPartOfSpeech("見る", "みる")).toBe("ichidan-verb");
  });

  it("detects godan verbs", () => {
    expect(guessPartOfSpeech("飲む", "のむ")).toBe("godan-verb");
    expect(guessPartOfSpeech("書く", "かく")).toBe("godan-verb");
    expect(guessPartOfSpeech("話す", "はなす")).toBe("godan-verb");
  });

  it("detects i-adjectives", () => {
    expect(guessPartOfSpeech("高い", "たかい")).toBe("i-adjective");
    expect(guessPartOfSpeech("新しい", "あたらしい")).toBe("i-adjective");
  });

  it("detects irregular verbs", () => {
    expect(guessPartOfSpeech("勉強する", "べんきょうする")).toBe("irregular-verb");
  });

  it("falls back to noun", () => {
    expect(guessPartOfSpeech("学校", "がっこう")).toBe("noun");
    expect(guessPartOfSpeech("毎朝", "まいあさ")).toBe("noun");
  });
});
