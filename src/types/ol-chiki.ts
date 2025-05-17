
export interface OlChikiCharacter {
  id: string;
  olChiki: string;
  transliteration: string;
  pronunciation?: string; // IPA or simple guide
}

export interface OlChikiWord {
  id: string;
  olChiki: string;
  transliteration: string;
  english: string;
}

export interface OlChikiNumber {
  id: string;
  olChiki: string; // Ol Chiki numeral glyph
  digitString: string; // e.g., "0", "1", "10"
  englishWord: string; // e.g., "Zero", "One", "Ten"
  value: number; // The actual numeric value
  santaliWord: string; // Santali word for the number, e.g., "Sun", "Mit'"
}

