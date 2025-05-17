
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

// Helper function to convert user-provided Roman keys to Ol Chiki
// This is a best-effort transliteration and may need refinement based on the specific Romanization scheme.
function convertRomanKeyToOlChiki(romanKey: string): string {
  let olChikiString = "";
  const key = romanKey;

  // Order of replacement matters for multi-character sequences
  const romanMap: { [key: string]: string } = {
    // Specific nasalized vowels from user data (e.g., SA:GIQ)
    "A:": "ᱟᱸ", "E:": "ᱮᱸ", "I:": "ᱤᱸ", "O:": "ᱳᱸ", "U:": "ᱩᱸ",
    "a:": "ᱚᱸ", // Assuming lowercase 'a:' maps to short nasalized 'o' sound
    // Specific INY/UNY endings
    "I~": "ᱤᱧ", "U~": "ᱩᱧ", "E~": "ᱮᱧ",
    // Common double letters or specific sounds first
    "NG": "ᱝ", // For ANG sound if written as NG
    "NJ": "ᱧ", // For INY sound if written as NJ
    "DD": "ᱰ", // Retroflex D if written as DD
    "TT": "ᱴ", // Retroflex T if written as TT
    // General character mappings (case sensitive, more specific first)
    "o": "ᱚ", "T": "ᱴ", "t": "ᱛ", "n": "ᱱ", "L": "ᱞ", "A": "ᱟ", "K": "ᱠ",
    "G": "ᱜ", "g": "ᱜ", "M": "ᱢ", "m": "ᱢ", "R": "ᱨ", "r": "ᱨ", "U": "ᱩ", "u": "ᱩ",
    "Y": "ᱭ", "y": "ᱭ", "S": "ᱥ", "s": "ᱥ", "P": "ᱯ", "p": "ᱯ", "E": "ᱮ", "e": "ᱮ",
    "D": "ᱰ", // If single D is retroflex
    "d": "ᱫ", // If single d is dental
    "J": "ᱡ", "j": "ᱡ",
    "Q": "ᱧ", // Q as INY as per user's previous data
    "H": "ᱦ", "h": "ᱦ", "W": "ᱣ", "w": "ᱣ", "B": "ᱵ", "b": "ᱵ", "C": "ᱪ", "c": "ᱪ",
    "Z": "ᱲ", // Z as ERR as per user's previous data
    "X": "ᱽ", // X as PHARKA
    "F": "ᱝ", // F as ANG (for TonoF -> tonong)
    ".": "ᱹ", // AHAD (used for .)
    "~": "ᱧ", // Default for ~ if not part of Vowel~ (e.g., KUZI~ -> KUZINY)
    "_": " ", // Underscore as space
    // Add more specific mappings as identified. This needs to be robust.
  };

  let i = 0;
  while (i < key.length) {
    let foundMatch = false;
    // Check for 2-character sequences first (like A:, I~, NG, DD)
    if (i + 1 < key.length) {
      const twoCharSeq = key.substring(i, i + 2);
      if (romanMap[twoCharSeq]) {
        olChikiString += romanMap[twoCharSeq];
        i += 2;
        foundMatch = true;
      }
    }
    // If no 2-char match, check for 1-character
    if (!foundMatch) {
      const oneChar = key[i];
      if (romanMap[oneChar]) {
        olChikiString += romanMap[oneChar];
      } else {
        olChikiString += oneChar; // Pass through unmapped characters
      }
      i += 1;
    }
  }
  return olChikiString;
}


