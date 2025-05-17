import type { OlChikiCharacter, OlChikiWord } from '@/types/ol-chiki';

export const olChikiCharacters: OlChikiCharacter[] = [
  { id: '1', olChiki: 'ᱚ', transliteration: 'ô', pronunciation: '/ɔ/' },
  { id: '2', olChiki: 'ᱛ', transliteration: 't', pronunciation: '/t/' },
  { id: '3', olChiki: 'ᱜ', transliteration: 'g', pronunciation: '/g/' },
  { id: '4', olChiki: 'ᱝ', transliteration: 'ng', pronunciation: '/ŋ/' },
  { id: '5', olChiki: 'ᱞ', transliteration: 'l', pronunciation: '/l/' },
  { id: '6', olChiki: 'ᱟ', transliteration: 'a', pronunciation: '/a/' },
  { id: '7', olChiki: 'ᱠ', transliteration: 'k', pronunciation: '/k/' },
  { id: '8', olChiki: 'ᱡ', transliteration: 'j', pronunciation: '/dʒ/' },
  { id: '9', olChiki: 'ᱢ', transliteration: 'm', pronunciation: '/m/' },
  { id: '10', olChiki: 'ᱣ', transliteration: 'w/v', pronunciation: '/w/, /v/' },
  { id: '11', olChiki: 'ᱤ', transliteration: 'i', pronunciation: '/i/' },
  { id: '12', olChiki: 'ᱥ', transliteration: 's', pronunciation: '/s/' },
  { id: '13', olChiki: 'ᱦ', transliteration: 'h', pronunciation: '/h/' },
  { id: '14', olChiki: 'ᱧ', transliteration: 'ny', pronunciation: '/ɲ/' },
  { id: '15', olChiki: 'ᱨ', transliteration: 'r', pronunciation: '/r/' },
  { id: '16', olChiki: 'ᱩ', transliteration: 'u', pronunciation: '/u/' },
  { id: '17', olChiki: 'ᱪ', transliteration: 'c', pronunciation: '/tʃ/' },
  { id: '18', olChiki: 'ᱫ', transliteration: 'd', pronunciation: '/d/' },
  { id: '19', olChiki: 'ᱭ', transliteration: 'y', pronunciation: '/j/' },
  { id: '20', olChiki: 'ᱮ', transliteration: 'e', pronunciation: '/e/' },
  { id: '21', olChiki: 'ᱯ', transliteration: 'p', pronunciation: '/p/' },
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
