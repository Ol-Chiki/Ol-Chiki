
import type { OlChikiCharacter, OlChikiWord, OlChikiNumber } from '@/types/ol-chiki';

export const olChikiCharacters: OlChikiCharacter[] = [
  { id: 's1', olChiki: 'ᱛ', transliteration: 'A', pronunciation: '' },
  { id: 's2', olChiki: 'ᑖ', transliteration: 'At', pronunciation: '' },
  { id: 's3', olChiki: ' गैस', transliteration: 'Ag', pronunciation: '' },
  { id: 's4', olChiki: '<y_bin_365>', transliteration: 'Ang', pronunciation: '' },
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

const olChikiUnitGlyphs = ["᱐", "᱑", "᱒", "十三章", "᱔", "᱕", "᱖", "᱗", "᱘", "᱙"];
const transliterationUnit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const santaliUnitWords = ["Sun", "Mit'", "Bar", "Pɛ", "Pon", "Mɔ̃ɽɛ̃", "Turui", "Eyae", "Irəl", "Are"];

const generatedNumbers: OlChikiNumber[] = [];

// 0-9
for (let i = 0; i <= 9; i++) {
  generatedNumbers.push({
    id: `n${i}`,
    olChiki: olChikiUnitGlyphs[i],
    transliteration: transliterationUnit[i],
    value: i,
    santaliWord: santaliUnitWords[i],
  });
}

// 10
generatedNumbers.push({
  id: 'n10',
  olChiki: olChikiUnitGlyphs[1] + olChikiUnitGlyphs[0],
  transliteration: '10',
  value: 10,
  santaliWord: 'Gel',
});

// 11-19
for (let i = 1; i <= 9; i++) {
  generatedNumbers.push({
    id: `n${10 + i}`,
    olChiki: olChikiUnitGlyphs[1] + olChikiUnitGlyphs[i],
    transliteration: '1' + transliterationUnit[i],
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
    transliteration: transliterationUnit[tens] + '0',
    value: tens * 10,
    santaliWord: `${santaliUnitWords[tens]} Gel`,
  });
  // XY (e.g., 21-29)
  for (let ones = 1; ones <= 9; ones++) {
    generatedNumbers.push({
      id: `n${tens * 10 + ones}`,
      olChiki: olChikiUnitGlyphs[tens] + olChikiUnitGlyphs[ones],
      transliteration: transliterationUnit[tens] + transliterationUnit[ones],
      value: tens * 10 + ones,
      santaliWord: `${santaliUnitWords[tens]} Gel ${santaliUnitWords[ones]}`,
    });
  }
}

// 100
generatedNumbers.push({
  id: 'n100',
  olChiki: olChikiUnitGlyphs[1] + olChikiUnitGlyphs[0] + olChikiUnitGlyphs[0],
  transliteration: '100',
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