let expandedGeneralVocabulary: OlChikiWord[] = [
  { id: 'egv1', olChiki: convertRomanKeyToOlChiki('oT'), transliteration: 'oT', english: 'n. earth; ground;' },
  { id: 'egv2', olChiki: convertRomanKeyToOlChiki('oTno'), transliteration: 'oTno', english: 'n. geography;' },
  { id: 'egv3', olChiki: convertRomanKeyToOlChiki('oTA'), transliteration: 'oTA', english: 'vt. to press;' },
  // { id: 'egv4', olChiki: convertRomanKeyToOlChiki('oTno'), transliteration: 'oTno', english: 'n. geography;' }, // Duplicate of egv2
  { id: 'egv5', olChiki: convertRomanKeyToOlChiki('oL'), transliteration: 'oL', english: 'n. writing; vt., vi. to write;' },
  { id: 'egv6', olChiki: convertRomanKeyToOlChiki('oKTo'), transliteration: 'oKTo', english: 'n. time;' },
  { id: 'egv7', olChiki: convertRomanKeyToOlChiki('onoLIYA.'), transliteration: 'onoLIYA.', english: 'n. writer;' },
  { id: 'egv8', olChiki: convertRomanKeyToOlChiki('onoG'), transliteration: 'onoG', english: 'adj. intransitive;' },
  { id: 'egv9', olChiki: convertRomanKeyToOlChiki('onoZ'), transliteration: 'onoZ', english: 'n. preface;' },
  { id: 'egv10', olChiki: convertRomanKeyToOlChiki('ToWA'), transliteration: 'ToWA', english: 'n. milk;' },
  { id: 'egv11', olChiki: convertRomanKeyToOlChiki('ToRon'), transliteration: 'ToRon', english: 'n. kind(of);' },
  { id: 'egv12', olChiki: convertRomanKeyToOlChiki('TonoF'), transliteration: 'TonoF', english: 'n. conjunction;' },
  { id: 'egv13', olChiki: convertRomanKeyToOlChiki('TonoZ'), transliteration: 'TonoZ', english: 'n. adverb;' },
  { id: 'egv14', olChiki: convertRomanKeyToOlChiki('TAR'), transliteration: 'TAR', english: 'n. wire;' },
  { id: 'egv15', olChiki: convertRomanKeyToOlChiki('TAPAm'), transliteration: 'TAPAm', english: 'n. fight; vi. to fight;' },
  { id: 'egv16', olChiki: convertRomanKeyToOlChiki('TANhEn'), transliteration: 'TANhEn', english: 'vi. to live;' },
  { id: 'egv17', olChiki: convertRomanKeyToOlChiki('TA.RUB'), transliteration: 'TA.RUB', english: 'n. tiger;' },
  { id: 'egv18', olChiki: convertRomanKeyToOlChiki('TURUY'), transliteration: 'TURUY', english: 'n., adj. six;' },
  { id: 'egv19', olChiki: convertRomanKeyToOlChiki('TURUYAG'), transliteration: 'TURUYAG', english: 'adj. sixth (pointing to an inanimate object);' },
  { id: 'egv20', olChiki: convertRomanKeyToOlChiki('TURUYIJ'), transliteration: 'TURUYIJ', english: 'adj. sixth (pointing to an animate object);' },
  { id: 'egv21', olChiki: convertRomanKeyToOlChiki('TUYU'), transliteration: 'TUYU', english: 'n. fox;' },
  { id: 'egv22', olChiki: convertRomanKeyToOlChiki('TESAR'), transliteration: 'TESAR', english: 'adj. third;' },
  { id: 'egv23', olChiki: convertRomanKeyToOlChiki('TESARAG'), transliteration: 'TESARAG', english: 'adj. third (pointing to an inanimate object);' },
  { id: 'egv24', olChiki: convertRomanKeyToOlChiki('TESARIJ'), transliteration: 'TESARIJ', english: 'adj. third (pointing to an animate object);' },
  // { id: 'egv25', olChiki: convertRomanKeyToOlChiki('TOWA'), transliteration: 'TOWA', english: 'n. milk;' }, // Duplicate of egv10
  { id: 'egv26', olChiki: convertRomanKeyToOlChiki('THAR'), transliteration: 'THAR', english: 'n. arrangement of objects in a straight line; TINGU THAR – n. column; GITIJ THAR – n. row;' },
  { id: 'egv27', olChiki: convertRomanKeyToOlChiki('GoRon'), transliteration: 'GoRon', english: 'n. person ( in grammar); mAMAF GoRon – n. first person; SAmAF GoRon – n. second person; SA:GIQ GoRon – n. third person;' },
  { id: 'egv28', olChiki: convertRomanKeyToOlChiki('GotAn'), transliteration: 'GotAn', english: 'n. number of a word(in grammar) characterized as noun, pronoun or verb; mID GotAn – n. singular number; BAR GotAn – n. dual number; SANGE GotAn – n. plural number;' },
  { id: 'egv29', olChiki: convertRomanKeyToOlChiki('GABAn'), transliteration: 'GABAn', english: 'n. composition; vt. to compose;' },
  { id: 'egv30', olChiki: convertRomanKeyToOlChiki('GAR'), transliteration: 'GAR', english: 'n. line;' },
  { id: 'egv31', olChiki: convertRomanKeyToOlChiki('GA:nA.t'), transliteration: 'GA:nA.t', english: 'n. postposition;' },
  { id: 'egv32', olChiki: convertRomanKeyToOlChiki('GEL'), transliteration: 'GEL', english: 'n., adj. ten;' },
  { id: 'egv33', olChiki: convertRomanKeyToOlChiki('GELAG'), transliteration: 'GELAG', english: 'adj. tenth (pointing to an inanimate object);' },
  { id: 'egv34', olChiki: convertRomanKeyToOlChiki('GELIJ'), transliteration: 'GELIJ', english: 'adj. tenth (pointing to an animate object);' },
  { id: 'egv35', olChiki: convertRomanKeyToOlChiki('GITIJ THAR'), transliteration: 'GITIJ THAR', english: 'n. row;' },
  { id: 'egv36', olChiki: convertRomanKeyToOlChiki('GIDX_RA.'), transliteration: 'GIDX_RA.', english: 'n. child;' },
  { id: 'egv37', olChiki: convertRomanKeyToOlChiki('GUdU'), transliteration: 'GUdU', english: 'n. big rat; big mouse;' },
  { id: 'egv38', olChiki: convertRomanKeyToOlChiki('GUnUn'), transliteration: 'GUnUn', english: 'n. adjective;' },
  { id: 'egv39', olChiki: convertRomanKeyToOlChiki('LoGon'), transliteration: 'LoGon', english: 'adv. fast;' },
  { id: 'egv40', olChiki: convertRomanKeyToOlChiki('LoGon_LoGon'), transliteration: 'LoGon_LoGon', english: 'adv. very fast;' },
  { id: 'egv41', olChiki: convertRomanKeyToOlChiki('LoSoD'), transliteration: 'LoSoD', english: 'n. mud; adj. muddy; vt. to make someone or something muddy; vi. to become muddy;' },
  { id: 'egv42', olChiki: convertRomanKeyToOlChiki('LANDA'), transliteration: 'LANDA', english: 'n. smile; vi. to laugh; to smile;' },
  { id: 'egv43', olChiki: convertRomanKeyToOlChiki('LA.ZhA.Y'), transliteration: 'LA.ZhA.Y', english: 'n. war;' },
  { id: 'egv44', olChiki: convertRomanKeyToOlChiki('LIL'), transliteration: 'LIL', english: 'adj. blue; vt. to make someone or something blue; vi. to become blue;' },
  { id: 'egv45', olChiki: convertRomanKeyToOlChiki('LEKHA'), transliteration: 'LEKHA', english: 'n. number; vt. to count;' },
  { id: 'egv46', olChiki: convertRomanKeyToOlChiki('AGAm'), transliteration: 'AGAm', english: 'adj. future;' },
  { id: 'egv47', olChiki: convertRomanKeyToOlChiki('ASnA'), transliteration: 'ASnA', english: 'n. school;' },
  { id: 'egv48', olChiki: convertRomanKeyToOlChiki('ARAG'), transliteration: 'ARAG', english: 'adj. red; vt. to make someone or something red; vi. to become red;' },
  { id: 'egv49', olChiki: convertRomanKeyToOlChiki('ARE'), transliteration: 'ARE', english: 'n., adj. nine;' },
  { id: 'egv50', olChiki: convertRomanKeyToOlChiki('AREYAG'), transliteration: 'AREYAG', english: 'adj. ninth (pointing to an inanimate object);' },
  { id: 'egv51', olChiki: convertRomanKeyToOlChiki('AREYIJ'), transliteration: 'AREYIJ', english: 'adj. ninth (pointing to an animate object);' },
  { id: 'egv52', olChiki: convertRomanKeyToOlChiki('AZAF'), transliteration: 'AZAF', english: 'n. pronunciation of a letter or alphabet; voice of a person; RAhA AZAF – n. vowel; KECED AZAF – n. consonant; PARhAZ KECED AZAF – n. unaspirated consonant; TA.PUG KECED AZAF – n. semi-consonant or glottalized consonant; RAZAF KECED AZAF – n. nasal consonant; JETLED KECED AZAF – n. sticky consonant;' },
  { id: 'egv53', olChiki: convertRomanKeyToOlChiki('ANGoC'), transliteration: 'ANGoC', english: 'vt. to include;' },
  { id: 'egv54', olChiki: convertRomanKeyToOlChiki('A.TU'), transliteration: 'A.TU', english: 'n. village; vt. to wash away; vi. to get washed away;' },
  { id: 'egv55', olChiki: convertRomanKeyToOlChiki('A.GU'), transliteration: 'A.GU', english: 'vt. to bring;' },
  { id: 'egv56', olChiki: convertRomanKeyToOlChiki('A.YA.T'), transliteration: 'A.YA.T', english: 'n. sentence;' },
  { id: 'egv57', olChiki: convertRomanKeyToOlChiki('A.ZA.'), transliteration: 'A.ZA.', english: 'n. word;' },
  { id: 'egv58', olChiki: convertRomanKeyToOlChiki('KoRAW'), transliteration: 'KoRAW', english: 'vt. to do;' },
  { id: 'egv59', olChiki: convertRomanKeyToOlChiki('KoNM'), transliteration: 'KoNM', english: 'n. angle;' },
  { id: 'egv60', olChiki: convertRomanKeyToOlChiki('KonA'), transliteration: 'KonA', english: 'n. angle;' },
  { id: 'egv61', olChiki: convertRomanKeyToOlChiki('KoZA'), transliteration: 'KoZA', english: 'n. man; adj. young;' },
  { id: 'egv62', olChiki: convertRomanKeyToOlChiki('KoZA GIDX_RA.'), transliteration: 'KoZA GIDX_RA.', english: 'n. boy;' },
  { id: 'egv63', olChiki: convertRomanKeyToOlChiki('KAnWA'), transliteration: 'KAnWA', english: 'n. verb;' },
  { id: 'egv64', olChiki: convertRomanKeyToOlChiki('KA.mI'), transliteration: 'KA.mI', english: 'n. work; function; adj. working; vt. to do; to work;' },
  { id: 'egv65', olChiki: convertRomanKeyToOlChiki('KA.nUn'), transliteration: 'KA.nUn', english: 'n. law;' },
  { id: 'egv66', olChiki: convertRomanKeyToOlChiki('KUZI~'), transliteration: 'KUZI~', english: 'n. woman; adj. young;' },
  { id: 'egv67', olChiki: convertRomanKeyToOlChiki('KUZI~ GIDX_RA.'), transliteration: 'KUZI~ GIDX_RA.', english: 'n. girl;' },
  { id: 'egv68', olChiki: convertRomanKeyToOlChiki('KECED AZAF'), transliteration: 'KECED AZAF', english: 'n. consonant; PARhAZ KECED AZAF – n. unaspirated consonant; TA.PUG KECED AZAF – n. semi-consonant or glottalized consonant; RAZAF KECED AZAF – n. nasal consonant; JETLED KECED AZAF – n. sticky consonant;' },
  { id: 'egv69', olChiki: convertRomanKeyToOlChiki('KHoBoR'), transliteration: 'KHoBoR', english: 'n. news; vi. to give news;' },
  { id: 'egv70', olChiki: convertRomanKeyToOlChiki('KHoNJA'), transliteration: 'KHoNJA', english: 'n. join; joint; vt. to join;' },
  { id: 'egv71', olChiki: convertRomanKeyToOlChiki('JoTo'), transliteration: 'JoTo', english: 'adj. all;' },
  { id: 'egv72', olChiki: convertRomanKeyToOlChiki('JoToS'), transliteration: 'JoToS', english: 'n. object (in grammar); adj. with object;' },
  { id: 'egv73', olChiki: convertRomanKeyToOlChiki('Jom'), transliteration: 'Jom', english: 'n. eatable; food; vt. to eat; vi. to take food;' },
  { id: 'egv74', olChiki: convertRomanKeyToOlChiki('JomAG'), transliteration: 'JomAG', english: 'n. eatable; food;' },
  { id: 'egv75', olChiki: convertRomanKeyToOlChiki('Jom_QU~'), transliteration: 'Jom_QU~', english: 'n. eatable; food; vi. to take food;' },
  { id: 'egv76', olChiki: convertRomanKeyToOlChiki('Jom_QUWAG'), transliteration: 'Jom_QUWAG', english: 'n. eatable; food;' },
  { id: 'egv77', olChiki: convertRomanKeyToOlChiki('JAF'), transliteration: 'JAF', english: 'n. bone; root; seed;' },
  { id: 'egv78', olChiki: convertRomanKeyToOlChiki('JAKAT'), transliteration: 'JAKAT', english: 'adj. all;' },
  { id: 'egv79', olChiki: convertRomanKeyToOlChiki('JAWRA'), transliteration: 'JAWRA', english: 'n. set; collection; vt. to collect; to gather; vi. to assemble; to gather;' },
  { id: 'egv80', olChiki: convertRomanKeyToOlChiki('JARWA'), transliteration: 'JARWA', english: 'n. set; collection; vt. to collect; to gather; vi. to assemble; to gather;' },
  { id: 'egv81', olChiki: convertRomanKeyToOlChiki('JAYGA'), transliteration: 'JAYGA', english: 'n. space; place; vt. to give someone a place for sleeping or sitting; vi. place oneself;' },
  { id: 'egv82', olChiki: convertRomanKeyToOlChiki('JAnAF'), transliteration: 'JAnAF', english: 'n. gender; KoZA JAnAF – n. masculine gender; KUZI JAnAF – n. feminine gender; hAD JAnAF – n. neuter gender; JA.T JAnAF – n. common gender;' },
  { id: 'egv83', olChiki: convertRomanKeyToOlChiki('JAnWoR'), transliteration: 'JAnWoR', english: 'n. animal;' },
  { id: 'egv84', olChiki: convertRomanKeyToOlChiki('JA.PID'), transliteration: 'JA.PID', english: 'n. sleep; vi. to sleep;' },
  { id: 'egv85', olChiki: convertRomanKeyToOlChiki('JIL'), transliteration: 'JIL', english: 'n. meat;' },
  { id: 'egv86', olChiki: convertRomanKeyToOlChiki('JIWI~'), transliteration: 'JIWI~', english: 'n. life; soul;' },
  { id: 'egv87', olChiki: convertRomanKeyToOlChiki('JIhoL'), transliteration: 'JIhoL', english: 'n. jail; prison; vt. to imprison;' },
  { id: 'egv88', olChiki: convertRomanKeyToOlChiki('JInIS'), transliteration: 'JInIS', english: 'n. thing;' },
  { id: 'egv89', olChiki: convertRomanKeyToOlChiki('JIBon'), transliteration: 'JIBon', english: 'n. life;' },
  { id: 'egv90', olChiki: convertRomanKeyToOlChiki('JI~'), transliteration: 'JI~', english: 'vt. to smell;' },
  { id: 'egv91', olChiki: convertRomanKeyToOlChiki('JUTA.'), transliteration: 'JUTA.', english: 'n. shoe;' },
  { id: 'egv92', olChiki: convertRomanKeyToOlChiki('JUDXDHo~'), transliteration: 'JUDXDHo~', english: 'n. war;' },
  { id: 'egv93', olChiki: convertRomanKeyToOlChiki('JUZU'), transliteration: 'JUZU', english: 'n. quotient; share; vt. to divide;' },
  { id: 'egv94', olChiki: convertRomanKeyToOlChiki('JHA.L'), transliteration: 'JHA.L', english: 'n. length; adj. long; vt. to lengthen;' },
  { id: 'egv95', olChiki: convertRomanKeyToOlChiki('moRA'), transliteration: 'moRA', english: 'adj. slim; vt. to make someone or something slim; vi. to become slim;' },
  { id: 'egv96', olChiki: convertRomanKeyToOlChiki('moME'), transliteration: 'moME', english: 'n., adj. five;' },
  { id: 'egv97', olChiki: convertRomanKeyToOlChiki('moME GotEJ'), transliteration: 'moME GotEJ', english: 'adj. five;' },
  { id: 'egv98', olChiki: convertRomanKeyToOlChiki('moMEYAG'), transliteration: 'moMEYAG', english: 'adj. fifth (pointing to an inanimate object);' },
  { id: 'egv99', olChiki: convertRomanKeyToOlChiki('moMEYIJ'), transliteration: 'moMEYIJ', english: 'adj. fifth (pointing to an animate object);' },
  { id: 'egv100', olChiki: convertRomanKeyToOlChiki('monTRI'), transliteration: 'monTRI', english: 'n. minister;' },
  { id: 'egv101', olChiki: convertRomanKeyToOlChiki('motA'), transliteration: 'motA', english: 'adj. fat; vi. to become fat;' },
  { id: 'egv102', olChiki: convertRomanKeyToOlChiki('mARAF'), transliteration: 'mARAF', english: 'adj. big, great, prime, elder; vt. to make someone or something big; vi. to become big;' },
  { id: 'egv103', olChiki: convertRomanKeyToOlChiki('mARAF monTRI'), transliteration: 'mARAF monTRI', english: 'n. prime minister;' },
  { id: 'egv104', olChiki: convertRomanKeyToOlChiki('mARE'), transliteration: 'mARE', english: 'adj. old; vi. to become old;' },
  { id: 'egv105', olChiki: convertRomanKeyToOlChiki('mAREnAG'), transliteration: 'mAREnAG', english: 'adj. old;' },
  { id: 'egv106', olChiki: convertRomanKeyToOlChiki('mACET'), transliteration: 'mACET', english: 'n. teacher;' },
  { id: 'egv107', olChiki: convertRomanKeyToOlChiki('mAMAF'), transliteration: 'mAMAF', english: 'adj. first; previous;' },
  { id: 'egv108', olChiki: convertRomanKeyToOlChiki('mAMAFAG'), transliteration: 'mAMAFAG', english: 'adj. first (pointing to an inanimate object);' },
  { id: 'egv109', olChiki: convertRomanKeyToOlChiki('mAMAFIJ'), transliteration: 'mAMAFIJ', english: 'adj. first (pointing to an animate object);' },
  { id: 'egv110', olChiki: convertRomanKeyToOlChiki('mA.Y GIDX_RA.'), transliteration: 'mA.Y GIDX_RA.', english: 'n. girl;' },
  { id: 'egv111', olChiki: convertRomanKeyToOlChiki('mICHIL'), transliteration: 'mICHIL', english: 'n. procession;' },
  { id: 'egv112', olChiki: convertRomanKeyToOlChiki('mID'), transliteration: 'mID', english: 'n., adj. one;' },
  { id: 'egv113', olChiki: convertRomanKeyToOlChiki('mIDAG'), transliteration: 'mIDAG', english: 'adj. first;' },
  { id: 'egv114', olChiki: convertRomanKeyToOlChiki('mIDIJ'), transliteration: 'mIDIJ', english: 'adj. first;' },
  { id: 'egv115', olChiki: convertRomanKeyToOlChiki('mIDUn'), transliteration: 'mIDUn', english: 'n. meeting;' },
  { id: 'egv116', olChiki: convertRomanKeyToOlChiki('mIDtIJ'), transliteration: 'mIDtIJ', english: 'adj. one;' },
  { id: 'egv117', olChiki: convertRomanKeyToOlChiki('mUTA.n'), transliteration: 'mUTA.n', english: 'n. subject;' },
  { id: 'egv118', olChiki: convertRomanKeyToOlChiki('mUCA.D'), transliteration: 'mUCA.D', english: 'n. end; full stop; vt., vi. to end;' },
  { id: 'egv119', olChiki: convertRomanKeyToOlChiki('mEn'), transliteration: 'mEn', english: 'vt. to speak; to tell; vi. to speak;' },
  { id: 'egv120', olChiki: convertRomanKeyToOlChiki('ITA.'), transliteration: 'ITA.', english: 'n. seed; vi. to use as seed;' },
  { id: 'egv121', olChiki: convertRomanKeyToOlChiki('ITIL'), transliteration: 'ITIL', english: 'n. fat; vi. to become fat;' },
  { id: 'egv122', olChiki: convertRomanKeyToOlChiki('IRA.L'), transliteration: 'IRA.L', english: 'n., adj. eight;' },
  { id: 'egv123', olChiki: convertRomanKeyToOlChiki('IRA.LAG'), transliteration: 'IRA.LAG', english: 'adj. eighth (pointing to an inanimate object);' },
  { id: 'egv124', olChiki: convertRomanKeyToOlChiki('IRA.LIJ'), transliteration: 'IRA.LIJ', english: 'adj. eighth (pointing to an animate object);' },
  { id: 'egv125', olChiki: convertRomanKeyToOlChiki('IDI'), transliteration: 'IDI', english: 'vt. to take;' },
  { id: 'egv126', olChiki: convertRomanKeyToOlChiki('SomoY'), transliteration: 'SomoY', english: 'n. time;' },
  { id: 'egv127', olChiki: convertRomanKeyToOlChiki('So~'), transliteration: 'So~', english: 'n. smell; vi. to smell;' },
  { id: 'egv128', olChiki: convertRomanKeyToOlChiki('SAhtA'), transliteration: 'SAhtA', english: 'n. page;' },
  { id: 'egv129', olChiki: convertRomanKeyToOlChiki('SARGA'), transliteration: 'SARGA', english: 'n. medium size rat;' },
  { id: 'egv130', olChiki: convertRomanKeyToOlChiki('SAREJ'), transliteration: 'SAREJ', english: 'n. remainder; adj. left out; vt., vi. to leave out;' },
  { id: 'egv131', olChiki: convertRomanKeyToOlChiki('SACARhE'), transliteration: 'SACARhE', english: 'n. environment;' },
  { id: 'egv132', olChiki: convertRomanKeyToOlChiki('SAdE'), transliteration: 'SAdE', english: 'n. sound; vi. to make sound;' },
  { id: 'egv133', olChiki: convertRomanKeyToOlChiki('SAnAm'), transliteration: 'SAnAm', english: 'adj. all;' },
  { id: 'egv134', olChiki: convertRomanKeyToOlChiki('SAZE'), transliteration: 'SAZE', english: 'n. sound; vi. to make sound;' },
  { id: 'egv135', olChiki: convertRomanKeyToOlChiki('SAVTA'), transliteration: 'SAVTA', english: 'n. society;' },
  { id: 'egv136', olChiki: convertRomanKeyToOlChiki('SAVhED'), transliteration: 'SAVhED', english: 'n. literature;' },
  { id: 'egv137', olChiki: convertRomanKeyToOlChiki('SANMES'), transliteration: 'SANMES', english: 'n. science;' },
  { id: 'egv138', olChiki: convertRomanKeyToOlChiki('SA.T'), transliteration: 'SA.T', english: 'vt. to finish; to complete;' },
  { id: 'egv139', olChiki: convertRomanKeyToOlChiki('SA.TA.n'), transliteration: 'SA.TA.n', english: 'adj. perfect; completed;' },
  { id: 'egv140', olChiki: convertRomanKeyToOlChiki('SA.GA.Y'), transliteration: 'SA.GA.Y', english: 'n. relation;' },
  { id: 'egv141', olChiki: convertRomanKeyToOlChiki('SA.RI KATHA'), transliteration: 'SA.RI KATHA', english: 'n. fact; truth;' },
  { id: 'egv142', olChiki: convertRomanKeyToOlChiki('SA:GIQ'), transliteration: 'SA:GIQ', english: 'adj. far; distant;' },
  { id: 'egv143', olChiki: convertRomanKeyToOlChiki('SIRA. monTRI'), transliteration: 'SIRA. monTRI', english: 'n. chief minister;' },
  { id: 'egv144', olChiki: convertRomanKeyToOlChiki('SUTRET'), transliteration: 'SUTRET', english: 'n. secretary; JoGo SUTRET – n. assistant secretary;' },
  { id: 'egv145', olChiki: convertRomanKeyToOlChiki('SUnUm'), transliteration: 'SUnUm', english: 'n. oil; vt. to oil; to lubricate;' },
  { id: 'egv146', olChiki: convertRomanKeyToOlChiki('SELED'), transliteration: 'SELED', english: 'n. addition; vt. to add;' },
  { id: 'egv147', olChiki: convertRomanKeyToOlChiki('SEmLED'), transliteration: 'SEmLED', english: 'n. association;' },
  { id: 'egv148', olChiki: convertRomanKeyToOlChiki('SED'), transliteration: 'SED', english: 'n. direction;' },
  { id: 'egv149', olChiki: convertRomanKeyToOlChiki('SEDAY'), transliteration: 'SEDAY', english: 'n. ancient past; adj. in the ancient past;' },
  { id: 'egv150', olChiki: convertRomanKeyToOlChiki('SEn'), transliteration: 'SEn', english: 'vi. to go;' },
  { id: 'egv151', olChiki: convertRomanKeyToOlChiki('SE:GE.L'), transliteration: 'SE:GE.L', english: 'n. fire;' },
  { id: 'egv152', olChiki: convertRomanKeyToOlChiki('SE:GE.L BURU'), transliteration: 'SE:GE.L BURU', english: 'n. volcano;' },
  { id: 'egv153', olChiki: convertRomanKeyToOlChiki('SE:MA'), transliteration: 'SE:MA', english: 'adj. big, great; vt. to make someone or something big; vi. to become big;' },
  { id: 'egv154', olChiki: convertRomanKeyToOlChiki('hoPon'), transliteration: 'hoPon', english: 'n. child; adj. small; used to qualify younger relative as in hoPon BABA(younger uncle);' },
  { id: 'egv155', olChiki: convertRomanKeyToOlChiki('hoZ'), transliteration: 'hoZ', english: 'n. human being; person; a man of our community;' },
  { id: 'egv156', olChiki: convertRomanKeyToOlChiki('hASA'), transliteration: 'hASA', english: 'n. soil; vi. to become dirty;' },
  { id: 'egv157', olChiki: convertRomanKeyToOlChiki('hAnAW'), transliteration: 'hAnAW', english: 'n. interjection;' },
  { id: 'egv158', olChiki: convertRomanKeyToOlChiki('hAZA'), transliteration: 'hAZA', english: 'n. quotient;' },
  { id: 'egv159', olChiki: convertRomanKeyToOlChiki('hAtAMhA'), transliteration: 'hAtAMhA', english: 'n. divider;' },
  { id: 'egv160', olChiki: convertRomanKeyToOlChiki('hAtAMCA'), transliteration: 'hAtAMCA', english: 'n. dividend;' },
  { id: 'egv161', olChiki: convertRomanKeyToOlChiki('hAtAMSA'), transliteration: 'hAtAMSA', english: 'n. remainder;' },
  { id: 'egv162', olChiki: convertRomanKeyToOlChiki('hA.KU'), transliteration: 'hA.KU', english: 'n. fish;' },
  { id: 'egv163', olChiki: convertRomanKeyToOlChiki('hA.tIQ'), transliteration: 'hA.tIQ', english: 'n. share; vt. to divide;' },
  { id: 'egv164', olChiki: convertRomanKeyToOlChiki('hEdEJ'), transliteration: 'hEdEJ', english: 'vt., vi. to boil; adj. boiled;' },
  { id: 'egv165', olChiki: convertRomanKeyToOlChiki('hE:DE.'), transliteration: 'hE:DE.', english: 'adj. black; vt. to blacken; vi. to become black;' },
  // { id: 'egv166', olChiki: convertRomanKeyToOlChiki('hE:dE.J'), transliteration: 'hE:dE.J', english: 'vt., vi. to boil; adj. boiled;' }, // Likely duplicate
  { id: 'egv167', olChiki: convertRomanKeyToOlChiki('hUdIQ'), transliteration: 'hUdIQ', english: 'adj. small; vt. to make someone or something small; vi. to become small;' },
  { id: 'egv168', olChiki: convertRomanKeyToOlChiki('QAPAm'), transliteration: 'QAPAm', english: 'vi. to meet;' },
  { id: 'egv169', olChiki: convertRomanKeyToOlChiki('QU~'), transliteration: 'QU~', english: 'adj. drinkable; vt. to drink; to smoke;' },
  { id: 'egv170', olChiki: convertRomanKeyToOlChiki('QUTUm'), transliteration: 'QUTUm', english: 'n. name; vt. to name;' },
  { id: 'egv171', olChiki: convertRomanKeyToOlChiki('QUR'), transliteration: 'QUR', english: 'vt. to drop; vi. to drop; to fall;' },
  { id: 'egv172', olChiki: convertRomanKeyToOlChiki('QUnUm'), transliteration: 'QUnUm', english: 'n. pronoun;' },
  { id: 'egv173', olChiki: convertRomanKeyToOlChiki('QEL'), transliteration: 'QEL', english: 'vt. to see; vi. to have the ability to see; to see oneself; to become visible;' },
  { id: 'egv174', olChiki: convertRomanKeyToOlChiki('QECEL'), transliteration: 'QECEL', english: 'n. example;' },
  { id: 'egv175', olChiki: convertRomanKeyToOlChiki('RoF'), transliteration: 'RoF', english: 'n., vt. colour; vi. to become colourful;' },
  { id: 'egv176', olChiki: convertRomanKeyToOlChiki('RohoZ'), transliteration: 'RohoZ', english: 'adj. dry; vt., vi. to dry;' },
  { id: 'egv177', olChiki: convertRomanKeyToOlChiki('RonoZ'), transliteration: 'RonoZ', english: 'n. grammar;' },
  { id: 'egv178', olChiki: convertRomanKeyToOlChiki('RoZ'), transliteration: 'RoZ', english: 'n. language; vt to speak; to tell; vi. to speak; to talk;' },
  { id: 'egv179', olChiki: convertRomanKeyToOlChiki('RotE'), transliteration: 'RotE', english: 'n. frog;' },
  { id: 'egv180', olChiki: convertRomanKeyToOlChiki('Ro~'), transliteration: 'Ro~', english: 'n. fly;' },
  { id: 'egv181', olChiki: convertRomanKeyToOlChiki('RAG'), transliteration: 'RAG', english: 'n. cry; vi. to cry; to weep;' },
  { id: 'egv182', olChiki: convertRomanKeyToOlChiki('RAn'), transliteration: 'RAn', english: 'n. medicine; vt. to treat someone with medicine;' },
  { id: 'egv183', olChiki: convertRomanKeyToOlChiki('RAhA AZAF'), transliteration: 'RAhA AZAF', english: 'n. vowel;' },
  { id: 'egv184', olChiki: convertRomanKeyToOlChiki('RA.PUD'), transliteration: 'RA.PUD', english: 'adj. broken; vt., vi. to break;' },
  { id: 'egv185', olChiki: convertRomanKeyToOlChiki('RA.nI'), transliteration: 'RA.nI', english: 'n. queen;' },
  { id: 'egv186', olChiki: convertRomanKeyToOlChiki('REhED'), transliteration: 'REhED', english: 'n. root;' },
  { id: 'egv187', olChiki: convertRomanKeyToOlChiki('RUP'), transliteration: 'RUP', english: 'n. form; figure;' },
  { id: 'egv188', olChiki: convertRomanKeyToOlChiki('UQUm'), transliteration: 'UQUm', english: 'n. pronoun;' },
  { id: 'egv189', olChiki: convertRomanKeyToOlChiki('USUL'), transliteration: 'USUL', english: 'adj. tall;' },
  { id: 'egv190', olChiki: convertRomanKeyToOlChiki('UDUG'), transliteration: 'UDUG', english: 'vt. to show; vi. to point;' },
  { id: 'egv191', olChiki: convertRomanKeyToOlChiki('UPURUm'), transliteration: 'UPURUm', english: 'n. recognition;' },
  { id: 'egv192', olChiki: convertRomanKeyToOlChiki('UdA.W'), transliteration: 'UdA.W', english: 'vi. to fly;' },
  { id: 'egv193', olChiki: convertRomanKeyToOlChiki('CoLoT'), transliteration: 'CoLoT', english: 'adj. continuous; n. motion;' },
  { id: 'egv194', olChiki: convertRomanKeyToOlChiki('CoRBI'), transliteration: 'CoRBI', english: 'n. fat;' },
  { id: 'egv195', olChiki: convertRomanKeyToOlChiki('CA'), transliteration: 'CA', english: 'n. tea;' },
  { id: 'egv196', olChiki: convertRomanKeyToOlChiki('CALAW'), transliteration: 'CALAW', english: 'vi. to go;' },
  { id: 'egv197', olChiki: convertRomanKeyToOlChiki('CAPAD'), transliteration: 'CAPAD', english: 'vt. to throw; vi. to throw oneself;' },
  { id: 'egv198', olChiki: convertRomanKeyToOlChiki('CABA'), transliteration: 'CABA', english: 'vt. to finish; to complete;' },
  { id: 'egv199', olChiki: convertRomanKeyToOlChiki('CUtU'), transliteration: 'CUtU', english: 'n. small rat;' },
  { id: 'egv200', olChiki: convertRomanKeyToOlChiki('CUNDX'), transliteration: 'CUNDX', english: 'n. special kind of rat with beak-like pointed mouth;' },
  { id: 'egv201', olChiki: convertRomanKeyToOlChiki('CETETIYA'), transliteration: 'CETETIYA', english: 'n. student;' },
  { id: 'egv202', olChiki: convertRomanKeyToOlChiki('CEDoGIJ'), transliteration: 'CEDoGIJ', english: 'n. student;' },
  { id: 'egv203', olChiki: convertRomanKeyToOlChiki('CE:ME.'), transliteration: 'CE:ME.', english: 'n. bird;' },
  { id: 'egv204', olChiki: convertRomanKeyToOlChiki('CHoBI'), transliteration: 'CHoBI', english: 'n. picture; figure;' },
  { id: 'egv205', olChiki: convertRomanKeyToOlChiki('DoSAR'), transliteration: 'DoSAR', english: 'adj. second;' },
  { id: 'egv206', olChiki: convertRomanKeyToOlChiki('DoSARAG'), transliteration: 'DoSARAG', english: 'adj. second (pointing to an inanimate object);' },
  { id: 'egv207', olChiki: convertRomanKeyToOlChiki('DoSARIJ'), transliteration: 'DoSARIJ', english: 'adj. second (pointing to an animate object);' },
  { id: 'egv208', olChiki: convertRomanKeyToOlChiki('Doho'), transliteration: 'Doho', english: 'vt. to keep;' },
  { id: 'egv209', olChiki: convertRomanKeyToOlChiki('DoRYATno'), transliteration: 'DoRYATno', english: 'n. geography;' },
  { id: 'egv210', olChiki: convertRomanKeyToOlChiki('DoYALU'), transliteration: 'DoYALU', english: 'adj. kind;' },
  { id: 'egv211', olChiki: convertRomanKeyToOlChiki('DAG'), transliteration: 'DAG', english: 'n. water; vi. to rain;' },
  { id: 'egv212', olChiki: convertRomanKeyToOlChiki('DARAKAn'), transliteration: 'DARAKAn', english: 'adj. coming; next;' },
  { id: 'egv213', olChiki: convertRomanKeyToOlChiki('DARAY'), transliteration: 'DARAY', english: 'adj. future; next;' },
  { id: 'egv214', olChiki: convertRomanKeyToOlChiki('DISom'), transliteration: 'DISom', english: 'n., adj. country;' },
  { id: 'egv215', olChiki: convertRomanKeyToOlChiki('DISA.'), transliteration: 'DISA.', english: 'n. direction; good sense; vt. to understand; vi. to make out;' },
  { id: 'egv216', olChiki: convertRomanKeyToOlChiki('DUhA.W'), transliteration: 'DUhA.W', english: 'vt. to milk;' },
  { id: 'egv217', olChiki: convertRomanKeyToOlChiki('DUZUB'), transliteration: 'DUZUB', english: 'vi. to sit;' },
  { id: 'egv218', olChiki: convertRomanKeyToOlChiki('DHAP'), transliteration: 'DHAP', english: 'n. schedule; step;' },
  { id: 'egv219', olChiki: convertRomanKeyToOlChiki('DHUNVA.'), transliteration: 'DHUNVA.', english: 'n. smoke; vt. to spray someone with smoke;' },
  { id: 'egv220', olChiki: convertRomanKeyToOlChiki('ETohoB'), transliteration: 'ETohoB', english: 'n. beginning; start;' },
  { id: 'egv221', olChiki: convertRomanKeyToOlChiki('EL'), transliteration: 'EL', english: 'n. digit;' },
  { id: 'egv222', olChiki: convertRomanKeyToOlChiki('ELKHA'), transliteration: 'ELKHA', english: 'n. mathematics;' },
  { id: 'egv223', olChiki: convertRomanKeyToOlChiki('ELKHARIYA.'), transliteration: 'ELKHARIYA.', english: 'n. mathematician;' },
  { id: 'egv224', olChiki: convertRomanKeyToOlChiki('ELSoF'), transliteration: 'ELSoF', english: 'n. numbers in powers of 10;' },
  { id: 'egv225', olChiki: convertRomanKeyToOlChiki('Em'), transliteration: 'Em', english: 'vt. to give;' },
  { id: 'egv226', olChiki: convertRomanKeyToOlChiki('EhoB'), transliteration: 'EhoB', english: 'n. beginning; start; vt. to begin; to start; vi. to start; to begin;' },
  { id: 'egv227', olChiki: convertRomanKeyToOlChiki('EYAY'), transliteration: 'EYAY', english: 'n., adj. seven;' },
  { id: 'egv228', olChiki: convertRomanKeyToOlChiki('EYAYAG'), transliteration: 'EYAYAG', english: 'adj. seventh (pointing to an inanimate object);' },
  { id: 'egv229', olChiki: convertRomanKeyToOlChiki('EYAYIJ'), transliteration: 'EYAYIJ', english: 'adj. seventh (pointing to an animate object);' },
  { id: 'egv230', olChiki: convertRomanKeyToOlChiki('EnAF'), transliteration: 'EnAF', english: 'n. sometime before on the same day; adj. past;' },
  { id: 'egv231', olChiki: convertRomanKeyToOlChiki('EnEJ'), transliteration: 'EnEJ', english: 'n. dance; vi. to dance; to play;' },
  { id: 'egv232', olChiki: convertRomanKeyToOlChiki('EnED'), transliteration: 'EnED', english: 'adj. transitive;' },
  { id: 'egv233', olChiki: convertRomanKeyToOlChiki('PoToB'), transliteration: 'PoToB', english: 'n. book;' },
  { id: 'egv234', olChiki: convertRomanKeyToOlChiki('PATLA'), transliteration: 'PATLA', english: 'adj. slim; vt. to make someone or something slim; vi. to become slim;' },
  { id: 'egv235', olChiki: convertRomanKeyToOlChiki('PAFKHA'), transliteration: 'PAFKHA', english: 'n. fan;' },
  { id: 'egv236', olChiki: convertRomanKeyToOlChiki('PAStA'), transliteration: 'PAStA', english: 'n. direction;' },
  { id: 'egv237', olChiki: convertRomanKeyToOlChiki('PAhtA'), transliteration: 'PAhtA', english: 'n. direction;' },
  { id: 'egv238', olChiki: convertRomanKeyToOlChiki('PARSET'), transliteration: 'PARSET', english: 'n. president;' },
  { id: 'egv239', olChiki: convertRomanKeyToOlChiki('PAP'), transliteration: 'PAP', english: 'n. sin; vi. to sin;' },
  { id: 'egv240', olChiki: convertRomanKeyToOlChiki('PAnAhI'), transliteration: 'PAnAhI', english: 'n. shoe;' },
  { id: 'egv241', olChiki: convertRomanKeyToOlChiki('PAnTE'), transliteration: 'PAnTE', english: 'n. row; vt., vi. to search; vi. to arrange in a row;' },
  { id: 'egv242', olChiki: convertRomanKeyToOlChiki('PAZhAW'), transliteration: 'PAZhAW', english: 'adj. educated; vt. to teach; to read; vi. to study;' },
  { id: 'egv243', olChiki: convertRomanKeyToOlChiki('PA.hIL'), transliteration: 'PA.hIL', english: 'n. past; adj. past; previous;' },
  { id: 'egv244', olChiki: convertRomanKeyToOlChiki('PA.RIS'), transliteration: 'PA.RIS', english: 'n. parts of speech; title of a Santal;' },
  { id: 'egv245', olChiki: convertRomanKeyToOlChiki('PA.PI'), transliteration: 'PA.PI', english: 'n. sinner;' },
  { id: 'egv246', olChiki: convertRomanKeyToOlChiki('PUTHI'), transliteration: 'PUTHI', english: 'n. book;' },
  { id: 'egv247', olChiki: convertRomanKeyToOlChiki('PUSI'), transliteration: 'PUSI', english: 'n. cat;' },
  { id: 'egv248', olChiki: convertRomanKeyToOlChiki('PURA.'), transliteration: 'PURA.', english: 'adj. complete;' },
  { id: 'egv249', olChiki: convertRomanKeyToOlChiki('PURA.W'), transliteration: 'PURA.W', english: 'vt. to complete; to finish;' },
  { id: 'egv250', olChiki: convertRomanKeyToOlChiki('PUYLUWAG'), transliteration: 'PUYLUWAG', english: 'adj. first (pointing to an inanimate object);' },
  { id: 'egv251', olChiki: convertRomanKeyToOlChiki('PUYLUYIJ'), transliteration: 'PUYLUYIJ', english: 'adj. first (pointing to an animate object);' },
  { id: 'egv252', olChiki: convertRomanKeyToOlChiki('PUn'), transliteration: 'PUn', english: 'n., adj. four;' },
  { id: 'egv253', olChiki: convertRomanKeyToOlChiki('PUnA.G'), transliteration: 'PUnA.G', english: 'adj. fourth (pointing to an inanimate object);' },
  { id: 'egv254', olChiki: convertRomanKeyToOlChiki('PUnIJ'), transliteration: 'PUnIJ', english: 'adj. fourth (pointing to an animate object);' },
  { id: 'egv255', olChiki: convertRomanKeyToOlChiki('PUnYA.'), transliteration: 'PUnYA.', english: 'adj. four;' },
  { id: 'egv256', olChiki: convertRomanKeyToOlChiki('PUNGI'), transliteration: 'PUNGI', english: 'n. a cigarette made using tobacco and leaf;' },
  { id: 'egv257', olChiki: convertRomanKeyToOlChiki('PUNGI QU'), transliteration: 'PUNGI QU', english: 'vi. to smoke;' },
  { id: 'egv258', olChiki: convertRomanKeyToOlChiki('PUNJI'), transliteration: 'PUNJI', english: 'n. heap; vt. to gather things in a place;' },
  { id: 'egv259', olChiki: convertRomanKeyToOlChiki('PUNM'), transliteration: 'PUNM', english: 'adj. white; vt. to make someone or something white; vi. to become white;' },
  { id: 'egv260', olChiki: convertRomanKeyToOlChiki('PE'), transliteration: 'PE', english: 'n., adj. three;' },
  { id: 'egv261', olChiki: convertRomanKeyToOlChiki('PEYA'), transliteration: 'PEYA', english: 'adj. three;' },
  { id: 'egv262', olChiki: convertRomanKeyToOlChiki('PEYAG'), transliteration: 'PEYAG', english: 'adj. third (pointing to an inanimate object);' },
  { id: 'egv263', olChiki: convertRomanKeyToOlChiki('PEYIJ'), transliteration: 'PEYIJ', english: 'adj. third (pointing to an animate object);' },
  { id: 'egv264', olChiki: convertRomanKeyToOlChiki('PHADA'), transliteration: 'PHADA', english: 'n. space; adj. empty; vi. to make space; to become devoid of any visible object;' },
  { id: 'egv265', olChiki: convertRomanKeyToOlChiki('PHEZAT'), transliteration: 'PHEZAT', english: 'n. root;' },
  { id: 'egv266', olChiki: convertRomanKeyToOlChiki('dUNGX_RI'), transliteration: 'dUNGX_RI', english: 'n. hill;' },
  { id: 'egv267', olChiki: convertRomanKeyToOlChiki('nAGAm'), transliteration: 'nAGAm', english: 'n. history;' },
  { id: 'egv268', olChiki: convertRomanKeyToOlChiki('nAF'), transliteration: 'nAF', english: 'n. tense;' },
  { id: 'egv269', olChiki: convertRomanKeyToOlChiki('nAhAG'), transliteration: 'nAhAG', english: 'adj. present;' },
  { id: 'egv270', olChiki: convertRomanKeyToOlChiki('nIT'), transliteration: 'nIT', english: 'adv. now;' },
  { id: 'egv271', olChiki: convertRomanKeyToOlChiki('nIToG'), transliteration: 'nIToG', english: 'adv. now;' },
  { id: 'egv272', olChiki: convertRomanKeyToOlChiki('nIToF'), transliteration: 'nIToF', english: 'adv. now;' },
  { id: 'egv273', olChiki: convertRomanKeyToOlChiki('nITAF'), transliteration: 'nITAF', english: 'adj. present;' },
  { id: 'egv274', olChiki: convertRomanKeyToOlChiki('nIYom'), transliteration: 'nIYom', english: 'n. law; rule;' },
  { id: 'egv275', olChiki: convertRomanKeyToOlChiki('ttAZAF'), transliteration: 'ttAZAF', english: 'n. time; instant of time;' },
  { id: 'egv276', olChiki: convertRomanKeyToOlChiki('tUdA.G'), transliteration: 'tUdA.G', english: 'n. point; vi. to make point;' },
  { id: 'egv277', olChiki: convertRomanKeyToOlChiki('tHoP'), transliteration: 'tHoP', english: 'n. a drop;' },
  { id: 'egv278', olChiki: convertRomanKeyToOlChiki('tHoP_tHoP'), transliteration: 'tHoP_tHoP', english: 'adv. drop by drop;' },
  { id: 'egv279', olChiki: convertRomanKeyToOlChiki('tHANV'), transliteration: 'tHANV', english: 'n. position; vt. to place;' },
  { id: 'egv280', olChiki: convertRomanKeyToOlChiki('tHA.WKA.'), transliteration: 'tHA.WKA.', english: 'n. decision; vt. to decide;' },
  { id: 'egv281', olChiki: convertRomanKeyToOlChiki('tHIKA.nA'), transliteration: 'tHIKA.nA', english: 'n. address;' },
  { id: 'egv282', olChiki: convertRomanKeyToOlChiki('tHU'), transliteration: 'tHU', english: 'vt. to fire at; vi. to explode;' },
  { id: 'egv283', olChiki: convertRomanKeyToOlChiki('BAGAn'), transliteration: 'BAGAn', english: 'n. garden;' },
  { id: 'egv284', olChiki: convertRomanKeyToOlChiki('BAFthIK'), transliteration: 'BAFthIK', english: 'adj. bad;' },
  { id: 'egv285', olChiki: convertRomanKeyToOlChiki('BAQCAW'), transliteration: 'BAQCAW', english: 'adj. alive; vt. to save; vi. to be alive;' },
  { id: 'egv286', olChiki: convertRomanKeyToOlChiki('BAR'), transliteration: 'BAR', english: 'n., adj. two;' },
  { id: 'egv287', olChiki: convertRomanKeyToOlChiki('BARAG'), transliteration: 'BARAG', english: 'adj. second (pointing to an inanimate object);' },
  { id: 'egv288', olChiki: convertRomanKeyToOlChiki('BARIJ'), transliteration: 'BARIJ', english: 'adj. second (pointing to an animate object);' },
  { id: 'egv289', olChiki: convertRomanKeyToOlChiki('BARYA'), transliteration: 'BARYA', english: 'adj. two;' },
  { id: 'egv290', olChiki: convertRomanKeyToOlChiki('BAPLA'), transliteration: 'BAPLA', english: 'n. marriage; vt., vi. to marry;' },
  { id: 'egv291', olChiki: convertRomanKeyToOlChiki('BAdAY'), transliteration: 'BAdAY', english: 'vt. to know;' },
  { id: 'egv292', olChiki: convertRomanKeyToOlChiki('BAZAY'), transliteration: 'BAZAY', english: 'vt. to know;' },
  { id: 'egv293', olChiki: convertRomanKeyToOlChiki('BA.BU GIDX_RA.'), transliteration: 'BA.BU GIDX_RA.', english: 'n. boy;' },
  { id: 'egv294', olChiki: convertRomanKeyToOlChiki('BA.ZIJ'), transliteration: 'BA.ZIJ', english: 'adj. bad;' },
  { id: 'egv295', olChiki: convertRomanKeyToOlChiki('BIQ'), transliteration: 'BIQ', english: 'n. snake;' },
  { id: 'egv296', olChiki: convertRomanKeyToOlChiki('BInDU'), transliteration: 'BInDU', english: 'n. point;' },
  { id: 'egv297', olChiki: convertRomanKeyToOlChiki('BIn_JoToS'), transliteration: 'BIn_JoToS', english: 'adj. without object;' },
  { id: 'egv298', olChiki: convertRomanKeyToOlChiki('BUJHA.W'), transliteration: 'BUJHA.W', english: 'vt., vi.. to understand;' },
  { id: 'egv299', olChiki: convertRomanKeyToOlChiki('BURU'), transliteration: 'BURU', english: 'n. mountain; hill;' },
  { id: 'egv300', olChiki: convertRomanKeyToOlChiki('BUdHI'), transliteration: 'BUdHI', english: 'n. old woman;' },
  { id: 'egv301', olChiki: convertRomanKeyToOlChiki('BUZhI'), transliteration: 'BUZhI', english: 'n. old woman;' },
  { id: 'egv302', olChiki: convertRomanKeyToOlChiki('BUtA.'), transliteration: 'BUtA.', english: 'n. address; root;' },
  { id: 'egv303', olChiki: convertRomanKeyToOlChiki('BUNDX'), transliteration: 'BUNDX', english: 'n. a drop;' },
  { id: 'egv304', olChiki: convertRomanKeyToOlChiki('BUNDX_BUNDX'), transliteration: 'BUNDX_BUNDX', english: 'adv. drop by drop;' },
  { id: 'egv305', olChiki: convertRomanKeyToOlChiki('BES'), transliteration: 'BES', english: 'adj. good;' },
  { id: 'egv306', olChiki: convertRomanKeyToOlChiki('BE.nAW'), transliteration: 'BE.nAW', english: 'vt., vi. to make; to form;' },
  { id: 'egv307', olChiki: convertRomanKeyToOlChiki('BHoRSA'), transliteration: 'BHoRSA', english: 'n. trust; faith; vi. to depend; to count;' },
  { id: 'egv308', olChiki: convertRomanKeyToOlChiki('BHAGX'), transliteration: 'BHAGX', english: 'n. share; vt. to divide; to share;' },
  { id: 'egv309', olChiki: convertRomanKeyToOlChiki('BHASon Em'), transliteration: 'BHASon Em', english: 'vi. to talk; to give speech;' },
  { id: 'egv310', olChiki: convertRomanKeyToOlChiki('BHA.JI'), transliteration: 'BHA.JI', english: 'n. fry; vt. to fry;' },
  { id: 'egv311', olChiki: convertRomanKeyToOlChiki('BHEGED'), transliteration: 'BHEGED', english: 'n. subtraction; vt. to subtract;' },
  { id: 'egv312', olChiki: convertRomanKeyToOlChiki('BHEJA'), transliteration: 'BHEJA', english: 'n. brain; vt. to send;' },
];

