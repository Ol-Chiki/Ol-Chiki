
import type { OlChikiCharacter, OlChikiWord, OlChikiNumber } from '@/types/ol-chiki';

export const olChikiCharacters: OlChikiCharacter[] = [
  { id: 's1', olChiki: 'ᱛ', transliteration: 'A', pronunciation: '' },
  { id: 's2', olChiki: 'ᑖ', transliteration: 'At', pronunciation: '' },
  { id: 's3', olChiki: 'ᱚᱜ', transliteration: 'Ag', pronunciation: '' },
  { id: 's4', olChiki: 'ᱚᱝ', transliteration: 'Ang', pronunciation: '' },
  { id: 's5', olChiki: 'ᱞ', transliteration: 'Al', pronunciation: '' },
  { id: 's6', olChiki: 'ᱟ', transliteration: 'Aa', pronunciation: '' },
  { id: 's7', olChiki: 'ᱠ', transliteration: 'Aak', pronunciation: '' },
  { id: 's8', olChiki: 'ᱡ', transliteration: 'Aaj', pronunciation: '' },
  { id: 's9', olChiki: 'ᱢ', transliteration: 'Aam', pronunciation: '' },
  { id: 's10', olChiki: 'ᱣ', transliteration: 'Aaw', pronunciation: '' },
  { id: 's11', olChiki: 'ᱤ', transliteration: 'I', pronunciation: '' },
  { id: 's12', olChiki: 'ᱥ', transliteration: 'Is', pronunciation: '' },
  { id: 's13', olChiki: 'ᱦ', transliteration: 'Ih', pronunciation: '' },
  { id: 's14', olChiki: 'ᱧ', transliteration: 'Iny', pronunciation: '' },
  { id: 's15', olChiki: 'ᱨ', transliteration: 'Ir', pronunciation: '' },
  { id: 's16', olChiki: 'ᱩ', transliteration: 'U', pronunciation: '' },
  { id: 's17', olChiki: 'ᱪ', transliteration: 'Uch', pronunciation: '' },
  { id: 's18', olChiki: 'ᱫ', transliteration: 'Ud', pronunciation: '' },
  { id: 's19', olChiki: 'ᱬ', transliteration: 'Unn', pronunciation: '' },
  { id: 's20', olChiki: 'ᱭ', transliteration: 'Uy', pronunciation: '' },
  { id: 's21', olChiki: 'ᱮ', transliteration: 'E', pronunciation: '' },
  { id: 's22', olChiki: 'ᱯ', transliteration: 'Ep', pronunciation: '' },
  { id: 's23', olChiki: 'ᱰ', transliteration: 'Edd', pronunciation: '' },
  { id: 's24', olChiki: 'ᱱ', transliteration: 'En', pronunciation: '' },
  { id: 's25', olChiki: 'ᱲ', transliteration: 'Err', pronunciation: '' },
  { id: 's26', olChiki: 'ᱳ', transliteration: 'O', pronunciation: '' },
  { id: 's27', olChiki: 'ᱴ', transliteration: 'Ott', pronunciation: '' },
  { id: 's28', olChiki: 'ᱵ', transliteration: 'Ob', pronunciation: '' },
  { id: 's29', olChiki: 'ᱶ', transliteration: 'Ov', pronunciation: '' },
  { id: 's30', olChiki: 'ᱷ', transliteration: 'Oh', pronunciation: '' },
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
const digitUnitStrings = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

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
  
  if (n >= 30 && n < 100) {
    const tensDigit = Math.floor(n / 10);
    const unitDigit = n % 10;
    const tensSantali = santaliUnitWords[tensDigit];
    if (unitDigit === 0) {
      return `${tensSantali} Gel`;
    }
    return `${tensSantali} Gel ${santaliUnitWords[unitDigit]}`;
  }
  
  if (n === 100) return "Say";
  return ""; // Should not happen for 0-100
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
