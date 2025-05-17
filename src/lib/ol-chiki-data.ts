
import type { OlChikiCharacter, OlChikiWord, OlChikiNumber } from '@/types/ol-chiki';

export const olChikiCharacters: OlChikiCharacter[] = [
  { id: 'c1', olChiki: 'ᱚ', transliteration: 'LA', pronunciation: '/ɔ/' },
  { id: 'c2', olChiki: 'ᱛ', transliteration: 'AT', pronunciation: '/t/' },
  { id: 'c3', olChiki: 'ᱜ', transliteration: 'AG', pronunciation: '/g/' },
  { id: 'c4', olChiki: 'ᱝ', transliteration: 'ANG', pronunciation: '/ŋ/' },
  { id: 'c5', olChiki: 'ᱞ', transliteration: 'AL', pronunciation: '/l/' },
  { id: 'c6', olChiki: 'ᱟ', transliteration: 'LAA', pronunciation: '/a/' },
  { id: 'c7', olChiki: 'ᱠ', transliteration: 'AAK', pronunciation: '/k/' },
  { id: 'c8', olChiki: 'ᱡ', transliteration: 'AAJ', pronunciation: '/dʒ/' },
  { id: 'c9', olChiki: 'ᱢ', transliteration: 'AAM', pronunciation: '/m/' },
  { id: 'c10', olChiki: 'ᱣ', transliteration: 'AAW', pronunciation: '/w/' },
  { id: 'c11', olChiki: 'ᱤ', transliteration: 'LI', pronunciation: '/i/' },
  { id: 'c12', olChiki: 'ᱥ', transliteration: 'IS', pronunciation: '/s/' },
  { id: 'c13', olChiki: 'ᱦ', transliteration: 'IH', pronunciation: '/h/, /ʔ/' },
  { id: 'c14', olChiki: 'ᱧ', transliteration: 'INY', pronunciation: '/ɲ/' },
  { id: 'c15', olChiki: 'ᱨ', transliteration: 'IR', pronunciation: '/r/' },
  { id: 'c16', olChiki: 'ᱩ', transliteration: 'LU', pronunciation: '/u/' },
  { id: 'c17', olChiki: 'ᱪ', transliteration: 'UCH', pronunciation: '/tʃ/' },
  { id: 'c18', olChiki: 'ᱫ', transliteration: 'UD', pronunciation: '/d/' },
  { id: 'c19', olChiki: 'ᱬ', transliteration: 'UNN', pronunciation: '/ɳ/' },
  { id: 'c20', olChiki: 'ᱭ', transliteration: 'UY', pronunciation: '/j/' },
  { id: 'c21', olChiki: 'ᱮ', transliteration: 'LE', pronunciation: '/e/' },
  { id: 'c22', olChiki: 'ᱯ', transliteration: 'EP', pronunciation: '/p/' },
  { id: 'c23', olChiki: 'ᱰ', transliteration: 'EDD', pronunciation: '/ɖ/' },
  { id: 'c24', olChiki: 'ᱱ', transliteration: 'EN', pronunciation: '/n/' },
  { id: 'c25', olChiki: 'ᱲ', transliteration: 'ERR', pronunciation: '/ɽ/' },
  { id: 'c26', olChiki: 'ᱳ', transliteration: 'LO', pronunciation: '/o/' },
  { id: 'c27', olChiki: 'ᱴ', transliteration: 'OTT', pronunciation: '/ʈ/' },
  { id: 'c28', olChiki: 'ᱵ', transliteration: 'OB', pronunciation: '/b/' },
  { id: 'c29', olChiki: 'ᱶ', transliteration: 'OV', pronunciation: '/w̃/' },
  { id: 'c30', olChiki: 'ᱷ', transliteration: 'OH', pronunciation: '/ʰ/' },
];

