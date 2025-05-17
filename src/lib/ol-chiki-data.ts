
import type { OlChikiCharacter, OlChikiWord, OlChikiNumber } from '@/types/ol-chiki';

export const olChikiCharacters: OlChikiCharacter[] = [
  { id: 's1', olChiki: 'ᱛ', transliteration: 'A', pronunciation: '' },
  { id: 's2', olChiki: 'ᑖ', transliteration: 'At', pronunciation: '' },
  { id: 's3', olChiki: 'ᱚᱜ', transliteration: 'Ag', pronunciation: '' }, // Corrected: Was ' गैस'
  { id: 's4', olChiki: 'ᱚᱝ', transliteration: 'Ang', pronunciation: '' }, // Corrected: Was '<y_bin_365>'
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

// Corrected Ol Chiki unit glyphs for numbers 0-9
const olChikiUnitGlyphs = ["᱐", "᱑", "᱒", "᱓", "᱔", "᱕", "᱖", "᱗", "᱘", "᱙"];
const digitUnitStrings = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const santaliUnitWords = ["Sun", "Mit'", "Bar", "Pɛ", "Pon", "Mɔ̃ɽɛ̃", "Turui", "Eyae", "Irəl", "Are"];

const englishUnitWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const englishTeenWords = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const englishTensWords = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]; // Index 0, 1 are placeholders

const generatedNumbers: OlChikiNumber[] = [];

function getEnglishWord(n: number): string {
  if (n < 0 || n > 100) return ""; // Handle out of bounds, though data is 0-100
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

// 0-9
for (let i = 0; i <= 9; i++) {
  generatedNumbers.push({
    id: `n${i}`,
    olChiki: olChikiUnitGlyphs[i],
    digitString: digitUnitStrings[i],
    englishWord: getEnglishWord(i),
    value: i,
    santaliWord: santaliUnitWords[i],
  });
}

// 10
generatedNumbers.push({
  id: 'n10',
  olChiki: olChikiUnitGlyphs[1] + olChikiUnitGlyphs[0],
  digitString: '10',
  englishWord: getEnglishWord(10),
  value: 10,
  santaliWord: 'Gel',
});

// 11-19
for (let i = 1; i <= 9; i++) {
  generatedNumbers.push({
    id: `n${10 + i}`,
    olChiki: olChikiUnitGlyphs[1] + olChikiUnitGlyphs[i],
    digitString: '1' + digitUnitStrings[i],
    englishWord: getEnglishWord(10 + i),
    value: 10 + i,
    santaliWord: `Gel ${santaliUnitWords[i]}`,
  });
}

// 20-99
for (let tens = 2; tens <= 9; tens++) {
  // XX (e.g., 20, 30)
  generatedNumbers.push({
    id: `n${tens * 10}`,
    olChiki: olChikiUnitGlyphs[tens] + olChikiUnitGlyphs[0],
    digitString: digitUnitStrings[tens] + '0',
    englishWord: getEnglishWord(tens * 10),
    value: tens * 10,
    santaliWord: `${santaliUnitWords[tens]} Gel`,
  });
  // XY (e.g., 21-29)
  for (let ones = 1; ones <= 9; ones++) {
    generatedNumbers.push({
      id: `n${tens * 10 + ones}`,
      olChiki: olChikiUnitGlyphs[tens] + olChikiUnitGlyphs[ones],
      digitString: digitUnitStrings[tens] + digitUnitStrings[ones],
      englishWord: getEnglishWord(tens * 10 + ones),
      value: tens * 10 + ones,
      santaliWord: `${santaliUnitWords[tens]} Gel ${santaliUnitWords[ones]}`,
    });
  }
}

// 100
generatedNumbers.push({
  id: 'n100',
  olChiki: olChikiUnitGlyphs[1] + olChikiUnitGlyphs[0] + olChikiUnitGlyphs[0],
  digitString: '100',
  englishWord: getEnglishWord(100),
  value: 100,
  santaliWord: "Mit' Sae",
});


export const olChikiNumbers: OlChikiNumber[] = generatedNumbers;


// Helper function to shuffle an array (Fisher-Yates shuffle)
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
