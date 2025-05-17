import type { OlChikiCharacter, OlChikiWord } from '@/types/ol-chiki';

export const olChikiCharacters: OlChikiCharacter[] = [
  { id: 's1', olChiki: 'ᱚ', transliteration: 'A', pronunciation: '' },
  { id: 's2', olChiki: 'ᱛ', transliteration: 'At', pronunciation: '' },
  { id: 's3', olChiki: 'ᱜ', transliteration: 'Ag', pronunciation: '' },
  { id: 's4', olChiki: 'ᱝ', transliteration: 'Ang', pronunciation: '' },
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

// Helper function to shuffle an array (Fisher-Yates shuffle)
export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