export const olChikiExampleWords: OlChikiWord[] = [
  { id: 'w1', olChiki: 'ᱚᱲᱟᱜ', transliteration: 'oṛag', english: 'house' },
  { id: 'w2', olChiki: 'ᱫᱟᱨᱮ', transliteration: 'dare', english: 'tree' },
  { id: 'w3', olChiki: 'ᱥᱮᱛᱟ', transliteration: 'seta', english: 'dog' },
  { id: 'w4', olChiki: 'ᱵᱟᱦᱟ', transliteration: 'baha', english: 'flower' },
  { id: 'w5', olChiki: 'ᱫᱟᱜ', transliteration: 'dag’', english: 'water' },
  { id: 'w6', olChiki: 'ᱤᱥᱠᱩᱞ', transliteration: 'iskul', english: 'school' },
  { id: 'w7', olChiki: 'ᱠᱤᱛᱟᱹᱵ', transliteration: 'kitāb', english: 'book' },
  { id: 'w8', olChiki: 'ᱜᱟᱹᱭ', transliteration: 'găi', english: 'cow' },
];

const olChikiUnitGlyphs = ["᱐", "᱑", "᱒", "᱓", "᱔", "᱕", "᱖", "᱗", "᱘", "᱙"];

const santaliUnitWords = ["Sun", "Mit’", "Bar", "Pe", "Pun", "Mɔ̃ṇe", "Turuy", "Eyai", "Irăl", "Are"];
const englishUnitWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const englishTeenWords = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const englishTensWords = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function getEnglishWord(n: number): string {
  if (n < 0 || n > 100) return "";
  if (n < 10) return englishUnitWords[n];
  if (n < 20) return englishTeenWords[n - 10];
  if (n === 100) return "One Hundred";
  
  const tensDigit = Math.floor(n / 10);
  const unitDigit = n % 10;

  if (unitDigit === 0) {
    return englishTensWords[tensDigit];
  }
  return `${englishTensWords[tensDigit]}-${englishUnitWords[unitDigit]}`;
}

function getSantaliWord(n: number): string {
  if (n < 0 || n > 100) return "";

  if (n === 0) return santaliUnitWords[0];
  if (n > 0 && n < 10) return santaliUnitWords[n];
  
  if (n === 10) return "Gel";
  if (n > 10 && n < 20) return `Gel ${santaliUnitWords[n % 10]}`;
  
  if (n === 20) return "Isi";
  if (n > 20 && n < 30) return `Isi ${santaliUnitWords[n % 10]}`;
  
  const tensDigit = Math.floor(n / 10);
  const unitDigit = n % 10;

  if (unitDigit === 0 && n >=30 && n < 100) { // For 30, 40, ..., 90
    return `${santaliUnitWords[tensDigit]} Gel`;
  }
  if (n >= 30 && n < 100) { // For 31-39, 41-49 etc.
    return `${santaliUnitWords[tensDigit]} Gel ${santaliUnitWords[unitDigit]}`;
  }
  
  if (n === 100) return "Say";
  return ""; // Should not happen for 0-100 with current logic
}

function getOlChikiNumeral(n: number): string {
  if (n < 0 || n > 100) return "";
  if (n === 100) return olChikiUnitGlyphs[1] + olChikiUnitGlyphs[0] + olChikiUnitGlyphs[0]; // 100
  
  const s = String(n);
  let olChikiStr = "";
  for (const char of s) {
    olChikiStr += olChikiUnitGlyphs[parseInt(char, 10)];
  }
  return olChikiStr;
}

const generatedNumbers: OlChikiNumber[] = [];

for (let i = 0; i <= 100; i++) {
  generatedNumbers.push({
    id: `n${i}`,
    olChiki: getOlChikiNumeral(i),
    digitString: String(i),
    englishWord: getEnglishWord(i),
    value: i,
    santaliWord: getSantaliWord(i),
  });
}

export const olChikiNumbers: OlChikiNumber[] = generatedNumbers;

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