const newDictionaryData = [
  { english: "add", pos: "vt.", santaliRoman: "SELED" },
  { english: "addition", pos: "n.", santaliRoman: "SELED" },
  { english: "address", pos: "n.", santaliRoman: "BUtA.", santaliRoman2: "tHIKA.nA" },
  { english: "adjective", pos: "n.", santaliRoman: "GUnUn" },
  { english: "adverb", pos: "n.", santaliRoman: "TonoZ" },
  { english: "all", pos: "adj.", santaliRoman: "SAnAm", santaliRoman2: "JoTo", santaliRoman3: "JAKAT" },
  { english: "angle", pos: "n.", santaliRoman: "KOnA", santaliRoman2: "KoNM" },
  { english: "animal", pos: "n.", santaliRoman: "JAnWoR" },
  { english: "association", pos: "n.", santaliRoman: "SEmLED" },
  { english: "bad", pos: "adj.", santaliRoman: "BA.ZIJ", santaliRoman2: "BAF_tHIK" },
  { english: "beginning", pos: "ge.", santaliRoman: "ETohoB", santaliRoman2: "EhoB" }, // 'ge.' might be a typo for n. or similar.
  { english: "big", pos: "adj.", santaliRoman: "SE:MA", santaliRoman2: "mARAF" },
  { english: "bird", pos: "n.", santaliRoman: "CE:ME." },
  { english: "black", pos: "adj.", santaliRoman: "hE:DE." },
  { english: "blacken", pos: "vt.", santaliRoman: "hE:DE." },
  { english: "blue", pos: "adj.", santaliRoman: "LIL" },
  { english: "boil", pos: "vt., vi.", santaliRoman: "hE:dE.J", santaliRoman2: "hEdEJ" },
  { english: "bone", pos: "n.", santaliRoman: "JAF" },
  { english: "book", pos: "n.", santaliRoman: "PoToB", santaliRoman2: "PUTHI" },
  { english: "boy", pos: "n.", santaliRoman: "KoZA GIDX_RA.", santaliRoman2: "BA.BU GIDX_RA." },
  { english: "brain", pos: "n.", santaliRoman: "hATAF", santaliRoman2: "BHEJA" },
  { english: "break", pos: "vt., vi.", santaliRoman: "RA.PUD" },
  { english: "bring", pos: "vt.", santaliRoman: "A.GU" },
  { english: "broken", pos: "adj.", santaliRoman: "RA.PUD" },
  { english: "cat", pos: "n.", santaliRoman: "PUSI" },
  { english: "chief minister", pos: "n.", santaliRoman: "SIRA. monTRI" },
  { english: "child", pos: "n.", santaliRoman: "GIDX_RA.", santaliRoman2: "hoPon" },
  { english: "collection", pos: "n.", santaliRoman: "JARWA", santaliRoman2: "JAWRA" },
  { english: "column", pos: "n.", santaliRoman: "TINGU THAR" }, // Simpler for now
  { english: "colour", pos: "n., vt.", santaliRoman: "RoF" },
  { english: "complete", pos: "adj.", santaliRoman: "PURA.", santaliRoman2: "SA.T", santaliRoman3: "CABA" }, // Assuming PURA. for adj, SA.T/CABA for vt.
  { english: "compose", pos: "vt.", santaliRoman: "GABAn" },
  { english: "composition", pos: "n.", santaliRoman: "GABAn" },
  { english: "conjunction", pos: "n.", santaliRoman: "TonoF" },
  { english: "consonant", pos: "n.", santaliRoman: "KECED AZAF" },
  { english: "continuous", pos: "adj.", santaliRoman: "CoLoT" },
  { english: "count", pos: "vt.", santaliRoman: "LEKHA" }, // vi. BHoRSA for 'depend/count on'
  { english: "country", pos: "n., adj.", santaliRoman: "DISom" },
  { english: "cry", pos: "n., vi.", santaliRoman: "RAG" },
  { english: "dance", pos: "n., vi.", santaliRoman: "EnEJ" },
  { english: "decide", pos: "vt.", santaliRoman: "tHA.WKA." },
  { english: "decision", pos: "n.", santaliRoman: "tHA.WKA." },
  { english: "depend", pos: "vi.", santaliRoman: "BHoRSA" }, // also 'count on'
  { english: "digit", pos: "n.", santaliRoman: "EL" },
  { english: "direction", pos: "n.", santaliRoman: "PAStA", santaliRoman2: "PAhtA", santaliRoman3: "SED", santaliRoman4: "DISA." },
  { english: "divide", pos: "vt.", santaliRoman: "hA.tIQ", santaliRoman2: "BHAGX", santaliRoman3: "JUZU" },
  { english: "dividend", pos: "n.", santaliRoman: "hAtAMCA" },
  { english: "divider", pos: "n.", santaliRoman: "hAtAMhA" },
  { english: "division", pos: "n.", santaliRoman: "hAtAM", santaliRoman2: "hA.tIQ", santaliRoman3: "BHAGX" },
  { english: "do", pos: "vt.", santaliRoman: "KoRAW", santaliRoman2: "KA.mI" },
  { english: "dog", pos: "n.", santaliRoman: "SETA" },
  { english: "drink", pos: "n.", santaliRoman: "QU~ JInIS", santaliRoman2: "QU~" }, // QU~ JInIS for noun 'drink', QU~ for vt. 'to drink'
  { english: "drop", pos: "n.", santaliRoman: "tHoP", santaliRoman2: "BUNDX", santaliRoman3: "QUR" }, // QUR for vt/vi
  { english: "dry", pos: "adj., vt., vi.", santaliRoman: "RohoZ" },
  { english: "eat", pos: "vt., vi.", santaliRoman: "Jom" },
  { english: "eatable", pos: "n.", santaliRoman: "Jom", santaliRoman2: "Jom_QU~", santaliRoman3: "JomAG JANhAN Jom DAZEGoG_A" }, // Simplified to Jom for now
  { english: "eight", pos: "n., adj.", santaliRoman: "IRA.L" },
  { english: "eighth", pos: "adj.", santaliRoman: "IRA.LAG", santaliRoman2: "IRA.LIJ" },
  { english: "end", pos: "n., vt., vi.", santaliRoman: "mUCA.D" },
  { english: "environment", pos: "n.", santaliRoman: "SACARhE" },
  { english: "example", pos: "n.", santaliRoman: "QECEL" },
  { english: "fact", pos: "n.", santaliRoman: "SA.RI KATHA" },
  { english: "fan", pos: "n.", santaliRoman: "PAFKHA" },
  { english: "far", pos: "adj.", santaliRoman: "SA:GIQ" },
  { english: "fast", pos: "adv.", santaliRoman: "LoGon" },
  { english: "fat", pos: "n.", santaliRoman: "ITIL", santaliRoman2: "CoRBI", santaliRoman3: "motA" }, // motA for adj.
  { english: "fifth", pos: "adj.", santaliRoman: "moMEYAG", santaliRoman2: "moMEYIJ" },
  { english: "fight", pos: "n., vi.", santaliRoman: "TAPAm" },
  { english: "figure", pos: "n.", santaliRoman: "RUP", santaliRoman2: "CHoBI" },
  { english: "finish", pos: "vt.", santaliRoman: "SA.T", santaliRoman2: "CABA" },
  { english: "fire", pos: "n.", santaliRoman: "SE:GE.L" }, // vi. tHU (to fire at)
  { english: "first", pos: "adj.", santaliRoman: "mAMAF", santaliRoman2: "mAMAFAG", santaliRoman3: "PUYLUWAG", santaliRoman4: "mAMAFIJ", santaliRoman5: "PUYLUYIJ", santaliRoman6: "mIDAG", santaliRoman7: "mIDIJ" },
  { english: "fish", pos: "n.", santaliRoman: "hA.KU" },
  { english: "five", pos: "n.", santaliRoman: "moME", santaliRoman2: "moME GotEJ" }, // moME GotEJ for adj.
  { english: "fly", pos: "n.", santaliRoman: "Ro~", santaliRoman2: "UdA.W" }, // UdA.W for vi.
  { english: "food", pos: "n.", santaliRoman: "Jom", santaliRoman2: "Jom_QU~", santaliRoman3: "JomAG", santaliRoman4: "Jom_QUWAG" },
  { english: "form", pos: "n.", santaliRoman: "RUP", santaliRoman2: "BE.nAW" }, // BE.nAW for vt/vi
  { english: "four", pos: "n.", santaliRoman: "PUn", santaliRoman2: "PUnYA." }, // PUnYA. for adj.
  { english: "fourth", pos: "adj.", santaliRoman: "PUnA.G", santaliRoman2: "PUnIJ" },
  { english: "fox", pos: "n.", santaliRoman: "TUYU" },
  { english: "frog", pos: "n.", santaliRoman: "RotE" },
  { english: "fry", pos: "n., vt.", santaliRoman: "BHA.JI" },
  { english: "function", pos: "n.", santaliRoman: "KA.mI" },
  { english: "future", pos: "adj.", santaliRoman: "DARAY", santaliRoman2: "AGAm" },
  { english: "garden", pos: "n.", santaliRoman: "BAGAn" },
  { english: "gather", pos: "vt., vi.", santaliRoman: "JARWA", santaliRoman2: "JAWRA" },
  { english: "gender", pos: "n.", santaliRoman: "JAnAF" }, // Sub-definitions for specific genders are complex for current structure
  { english: "geography", pos: "n.", santaliRoman: "oTno", santaliRoman2: "DoRYATno" },
  { english: "girl", pos: "n.", santaliRoman: "KUZI~ GIDX_RA.", santaliRoman2: "mA.Y GIDX_RA." },
  { english: "give", pos: "vt.", santaliRoman: "Em" },
  { english: "go", pos: "vi.", santaliRoman: "SEn", santaliRoman2: "CALAW" },
  { english: "good", pos: "adj.", santaliRoman: "BES" },
  { english: "grammar", pos: "n.", santaliRoman: "RonoZ" },
  { english: "heap", pos: "n.", santaliRoman: "PUNJI" },
  { english: "hill", pos: "n.", santaliRoman: "BURU", santaliRoman2: "dUNGX_RI" },
  { english: "history", pos: "n.", santaliRoman: "nAGAm" },
  { english: "imprison", pos: "vt.", santaliRoman: "JIhoL" },
  { english: "include", pos: "vt.", santaliRoman: "ANGoC" },
  { english: "interjection", pos: "n.", santaliRoman: "hAnAW" },
  { english: "intransitive", pos: "adj.", santaliRoman: "onoG" },
  { english: "jail", pos: "n.", santaliRoman: "JIhoL" },
  { english: "join", pos: "n., vt., vi.", santaliRoman: "KHoNJA" },
  { english: "joint", pos: "n.", santaliRoman: "KHoNJA" },
  { english: "keep", pos: "vt.", santaliRoman: "Doho" },
  { english: "kind (type)", pos: "n.", santaliRoman: "ToRon" },
  { english: "kind", pos: "adj.", santaliRoman: "DoYALU" }, // For 'type' see above
  { english: "know", pos: "vt.", santaliRoman: "BAdAY", santaliRoman2: "BAZAY" },
  { english: "language", pos: "n.", santaliRoman: "RoZ", santaliRoman2: "BHASA" },
  { english: "laugh", pos: "vi.", santaliRoman: "LANDA" },
  { english: "law", pos: "n.", santaliRoman: "nIYom", santaliRoman2: "KA.nUn" },
  { english: "length", pos: "n.", santaliRoman: "JHA.L" },
  { english: "lengthen", pos: "vt.", santaliRoman: "JHA.L" },
  { english: "life", pos: "n.", santaliRoman: "JIWI~", santaliRoman2: "JIBon" },
  { english: "live", pos: "vi.", santaliRoman: "TANhEn" },
  { english: "line", pos: "n.", santaliRoman: "GAR" },
  { english: "literature", pos: "n.", santaliRoman: "SAVhED" },
  { english: "long", pos: "adj.", santaliRoman: "JHA.L" },
  { english: "lubricate", pos: "vt.", santaliRoman: "SUnUm" },
  { english: "man (human being)", pos: "n.", santaliRoman: "hoZ" },
  { english: "man (as a male)", pos: "n.", santaliRoman: "KoZA" },
  { english: "marriage", pos: "n.", santaliRoman: "BAPLA" },
  { english: "mathematician", pos: "n.", santaliRoman: "ELKHARIYA." },
  { english: "mathematics", pos: "n.", santaliRoman: "ELKHA" },
  { english: "meat", pos: "n.", santaliRoman: "JIL" }, // Note: JIL also appears as 'deer'
  { english: "medicine", pos: "n.", santaliRoman: "RAn" },
  { english: "meet", pos: "vi.", santaliRoman: "QAPAm" },
  { english: "meeting", pos: "n.", santaliRoman: "mIDUn" },
  { english: "milk", pos: "n.", santaliRoman: "ToWA", santaliRoman2: "DUhA.W" }, // DUhA.W for vt.
  { english: "motion", pos: "n.", santaliRoman: "CoLoT" },
  { english: "mountain", pos: "n.", santaliRoman: "BURU" },
  { english: "mud", pos: "n.", santaliRoman: "LoSoD" },
  { english: "name", pos: "n., vt.", santaliRoman: "QUTUm" },
  { english: "news", pos: "n.", santaliRoman: "KHoBoR" },
  { english: "nine", pos: "n., adj.", santaliRoman: "ARE" },
  { english: "ninth", pos: "adj.", santaliRoman: "AREYAG", santaliRoman2: "AREYIJ" },
  { english: "noun", pos: "n.", santaliRoman: "QUnUm" }, // This was UQUm / QUnUm earlier, let's use QUnUm from list
  { english: "now", pos: "adv.", santaliRoman: "nIToG", santaliRoman2: "nIToF", santaliRoman3: "nIT" },
  { english: "number (in grammar)", pos: "n.", santaliRoman: "GotAn" }, // complex sub-parts
  { english: "number (in mathematics)", pos: "n.", santaliRoman: "LEKHA" },
  { english: "object", pos: "n.", santaliRoman: "JoToS" },
  { english: "oceanography", pos: "n.", santaliRoman: "DoRYATno" }, // This was geography before
  { english: "oil", pos: "n., vt.", santaliRoman: "SUnUm" },
  { english: "old", pos: "adj.", santaliRoman: "mARE", santaliRoman2: "mAREnAG" },
  { english: "one", pos: "n.", santaliRoman: "mID", santaliRoman2: "mIDtIJ" }, // mIDtIJ for adj.
  { english: "page", pos: "n.", santaliRoman: "SAhtA" },
  { english: "parts of speech", pos: "n.", santaliRoman: "PA.RIS" },
  { english: "past", pos: "n., adj.", santaliRoman: "EnAF", santaliRoman2: "SEDAY", santaliRoman3: "PA.hIL" },
  { english: "perfect", pos: "adj.", santaliRoman: "SA.TA.n" },
  { english: "person (in grammar)", pos: "n.", santaliRoman: "GoRon" }, // complex sub-parts
  { english: "person", pos: "n.", santaliRoman: "hoZ" },
  { english: "picture", pos: "n.", santaliRoman: "CHoBI" },
  { english: "place", pos: "n.", santaliRoman: "JAYGA", santaliRoman2: "tHANV" }, // tHANV for vt.
  { english: "point", pos: "n.", santaliRoman: "tUdA.G", santaliRoman2: "BInDU", santaliRoman3: "UDUG" }, // UDUG for vi.
  { english: "position", pos: "n.", santaliRoman: "tHANV" },
  { english: "postposition", pos: "n.", santaliRoman: "GA:nA.t" },
  { english: "preface", pos: "n.", santaliRoman: "onoZ" },
  { english: "present", pos: "adj.", santaliRoman: "nITAF", santaliRoman2: "nAhAG" },
  { english: "president", pos: "n.", santaliRoman: "PARSET" },
  { english: "press", pos: "vt.", santaliRoman: "oTA" },
  { english: "previous", pos: "adj.", santaliRoman: "PA.hIL", santaliRoman2: "mAMAF" },
  { english: "prime minister", pos: "n.", santaliRoman: "mARAF monTRI" },
  { english: "prison", pos: "n.", santaliRoman: "JIhoL" },
  { english: "procession", pos: "n.", santaliRoman: "mICHIL" },
  { english: "pronoun", pos: "n.", santaliRoman: "UQUm", santaliRoman2: "QUnUm" }, // QUnUm is also noun. Using UQUm here
  { english: "queen", pos: "n.", santaliRoman: "RA.nI" },
  { english: "quotient", pos: "n.", santaliRoman: "hAZA", santaliRoman2: "JUZU" },
  { english: "rat", pos: "n.", santaliRoman: "GUdU", santaliRoman2: "CUtU", santaliRoman3: "SARGA", santaliRoman4: "CUNDX" },
  { english: "recognition", pos: "n.", santaliRoman: "UPURUm" },
  { english: "red", pos: "adj.", santaliRoman: "ARAG" },
  { english: "relation", pos: "n.", santaliRoman: "SA.GA.Y" },
  { english: "remainder", pos: "n.", santaliRoman: "hAtAMSA", santaliRoman2: "SAREJ" },
  { english: "root", pos: "n.", santaliRoman: "REhED", santaliRoman2: "BUtA", santaliRoman3: "PHEZAT", santaliRoman4: "JAF" },
  { english: "row", pos: "n.", santaliRoman: "GITIJ THAR", santaliRoman2: "PAnTE" }, // PAnTE for vt/vi
  { english: "rule", pos: "n.", santaliRoman: "nIYom" },
  { english: "save", pos: "vt.", santaliRoman: "BAQCAW" },
  { english: "schedule", pos: "n.", santaliRoman: "DHAP" },
  { english: "school", pos: "n.", santaliRoman: "ASnA" },
  { english: "science", pos: "n.", santaliRoman: "SANMES" },
  { english: "search", pos: "vt., vi.", santaliRoman: "PAnTE" },
  { english: "second", pos: "adj.", santaliRoman: "BARAG", santaliRoman2: "DoSARIJ", santaliRoman3: "DoSAR" }, // also mID SE.KE.nd SomoY for time
  { english: "secretary", pos: "n.", santaliRoman: "SUTRET" }, // complex sub-parts
  { english: "see", pos: "vt., vi.", santaliRoman: "QEL" },
  { english: "seed", pos: "n.", santaliRoman: "JAF", santaliRoman2: "ITA." },
  { english: "send", pos: "vt.", santaliRoman: "BHEJA" },
  { english: "sentence", pos: "n.", santaliRoman: "A.YA.T" },
  { english: "set", pos: "n.", santaliRoman: "JARWA", santaliRoman2: "JAWRA" },
  { english: "seven", pos: "n., adj.", santaliRoman: "EYAY" },
  { english: "seventh", pos: "adj.", santaliRoman: "EYAYAG", santaliRoman2: "EYAYIJ" },
  { english: "share", pos: "n.", santaliRoman: "JUZU", santaliRoman2: "hA.tIQ", santaliRoman3: "BHAGX", santaliRoman4: "hAZA" }, // hA.tIQ/BHAGX for vt
  { english: "shoe", pos: "n.", santaliRoman: "PAnAhI", santaliRoman2: "JUTA." },
  { english: "sin", pos: "n., vi.", santaliRoman: "PAP" },
  { english: "sinner", pos: "n.", santaliRoman: "PA.PI" },
  { english: "sit", pos: "vi.", santaliRoman: "DUZUB" },
  { english: "six", pos: "n., adj.", santaliRoman: "TURUY" },
  { english: "sixth", pos: "adj.", santaliRoman: "TURUYAG", santaliRoman2: "TURUYIJ" },
  { english: "sleep", pos: "n., vi.", santaliRoman: "JA.PID" },
  { english: "slim", pos: "adj., vi.", santaliRoman: "PATLA", santaliRoman2: "moRA" },
  { english: "small", pos: "adj.", santaliRoman: "hUdIQ" },
  { english: "smell", pos: "vt.", santaliRoman: "JI~", santaliRoman2: "So~" }, // So~ for n/vi
  { english: "smile", pos: "n., vi.", santaliRoman: "LANDA" },
  { english: "smoke", pos: "n.", santaliRoman: "DHUNVA." }, // vi. PUNGI QU~
  { english: "snake", pos: "n.", santaliRoman: "BIQ" },
  { english: "society", pos: "n.", santaliRoman: "SAVTA" },
  { english: "soil", pos: "n., vi.", santaliRoman: "hASA" },
  { english: "soul", pos: "n.", santaliRoman: "JIWI~" },
  { english: "sound", pos: "n., vi.", santaliRoman: "SAdE", santaliRoman2: "SAZE" },
  { english: "space", pos: "n.", santaliRoman: "PHADA", santaliRoman2: "JAYGA" },
  { english: "speak", pos: "vt., vi.", santaliRoman: "RoZ", santaliRoman2: "mEn" },
  { english: "student", pos: "n.", santaliRoman: "CETETIYA.", santaliRoman2: "CEDoGIJ" },
  { english: "subject", pos: "n.", santaliRoman: "mUTA.n" },
  { english: "subtract", pos: "vt.", santaliRoman: "BHEGED" },
  { english: "subtraction", pos: "n.", santaliRoman: "BHEGED" },
  { english: "take", pos: "vt.", santaliRoman: "IDI" },
  { english: "tall", pos: "adj.", santaliRoman: "USUL" },
  { english: "talk", pos: "vi.", santaliRoman: "RoZ", santaliRoman2: "BHASon Em" },
  { english: "tea", pos: "n.", santaliRoman: "CA" },
  { english: "teach", pos: "vt.", santaliRoman: "PAZhAW" },
  { english: "teacher", pos: "n.", santaliRoman: "mACET" },
  { english: "tell", pos: "vt.", santaliRoman: "RoZ", santaliRoman2: "mEn" },
  { english: "ten", pos: "n., adj.", santaliRoman: "GEL" },
  { english: "tenth", pos: "adj.", santaliRoman: "GELAG", santaliRoman2: "GELIJ" },
  { english: "tense", pos: "n.", santaliRoman: "nAF" },
  { english: "thing", pos: "n.", santaliRoman: "JInIS" },
  { english: "third", pos: "adj.", santaliRoman: "PEYAG", santaliRoman2: "TESARAG", santaliRoman3: "PEYIJ", santaliRoman4: "TESARIJ", santaliRoman5: "TESAR" },
  { english: "three", pos: "n.", santaliRoman: "PE", santaliRoman2: "PEYA" }, // PEYA for adj.
  { english: "throw", pos: "vt.", santaliRoman: "CAPAD" },
  { english: "tiger", pos: "n.", santaliRoman: "TA.RUB" },
  { english: "time", pos: "n.", santaliRoman: "ttAZAF", santaliRoman2: "SomoY", santaliRoman3: "oKTo" },
  { english: "transitive", pos: "adj.", santaliRoman: "EnED" },
  { english: "two", pos: "n.", santaliRoman: "BAR", santaliRoman2: "BARYA" }, // BARYA for adj.
  { english: "understand", pos: "vt., vi.", santaliRoman: "BUJHA.W" },
  { english: "verb", pos: "n.", santaliRoman: "KAnWA" },
  { english: "village", pos: "n.", santaliRoman: "A.TU" },
  { english: "vowel", pos: "n.", santaliRoman: "RAhA AZAF" },
  { english: "volcano", pos: "n.", santaliRoman: "SE:GE.L BURU" },
  { english: "war", pos: "n.", santaliRoman: "LA.ZhA.Y", santaliRoman2: "JUDXDHo~" },
  { english: "water", pos: "n.", santaliRoman: "DAG" },
  { english: "white", pos: "adj.", santaliRoman: "PUNM" },
  { english: "wire", pos: "n.", santaliRoman: "TAR" },
  { english: "woman", pos: "n.", santaliRoman: "KUZI~" }, // old woman – n. BUZhI; BUdHI;
  { english: "old woman", pos: "n.", santaliRoman: "BUZhI", santaliRoman2: "BUdHI" },
  { english: "word", pos: "n.", santaliRoman: "A.ZA." },
  { english: "write", pos: "vt., vi.", santaliRoman: "oL" },
  { english: "writer", pos: "n.", santaliRoman: "onoLIYA." },
];

