import type { OlChikiCharacter, OlChikiWord } from '@/types/ol-chiki';

export const olChikiCharacters: OlChikiCharacter[] = [
  { id: 's1', olChiki: 'Ə', transliteration: 'A', pronunciation: '' },
  { id: 's2', olChiki: 'O', transliteration: 'At', pronunciation: '' },
  { id: 's3', olChiki: 'Ꮆ', transliteration: 'Ag', pronunciation: '' },
  { id: 's4', olChiki: 'δ', transliteration: 'Ang', pronunciation: '' },
  { id: 's5', olChiki: 'ƿ', transliteration: 'Al', pronunciation: '' },
  { id: 's6', olChiki: 'æ', transliteration: 'Aa', pronunciation: '' },
  { id: 's7', olChiki: 'ɓ', transliteration: 'Aak', pronunciation: '' },
  { id: 's8', olChiki: 'ɖ', transliteration: 'Aaj', pronunciation: '' },
  { id: 's9', olChiki: 'μ', transliteration: 'Aam', pronunciation: '' },
  { id: 's10', olChiki: 'ϑ', transliteration: 'Aaw', pronunciation: '' },
  { id: 's11', olChiki: 'ꝗ', transliteration: 'I', pronunciation: '' },
  { id: 's12', olChiki: 'ż', transliteration: 'Is', pronunciation: '' },
  { id: 's13', olChiki: 'ꪪ', transliteration: 'Ih', pronunciation: '' },
  { id: 's14', olChiki: 'ҩ', transliteration: 'Iny', pronunciation: '' },
  { id: 's15', olChiki: 'θ̣', transliteration: 'Ir', pronunciation: '' },
  { id: 's16', olChiki: 'ʒ', transliteration: 'U', pronunciation: '' },
  { id: 's17', olChiki: 'ᗷ', transliteration: 'Uch', pronunciation: '' },
  { id: 's18', olChiki: 'δ̅', transliteration: 'Ud', pronunciation: '' },
  { id: 's19', olChiki: 'ɱ', transliteration: 'Unn', pronunciation: '' },
  { id: 's20', olChiki: 'ϰ', transliteration: 'Uy', pronunciation: '' },
  { id: 's21', olChiki: 'Ƨ', transliteration: 'E', pronunciation: '' },
  { id: 's22', olChiki: '@', transliteration: 'Ep', pronunciation: '' },
  { id: 's23', olChiki: '∞', transliteration: 'Edd', pronunciation: '' },
  { id: 's24', olChiki: 'ɳ', transliteration: 'En', pronunciation: '' },
  { id: 's25', olChiki: 'ᖇ', transliteration: 'Err', pronunciation: '' },
  { id: 's26', olChiki: 'Ə̣', transliteration: 'O', pronunciation: '' },
  { id: 's27', olChiki: 'Ƒ', transliteration: 'Ott', pronunciation: '' },
  { id: 's28', olChiki: 'Ņ', transliteration: 'Ob', pronunciation: '' },
  { id: 's29', olChiki: 'ʘ', transliteration: 'Ov', pronunciation: '' },
  { id: 's30', olChiki: 'ω', transliteration: 'Oh', pronunciation: '' },
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
