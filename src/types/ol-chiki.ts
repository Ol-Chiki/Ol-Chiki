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