// Append these new words to the existing expandedGeneralVocabulary
// I will use a helper function to process each entry from newDictionaryData
// and ensure unique IDs.

let currentIdCounter = expandedGeneralVocabulary.length + 1; // Start ID counter after existing words

newDictionaryData.forEach(entry => {
    // Primary entry
    expandedGeneralVocabulary.push({
        id: `genDict_${currentIdCounter++}`,
        english: entry.english,
        transliteration: entry.santaliRoman,
        olChiki: convertRomanKeyToOlChiki(entry.santaliRoman)
    });

    // Handle alternative Santali Roman forms if they exist
    if (entry.santaliRoman2) {
        expandedGeneralVocabulary.push({
            id: `genDict_${currentIdCounter++}`,
            english: entry.english, // English word remains the same
            transliteration: entry.santaliRoman2,
            olChiki: convertRomanKeyToOlChiki(entry.santaliRoman2)
        });
    }
    if (entry.santaliRoman3) {
         expandedGeneralVocabulary.push({
            id: `genDict_${currentIdCounter++}`,
            english: entry.english,
            transliteration: entry.santaliRoman3,
            olChiki: convertRomanKeyToOlChiki(entry.santaliRoman3)
        });
    }
    if (entry.santaliRoman4) {
         expandedGeneralVocabulary.push({
            id: `genDict_${currentIdCounter++}`,
            english: entry.english,
            transliteration: entry.santaliRoman4,
            olChiki: convertRomanKeyToOlChiki(entry.santaliRoman4)
        });
    }
     if (entry.santaliRoman5) {
         expandedGeneralVocabulary.push({
            id: `genDict_${currentIdCounter++}`,
            english: entry.english,
            transliteration: entry.santaliRoman5,
            olChiki: convertRomanKeyToOlChiki(entry.santaliRoman5)
        });
    }
    if (entry.santaliRoman6) {
         expandedGeneralVocabulary.push({
            id: `genDict_${currentIdCounter++}`,
            english: entry.english,
            transliteration: entry.santaliRoman6,
            olChiki: convertRomanKeyToOlChiki(entry.santaliRoman6)
        });
    }
    if (entry.santaliRoman7) {
         expandedGeneralVocabulary.push({
            id: `genDict_${currentIdCounter++}`,
            english: entry.english,
            transliteration: entry.santaliRoman7,
            olChiki: convertRomanKeyToOlChiki(entry.santaliRoman7)
        });
    }
});


export const categorizedOlChikiWords: Record<string, OlChikiWord[]> = {
  "Animals": [
    { id: 'a1', olChiki: 'ᱥᱮᱛᱟ', transliteration: 'seta', english: 'Dog' },
    { id: 'a2', olChiki: 'ᱜᱟᱹᱭ', transliteration: 'găi', english: 'Cow' },
    { id: 'a3', olChiki: 'ᱪᱮᱬᱮ', transliteration: 'cɛ̃ṛɛ', english: 'Bird' },
    { id: 'a4', olChiki: 'ᱦᱟᱹᱠᱩ', transliteration: 'haku', english: 'Fish' },
    { id: 'a5', olChiki: 'ᱵᱤᱛᱠᱤᱞ', transliteration: 'bitkil', english: 'Cat' },
    { id: 'a6', olChiki: 'ᱢᱮᱨᱚᱢ', transliteration: 'merom', english: 'Goat' },
    { id: 'a7', olChiki: 'ᱠᱩᱞᱟᱹᱭ', transliteration: 'kulai', english: 'Rabbit' },
    { id: 'a8', olChiki: 'ᱪᱤᱛᱟᱹ', transliteration: 'chitar', english: 'Panther' },
    { id: 'a9', olChiki: 'ᱠᱟᱴᱟᱣᱟ ᱛᱟᱹᱨᱩᱵ', transliteration: 'katwa tarub', english: 'Lion' },
    { id: 'a10', olChiki: 'ᱛᱟᱹᱨᱩᱵ', transliteration: 'tarub', english: 'Tiger' },
    { id: 'a11', olChiki: 'ᱵᱤᱨ ᱥᱩᱠᱨᱤ', transliteration: 'bir sukri', english: 'Boar' },
    { id: 'a12', olChiki: 'ᱵᱟᱱᱟ', transliteration: 'bana', english: 'Bear' },
    { id: 'a13', olChiki: 'ᱦᱟᱹᱬᱩ', transliteration: 'hanu', english: 'Monkey' },
    { id: 'a14', olChiki: 'ᱵᱤᱨᱦᱚᱲ', transliteration: 'birhor', english: 'Gorilla' },
    { id: 'a15', olChiki: 'ᱦᱟᱹᱛᱤ', transliteration: 'hati', english: 'Elephant' },
    { id: 'a16', olChiki: 'ᱡᱤᱞ', transliteration: 'jil', english: 'Deer' }, // Note: 'jil' also means 'meat'
    { id: 'a18', olChiki: 'ᱛᱩᱭᱩ', transliteration: 'tuyu', english: 'Fox' },
    { id: 'a19', olChiki: 'ᱦᱟᱰᱜᱟᱨ', transliteration: 'hadgar', english: 'Hyena' },
    { id: 'a20', olChiki: 'ᱡᱤᱞ ᱦᱤᱡ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'jil hij gidra', english: 'Fawn' },
    { id: 'a21', olChiki: 'ᱛᱩᱲ', transliteration: 'tur', english: 'Squirrel' },
    { id: 'a22', olChiki: 'ᱫᱟᱜ ᱦᱟᱹᱛᱤ', transliteration: 'dag hati', english: 'Rhinoceros' },
    { id: 'a23', olChiki: 'ᱥᱟᱫᱚᱢ', transliteration: 'sadom', english: 'Horse' },
    { id: 'a24', olChiki: 'ᱯᱩᱥᱤ', transliteration: 'pusi', english: 'Cat' },
    { id: 'a25', olChiki: 'ᱜᱟᱫᱷᱟ', transliteration: 'gadha', english: 'Ass' },
    { id: 'a26', olChiki: 'ᱵᱷᱤᱰᱤ', transliteration: 'bhidi', english: 'Sheep' },
    { id: 'a27', olChiki: 'ᱩᱸᱴ', transliteration: 'unt', english: 'Camel' },
    { id: 'a29', olChiki: 'ᱮᱸᱜᱟ ᱥᱮᱛᱟ', transliteration: 'enga seta', english: 'Bitch' },
    { id: 'a31', olChiki: 'ᱮᱸᱜᱟ ᱥᱟᱫᱚᱢ', transliteration: 'enga sadom', english: 'Mare' },
    { id: 'a32', olChiki: 'ᱥᱟᱫᱚᱢ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'sadom gidra', english: 'Colt' },
    { id: 'a33', olChiki: 'ᱪᱩᱴᱩ', transliteration: 'cutu', english: 'Mouse' },
    { id: 'a35', olChiki: 'ᱮᱸᱜᱟ ᱢᱮᱨᱚᱢ', transliteration: 'enga merom', english: 'She goat' },
    { id: 'a36', olChiki: 'ᱢᱮᱨᱚᱢ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'merom gidra', english: 'Kid' },
    { id: 'a37', olChiki: 'ᱫᱟᱢᱠᱚᱢ', transliteration: 'damkom', english: 'Calf' },
    { id: 'a38', olChiki: 'ᱯᱩᱥᱤ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'pusi gidra', english: 'Kitten' },
    { id: 'a39', olChiki: 'ᱰᱟᱝᱨᱟ', transliteration: 'dangra', english: 'Ox' },
    { id: 'a40', olChiki: 'ᱵᱷᱤᱰᱤ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'bhidi gidra', english: 'Lamb' },
    { id: 'a41', olChiki: 'ᱠᱟᱲᱟ', transliteration: 'kada', english: 'Buffalo' },
    { id: 'a42', olChiki: 'ᱥᱮᱸᱫᱽᱨᱟ ᱥᱮᱛᱟ', transliteration: 'sendra seta', english: 'Hound' },
    { id: 'a43', olChiki: 'ᱥᱚᱲᱚ', transliteration: 'sodo', english: 'Bull' },
    { id: 'a44', olChiki: 'ᱥᱩᱠᱨᱤ', transliteration: 'sukri', english: 'Pig' },
  ],
  "Vegetables": [
    { id: 'v1', olChiki: 'ᱟᱹᱞᱩ', transliteration: 'alu', english: 'Potato' },
    { id: 'v2', olChiki: 'ᱵᱟᱦᱟ ᱠᱩᱵᱤ', transliteration: 'baha kubi', english: 'Cauliflower' },
    { id: 'v3', olChiki: 'ᱯᱚᱴᱚᱢ ᱠᱩᱵᱤ', transliteration: 'potom kubi', english: 'Cabbage' },
    { id: 'v4', olChiki: 'ᱜᱟᱡᱚᱨ', transliteration: 'gajor', english: 'Carrot' },
    { id: 'v5', olChiki: 'ᱛᱟᱦᱮᱨ', transliteration: 'taher', english: 'Cucumber' },
    { id: 'v6', olChiki: 'ᱰᱮᱸᱜᱟᱲ', transliteration: 'bengad', english: 'Brinjal' },
    { id: 'v7', olChiki: 'ᱯᱮᱭᱟᱡ', transliteration: 'peyaj', english: 'Onion' },
    { id: 'v8', olChiki: 'ᱢᱚᱴᱚᱨ ᱪᱷᱚᱞᱟ', transliteration: 'motor chola', english: 'Pea' },
    { id: 'v9', olChiki: 'ᱠᱟᱨᱞᱟ', transliteration: 'karla', english: 'Bitter gourd' },
    { id: 'v10', olChiki: 'ᱢᱩᱞᱟᱹ', transliteration: 'mula', english: 'Raddish' },
    { id: 'v11', olChiki: 'ᱵᱤᱞᱟᱹᱛᱤ', transliteration: 'bilati', english: 'Tomato' },
    { id: 'v12', olChiki: 'ᱦᱚᱛᱚᱫ', transliteration: 'hotod', english: 'Bottle gourd' },
    { id: 'v13', olChiki: 'ᱚᱫᱟ', transliteration: 'oda', english: 'Ginger' },
    { id: 'v14', olChiki: 'ᱯᱟᱞᱚᱱ ᱟᱲᱟᱜ', transliteration: 'palon adag', english: 'Spinach' },
    { id: 'v15', olChiki: 'ᱟᱨᱟᱜ ᱢᱩᱞᱟᱹ', transliteration: 'arag mula', english: 'Turnip' },
    { id: 'v16', olChiki: 'ᱢᱟᱹᱨᱤᱪ', transliteration: 'marich', english: 'Chilli' },
    { id: 'v17', olChiki: 'ᱵᱷᱮᱰᱣᱟ', transliteration: 'bhedwa', english: 'Lady finger' },
    { id: 'v18', olChiki: 'ᱯᱩᱫᱱᱟᱹ', transliteration: 'pudna', english: 'Mint' },
    { id: 'v19', olChiki: 'ᱡᱟᱲᱟ', transliteration: 'jada', english: 'Papaya' },
    { id: 'v20', olChiki: 'ᱢᱚᱥᱞᱟ ᱥᱟᱠᱟᱢ', transliteration: 'mosla sakam', english: 'Coriander' },
    { id: 'v21', olChiki: 'ᱜᱷᱟᱱᱴᱟᱲ', transliteration: 'ghatad', english: 'Jack fruit' },
  ],
  "Birds": [
    { id: 'b1', olChiki: 'ᱢᱟᱨᱟᱜ', transliteration: 'marag', english: 'Peacock' },
    { id: 'b2', olChiki: 'ᱢᱤᱨᱩ', transliteration: 'miru', english: 'Parrot' },
    { id: 'b3', olChiki: 'ᱠᱟᱹᱦᱩ', transliteration: 'kahu', english: 'Crow' },
    { id: 'b4', olChiki: 'ᱯᱟᱨᱣᱟ', transliteration: 'parwa', english: 'Pigeon' },
    { id: 'b5', olChiki: 'ᱠᱤᱥᱱᱤ', transliteration: 'kisni', english: 'Myna' },
    { id: 'b6', olChiki: 'ᱞᱮᱴᱠᱟ ᱪᱮᱸᱬᱮ', transliteration: 'letka chene', english: 'Sparrow' },
    { id: 'b7', olChiki: 'ᱠᱩᱲᱤᱫ', transliteration: 'kudid', english: 'Eagle' },
    { id: 'b8', olChiki: 'ᱠᱚᱡᱚᱨ', transliteration: 'kojor', english: 'Owl' },
    { id: 'b9', olChiki: 'ᱥᱤᱢ ᱥᱟᱹᱰᱤ', transliteration: 'sim sandi', english: 'Cock' },
    { id: 'b10', olChiki: 'ᱥᱤᱢ ᱮᱸᱜᱟ', transliteration: 'sim enga', english: 'Hen' },
    { id: 'b11', olChiki: 'ᱜᱮᱲᱮ', transliteration: 'gede', english: 'Duck' },
    { id: 'b12', olChiki: 'ᱢᱟᱨᱟᱝ ᱜᱮᱰᱮ', transliteration: 'marang gede', english: 'Swan' },
    { id: 'b13', olChiki: 'ᱜᱤᱫᱤ', transliteration: 'gidi', english: 'Vulture' },
  ],
  "Eatables": [
    { id: 'e1', olChiki: 'ᱦᱩᱲᱩ', transliteration: 'hudu', english: 'Grain' },
    { id: 'e2', olChiki: 'ᱟᱪᱟᱨ', transliteration: 'achar', english: 'Pickle' },
    { id: 'e3', olChiki: 'ᱥᱩᱡᱤ', transliteration: 'suji', english: 'Semolina' },
    { id: 'e4', olChiki: 'ᱚᱴᱟ', transliteration: 'ota', english: 'Flour' },
    { id: 'e5', olChiki: 'ᱤᱞᱟᱹᱭᱪᱤ', transliteration: 'elaichi', english: 'Comfit' },
    { id: 'e6', olChiki: 'ᱛᱚᱣᱟ ᱨᱮᱭᱟᱜ ᱪᱟᱭ', transliteration: 'towa reag chay', english: 'Coffee' },
    { id: 'e7', olChiki: 'ᱛᱚᱣᱟ', transliteration: 'towa', english: 'Milk' },
    { id: 'e8', olChiki: 'ᱮᱥᱠᱨᱮᱢ', transliteration: 'eskrem', english: 'Ice-cream' },
    { id: 'e9', olChiki: 'ᱜᱩᱦᱩᱢ', transliteration: 'guhum', english: 'Wheat' },
    { id: 'e10', olChiki: 'ᱤᱛᱤᱞ ᱥᱩᱱᱩᱢ', transliteration: 'itil sunum', english: 'Ghee' },
    { id: 'e11', olChiki: 'ᱪᱚᱴᱱᱤ', transliteration: 'cotni', english: 'Sauce' },
    { id: 'e12', olChiki: 'ᱪᱟᱱᱟ/ᱪᱷᱚᱞᱟ', transliteration: 'chana/chola', english: 'Gram' },
    { id: 'e13', olChiki: 'ᱪᱟᱣᱞᱮ', transliteration: 'chawle', english: 'Rice' },
    { id: 'e14', olChiki: 'ᱪᱟᱭ', transliteration: 'chai', english: 'Tea' },
    { id: 'e15', olChiki: 'ᱪᱤᱱᱤ', transliteration: 'chini', english: 'Sugar' },
    { id: 'e16', olChiki: 'ᱯᱟᱹᱱᱤᱨ', transliteration: 'ponir', english: 'Cheese' },
    { id: 'e17', olChiki: 'ᱩᱛᱩ', transliteration: 'utu', english: 'Vegetables' },
    { id: 'e18', olChiki: 'ᱥᱩᱱᱩᱢ', transliteration: 'sunum', english: 'Oil' },
    { id: 'e19', olChiki: 'ᱫᱟᱹᱞ', transliteration: 'daal', english: 'Pulse' },
    { id: 'e20', olChiki: 'ᱵᱤᱞᱟᱹᱛᱤ ᱪᱟᱴᱱᱤ', transliteration: 'bilati cotni', english: 'Tomato sauce' },
    { id: 'e21', olChiki: 'ᱵᱚᱨᱚᱯᱷ', transliteration: 'boroph', english: 'Ice' },
    { id: 'e22', olChiki: 'ᱵᱤᱥᱠᱩᱴ', transliteration: 'biskut', english: 'Biscuit' },
    { id: 'e23', olChiki: 'ᱡᱚᱱᱚᱲᱟ', transliteration: 'jonoda', english: 'Maize' },
    { id: 'e24', olChiki: 'ᱡᱤᱞ', transliteration: 'jil', english: 'Meat' },
    { id: 'e25', olChiki: 'ᱢᱮᱨᱚᱢ ᱡᱤᱞ', transliteration: 'merom jil', english: 'Mutton' },
    { id: 'e26', olChiki: 'ᱥᱩᱠᱨᱤ ᱡᱤᱞ', transliteration: 'sukri jil', english: 'Pork' },
    { id: 'e27', olChiki: 'ᱢᱤᱥᱨᱤ ᱪᱤᱱᱤ', transliteration: 'mesri chini', english: 'Sugar candy' },
    { id: 'e28', olChiki: 'ᱢᱟᱭᱫᱟ', transliteration: 'maida', english: 'Maida' },
    { id: 'e29', olChiki: 'ᱛᱩᱲᱤ', transliteration: 'tudi', english: 'Mustard' },
    { id: 'e30', olChiki: 'ᱧᱤᱸᱫᱟ ᱫᱟᱠᱟ', transliteration: 'ninda daka', english: 'Bread' },
    { id: 'e31', olChiki: 'ᱥᱚᱨᱵᱚᱛ', transliteration: 'sorbot', english: 'Syrup' },
    { id: 'e32', olChiki: 'ᱯᱟᱹᱨᱣᱟ', transliteration: 'parwa', english: 'Wine' }, // Note: parwa is also Pigeon
    { id: 'e33', olChiki: 'ᱧᱮᱸᱞᱮᱨᱟᱥᱟ', transliteration: 'nelerasa', english: 'Honey' },
    { id: 'e34', olChiki: 'ᱛᱩᱲᱤ ᱥᱩᱱᱩᱢ', transliteration: 'tudi sunum', english: 'Mustard oil' },
  ],
  "Body Parts": [
    { id: 'bp1', olChiki: 'ᱩᱵᱽ', transliteration: 'ub', english: 'Hair' },
    { id: 'bp2', olChiki: 'ᱵᱚᱷᱚᱜ', transliteration: 'bohog', english: 'Head' },
    { id: 'bp3', olChiki: 'ᱠᱷᱟᱯᱨᱤ', transliteration: 'khapri', english: 'Skull' },
    { id: 'bp4', olChiki: 'ᱵᱤᱥᱤᱡᱟᱲ', transliteration: 'bisijad', english: 'Spinal cord' },
    { id: 'bp5', olChiki: 'ᱛᱚᱛᱠᱟ', transliteration: 'totka', english: 'Back of head' },
    { id: 'bp6', olChiki: 'ᱦᱟᱛᱟᱲ', transliteration: 'hatad', english: 'Brain' }, // Taking first option from "hatad, bheja"
    { id: 'bp7', olChiki: 'ᱢᱚᱞᱚᱝ', transliteration: 'molong', english: 'Forehead' },
    { id: 'bp8', olChiki: 'ᱢᱚᱲᱟ', transliteration: 'moda', english: 'Face' },
    { id: 'bp9', olChiki: 'ᱢᱮᱫ', transliteration: 'med', english: 'Eye' },
    { id: 'bp10', olChiki: 'ᱢᱮᱫ ᱠᱩᱴᱤ', transliteration: 'med kuti', english: 'Eyelid' },
    { id: 'bp11', olChiki: 'ᱢᱩ', transliteration: 'mu', english: 'Nose' },
    { id: 'bp12', olChiki: 'ᱛᱷᱚᱛᱱᱟ', transliteration: 'thotna', english: 'Cheek' },
    { id: 'bp13', olChiki: 'ᱞᱩᱛᱩᱨ', transliteration: 'lutur', english: 'Ear' },
    { id: 'bp14', olChiki: 'ᱢᱚᱪᱟ', transliteration: 'mocha', english: 'Mouth' },
    { id: 'bp15', olChiki: 'ᱞᱩᱴᱤ', transliteration: 'luti', english: 'Lip' },
    { id: 'bp16', olChiki: 'ᱛᱟᱹᱨᱩ', transliteration: 'taru', english: 'Palate' },
    { id: 'bp17', olChiki: 'ᱰᱟᱴᱟ', transliteration: 'data', english: 'Tooth' },
    { id: 'bp18', olChiki: 'ᱟᱞᱟᱝ', transliteration: 'alang', english: 'Tongue' },
    { id: 'bp19', olChiki: 'ᱦᱚᱴᱚᱜᱽ', transliteration: 'hotog', english: 'Neck' },
    { id: 'bp20', olChiki: 'ᱛᱟᱨᱮᱱ', transliteration: 'taren', english: 'Shoulder' },
    { id: 'bp21', olChiki: 'ᱥᱚᱯᱟ', transliteration: 'sopa', english: 'arm' }, // Changed from 'Arm' to 'arm' to match input
    { id: 'bp22', olChiki: 'ᱦᱟᱨᱛᱟ', transliteration: 'harta', english: 'Skin' },
    { id: 'bp23', olChiki: 'ᱛᱤ', transliteration: 'ti', english: 'Hand' },
    { id: 'bp24', olChiki: 'ᱢᱚᱠᱟ', transliteration: 'moka', english: 'Elbow' },
    { id: 'bp25', olChiki: 'ᱛᱤᱷ ᱛᱟᱞᱠᱷᱟ', transliteration: 'ti talka', english: 'Palm' },
    { id: 'bp26', olChiki: 'ᱠᱟᱹᱴᱩᱵ', transliteration: 'katub', english: 'Finger' },
    { id: 'bp27', olChiki: 'ᱨᱟᱢᱟ', transliteration: 'rama', english: 'Nail' },
    { id: 'bp28', olChiki: 'ᱮᱸᱜᱟ ᱠᱟᱹᱴᱩᱵ', transliteration: 'enga katub', english: 'Thumb' },
    { id: 'bp29', olChiki: 'ᱩᱫᱩᱜ ᱠᱟᱹᱴᱩᱵ', transliteration: 'udug katub', english: 'Pointer Finger' }, // Changed from "Panter"
    { id: 'bp30', olChiki: 'ᱥᱤᱫ ᱠᱟᱹᱴᱩᱵ', transliteration: 'sid katub', english: 'Middle finger' },
    { id: 'bp31', olChiki: 'ᱵᱟᱯᱞᱟ ᱠᱟᱹᱴᱩᱵᱽ', transliteration: 'bapla katub', english: 'Ring finger' },
    { id: 'bp32', olChiki: 'ᱦᱩᱰᱤᱧ ᱠᱟᱹᱴᱩᱵ', transliteration: 'hudinj katub', english: 'Little finger' },
    { id: 'bp33', olChiki: 'ᱠᱚᱲᱟᱢ', transliteration: 'kodam', english: 'Chest' },
    { id: 'bp34', olChiki: 'ᱵᱚᱨᱚ', transliteration: 'boro', english: 'Lungs' },
    { id: 'bp35', olChiki: 'ᱤᱱ', transliteration: 'in', english: 'Heart' },
    { id: 'bp36', olChiki: 'ᱵᱩᱠᱟᱹ', transliteration: 'buka', english: 'Navel' },
    { id: 'bp37', olChiki: 'ᱫᱮᱭᱟ', transliteration: 'deya', english: 'Back' },
    { id: 'bp38', olChiki: 'ᱰᱩᱵᱷᱤ', transliteration: 'dubhi', english: 'Rump' },
    { id: 'bp39', olChiki: 'ᱞᱟᱡᱽ', transliteration: 'laj', english: 'Stomach' },
    { id: 'bp40', olChiki: 'ᱰᱟᱸᱰᱟ', transliteration: 'danda', english: 'Waist' },
    { id: 'bp41', olChiki: 'ᱢᱩᱛᱩ', transliteration: 'mutu', english: 'genital' }, // Changed to 'genital'
    { id: 'bp42', olChiki: 'ᱰᱮᱠᱮ', transliteration: 'deke', english: 'Buttock' },
    { id: 'bp43', olChiki: 'ᱡᱟᱝ', transliteration: 'jang', english: 'Bone' },
    { id: 'bp44', olChiki: 'ᱡᱤᱞ', transliteration: 'jil', english: 'Meat' },
    { id: 'bp45', olChiki: 'ᱢᱟᱭᱟᱢ', transliteration: 'mayam', english: 'Blood' },
    { id: 'bp46', olChiki: 'ᱵᱩᱞᱩ', transliteration: 'bulu', english: 'Thigh' }, // Taking first option "bulu, dhada"
    { id: 'bp47', olChiki: 'ᱴᱷᱤᱴᱲᱟᱜ', transliteration: 'thitnak', english: 'Knee' }, // Taking first option "thitnak, gonthe"
    { id: 'bp48', olChiki: 'ᱡᱟᱝᱜᱟ', transliteration: 'janga', english: 'Foot' },
    { id: 'bp49', olChiki: 'ᱤᱲᱤ', transliteration: 'idi', english: 'Heel' },
    { id: 'bp50', olChiki: 'ᱡᱟᱝᱜᱟ ᱛᱷᱚᱯᱮ', transliteration: 'Janga thope', english: 'Feet' },
  ],
  "Plants & Nature": [
    { id: 'p1', olChiki: 'ᱫᱟᱨᱮ', transliteration: 'dare', english: 'Tree' },
    { id: 'p2', olChiki: 'ᱵᱟᱦᱟ', transliteration: 'baha', english: 'Flower' },
    { id: 'p3', olChiki: 'ᱥᱟᱠᱟᱢ', transliteration: 'sakam', english: 'Leaf' },
    { id: 'p4', olChiki: 'ᱵᱩᱨᱩ', transliteration: 'buru', english: 'Mountain' },
    { id: 'p5', olChiki: 'ᱜᱟᱰᱟ', transliteration: 'gaḍa', english: 'River' },
    { id: 'p6', olChiki: 'ᱥᱤᱧ', transliteration: 'siñ', english: 'Sun' },
    { id: 'p7', olChiki: 'ᱪᱟᱸᱫᱚ', transliteration: 'cando', english: 'Moon' },
  ],
  "Things & Objects": [
    { id: 't1', olChiki: 'ᱚᱲᱟᱜ', transliteration: 'oṛag', english: 'House' },
    { id: 't2', olChiki: 'ᱠᱤᱛᱟᱹᱵ', transliteration: 'kitāb', english: 'Book' },
    { id: 't3', olChiki: 'ᱪᱩᱢᱟᱹᱬ', transliteration: 'cumaṇ', english: 'Pot' },
    { id: 't4', olChiki: 'ᱥᱟᱭᱠᱮᱞ', transliteration: 'saikel', english: 'Bicycle' },
    { id: 't5', olChiki: 'ᱫᱟᱜ', transliteration: 'dag’', english: 'Water' },
    { id: 't6', olChiki: 'ᱠᱟᱹᱴᱩᱵ', transliteration: 'kaṭub', english: 'Knife' },
    { id: 't7', olChiki: 'ᱪᱟᱨᱯᱟᱭ', transliteration: 'carpai', english: 'Bed' },
  ],
  "Food Items": [ 
    { id: 'f1', olChiki: 'ᱫᱟᱠᱟ', transliteration: 'daka', english: 'Cooked Rice' },
    { id: 'f2', olChiki: 'ᱩᱛᱩ', transliteration: 'utu', english: 'Curry/Vegetable Dish' }, // 'Vegetables' also as 'utu' in Eatables
    { id: 'f3', olChiki: 'ᱡᱚ', transliteration: 'jo', english: 'Fruit' },
    { id: 'f4', olChiki: 'ᱯᱤᱴᱷᱟᱹ', transliteration: 'piṭhạ̈', english: 'Rice Cake/Pancake' },
    { id: 'f5', olChiki: 'ᱦᱟᱺᱰᱤ', transliteration: 'haṇḍi', english: 'Rice Beer' },
    { id: 'f6', olChiki: 'ᱵᱩᱞᱩᱝ', transliteration: 'buluṅ', english: 'Salt' },
    { id: 'f7', olChiki: 'ᱢᱟᱹᱨᱤᱪ', transliteration: 'mạric', english: 'Chilli' },
  ],
  "Relations": [
    { id: 'rel1', olChiki: 'ᱵᱟᱵᱟ', transliteration: 'baba', english: 'Father' },
    { id: 'rel2', olChiki: 'ᱟᱭᱚ', transliteration: 'ayo', english: 'Mother' },
    { id: 'rel3', olChiki: 'ᱠᱟᱠᱟ', transliteration: 'kaka', english: 'Uncle' },
    { id: 'rel4', olChiki: 'ᱠᱟᱹᱠᱤ', transliteration: 'kaki', english: 'Aunt' },
    { id: 'rel5', olChiki: 'ᱜᱚᱲᱚᱢ ᱦᱟᱲᱟᱢ', transliteration: 'godom hadam', english: 'Grand Father' },
    { id: 'rel6', olChiki: 'ᱜᱚᱲᱚᱢ ᱵᱩᱲᱷᱤ', transliteration: 'godom budhi', english: 'Grand Mother' },
    { id: 'rel7', olChiki: 'ᱡᱟᱶᱟᱭ ᱜᱚᱢᱠᱮ', transliteration: 'jaway gomke', english: 'Son in law' },
    { id: 'rel8', olChiki: 'ᱜᱟᱛᱮ', transliteration: 'gaate', english: 'Friend' },
    { id: 'rel9', olChiki: 'ᱜᱚᱲᱚᱢ ᱦᱚᱲᱟᱢ', transliteration: 'godom hadam', english: 'Maternal Grandfather' }, // Same as Grand Father
    { id: 'rel10', olChiki: 'ᱜᱚᱲᱚᱢ ᱵᱩᱲᱷᱤ', transliteration: 'godom budhi', english: 'Maternal Grandmother' }, // Same as Grand Mother
    { id: 'rel11', olChiki: 'ᱡᱟᱶᱟᱭ', transliteration: 'jaway gomke', english: 'Husband' }, // User provided jaway gomke for husband
    { id: 'rel12', olChiki: 'ᱵᱤᱴᱤ', transliteration: 'biti', english: 'Daughter' },
    { id: 'rel13', olChiki: 'ᱵᱮᱴᱟ', transliteration: 'beta', english: 'Son' },
    { id: 'rel14', olChiki: 'ᱫᱩᱞᱟᱹᱲ', transliteration: 'dulad', english: 'Love' },
    { id: 'rel15', olChiki: 'ᱵᱚᱠᱚᱧ ᱠᱩᱲᱤ', transliteration: 'bokoing kudi', english: 'Sister' },
    { id: 'rel16', olChiki: 'ᱵᱚᱭᱦᱟ', transliteration: 'boyha', english: 'Brother' },
    { id: 'rel17', olChiki: 'ᱯᱮᱲᱟ', transliteration: 'peda', english: 'Guest' },
    { id: 'rel18', olChiki: 'ᱢᱟᱪᱮᱛ', transliteration: 'mauchet', english: 'Teacher' },
    { id: 'rel19', olChiki: 'ᱜᱩᱨᱩ', transliteration: 'guru', english: 'Preceptor' },
    { id: 'rel20', olChiki: 'ᱤᱨᱤᱞ ᱠᱩᱲᱤ ᱥᱟᱞᱤ', transliteration: 'iril kudi sali', english: 'Sister in law (wife\'s younger sister)' },
    { id: 'rel21', olChiki: 'ᱤᱨᱤᱞ ᱠᱩᱲᱤ ᱱᱚᱱᱚᱫ', transliteration: 'iril kudi nonod', english: 'Sister in law (husband\'s sister)' },
    { id: 'rel22', olChiki: 'ᱤᱨᱤᱞ ᱠᱩᱲᱤ ᱫᱮᱣᱨᱟᱱᱤ', transliteration: 'iril kudi dewrani', english: 'Sister in law (younger brother\'s wife)' },
    { id: 'rel23', olChiki: 'ᱢᱟᱢᱟ', transliteration: 'mama', english: 'Maternal Uncle' },
    { id: 'rel24', olChiki: 'ᱢᱟᱢᱤ', transliteration: 'mami', english: 'Maternal Aunt' },
    { id: 'rel25', olChiki: 'ᱠᱟᱹᱠᱤ', transliteration: 'kaki', english: 'Mother\'s sister' },
    { id: 'rel26', olChiki: 'ᱟᱪᱮᱛ', transliteration: 'auchet', english: 'Pupil' },
    { id: 'rel27', olChiki: 'ᱱᱤᱡᱟᱹᱨ', transliteration: 'nijor', english: 'Own' },
    { id: 'rel28', olChiki: 'ᱦᱚᱧᱦᱟᱨ ᱵᱟᱵᱟ', transliteration: 'honjhar baba', english: 'Father in law' },
    { id: 'rel29', olChiki: 'ᱦᱚᱧᱦᱟᱨ ᱟᱭᱚ', transliteration: 'honjhar ayo', english: 'Mother in law' },
    { id: 'rel30', olChiki: 'ᱱᱤᱡᱟᱹᱨ ᱯᱮᱲᱟ', transliteration: 'nijor peda', english: 'Relative' },
    { id: 'rel31', olChiki: 'ᱠᱟᱴ ᱵᱟᱵᱟ', transliteration: 'kat baba', english: 'Step Father' },
    { id: 'rel32', olChiki: 'ᱪᱷᱩᱴᱠᱤ ᱟᱭᱚ', transliteration: 'chutki ayo', english: 'Step Mother' },
    { id: 'rel33', olChiki: 'ᱪᱷᱩᱴᱠᱤ ᱵᱚᱠᱚᱧ', transliteration: 'chutki bokoenj', english: 'Step Brother' },
    { id: 'rel34', olChiki: 'ᱪᱷᱩᱴᱠᱤ ᱵᱚᱠᱚᱧ ᱠᱩᱲᱤ', transliteration: 'chutki bokoenj kudi', english: 'Step Sister' },
    { id: 'rel35', olChiki: 'ᱪᱷᱩᱴᱠᱤ ᱵᱚᱠᱚᱧ ᱮᱨᱟ', transliteration: 'chutki bokoenj era', english: 'Step Daughter' },
    { id: 'rel36', olChiki: 'ᱪᱷᱩᱴᱠᱤ ᱦᱚᱯᱚᱱ', transliteration: 'chutki hopon', english: 'Step Son' },
    { id: 'rel37', olChiki: 'ᱦᱤᱞᱤ', transliteration: 'hili', english: 'Maternal Sister' },
  ],
  "Days of the Week": [
    { id: 'd1', olChiki: 'ᱥᱤᱸᱜᱤ', transliteration: 'singi', english: 'Sunday' },
    { id: 'd2', olChiki: 'ᱚᱛᱮ', transliteration: 'ote', english: 'Monday' },
    { id: 'd3', olChiki: 'ᱵᱟᱞᱮ', transliteration: 'bale', english: 'Tuesday' },
    { id: 'd4', olChiki: 'ᱥᱟᱹᱜᱩᱱ', transliteration: 'sagun', english: 'Wednesday' },
    { id: 'd5', olChiki: 'ᱥᱟᱹᱨᱫᱤ', transliteration: 'sardi', english: 'Thursday' },
    { id: 'd6', olChiki: 'ᱡᱟᱹᱨᱩᱵ', transliteration: 'jarub', english: 'Friday' },
    { id: 'd7', olChiki: 'ᱧᱩᱸᱦᱩᱢ', transliteration: 'inguhum', english: 'Saturday' },
  ],
  "Months": [
    { id: 'm1', olChiki: 'ᱢᱟᱜᱽ', transliteration: 'mag', english: 'January' },
    { id: 'm2', olChiki: 'ᱯᱷᱟᱹᱜᱩᱱ', transliteration: 'phagun', english: 'February' },
    { id: 'm3', olChiki: 'ᱪᱟᱹᱛ', transliteration: 'chhat', english: 'March' },
    { id: 'm4', olChiki: 'ᱵᱟᱹᱭᱥᱟᱹᱠ', transliteration: 'baysakh', english: 'April' },
    { id: 'm5', olChiki: 'ᱡᱷᱮᱴ', transliteration: 'jhet', english: 'May' },
    { id: 'm6', olChiki: 'ᱟᱥᱟᱲ', transliteration: 'aasadh', english: 'June' },
    { id: 'm7', olChiki: 'ᱥᱟᱱ', transliteration: 'san', english: 'July' },
    { id: 'm8', olChiki: 'ᱵᱷᱟᱫᱚᱨᱵ', transliteration: 'bhadrob', english: 'August' },
    { id: 'm9', olChiki: 'ᱫᱟᱥᱟᱸᱭ', transliteration: 'dasaye', english: 'September' },
    { id: 'm10', olChiki: 'ᱥᱚᱦᱨᱟᱭ', transliteration: 'sohray', english: 'October' },
    { id: 'm11', olChiki: 'ᱟᱜᱷᱟᱲ', transliteration: 'aghad', english: 'November' },
    { id: 'm12', olChiki: 'ᱯᱩᱥ', transliteration: 'pus', english: 'December' }
  ],
  "Time": [
    { id: 'time1', olChiki: 'ᱫᱤᱱ', transliteration: 'din', english: 'Day' },
    { id: 'time2', olChiki: 'ᱦᱟᱴ', transliteration: 'hat', english: 'Week' },
    { id: 'time3', olChiki: 'ᱪᱟᱸᱫᱚ', transliteration: 'chando', english: 'Month' },
    { id: 'time4', olChiki: 'ᱥᱮᱨᱢᱟ', transliteration: 'serma', english: 'Year' },
    { id: 'time5', olChiki: 'ᱴᱟᱲᱟᱝ', transliteration: 'tadang', english: 'Hour' },
    { id: 'time6', olChiki: 'ᱴᱤᱯᱤᱡ', transliteration: 'tipij', english: 'Minute' },
    { id: 'time7', olChiki: 'ᱴᱤᱡ', transliteration: 'tij', english: 'Second' },
  ],
  "Other Common Words": [
    { id: 'o1', olChiki: 'ᱤᱥᱠᱩᱞ', transliteration: 'iskul', english: 'School' },
    { id: 'o2', olChiki: 'ᱵᱟᱡᱟᱨ', transliteration: 'bajar', english: 'Market' },
    { id: 'o3', olChiki: 'ᱦᱚᱲ', transliteration: 'hɔṛ', english: 'Person/Man' },
    { id: 'o4', olChiki: 'ᱟᱹᱛᱩ', transliteration: 'ạtu', english: 'Village' },
    { id: 'o5', olChiki: 'ᱧᱩᱛᱟᱹ', transliteration: 'ñutạ̈', english: 'Night' },
    { id: 'o6', olChiki: 'ᱥᱮᱛᱟᱜ', transliteration: 'setag', english: 'Morning' },
    { id: 'o7', olChiki: 'ᱟᱭᱩᱵ', transliteration: 'ayub', english: 'Evening' },
    { id: 'o8', olChiki: 'ᱮᱱᱮᱭ', transliteration: 'eney', english: 'dance' },
  ],
  "Expanded General Vocabulary": expandedGeneralVocabulary,
};


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
  return `${englishTensWords[tensDigit]}-${englishUnitWords[unitDigit].toLowerCase()}`;
}

function getSantaliWord(n: number): string {
    if (n < 0 || n > 100) return "";
    if (n === 0) return santaliUnitWords[0]; // Sun
    if (n > 0 && n < 10) return santaliUnitWords[n]; // Mit', Bar, Pe...

    if (n === 10) return "Gel";
    if (n > 10 && n < 20) return `Gel ${santaliUnitWords[n % 10]}`; // Gel Mit', Gel Bar...

    if (n === 20) return "Isi";
    if (n > 20 && n < 30) return `Isi ${santaliUnitWords[n % 10]}`; // Isi Mit', Isi Bar...

    const tensDigit = Math.floor(n / 10);
    const unitDigit = n % 10;

    if (unitDigit === 0 && n >= 30 && n < 100) {
        return `${santaliUnitWords[tensDigit]} Gel`; // Pe Gel, Pun Gel...
    }
    if (n >= 30 && n < 100 && unitDigit !== 0) {
        return `${santaliUnitWords[tensDigit]} Gel ${santaliUnitWords[unitDigit]}`;
    }

    if (n === 100) return "Say";
    return "";
}


function getOlChikiNumeral(n: number): string {
  if (n < 0 || n > 100) return "";
  if (n === 100) return olChikiUnitGlyphs[1] + olChikiUnitGlyphs[0] + olChikiUnitGlyphs[0]; // ᱑᱐᱐

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

// Flatten all words for dictionary search or quiz generation
export const allOlChikiWords: OlChikiWord[] = Object.values(categorizedOlChikiWords).flat();

    