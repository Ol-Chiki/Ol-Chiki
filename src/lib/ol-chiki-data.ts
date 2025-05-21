
import type { OlChikiCharacter,  OlChikiWord, OlChikiNumber,  SantaliNamePart } from '@/types/ol-chiki';

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
  { id: 'c19', olChiki: 'ᱬ', transliteration: 'UNN', pronunciation: '/ɳ/' }, // MU TURDAH
  { id: 'c20', olChiki: 'ᱭ', transliteration: 'UY', pronunciation: '/j/' },
  { id: 'c21', olChiki: 'ᱮ', transliteration: 'LE', pronunciation: '/e/' },
  { id: 'c22', olChiki: 'ᱯ', transliteration: 'EP', pronunciation: '/p/' },
  { id: 'c23', olChiki: 'ᱰ', transliteration: 'EDD', pronunciation: '/ɖ/' }, // AMBAR
  { id: 'c24', olChiki: 'ᱱ', transliteration: 'EN', pronunciation: '/n/' },
  { id: 'c25', olChiki: 'ᱲ', transliteration: 'ERR', pronunciation: '/ɽ/' }, // AHAD
  { id: 'c26', olChiki: 'ᱳ', transliteration: 'LO', pronunciation: '/o/' },
  { id: 'c27', olChiki: 'ᱴ', transliteration: 'OTT', pronunciation: '/ʈ/' },
  { id: 'c28', olChiki: 'ᱵ', transliteration: 'OB', pronunciation: '/b/' },
  { id: 'c29', olChiki: 'ᱶ', transliteration: 'OV', pronunciation: '/w̃/' }, // Abnao
  { id: 'c30', olChiki: 'ᱷ', transliteration: 'OH', pronunciation: '/ʰ/' }  // OWAH
];


// Helper function to convert user-provided Roman keys to Ol Chiki
function convertRomanKeyToOlChiki(romanKey: string): string {
  let olChikiString = "";
  const key = romanKey.toUpperCase(); 

  const romanMap: { [key: string]: string } = {
    // Prioritize longer sequences before single characters
    "A:": "ᱟᱸ", "E:": "ᱮᱸ", "I:": "ᱤᱸ", "O:": "ᱳᱸ", "U:": "ᱩᱸ", "o:": "ᱚᱸ",
    "I~": "ᱤᱧ", "U~": "ᱩᱧ", "E~": "ᱮᱧ",
    "NG": "ᱝ", "NJ": "ᱧ", "NDX": "ᱬ",
    "DD": "ᱰ", "TT": "ᱴ", "RR": "ᱲ",
    "CH": "ᱪ", "KH": "ᱠᱷ", "GH": "ᱜᱷ", "JH": "ᱡᱷ", "DH": "ᱫᱷ", "TH": "ᱛᱷ", 
    "PH": "ᱯᱷ", "BH": "ᱵᱷ",
    "A": "ᱟ", "B": "ᱵ", "C": "ᱪ", "D": "ᱫ", "E": "ᱮ", "F": "ᱝ", "G": "ᱜ", "H": "ᱦ",
    "I": "ᱤ", "J": "ᱡ", "K": "ᱠ", "L": "ᱞ", "M": "ᱢ", "N": "ᱱ", "O": "ᱳ",
    "P": "ᱯ", "Q": "ᱧ", "R": "ᱨ", "S": "ᱥ", "T": "ᱛ", "U": "ᱩ", "V": "ᱶ",
    "W": "ᱣ", "X": "ᱽ", "Y": "ᱭ", "Z": "ᱲ",
    // Lowercase specific mappings
    "o": "ᱚ", 
    // Punctuation
    ".": "ᱹ", // AHAD
    "_": " ", // Space
    // Ensure digits are not converted if they appear in Roman keys (e.g., if part of an ID accidentally)
    "0":"᱐", "1":"᱑", "2":"᱒", "3":"᱓", "4":"᱔", "5":"᱕", "6":"᱖", "7":"᱗", "8":"᱘", "9":"᱙"
  };

  let i = 0;
  while (i < key.length) {
    let matched = false;
    // Check for 3-character sequences (like NDX)
    if (i + 2 < key.length) {
      const threeCharSeq = key.substring(i, i + 3);
      if (romanMap[threeCharSeq]) {
        olChikiString += romanMap[threeCharSeq];
        i += 3;
        matched = true;
      }
    }
    // Check for 2-character sequences
    if (!matched && i + 1 < key.length) {
      const twoCharSeq = key.substring(i, i + 2);
      if (romanMap[twoCharSeq]) {
        olChikiString += romanMap[twoCharSeq];
        i += 2;
        matched = true;
      }
    }
    // Check for 1-character sequences
    if (!matched) {
      const oneChar = key[i];
      if (romanMap[oneChar]) {
        olChikiString += romanMap[oneChar];
      } else {
        // If no specific mapping, append the original character (from original romanKey to preserve case)
        olChikiString += romanKey[i];
      }
      i += 1;
    }
  }
  return olChikiString;
}


let expandedGeneralVocabulary: OlChikiWord[] = [
  { id: 'egv1', olChiki: 'ᱚᱴ', transliteration: 'oT', english: 'n. earth; ground;' },
  { id: 'egv2', olChiki: 'ᱚᱴᱱᱚ', transliteration: 'oTno', english: 'n. geography;' },
  { id: 'egv3', olChiki: 'ᱚᱴᱟ', transliteration: 'oTA', english: 'vt. to press;' },
  // egv4 was duplicate of oTno
  { id: 'egv5', olChiki: 'ᱚᱞ', transliteration: 'oL', english: 'n. writing; vt., vi. to write;' },
  { id: 'egv6', olChiki: 'ᱚᱠᱛᱚ', transliteration: 'oKTo', english: 'n. time;' },
  { id: 'egv7', olChiki: 'ᱚᱱᱚᱞᱤᱭᱟᱹ', transliteration: 'onoLIYA.', english: 'n. writer;' },
  { id: 'egv8', olChiki: 'ᱚᱱᱚᱜ', transliteration: 'onoG', english: 'adj. intransitive;' },
  { id: 'egv9', olChiki: 'ᱚᱱᱚᱲ', transliteration: 'onoZ', english: 'n. preface;' },
  { id: 'egv10', olChiki: 'ᱛᱚᱣᱟ', transliteration: 'ToWA', english: 'n. milk;' },
  { id: 'egv11', olChiki: 'ᱛᱚᱨᱚᱱ', transliteration: 'ToRon', english: 'n. kind(of);' },
  { id: 'egv12', olChiki: 'ᱛᱚᱱᱚᱝ', transliteration: 'TonoF', english: 'n. conjunction;' },
  { id: 'egv13', olChiki: 'ᱛᱚᱱᱚᱲ', transliteration: 'TonoZ', english: 'n. adverb;' },
  { id: 'egv14', olChiki: 'ᱛᱟᱨ', transliteration: 'TAR', english: 'n. wire;' },
  { id: 'egv15', olChiki: 'ᱛᱟᱯᱟᱢ', transliteration: 'TAPAm', english: 'n. fight; vi. to fight;' },
  { id: 'egv16', olChiki: 'ᱛᱟᱱᱷᱮᱱ', transliteration: 'TANhEn', english: 'vi. to live;' },
  { id: 'egv17', olChiki: 'ᱛᱟᱹᱨᱩᱵ', transliteration: 'TA.RUB', english: 'n. tiger;' },
  { id: 'egv18', olChiki: 'ᱛᱩᱨᱩᱭ', transliteration: 'TURUY', english: 'n., adj. six;' },
  { id: 'egv19', olChiki: 'ᱛᱩᱨᱩᱭᱟᱜ', transliteration: 'TURUYAG', english: 'adj. sixth (pointing to an inanimate object);' },
  { id: 'egv20', olChiki: 'ᱛᱩᱨᱩᱭᱤᱡ', transliteration: 'TURUYIJ', english: 'adj. sixth (pointing to an animate object);' },
  { id: 'egv21', olChiki: 'ᱛᱩᱭᱩ', transliteration: 'TUYU', english: 'n. fox;' },
  { id: 'egv22', olChiki: 'ᱛᱮᱥᱟᱨ', transliteration: 'TESAR', english: 'adj. third;' },
  { id: 'egv23', olChiki: 'ᱛᱮᱥᱟᱨᱟᱜ', transliteration: 'TESARAG', english: 'adj. third (pointing to an inanimate object);' },
  { id: 'egv24', olChiki: 'ᱛᱮᱥᱟᱨᱤᱡ', transliteration: 'TESARIJ', english: 'adj. third (pointing to an inanimate object);' },
  // egv25 was duplicate of ToWA
  { id: 'egv26', olChiki: 'ᱛᱷᱟᱨ', transliteration: 'THAR', english: 'n. arrangement of objects in a straight line; TINGU THAR – n. column; GITIJ THAR – n. row;' },
  { id: 'egv27', olChiki: 'ᱜᱚᱨᱚᱱ', transliteration: 'GoRon', english: 'n. person ( in grammar); mAMAF GoRon – n. first person; SAmAF GoRon – n. second person; SA:GIQ GoRon – n. third person;' },
  { id: 'egv28', olChiki: 'ᱜᱚᱛᱟᱱ', transliteration: 'GotAn', english: 'n. number of a word(in grammar) characterized as noun, pronoun or verb; mID GotAn – n. singular number; BAR GotAn – n. dual number; SANGE GotAn – n. plural number;' },
  { id: 'egv29', olChiki: 'ᱜᱟᱵᱟᱱ', transliteration: 'GABAn', english: 'n. composition; vt. to compose;' },
  { id: 'egv30', olChiki: 'ᱜᱟᱨ', transliteration: 'GAR', english: 'n. line;' },
  { id: 'egv31', olChiki: 'ᱜᱟᱸᱱᱟᱹᱛ', transliteration: 'GA:nA.t', english: 'n. postposition;' },
  { id: 'egv32', olChiki: 'ᱜᱮᱞ', transliteration: 'GEL', english: 'n., adj. ten;' },
  { id: 'egv33', olChiki: 'ᱜᱮᱞᱟᱜ', transliteration: 'GELAG', english: 'adj. tenth (pointing to an inanimate object);' },
  { id: 'egv34', olChiki: 'ᱜᱮᱞᱤᱡ', transliteration: 'GELIJ', english: 'adj. tenth (pointing to an animate object);' },
  { id: 'egv35', olChiki: 'ᱜᱤᱛᱤᱡ ᱛᱷᱟᱨ', transliteration: 'GITIJ THAR', english: 'n. row;' },
  { id: 'egv36', olChiki: 'ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'GIDX_RA.', english: 'n. child;' },
  { id: 'egv37', olChiki: 'ᱜᱩᱫᱩ', transliteration: 'GUdU', english: 'n. big rat; big mouse;' },
  { id: 'egv38', olChiki: 'ᱜᱩᱱᱩᱱ', transliteration: 'GUnUn', english: 'n. adjective;' },
  { id: 'egv39', olChiki: 'ᱞᱚᱜᱚᱱ', transliteration: 'LoGon', english: 'adv. fast;' },
  { id: 'egv40', olChiki: 'ᱞᱚᱜᱚᱱ ᱞᱚᱜᱚᱱ', transliteration: 'LoGon_LoGon', english: 'adv. very fast;' },
  { id: 'egv41', olChiki: 'ᱞᱚᱥᱚᱫ', transliteration: 'LoSoD', english: 'n. mud; adj. muddy; vt. to make someone or something muddy; vi. to become muddy;' },
  { id: 'egv42', olChiki: 'ᱞᱟᱱᱫᱟ', transliteration: 'LANDA', english: 'n. smile; vi. to laugh; to smile;' },
  { id: 'egv43', olChiki: 'ᱞᱟᱹᱲᱷᱟᱹᱭ', transliteration: 'LA.ZhA.Y', english: 'n. war;' },
  { id: 'egv44', olChiki: 'ᱞᱤᱞ', transliteration: 'LIL', english: 'adj. blue; vt. to make someone or something blue; vi. to become blue;' },
  { id: 'egv45', olChiki: 'ᱞᱮᱠᱷᱟ', transliteration: 'LEKHA', english: 'n. number; vt. to count;' },
  { id: 'egv46', olChiki: 'ᱟᱜᱟᱢ', transliteration: 'AGAm', english: 'adj. future;' },
  { id: 'egv47', olChiki: 'ᱟᱥᱱᱟ', transliteration: 'ASnA', english: 'n. school;' },
  { id: 'egv48', olChiki: 'ᱟᱨᱟᱜ', transliteration: 'ARAG', english: 'adj. red; vt. to make someone or something red; vi. to become red;' },
  { id: 'egv49', olChiki: 'ᱟᱨᱮ', transliteration: 'ARE', english: 'n., adj. nine;' },
  { id: 'egv50', olChiki: 'ᱟᱨᱮᱭᱟᱜ', transliteration: 'AREYAG', english: 'adj. ninth (pointing to an inanimate object);' },
  { id: 'egv51', olChiki: 'ᱟᱨᱮᱭᱤᱡ', transliteration: 'AREYIJ', english: 'adj. ninth (pointing to an animate object);' },
  { id: 'egv52', olChiki: 'ᱟᱲᱟᱝ', transliteration: 'AZAF', english: 'n. pronunciation of a letter or alphabet; voice of a person; RAhA AZAF – n. vowel; KECED AZAF – n. consonant; PARhAZ KECED AZAF – n. unaspirated consonant; TA.PUG KECED AZAF – n. semi-consonant or glottalized consonant; RAZAF KECED AZAF – n. nasal consonant; JETLED KECED AZAF – n. sticky consonant;' },
  { id: 'egv53', olChiki: 'ᱟᱸᱜᱚᱪ', transliteration: 'ANGoC', english: 'vt. to include;' },
  { id: 'egv54', olChiki: 'ᱟᱹᱛᱩ', transliteration: 'A.TU', english: 'n. village; vt. to wash away; vi. to get washed away;' },
  { id: 'egv55', olChiki: 'ᱟᱹᱜᱩ', transliteration: 'A.GU', english: 'vt. to bring;' },
  { id: 'egv56', olChiki: 'ᱟᱹᱭᱟᱹᱛ', transliteration: 'A.YA.T', english: 'n. sentence;' },
  { id: 'egv57', olChiki: 'ᱟᱹᱲᱟᱹ', transliteration: 'A.ZA.', english: 'n. word;' },
  { id: 'egv58', olChiki: 'ᱠᱚᱨᱟᱣ', transliteration: 'KoRAW', english: 'vt. to do;' },
  { id: 'egv59', olChiki: 'ᱠᱚᱱᱢ', transliteration: 'KoNM', english: 'n. angle;' },
  { id: 'egv60', olChiki: 'ᱠᱚᱱᱟ', transliteration: 'KonA', english: 'n. angle;' },
  { id: 'egv61', olChiki: 'ᱠᱚᱲᱟ', transliteration: 'KoZA', english: 'n. man; adj. young;' },
  { id: 'egv62', olChiki: 'ᱠᱚᱲᱟ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'KoZA GIDX_RA.', english: 'n. boy;' },
  { id: 'egv63', olChiki: 'ᱠᱟᱱᱣᱟ', transliteration: 'KAnWA', english: 'n. verb;' },
  { id: 'egv64', olChiki: 'ᱠᱟᱹᱢᱤ', transliteration: 'KA.mI', english: 'n. work; function; adj. working; vt. to do; to work;' },
  { id: 'egv65', olChiki: 'ᱠᱟᱹᱱᱩᱱ', transliteration: 'KA.nUn', english: 'n. law;' },
  { id: 'egv66', olChiki: 'ᱠᱩᱲᱤᱧ', transliteration: 'KUZI~', english: 'n. woman; adj. young;' }, // Changed from KoZI~ to KUZI~
  { id: 'egv67', olChiki: 'ᱠᱩᱲᱤᱧ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'KUZI~ GIDX_RA.', english: 'n. girl;' },
  { id: 'egv68', olChiki: 'ᱠᱮᱪᱮᱫ ᱟᱲᱟᱝ', transliteration: 'KECED AZAF', english: 'n. consonant; PARhAZ KECED AZAF – n. unaspirated consonant; TA.PUG KECED AZAF – n. semi-consonant or glottalized consonant; RAZAF KECED AZAF – n. nasal consonant; JETLED KECED AZAF – n. sticky consonant;' },
  { id: 'egv69', olChiki: 'ᱠᱷᱚᱵᱚᱨ', transliteration: 'KHoBoR', english: 'n. news; vi. to give news;' },
  { id: 'egv70', olChiki: 'ᱠᱷᱚᱧᱡᱟ', transliteration: 'KHoNJA', english: 'n. join; joint; vt. to join;' },
  { id: 'egv71', olChiki: 'ᱡᱚᱛᱚ', transliteration: 'JoTo', english: 'adj. all;' },
  { id: 'egv72', olChiki: 'ᱡᱚᱛᱚᱥ', transliteration: 'JoToS', english: 'n. object (in grammar); adj. with object;' },
  { id: 'egv73', olChiki: 'ᱡᱚᱢ', transliteration: 'Jom', english: 'n. eatable; food; vt. to eat; vi. to take food;' },
  { id: 'egv74', olChiki: 'ᱡᱚᱢᱟᱜ', transliteration: 'JomAG', english: 'n. eatable; food;' },
  { id: 'egv75', olChiki: 'ᱡᱚᱢ ᱧᱩᱧ', transliteration: 'Jom_QU~', english: 'n. eatable; food; vi. to take food;' },
  { id: 'egv76', olChiki: 'ᱡᱚᱢ ᱧᱩᱣᱟᱜ', transliteration: 'Jom_QUWAG', english: 'n. eatable; food;' },
  { id: 'egv77', olChiki: 'ᱡᱟᱝ', transliteration: 'JAF', english: 'n. bone; root; seed;' }, // Corrected Ol Chiki for JAF based on "bone"
  { id: 'egv78', olChiki: 'ᱡᱟᱠᱟᱛ', transliteration: 'JAKAT', english: 'adj. all;' },
  { id: 'egv79', olChiki: 'ᱡᱟᱣᱨᱟ', transliteration: 'JAWRA', english: 'n. set; collection; vt. to collect; to gather; vi. to assemble; to gather;' },
  { id: 'egv80', olChiki: 'ᱡᱟᱨᱣᱟ', transliteration: 'JARWA', english: 'n. set; collection; vt. to collect; to gather; vi. to assemble; to gather;' },
  { id: 'egv81', olChiki: 'ᱡᱟᱭᱜᱟ', transliteration: 'JAYGA', english: 'n. space; place; vt. to give someone a place for sleeping or sitting; vi. place oneself;' },
  { id: 'egv82', olChiki: 'ᱡᱟᱱᱟᱝ', transliteration: 'JAnAF', english: 'n. gender; KoZA JAnAF – n. masculine gender; KUZI JAnAF – n. feminine gender; hAD JAnAF – n. neuter gender; JA.T JAnAF – n. common gender;' },
  { id: 'egv83', olChiki: 'ᱡᱟᱱᱣᱚᱨ', transliteration: 'JAnWoR', english: 'n. animal;' },
  { id: 'egv84', olChiki: 'ᱡᱟᱹᱯᱤᱫ', transliteration: 'JA.PID', english: 'n. sleep; vi. to sleep;' },
  { id: 'egv85', olChiki: 'ᱡᱤᱞ', transliteration: 'jil_meat', english: 'n. meat;' }, 
  { id: 'egv86', olChiki: 'ᱡᱤᱣᱤᱧ', transliteration: 'JIWI~', english: 'n. life; soul;' },
  { id: 'egv87', olChiki: 'ᱡᱤᱦᱚᱞ', transliteration: 'JIhoL', english: 'n. jail; prison; vt. to imprison;' },
  { id: 'egv88', olChiki: 'ᱡᱤᱱᱤᱥ', transliteration: 'JInIS', english: 'n. thing;' },
  { id: 'egv89', olChiki: 'ᱡᱤᱵᱚᱱ', transliteration: 'JIBon', english: 'n. life;' },
  { id: 'egv90', olChiki: 'ᱡᱤᱧ', transliteration: 'JI~_smell', english: 'vt. to smell;' },
  { id: 'egv91', olChiki: 'ᱡᱩᱛᱟᱹ', transliteration: 'JUTA.', english: 'n. shoe;' },
  { id: 'egv92', olChiki: 'ᱡᱩᱫᱽᱫᱷᱚᱧ', transliteration: 'JUDXDHo~', english: 'n. war;' }, // Corrected based on XDHo
  { id: 'egv93', olChiki: 'ᱡᱩᱲᱩ', transliteration: 'JUZU', english: 'n. quotient; share; vt. to divide;' },
  { id: 'egv94', olChiki: 'ᱡᱷᱟᱹᱞ', transliteration: 'JHA.L', english: 'n. length; adj. long; vt. to lengthen;' },
  { id: 'egv95', olChiki: 'ᱢᱚᱨᱟ', transliteration: 'moRA', english: 'adj. slim; vt. to make someone or something slim; vi. to become slim;' },
  { id: 'egv96', olChiki: 'ᱢᱚᱬᱮ', transliteration: 'moME', english: 'n., adj. five;' },
  { id: 'egv97', olChiki: 'ᱢᱚᱬᱮ ᱜᱚᱴᱮᱡ', transliteration: 'moME GotEJ', english: 'adj. five;' },
  { id: 'egv98', olChiki: 'ᱢᱚᱬᱮᱭᱟᱜ', transliteration: 'moMEYAG', english: 'adj. fifth (pointing to an inanimate object);' },
  { id: 'egv99', olChiki: 'ᱢᱚᱬᱮᱭᱤᱡ', transliteration: 'moMEYIJ', english: 'adj. fifth (pointing to an animate object);' },
  { id: 'egv100', olChiki: 'ᱢᱚᱱᱛᱨᱤ', transliteration: 'monTRI', english: 'n. minister;' },
  { id: 'egv101', olChiki: 'ᱢᱚᱛᱟ', transliteration: 'motA', english: 'adj. fat; vi. to become fat;' },
  { id: 'egv102', olChiki: 'ᱢᱟᱨᱟᱝ', transliteration: 'mARAF', english: 'adj. big, great, prime, elder; vt. to make someone or something big; vi. to become big;' },
  { id: 'egv103', olChiki: 'ᱢᱟᱨᱟᱝ ᱢᱚᱱᱛᱨᱤ', transliteration: 'mARAF monTRI', english: 'n. prime minister;' },
  { id: 'egv104', olChiki: 'ᱢᱟᱨᱮ', transliteration: 'mARE', english: 'adj. old; vi. to become old;' },
  { id: 'egv105', olChiki: 'ᱢᱟᱨᱮᱱᱟᱜ', transliteration: 'mAREnAG', english: 'adj. old;' },
  { id: 'egv106', olChiki: 'ᱢᱟᱪᱮᱛ', transliteration: 'mACET', english: 'n. teacher;' },
  { id: 'egv107', olChiki: 'ᱢᱟᱬᱟᱝ', transliteration: 'mAMAF', english: 'adj. first; previous;' }, // Corrected Ol Chiki for MAMAF
  { id: 'egv108', olChiki: 'ᱢᱟᱬᱟᱝᱟᱜ', transliteration: 'mAMAFAG', english: 'adj. first (pointing to an inanimate object);' },
  { id: 'egv109', olChiki: 'ᱢᱟᱬᱟᱝᱤᱡ', transliteration: 'mAMAFIJ', english: 'adj. first (pointing to an animate object);' },
  { id: 'egv110', olChiki: 'ᱢᱟᱹᱭ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'mA.Y GIDX_RA.', english: 'n. girl;' },
  { id: 'egv111', olChiki: 'ᱢᱤᱪᱷᱤᱞ', transliteration: 'mICHIL', english: 'n. procession;' },
  { id: 'egv112', olChiki: 'ᱢᱤᱫ', transliteration: 'mID', english: 'n., adj. one;' },
  { id: 'egv113', olChiki: 'ᱢᱤᱫᱟᱜ', transliteration: 'mIDAG', english: 'adj. first;' },
  { id: 'egv114', olChiki: 'ᱢᱤᱫᱤᱡ', transliteration: 'mIDIJ', english: 'adj. first;' },
  { id: 'egv115', olChiki: 'ᱢᱤᱫᱩᱱ', transliteration: 'mIDUn', english: 'n. meeting;' },
  { id: 'egv116', olChiki: 'ᱢᱤᱫᱛᱤᱡ', transliteration: 'mIDtIJ', english: 'adj. one;' },
  { id: 'egv117', olChiki: 'ᱢᱩᱛᱟᱹᱱ', transliteration: 'mUTA.n', english: 'n. subject;' },
  { id: 'egv118', olChiki: 'ᱢᱩᱪᱟᱹᱫ', transliteration: 'mUCA.D', english: 'n. end; full stop; vt., vi. to end;' },
  { id: 'egv119', olChiki: 'ᱢᱮᱱ', transliteration: 'mEn', english: 'vt. to speak; to tell; vi. to speak;' },
  { id: 'egv120', olChiki: 'ᱤᱛᱟᱹ', transliteration: 'ITA.', english: 'n. seed; vi. to use as seed;' },
  { id: 'egv121', olChiki: 'ᱤᱛᱤᱞ', transliteration: 'ITIL', english: 'n. fat; vi. to become fat;' },
  { id: 'egv122', olChiki: 'ᱤᱨᱟᱹᱞ', transliteration: 'IRA.L', english: 'n., adj. eight;' },
  { id: 'egv123', olChiki: 'ᱤᱨᱟᱹᱞᱟᱜ', transliteration: 'IRA.LAG', english: 'adj. eighth (pointing to an inanimate object);' },
  { id: 'egv124', olChiki: 'ᱤᱨᱟᱹᱞᱤᱡ', transliteration: 'IRA.LIJ', english: 'adj. eighth (pointing to an animate object);' },
  { id: 'egv125', olChiki: 'ᱤᱫᱤ', transliteration: 'IDI', english: 'vt. to take;' },
  { id: 'egv126', olChiki: 'ᱥᱚᱢᱚᱭ', transliteration: 'SomoY', english: 'n. time;' },
  { id: 'egv127', olChiki: 'ᱥᱚᱧ', transliteration: 'So~_smell', english: 'n. smell; vi. to smell;' },
  { id: 'egv128', olChiki: 'ᱥᱟᱦᱛᱟ', transliteration: 'SAhtA', english: 'n. page;' },
  { id: 'egv129', olChiki: 'ᱥᱟᱨᱜᱟ', transliteration: 'SARGA', english: 'n. medium size rat;' },
  { id: 'egv130', olChiki: 'ᱥᱟᱨᱮᱡ', transliteration: 'SAREJ', english: 'n. remainder; adj. left out; vt., vi. to leave out;' },
  { id: 'egv131', olChiki: 'ᱥᱟᱪᱟᱨᱷᱮ', transliteration: 'SACARhE', english: 'n. environment;' },
  { id: 'egv132', olChiki: 'ᱥᱟᱫᱮ', transliteration: 'SAdE', english: 'n. sound; vi. to make sound;' },
  { id: 'egv133', olChiki: 'ᱥᱟᱱᱟᱢ', transliteration: 'SAnAm', english: 'adj. all;' },
  { id: 'egv134', olChiki: 'ᱥᱟᱲᱮ', transliteration: 'SAZE', english: 'n. sound; vi. to make sound;' }, // Corrected Ol Chiki for SAZE
  { id: 'egv135', olChiki: 'ᱥᱟᱣᱛᱟ', transliteration: 'SAVTA', english: 'n. society;' },
  { id: 'egv136', olChiki: 'ᱥᱟᱣᱦᱮᱫ', transliteration: 'SAVhED', english: 'n. literature;' },
  { id: 'egv137', olChiki: 'ᱥᱟᱱᱢᱮᱥ', transliteration: 'SANMES', english: 'n. science;' },
  { id: 'egv138', olChiki: 'ᱥᱟᱹᱛ', transliteration: 'SA.T', english: 'vt. to finish; to complete;' },
  { id: 'egv139', olChiki: 'ᱥᱟᱹᱛᱟᱹᱱ', transliteration: 'SA.TA.n', english: 'adj. perfect; completed;' },
  { id: 'egv140', olChiki: 'ᱥᱟᱹᱜᱟᱹᱭ', transliteration: 'SA.GA.Y', english: 'n. relation;' },
  { id: 'egv141', olChiki: 'ᱥᱟᱹᱨᱤ ᱠᱟᱛᱷᱟ', transliteration: 'SA.RI KATHA', english: 'n. fact; truth;' },
  { id: 'egv142', olChiki: 'ᱥᱟᱸᱜᱤᱧ', transliteration: 'SA:GIQ', english: 'adj. far; distant;' }, // Corrected Ol Chiki for SA:GIQ
  { id: 'egv143', olChiki: 'ᱥᱤᱨᱟᱹ ᱢᱚᱱᱛᱨᱤ', transliteration: 'SIRA. monTRI', english: 'n. chief minister;' },
  { id: 'egv144', olChiki: 'ᱥᱩᱛᱨᱮᱛ', transliteration: 'SUTRET', english: 'n. secretary; JoGo SUTRET – n. assistant secretary;' },
  { id: 'egv145', olChiki: 'ᱥᱩᱱᱩᱢ', transliteration: 'SUnUm', english: 'n. oil; vt. to oil; to lubricate;' },
  { id: 'egv146', olChiki: 'ᱥᱮᱞᱮᱫ', transliteration: 'SELED', english: 'n. addition; vt. to add;' },
  { id: 'egv147', olChiki: 'ᱥᱮᱢᱞᱮᱫ', transliteration: 'SEmLED', english: 'n. association;' },
  { id: 'egv148', olChiki: 'ᱥᱮᱫ', transliteration: 'SED', english: 'n. direction;' },
  { id: 'egv149', olChiki: 'ᱥᱮᱫᱟᱭ', transliteration: 'SEDAY', english: 'n. ancient past; adj. in the ancient past;' },
  { id: 'egv150', olChiki: 'ᱥᱮᱱ', transliteration: 'SEn', english: 'vi. to go;' },
  { id: 'egv151', olChiki: 'ᱥᱮᱸᱜᱮᱹᱞ', transliteration: 'SE:GE.L', english: 'n. fire;' },
  { id: 'egv152', olChiki: 'ᱥᱮᱸᱜᱮᱹᱞ ᱵᱩᱨᱩ', transliteration: 'SE:GE.L BURU', english: 'n. volcano;' },
  { id: 'egv153', olChiki: 'ᱥᱮᱸᱢᱟ', transliteration: 'SE:MA', english: 'adj. big, great; vt. to make someone or something big; vi. to become big;' },
  { id: 'egv154', olChiki: 'ᱦᱚᱯᱚᱱ', transliteration: 'hoPon', english: 'n. child; adj. small; used to qualify younger relative as in hoPon BABA(younger uncle);' },
  { id: 'egv155', olChiki: 'ᱦᱚᱲ', transliteration: 'hoZ', english: 'n. human being; person; a man of our community;' },
  { id: 'egv156', olChiki: 'ᱦᱟᱥᱟ', transliteration: 'hASA', english: 'n. soil; vi. to become dirty;' },
  { id: 'egv157', olChiki: 'ᱦᱟᱱᱟᱣ', transliteration: 'hAnAW', english: 'n. interjection;' },
  { id: 'egv158', olChiki: 'ᱦᱟᱲᱟ', transliteration: 'hAZA', english: 'n. quotient;' }, // Corrected Ol Chiki for hAZA
  { id: 'egv159', olChiki: 'ᱦᱟᱛᱟᱬᱷᱟ', transliteration: 'hAtAMhA', english: 'n. divider;' }, // Corrected Ol Chiki for hAtAMhA
  { id: 'egv160', olChiki: 'ᱦᱟᱛᱟᱬᱪᱟ', transliteration: 'hAtAMCA', english: 'n. dividend;' }, // Corrected Ol Chiki for hAtAMCA
  { id: 'egv161', olChiki: 'ᱦᱟᱛᱟᱬᱥᱟ', transliteration: 'hAtAMSA', english: 'n. remainder;' }, // Corrected Ol Chiki for hAtAMSA
  { id: 'egv162', olChiki: 'ᱦᱟᱹᱠᱩ', transliteration: 'hA.KU', english: 'n. fish;' },
  { id: 'egv163', olChiki: 'ᱦᱟᱹᱛᱤᱧ', transliteration: 'hA.tIQ', english: 'n. share; vt. to divide;' },
  { id: 'egv164', olChiki: 'ᱦᱮᱫᱮᱡ', transliteration: 'hEdEJ', english: 'vt., vi. to boil; adj. boiled;' },
  { id: 'egv165', olChiki: 'ᱦᱮᱸᱫᱮᱹ', transliteration: 'hE:DE.', english: 'adj. black; vt. to blacken; vi. to become black;' },
  { id: 'egv166', olChiki: 'ᱦᱮᱸᱫᱮᱹᱡ', transliteration: 'hE:dE.J', english: 'vt., vi. to boil; adj. boiled;' },
  { id: 'egv167', olChiki: 'ᱦᱩᱫᱤᱧ', transliteration: 'hUdIQ', english: 'adj. small; vt. to make someone or something small; vi. to become small;' },
  { id: 'egv168', olChiki: 'ᱧᱟᱯᱟᱢ', transliteration: 'QAPAm', english: 'vi. to meet;' }, // Corrected Ol Chiki for QAPAm
  { id: 'egv169', olChiki: 'ᱧᱩᱧ', transliteration: 'QU~_drink', english: 'adj. drinkable; vt. to drink; to smoke;' },
  { id: 'egv170', olChiki: 'ᱧᱩᱛᱩᱢ', transliteration: 'QUTUm', english: 'n. name; vt. to name;' },
  { id: 'egv171', olChiki: 'ᱧᱩᱨ', transliteration: 'QUR', english: 'vt. to drop; vi. to drop; to fall;' },
  { id: 'egv172', olChiki: 'ᱧᱩᱱᱩᱢ', transliteration: 'QUnUm', english: 'n. pronoun;' }, // Assuming QUnUm from previous list
  { id: 'egv173', olChiki: 'ᱧᱮᱞ', transliteration: 'QEL', english: 'vt. to see; vi. to have the ability to see; to see oneself; to become visible;' },
  { id: 'egv174', olChiki: 'ᱧᱮᱪᱮᱞ', transliteration: 'QECEL', english: 'n. example;' },
  { id: 'egv175', olChiki: 'ᱨᱚᱝ', transliteration: 'RoF', english: 'n., vt. colour; vi. to become colourful;' },
  { id: 'egv176', olChiki: 'ᱨᱚᱦᱚᱲ', transliteration: 'RohoZ', english: 'adj. dry; vt., vi. to dry;' },
  { id: 'egv177', olChiki: 'ᱨᱚᱱᱚᱲ', transliteration: 'RonoZ', english: 'n. grammar;' },
  { id: 'egv178', olChiki: 'ᱨᱚᱲ', transliteration: 'RoZ', english: 'n. language; vt to speak; to tell; vi. to speak; to talk;' },
  { id: 'egv179', olChiki: 'ᱨᱚᱛᱮ', transliteration: 'RotE', english: 'n. frog;' },
  { id: 'egv180', olChiki: 'ᱨᱚᱧ', transliteration: 'Ro~_fly', english: 'n. fly;' },
  { id: 'egv181', olChiki: 'ᱨᱟᱜ', transliteration: 'RAG', english: 'n. cry; vi. to cry; to weep;' },
  { id: 'egv182', olChiki: 'ᱨᱟᱱ', transliteration: 'RAn', english: 'n. medicine; vt. to treat someone with medicine;' },
  { id: 'egv183', olChiki: 'ᱨᱟᱦᱟ ᱟᱲᱟᱝ', transliteration: 'RAhA AZAF', english: 'n. vowel;' },
  { id: 'egv184', olChiki: 'ᱨᱟᱹᱯᱩᱫ', transliteration: 'RA.PUD', english: 'adj. broken; vt., vi. to break;' },
  { id: 'egv185', olChiki: 'ᱨᱟᱹᱱᱤ', transliteration: 'RA.nI', english: 'n. queen;' },
  { id: 'egv186', olChiki: 'ᱨᱮᱦᱮᱫ', transliteration: 'REhED', english: 'n. root;' },
  { id: 'egv187', olChiki: 'ᱨᱩᱯ', transliteration: 'RUP', english: 'n. form; figure;' },
  { id: 'egv188', olChiki: 'ᱩᱧᱩᱢ', transliteration: 'UQUm', english: 'n. pronoun;' }, // Corrected Ol Chiki for UQUm
  { id: 'egv189', olChiki: 'ᱩᱥᱩᱞ', transliteration: 'USUL', english: 'adj. tall;' },
  { id: 'egv190', olChiki: 'ᱩᱫᱩᱜ', transliteration: 'UDUG', english: 'vt. to show; vi. to point;' },
  { id: 'egv191', olChiki: 'ᱩᱯᱩᱨᱩᱢ', transliteration: 'UPURUm', english: 'n. recognition;' },
  { id: 'egv192', olChiki: 'ᱩᱫᱟᱹᱣ', transliteration: 'UdA.W', english: 'vi. to fly;' },
  { id: 'egv193', olChiki: 'ᱪᱚᱞᱚᱛ', transliteration: 'CoLoT', english: 'adj. continuous; n. motion;' },
  { id: 'egv194', olChiki: 'ᱪᱚᱨᱵᱤ', transliteration: 'CoRBI', english: 'n. fat;' },
  { id: 'egv195', olChiki: 'ᱪᱟ', transliteration: 'CA', english: 'n. tea;' },
  { id: 'egv196', olChiki: 'ᱪᱟᱞᱟᱣ', transliteration: 'CALAW', english: 'vi. to go;' },
  { id: 'egv197', olChiki: 'ᱪᱟᱯᱟᱫ', transliteration: 'CAPAD', english: 'vt. to throw; vi. to throw oneself;' },
  { id: 'egv198', olChiki: 'ᱪᱟᱵᱟ', transliteration: 'CABA', english: 'vt. to finish; to complete;' },
  { id: 'egv199', olChiki: 'ᱪᱩᱛᱩ', transliteration: 'CUtU', english: 'n. small rat;' },
  { id: 'egv200', olChiki: 'ᱪᱩᱬᱰᱤ', transliteration: 'CUNDX', english: 'n. special kind of rat with beak-like pointed mouth;' }, // Corrected with NDX mapping
  { id: 'egv201', olChiki: 'ᱪᱮᱛᱮᱛᱤᱭᱟ', transliteration: 'CETETIYA', english: 'n. student;' },
  { id: 'egv202', olChiki: 'ᱪᱮᱫᱚᱜᱤᱡ', transliteration: 'CEDoGIJ', english: 'n. student;' }, // Corrected from CEDoGIJ to CHEDoGIJ if CH is intended
  { id: 'egv203', olChiki: 'ᱪᱮᱸᱬᱮᱹ', transliteration: 'CE:ME.', english: 'n. bird;' },
  { id: 'egv204', olChiki: 'ᱪᱷᱚᱵᱤ', transliteration: 'CHoBI', english: 'n. picture; figure;' },
  { id: 'egv205', olChiki: 'ᱫᱚᱥᱟᱨ', transliteration: 'DoSAR', english: 'adj. second;' },
  { id: 'egv206', olChiki: 'ᱫᱚᱥᱟᱨᱟᱜ', transliteration: 'DoSARAG', english: 'adj. second (pointing to an inanimate object);' },
  { id: 'egv207', olChiki: 'ᱫᱚᱥᱟᱨᱤᱡ', transliteration: 'DoSARIJ', english: 'adj. second (pointing to an animate object);' },
  { id: 'egv208', olChiki: 'ᱫᱚᱦᱚ', transliteration: 'Doho', english: 'vt. to keep;' },
  { id: 'egv209', olChiki: 'ᱫᱚᱨᱭᱟᱛᱱᱚ', transliteration: 'DoRYATno', english: 'n. geography;' },
  { id: 'egv210', olChiki: 'ᱫᱚᱭᱟᱞᱩ', transliteration: 'DoYALU', english: 'adj. kind;' },
  { id: 'egv211', olChiki: 'ᱫᱟᱜ', transliteration: 'DAG', english: 'n. water; vi. to rain;' },
  { id: 'egv212', olChiki: 'ᱫᱟᱨᱟᱠᱟᱱ', transliteration: 'DARAKAn', english: 'adj. coming; next;' },
  { id: 'egv213', olChiki: 'ᱫᱟᱨᱟᱭ', transliteration: 'DARAY', english: 'adj. future; next;' },
  { id: 'egv214', olChiki: 'ᱫᱤᱥᱚᱢ', transliteration: 'DISom', english: 'n., adj. country;' },
  { id: 'egv215', olChiki: 'ᱫᱤᱥᱟᱹ', transliteration: 'DISA.', english: 'n. direction; good sense; vt. to understand; vi. to make out;' },
  { id: 'egv216', olChiki: 'ᱫᱩᱦᱟᱹᱣ', transliteration: 'DUhA.W', english: 'vt. to milk;' },
  { id: 'egv217', olChiki: 'ᱫᱩᱲᱩᱵ', transliteration: 'DUZUB', english: 'vi. to sit;' }, // Corrected Ol Chiki for DUZUB
  { id: 'egv218', olChiki: 'ᱫᱷᱟᱯ', transliteration: 'DHAP', english: 'n. schedule; step;' },
  { id: 'egv219', olChiki: 'ᱫᱷᱩᱱᱣᱟᱹ', transliteration: 'DHUNVA.', english: 'n. smoke; vt. to spray someone with smoke;' },
  { id: 'egv220', olChiki: 'ᱮᱛᱚᱦᱚᱵ', transliteration: 'ETohoB', english: 'n. beginning; start;' },
  { id: 'egv221', olChiki: 'ᱮᱞ', transliteration: 'EL', english: 'n. digit;' },
  { id: 'egv222', olChiki: 'ᱮᱞᱠᱷᱟ', transliteration: 'ELKHA', english: 'n. mathematics;' },
  { id: 'egv223', olChiki: 'ᱮᱞᱠᱷᱟᱨᱤᱭᱟᱹ', transliteration: 'ELKHARIYA.', english: 'n. mathematician;' },
  { id: 'egv224', olChiki: 'ᱮᱞᱥᱚᱝ', transliteration: 'ELSoF', english: 'n. numbers in powers of 10;' },
  { id: 'egv225', olChiki: 'ᱮᱢ', transliteration: 'Em', english: 'vt. to give;' },
  { id: 'egv226', olChiki: 'ᱮᱦᱚᱵ', transliteration: 'EhoB', english: 'n. beginning; start; vt. to begin; to start; vi. to start; to begin;' },
  { id: 'egv227', olChiki: 'ᱮᱭᱟᱭ', transliteration: 'EYAY', english: 'n., adj. seven;' },
  { id: 'egv228', olChiki: 'ᱮᱭᱟᱭᱟᱜ', transliteration: 'EYAYAG', english: 'adj. seventh (pointing to an inanimate object);' },
  { id: 'egv229', olChiki: 'ᱮᱭᱟᱭᱤᱡ', transliteration: 'EYAYIJ', english: 'adj. seventh (pointing to an animate object);' },
  { id: 'egv230', olChiki: 'ᱮᱱᱟᱝ', transliteration: 'EnAF', english: 'n. sometime before on the same day; adj. past;' },
  { id: 'egv231', olChiki: 'ᱮᱱᱮᱡ', transliteration: 'EnEJ', english: 'n. dance; vi. to dance; to play;' },
  { id: 'egv232', olChiki: 'ᱮᱱᱮᱫ', transliteration: 'EnED', english: 'adj. transitive;' },
  { id: 'egv233', olChiki: 'ᱯᱚᱛᱚᱵ', transliteration: 'PoToB', english: 'n. book;' },
  { id: 'egv234', olChiki: 'ᱯᱟᱛᱞᱟ', transliteration: 'PATLA', english: 'adj. slim; vt. to make someone or something slim; vi. to become slim;' },
  { id: 'egv235', olChiki: 'ᱯᱟᱝᱠᱷᱟ', transliteration: 'PAFKHA', english: 'n. fan;' }, // Corrected Ol Chiki for PAFKHA
  { id: 'egv236', olChiki: 'ᱯᱟᱥᱛᱟ', transliteration: 'PAStA', english: 'n. direction;' },
  { id: 'egv237', olChiki: 'ᱯᱟᱦᱛᱟ', transliteration: 'PAhtA', english: 'n. direction;' },
  { id: 'egv238', olChiki: 'ᱯᱟᱨᱥᱮᱛ', transliteration: 'PARSET', english: 'n. president;' },
  { id: 'egv239', olChiki: 'ᱯᱟᱯ', transliteration: 'PAP', english: 'n. sin; vi. to sin;' },
  { id: 'egv240', olChiki: 'ᱯᱟᱱᱟᱦᱤ', transliteration: 'PAnAhI', english: 'n. shoe;' },
  { id: 'egv241', olChiki: 'ᱯᱟᱱᱛᱮ', transliteration: 'PAnTE', english: 'n. row; vt., vi. to search; vi. to arrange in a row;' },
  { id: 'egv242', olChiki: 'ᱯᱟᱲᱷᱟᱣ', transliteration: 'PAZhAW', english: 'adj. educated; vt. to teach; to read; vi. to study;' }, // Corrected Ol Chiki for PAZhAW
  { id: 'egv243', olChiki: 'ᱯᱟᱹᱦᱤᱞ', transliteration: 'PA.hIL', english: 'n. past; adj. past; previous;' },
  { id: 'egv244', olChiki: 'ᱯᱟᱹᱨᱤᱥ', transliteration: 'PA.RIS', english: 'n. parts of speech; title of a Santal;' },
  { id: 'egv245', olChiki: 'ᱯᱟᱹᱯᱤ', transliteration: 'PA.PI', english: 'n. sinner;' },
  { id: 'egv246', olChiki: 'ᱯᱩᱛᱷᱤ', transliteration: 'PUTHI', english: 'n. book;' },
  { id: 'egv247', olChiki: 'ᱯᱩᱥᱤ', transliteration: 'PUSI', english: 'n. cat;' },
  { id: 'egv248', olChiki: 'ᱯᱩᱨᱟᱹ', transliteration: 'PURA.', english: 'adj. complete;' },
  { id: 'egv249', olChiki: 'ᱯᱩᱨᱟᱹᱣ', transliteration: 'PURA.W', english: 'vt. to complete; to finish;' },
  { id: 'egv250', olChiki: 'ᱯᱩᱭᱞᱩᱣᱟᱜ', transliteration: 'PUYLUWAG', english: 'adj. first (pointing to an inanimate object);' },
  { id: 'egv251', olChiki: 'ᱯᱩᱭᱞᱩᱭᱤᱡ', transliteration: 'PUYLUYIJ', english: 'adj. first (pointing to an animate object);' },
  { id: 'egv252', olChiki: 'ᱯᱩᱱ', transliteration: 'PUn', english: 'n., adj. four;' },
  { id: 'egv253', olChiki: 'ᱯᱩᱱᱟᱹᱜ', transliteration: 'PUnA.G', english: 'adj. fourth (pointing to an inanimate object);' },
  { id: 'egv254', olChiki: 'ᱯᱩᱱᱤᱡ', transliteration: 'PUnIJ', english: 'adj. fourth (pointing to an animate object);' },
  { id: 'egv255', olChiki: 'ᱯᱩᱱᱭᱟᱹ', transliteration: 'PUnYA.', english: 'adj. four;' },
  { id: 'egv256', olChiki: 'ᱯᱩᱱᱜᱤ', transliteration: 'PUNGI', english: 'n. a cigarette made using tobacco and leaf;' },
  { id: 'egv257', olChiki: 'ᱯᱩᱱᱜᱤ ᱧᱩ', transliteration: 'PUNGI QU~', english: 'vi. to smoke;' }, // Corrected from QU~
  { id: 'egv258', olChiki: 'ᱯᱩᱱᱡᱤ', transliteration: 'PUNJI', english: 'n. heap; vt. to gather things in a place;' },
  { id: 'egv259', olChiki: 'ᱯᱩᱱᱢ', transliteration: 'PUNM', english: 'adj. white; vt. to make someone or something white; vi. to become white;' },
  { id: 'egv260', olChiki: 'ᱯᱮ', transliteration: 'PE', english: 'n., adj. three;' },
  { id: 'egv261', olChiki: 'ᱯᱮᱭᱟ', transliteration: 'PEYA', english: 'adj. three;' },
  { id: 'egv262', olChiki: 'ᱯᱮᱭᱟᱜ', transliteration: 'PEYAG', english: 'adj. third (pointing to an inanimate object);' },
  { id: 'egv263', olChiki: 'ᱯᱮᱭᱤᱡ', transliteration: 'PEYIJ', english: 'adj. third (pointing to an animate object);' },
  { id: 'egv264', olChiki: 'ᱯᱷᱟᱫᱟ', transliteration: 'PHADA', english: 'n. space; adj. empty; vi. to make space; to become devoid of any visible object;' },
  { id: 'egv265', olChiki: 'ᱯᱷᱮᱲᱟᱛ', transliteration: 'PHEZAT', english: 'n. root;' }, // Corrected Ol Chiki for PHEZAT
  { id: 'egv266', olChiki: 'ᱫᱩᱬᱨᱤ', transliteration: 'dUNGX_RI', english: 'n. hill;' }, // Corrected with NGX mapping
  { id: 'egv267', olChiki: 'ᱱᱟᱜᱟᱢ', transliteration: 'nAGAm', english: 'n. history;' },
  { id: 'egv268', olChiki: 'ᱱᱟᱝ', transliteration: 'nAF', english: 'n. tense;' },
  { id: 'egv269', olChiki: 'ᱱᱟᱦᱟᱜ', transliteration: 'nAhAG', english: 'adj. present;' },
  { id: 'egv270', olChiki: 'ᱱᱤᱛ', transliteration: 'nIT', english: 'adv. now;' },
  { id: 'egv271', olChiki: 'ᱱᱤᱛᱚᱜ', transliteration: 'nIToG', english: 'adv. now;' },
  { id: 'egv272', olChiki: 'ᱱᱤᱛᱚᱝ', transliteration: 'nIToF', english: 'adv. now;' },
  { id: 'egv273', olChiki: 'ᱱᱤᱛᱟᱝ', transliteration: 'nITAF', english: 'adj. present;' },
  { id: 'egv274', olChiki: 'ᱱᱤᱭᱚᱢ', transliteration: 'nIYom', english: 'n. law; rule;' },
  { id: 'egv275', olChiki: 'ᱛᱛᱟᱲᱟᱝ', transliteration: 'ttAZAF', english: 'n. time; instant of time;' }, // Assuming ttAZAF, if 'tt' is intentional
  { id: 'egv276', olChiki: 'ᱛᱩᱫᱟᱹᱜ', transliteration: 'tUdA.G', english: 'n. point; vi. to make point;' },
  { id: 'egv277', olChiki: 'ᱛᱷᱚᱯ', transliteration: 'tHoP', english: 'n. a drop;' },
  { id: 'egv278', olChiki: 'ᱛᱷᱚᱯ ᱛᱷᱚᱯ', transliteration: 'tHoP_tHoP', english: 'adv. drop by drop;' },
  { id: 'egv279', olChiki: 'ᱛᱷᱟᱱᱣ', transliteration: 'tHANV', english: 'n. position; vt. to place;' },
  { id: 'egv280', olChiki: 'ᱛᱷᱟᱹᱣᱠᱟᱹ', transliteration: 'tHA.WKA.', english: 'n. decision; vt. to decide;' },
  { id: 'egv281', olChiki: 'ᱛᱷᱤᱠᱟᱹᱱᱟᱹ', transliteration: 'tHIKA.nA', english: 'n. address;' },
  { id: 'egv282', olChiki: 'ᱛᱷᱩ', transliteration: 'tHU', english: 'vt. to fire at; vi. to explode;' },
  { id: 'egv283', olChiki: 'ᱵᱟᱜᱟᱱ', transliteration: 'BAGAn', english: 'n. garden;' },
  { id: 'egv284', olChiki: 'ᱵᱟᱝᱛᱷᱤᱠ', transliteration: 'BAFthIK', english: 'adj. bad;' },
  { id: 'egv285', olChiki: 'ᱵᱟᱧᱪᱟᱣ', transliteration: 'BAQCAW', english: 'adj. alive; vt. to save; vi. to be alive;' },
  { id: 'egv286', olChiki: 'ᱵᱟᱨ', transliteration: 'BAR_two', english: 'n., adj. two;' },
  { id: 'egv287', olChiki: 'ᱵᱟᱨᱟᱜ', transliteration: 'BARAG', english: 'adj. second (pointing to an inanimate object);' },
  { id: 'egv288', olChiki: 'ᱵᱟᱨᱤᱡ', transliteration: 'BARIJ', english: 'adj. second (pointing to an animate object);' },
  { id: 'egv289', olChiki: 'ᱵᱟᱨᱭᱟ', transliteration: 'BARYA', english: 'adj. two;' },
  { id: 'egv290', olChiki: 'ᱵᱟᱯᱞᱟ', transliteration: 'BAPLA', english: 'n. marriage; vt., vi. to marry;' },
  { id: 'egv291', olChiki: 'ᱵᱟᱫᱟᱭ', transliteration: 'BAdAY', english: 'vt. to know;' },
  { id: 'egv292', olChiki: 'ᱵᱟᱲᱟᱭ', transliteration: 'BAZAY', english: 'vt. to know;' },
  { id: 'egv293', olChiki: 'ᱵᱟᱹᱵᱩ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'BA.BU GIDX_RA.', english: 'n. boy;' },
  { id: 'egv294', olChiki: 'ᱵᱟᱹᱲᱤᱡ', transliteration: 'BA.ZIJ', english: 'adj. bad;' },
  { id: 'egv295', olChiki: 'ᱵᱤᱧ', transliteration: 'BIQ', english: 'n. snake;' },
  { id: 'egv296', olChiki: 'ᱵᱤᱱᱫᱩ', transliteration: 'BInDU', english: 'n. point;' },
  { id: 'egv297', olChiki: 'ᱵᱤᱱ ᱡᱚᱛᱚᱥ', transliteration: 'BIn_JoToS', english: 'adj. without object;' },
  { id: 'egv298', olChiki: 'ᱵᱩᱡᱷᱟᱹᱣ', transliteration: 'BUJHA.W', english: 'vt., vi.. to understand;' },
  { id: 'egv299', olChiki: 'ᱵᱩᱨᱩ', transliteration: 'BURU', english: 'n. mountain; hill;' },
  { id: 'egv300', olChiki: 'ᱵᱩᱫᱷᱤ', transliteration: 'BUdHI', english: 'n. old woman;' },
  { id: 'egv301', olChiki: 'ᱵᱩᱲᱷᱤ', transliteration: 'BUZhI', english: 'n. old woman;' },
  { id: 'egv302', olChiki: 'ᱵᱩᱛᱟᱹ', transliteration: 'BUtA.', english: 'n. address; root;' },
  { id: 'egv303', olChiki: 'ᱵᱩᱬᱰᱤ', transliteration: 'BUNDX', english: 'n. a drop;' }, // Corrected with NDX mapping
  { id: 'egv304', olChiki: 'ᱵᱩᱬᱰᱤ ᱵᱩᱬᱰᱤ', transliteration: 'BUNDX_BUNDX', english: 'adv. drop by drop;' },
  { id: 'egv305', olChiki: 'ᱵᱮᱥ', transliteration: 'BES', english: 'adj. good;' },
  { id: 'egv306', olChiki: 'ᱵᱮᱹᱱᱟᱣ', transliteration: 'BE.nAW', english: 'vt., vi. to make; to form;' },
  { id: 'egv307', olChiki: 'ᱵᱷᱚᱨᱥᱟ', transliteration: 'BHoRSA', english: 'n. trust; faith; vi. to depend; to count;' },
  { id: 'egv308', olChiki: 'ᱵᱷᱟᱜᱽ', transliteration: 'BHAGX', english: 'n. share; vt. to divide; to share;' }, 
  { id: 'egv309', olChiki: 'ᱵᱷᱟᱥᱚᱱ ᱮᱢ', transliteration: 'BHASon Em', english: 'vi. to talk; to give speech;' },
  { id: 'egv310', olChiki: 'ᱵᱷᱟᱹᱡᱤ', transliteration: 'BHA.JI', english: 'n. fry; vt. to fry;' },
  { id: 'egv311', olChiki: 'ᱵᱷᱮᱜᱮᱫ', transliteration: 'BHEGED', english: 'n. subtraction; vt. to subtract;' },
  { id: 'egv312', olChiki: 'ᱵᱷᱮᱡᱟ', transliteration: 'BHEJA', english: 'n. brain; vt. to send;' },
];

// Santali Name Data
export const santaliFirstNamesSample: SantaliNamePart[] = [
  { olChiki: "ᱥᱚᱢᱟ", transliteration: "Soma", meaning: "Born on Monday; Moon" },
  { olChiki: "ᱢᱟᱝᱜᱟᱞ", transliteration: "Mangal", meaning: "Born on Tuesday; Mars" },
  { olChiki: "ᱵᱩᱫᱷᱩ", transliteration: "Budhu", meaning: "Born on Wednesday; Mercury" },
  { olChiki: "ᱵᱤᱦᱟᱨᱤ", transliteration: "Bihari", meaning: "One who roams; Joyful" },
  { olChiki: "ᱨᱟᱹᱱᱤ", transliteration: "Rani", meaning: "Queen" },
  { olChiki: "ᱯᱷᱩᱞᱢᱚᱱᱤ", transliteration: "Phulmoni", meaning: "Flower jewel" },
  { olChiki: "ᱥᱟᱞᱜᱮ", transliteration: "Salge", meaning: "Sal tree flower; Prosperous" },
  { olChiki: "ᱡᱩᱨᱤ", transliteration: "Juri", meaning: "Partner; Companion" },
  { olChiki: "ᱫᱩᱞᱟᱹᱲ", transliteration: "Dulal", meaning: "Beloved; Love" }, // Corrected from Dulal to Dulăṛ for transliteration consistency
  { olChiki: "ᱵᱟᱦᱟ", transliteration: "Baha", meaning: "Flower" },
];

// export const santaliSurnamesSample: SantaliNamePart[] = [
//   { olChiki: "ᱢᱩᱨᱢᱩ", transliteration: "Murmu", meaning: "Priest clan" },
//   { olChiki: "ᱦᱟᱸᱥᱫᱟᱜ", transliteration: "Hansdag", meaning: "Duck clan" }, 
//   { olChiki: "ᱢᱟᱹᱨᱰᱤ", transliteration: "Marndi", meaning: "Wealthy; A specific grass" },
//   { olChiki: "ᱥᱚᱨᱮᱱ", transliteration: "Soren", meaning: "Warrior; Rock" },
//   { olChiki: "ᱴᱩᱰᱩ", transliteration: "Tudu", meaning: "Musician clan" },
//   { olChiki: "ᱠᱤᱥᱠᱩ", transliteration: "Kisku", meaning: "Kingfisher clan" },
//   { olChiki: "ᱦᱮᱢᱵᱨᱚᱢ", transliteration: "Hembrom", meaning: "Betel nut clan" },
//   { olChiki: "ᱵᱟᱥᱠᱮ", transliteration: "Baske", meaning: "Stale food; Ancient" },
// ];


export const categorizedOlChikiWords: Record<string, OlChikiWord[]> = {
  "Animals": [
    { id: 'a1', olChiki: 'ᱥᱮᱛᱟ', transliteration: 'seta', english: 'Dog' },
    { id: 'a2', olChiki: 'ᱜᱟᱹᱭ', transliteration: 'găi', english: 'Cow' },
    { id: 'a3', olChiki: 'ᱪᱮᱬᱮ', transliteration: 'cɛ̃ṛɛ', english: 'Bird' },
    { id: 'a4', olChiki: 'ᱦᱟᱹᱠᱩ', transliteration: 'haku', english: 'Fish' },
    { id: 'a5', olChiki: 'ᱵᱤᱛᱠᱤᱞ', transliteration: 'bitkil', english: 'Cat' }, // This was likely a typo for PUSI
    { id: 'a6', olChiki: 'ᱢᱮᱨᱚᱢ', transliteration: 'merom', english: 'Goat' },
    { id: 'a7', olChiki: 'ᱠᱩᱞᱟᱹᱭ', transliteration: 'kulăi', english: 'Rabbit' },
    { id: 'a8', olChiki: 'ᱪᱤᱛᱟᱹ', transliteration: 'chitar', english: 'Panther' },
    { id: 'a9', olChiki: 'ᱠᱟᱴᱟᱣᱟ ᱛᱟᱹᱨᱩᱵ', transliteration: 'katwa tarub', english: 'Lion' },
    { id: 'a10', olChiki: 'ᱛᱟᱹᱨᱩᱵ', transliteration: 'tarub', english: 'Tiger' },
    { id: 'a11', olChiki: 'ᱵᱤᱨ ᱥᱩᱠᱨᱤ', transliteration: 'bir sukri', english: 'Boar' },
    { id: 'a12', olChiki: 'ᱵᱟᱱᱟ', transliteration: 'bana', english: 'Bear' },
    { id: 'a13', olChiki: 'ᱦᱟᱹᱬᱩ', transliteration: 'hăṇu', english: 'Monkey' },
    { id: 'a14', olChiki: 'ᱵᱤᱨᱦᱚᱲ', transliteration: 'birhor', english: 'Gorilla' }, 
    { id: 'a15', olChiki: 'ᱦᱟᱹᱛᱤ', transliteration: 'hăti', english: 'Elephant' },
    { id: 'a16', olChiki: 'ᱡᱤᱞ', transliteration: 'jil', english: 'Deer' },
    { id: 'a18', olChiki: 'ᱛᱩᱭᱩ', transliteration: 'tuyu', english: 'Fox' },
    { id: 'a19', olChiki: 'ᱦᱟᱰᱜᱟᱨ', transliteration: 'hadgar', english: 'Hyena' },
    { id: 'a20', olChiki: 'ᱡᱤᱞ ᱦᱤᱡ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'jil hij gidră', english: 'Fawn' },
    { id: 'a21', olChiki: 'ᱛᱩᱲ', transliteration: 'tuṛ', english: 'Squirrel' }, 
    { id: 'a22', olChiki: 'ᱫᱟᱜ ᱦᱟᱹᱛᱤ', transliteration: 'dag hăti', english: 'Rhinoceros' },
    { id: 'a23', olChiki: 'ᱥᱟᱫᱚᱢ', transliteration: 'sadom', english: 'Horse' },
    { id: 'a24', olChiki: 'ᱯᱩᱥᱤ', transliteration: 'pusi', english: 'Cat' },
    { id: 'a25', olChiki: 'ᱜᱟᱫᱷᱟ', transliteration: 'gadha', english: 'Ass' },
    { id: 'a26', olChiki: 'ᱵᱷᱤᱰᱤ', transliteration: 'bhidi', english: 'Sheep' },
    { id: 'a27', olChiki: 'ᱩᱸᱴ', transliteration: 'uṇṭ', english: 'Camel' }, 
    { id: 'a29', olChiki: 'ᱮᱸᱜᱟ ᱥᱮᱛᱟ', transliteration: 'enga seta', english: 'Bitch' },
    { id: 'a30', olChiki: 'ᱜᱟᱹᱭ', transliteration: 'găi_cow', english: 'Cow' }, 
    { id: 'a31', olChiki: 'ᱮᱸᱜᱟ ᱥᱟᱫᱚᱢ', transliteration: 'enga sadom', english: 'Mare' },
    { id: 'a32', olChiki: 'ᱥᱟᱫᱚᱢ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'sadom gidră', english: 'Colt' },
    { id: 'a33', olChiki: 'ᱪᱩᱴᱩ', transliteration: 'cutu', english: 'Mouse' },
    { id: 'a34', olChiki: 'ᱢᱮᱨᱚᱢ', transliteration: 'merom_hegoat', english: 'He goat' }, 
    { id: 'a35', olChiki: 'ᱮᱸᱜᱟ ᱢᱮᱨᱚᱢ', transliteration: 'enga merom', english: 'She goat' },
    { id: 'a36', olChiki: 'ᱢᱮᱨᱚᱢ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'merom gidră', english: 'Kid' },
    { id: 'a37', olChiki: 'ᱫᱟᱢᱠᱚᱢ', transliteration: 'damkom', english: 'Calf' },
    { id: 'a38', olChiki: 'ᱯᱩᱥᱤ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'pusi gidră', english: 'Kitten' },
    { id: 'a39', olChiki: 'ᱰᱟᱝᱨᱟ', transliteration: 'ḍangra', english: 'Ox' },
    { id: 'a40', olChiki: 'ᱵᱷᱤᱰᱤ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'bhidi gidră', english: 'Lamb' },
    { id: 'a41', olChiki: 'ᱠᱟᱲᱟ', transliteration: 'kaṛa', english: 'Buffalo' }, 
    { id: 'a42', olChiki: 'ᱥᱮᱸᱫᱽᱨᱟ ᱥᱮᱛᱟ', transliteration: 'sendra seta', english: 'Hound' }, 
    { id: 'a43', olChiki: 'ᱥᱚᱲᱚ', transliteration: 'soṛo', english: 'Bull' }, 
    { id: 'a44', olChiki: 'ᱥᱩᱠᱨᱤ', transliteration: 'sukri', english: 'Pig' },
  ],
  "Vegetables": [
    { id: 'v1', olChiki: 'ᱟᱹᱞᱩ', transliteration: 'ălu', english: 'Potato' },
    { id: 'v2', olChiki: 'ᱵᱟᱦᱟ ᱠᱩᱵᱤ', transliteration: 'baha kubi', english: 'Cauliflower' },
    { id: 'v3', olChiki: 'ᱯᱚᱴᱚᱢ ᱠᱩᱵᱤ', transliteration: 'potom kubi', english: 'Cabbage' },
    { id: 'v4', olChiki: 'ᱜᱟᱡᱚᱨ', transliteration: 'gajor', english: 'Carrot' },
    { id: 'v5', olChiki: 'ᱛᱟᱦᱮᱨ', transliteration: 'taher', english: 'Cucumber' },
    { id: 'v6', olChiki: 'ᱰᱮᱸᱜᱟᱲ', transliteration: 'ḍengad', english: 'Brinjal' }, 
    { id: 'v7', olChiki: 'ᱯᱮᱭᱟᱡ', transliteration: 'peyaj', english: 'Onion' },
    { id: 'v8', olChiki: 'ᱢᱚᱴᱚᱨ ᱪᱷᱚᱞᱟ', transliteration: 'motor chola', english: 'Pea' },
    { id: 'v9', olChiki: 'ᱠᱟᱨᱞᱟ', transliteration: 'karla', english: 'Bitter gourd' },
    { id: 'v10', olChiki: 'ᱢᱩᱞᱟᱹ', transliteration: 'mula', english: 'Raddish' }, 
    { id: 'v11', olChiki: 'ᱵᱤᱞᱟᱹᱛᱤ', transliteration: 'bilăti', english: 'Tomato' },
    { id: 'v12', olChiki: 'ᱦᱚᱛᱚᱫ', transliteration: 'hotod', english: 'Bottle gourd' },
    { id: 'v13', olChiki: 'ᱚᱫᱟ', transliteration: 'oda', english: 'Ginger' },
    { id: 'v14', olChiki: 'ᱯᱟᱞᱚᱱ ᱟᱲᱟᱜ', transliteration: 'palon adag', english: 'Spinach' },
    { id: 'v15', olChiki: 'ᱟᱨᱟᱜ ᱢᱩᱞᱟᱹ', transliteration: 'arag mulă', english: 'Turnip' },
    { id: 'v16', olChiki: 'ᱢᱟᱹᱨᱤᱪ', transliteration: 'mărich', english: 'Chilli' },
    { id: 'v17', olChiki: 'ᱵᱷᱮᱰᱣᱟ', transliteration: 'bhedwa', english: 'Lady finger' },
    { id: 'v18', olChiki: 'ᱯᱩᱫᱱᱟᱹ', transliteration: 'pudnă', english: 'Mint' },
    { id: 'v19', olChiki: 'ᱡᱟᱲᱟ', transliteration: 'jada', english: 'Papaya' },
    { id: 'v20', olChiki: 'ᱢᱚᱥᱞᱟ ᱥᱟᱠᱟᱢ', transliteration: 'mosla sakam', english: 'Coriander' }, 
    { id: 'v21', olChiki: 'ᱜᱷᱟᱱᱴᱟᱲ', transliteration: 'ghantad', english: 'Jack fruit' }, 
  ],
  "Birds": [
    { id: 'b1', olChiki: 'ᱢᱟᱨᱟᱜ', transliteration: 'marag', english: 'Peacock' },
    { id: 'b2', olChiki: 'ᱢᱤᱨᱩ', transliteration: 'miru', english: 'Parrot' },
    { id: 'b3', olChiki: 'ᱠᱟᱹᱦᱩ', transliteration: 'kăhu', english: 'Crow' },
    { id: 'b4', olChiki: 'ᱯᱟᱨᱣᱟ', transliteration: 'parwa', english: 'Pigeon' },
    { id: 'b5', olChiki: 'ᱠᱤᱥᱱᱤ', transliteration: 'kisni', english: 'Myna' },
    { id: 'b6', olChiki: 'ᱞᱮᱴᱠᱟ ᱪᱮᱸᱬᱮ', transliteration: 'letka chene', english: 'Sparrow' },
    { id: 'b7', olChiki: 'ᱠᱩᱲᱤᱫ', transliteration: 'kudid', english: 'Eagle' },
    { id: 'b8', olChiki: 'ᱠᱚᱡᱚᱨ', transliteration: 'kojor', english: 'Owl' },
    { id: 'b9', olChiki: 'ᱥᱤᱢ ᱥᱟᱹᱰᱤ', transliteration: 'sim săḍi', english: 'Cock' }, 
    { id: 'b10', olChiki: 'ᱥᱤᱢ ᱮᱸᱜᱟ', transliteration: 'sim enga', english: 'Hen' },
    { id: 'b11', olChiki: 'ᱜᱮᱲᱮ', transliteration: 'geṛe', english: 'duck' }, 
    { id: 'b12', olChiki: 'ᱢᱟᱨᱟᱝ ᱜᱮᱰᱮ', transliteration: 'marang gede', english: 'Swan' },
    { id: 'b13', olChiki: 'ᱜᱤᱫᱤ', transliteration: 'gidi', english: 'Vulture' },
  ],
  "Eatables": [
    { id: 'e1', olChiki: 'ᱦᱩᱲᱩ', transliteration: 'hudu', english: 'Grain' },
    { id: 'e2', olChiki: 'ᱟᱪᱟᱨ', transliteration: 'achar', english: 'Pickle' },
    { id: 'e3', olChiki: 'ᱥᱩᱡᱤ', transliteration: 'suji', english: 'Semolina' },
    { id: 'e4', olChiki: 'ᱚᱴᱟ', transliteration: 'ota', english: 'Flour' },
    { id: 'e5', olChiki: 'ᱤᱞᱟᱹᱭᱪᱤ', transliteration: 'ilăichi', english: 'Comfit' }, 
    { id: 'e6', olChiki: 'ᱛᱚᱣᱟ ᱨᱮᱭᱟᱜ ᱪᱟᱭ', transliteration: 'towa reag chay', english: 'Coffee' },
    { id: 'e7', olChiki: 'ᱛᱚᱣᱟ', transliteration: 'towa', english: 'Milk' },
    { id: 'e8', olChiki: 'ᱮᱥᱠᱨᱮᱢ', transliteration: 'eskrem', english: 'Ice-cream' },
    { id: 'e9', olChiki: 'ᱜᱩᱦᱩᱢ', transliteration: 'guhum', english: 'Wheat' },
    { id: 'e10', olChiki: 'ᱤᱛᱤᱞ ᱥᱩᱱᱩᱢ', transliteration: 'itil sunum', english: 'Ghee' },
    { id: 'e11', olChiki: 'ᱪᱚᱴᱱᱤ', transliteration: 'cotni', english: 'Sauce' },
    { id: 'e12', olChiki: 'ᱪᱟᱱᱟ/ᱪᱷᱚᱞᱟ', transliteration: 'chona/chola', english: 'Gram' }, // Keeping as is
    { id: 'e13', olChiki: 'ᱪᱟᱣᱞᱮ', transliteration: 'chawle', english: 'Rice' },
    { id: 'e14', olChiki: 'ᱪᱟᱭ', transliteration: 'chai', english: 'Tea' },
    { id: 'e15', olChiki: 'ᱪᱤᱱᱤ', transliteration: 'chini', english: 'Sugar' },
    { id: 'e16', olChiki: 'ᱯᱟᱹᱱᱤᱨ', transliteration: 'pănir', english: 'Cheese' }, 
    { id: 'e17', olChiki: 'ᱩᱛᱩ', transliteration: 'utu', english: 'Vegetables' },
    { id: 'e18', olChiki: 'ᱥᱩᱱᱩᱢ', transliteration: 'sunum', english: 'Oil' },
    { id: 'e19', olChiki: 'ᱫᱟᱹᱞ', transliteration: 'dăl', english: 'Pulse' }, 
    { id: 'e20', olChiki: 'ᱵᱤᱞᱟᱹᱛᱤ ᱪᱟᱴᱱᱤ', transliteration: 'bilati cotni', english: 'Tomato sauce' },
    { id: 'e21', olChiki: 'ᱵᱚᱨᱚᱯᱷ', transliteration: 'boroph', english: 'Ice' },
    { id: 'e22', olChiki: 'ᱵᱤᱥᱠᱩᱴ', transliteration: 'biskut', english: 'Biscuit' },
    { id: 'e23', olChiki: 'ᱡᱚᱱᱚᱲᱟ', transliteration: 'jonoda', english: 'Maize' }, 
    { id: 'e24', olChiki: 'ᱡᱤᱞ', transliteration: 'jil_meat_eatable', english: 'Meat' }, 
    { id: 'e25', olChiki: 'ᱢᱮᱨᱚᱢ ᱡᱤᱞ', transliteration: 'merom jil', english: 'Mutton' },
    { id: 'e26', olChiki: 'ᱥᱩᱠᱨᱤ ᱡᱤᱞ', transliteration: 'sukri jil', english: 'Pork' },
    { id: 'e27', olChiki: 'ᱢᱤᱥᱨᱤ ᱪᱤᱱᱤ', transliteration: 'mesri chini', english: 'Sugar candy' },
    { id: 'e28', olChiki: 'ᱢᱟᱭᱫᱟ', transliteration: 'maida', english: 'Maida' },
    { id: 'e29', olChiki: 'ᱛᱩᱲᱤ', transliteration: 'tudi', english: 'Mustard' },
    { id: 'e30', olChiki: 'ᱧᱤᱸᱫᱟ ᱫᱟᱠᱟ', transliteration: 'ninda daka', english: 'Bread' },
    { id: 'e31', olChiki: 'ᱥᱚᱨᱵᱚᱛ', transliteration: 'sorbot', english: 'Syrup' },
    { id: 'e32', olChiki: 'ᱯᱟᱹᱨᱣᱟ', transliteration: 'părwa', english: 'Wine' }, 
    { id: 'e33', olChiki: 'ᱧᱮᱸᱞᱮᱨᱟᱥᱟ', transliteration: 'nelerasa', english: 'Honey' },
    { id: 'e34', olChiki: 'ᱛᱩᱲᱤ ᱥᱩᱱᱩᱢ', transliteration: 'tudi sunum', english: 'Mustard oil' },
  ],
  "Body Parts": [
    { id: 'bp1', olChiki: 'ᱩᱵᱽ', transliteration: 'ub', english: 'Hair' },
    { id: 'bp2', olChiki: 'ᱵᱚᱷᱚᱜ', transliteration: 'bohog', english: 'Head' },
    { id: 'bp3', olChiki: 'ᱠᱷᱟᱯᱨᱤ', transliteration: 'khapri', english: 'Skull' },
    { id: 'bp4', olChiki: 'ᱵᱤᱥᱤᱡᱟᱲ', transliteration: 'bisijad', english: 'Spinal cord' },
    { id: 'bp5', olChiki: 'ᱛᱚᱛᱠᱟ', transliteration: 'totka', english: 'Back of head' },
    { id: 'bp6', olChiki: 'ᱦᱟᱛᱟᱲ', transliteration: 'hatad', english: 'Brain' }, 
    { id: 'bp7', olChiki: 'ᱢᱚᱞᱚᱝ', transliteration: 'molong', english: 'Forehead' },
    { id: 'bp8', olChiki: 'ᱢᱚᱲᱟ', transliteration: 'moda', english: 'Face' },
    { id: 'bp9', olChiki: 'ᱢᱮᱫ', transliteration: 'med', english: 'Eye' },
    { id: 'bp10', olChiki: 'ᱢᱮᱫ ᱠᱩᱴᱤ', transliteration: 'med kuti', english: 'Eyelid' },
    { id: 'bp11', olChiki: 'ᱢᱩ', transliteration: 'mu', english: 'Nose' },
    { id: 'bp12', olChiki: 'ᱛᱷᱚᱛᱱᱟ', transliteration: 'thotna', english: 'Cheek' },
    { id: 'bp13', olChiki: 'ᱞᱩᱛᱩᱨ', transliteration: 'lutur', english: 'Ear' },
    { id: 'bp14', olChiki: 'ᱢᱚᱪᱟ', transliteration: 'mocha', english: 'Mouth' },
    { id: 'bp15', olChiki: 'ᱞᱩᱴᱤ', transliteration: 'luti', english: 'Lip' },
    { id: 'bp16', olChiki: 'ᱛᱟᱹᱨᱩ', transliteration: 'tăru', english: 'Palate' },
    { id: 'bp17', olChiki: 'ᱰᱟᱴᱟ', transliteration: 'data', english: 'Tooth' },
    { id: 'bp18', olChiki: 'ᱟᱞᱟᱝ', transliteration: 'alang', english: 'Tongue' },
    { id: 'bp19', olChiki: 'ᱦᱚᱴᱚᱜᱽ', transliteration: 'hotog', english: 'Neck' },
    { id: 'bp20', olChiki: 'ᱛᱟᱨᱮᱱ', transliteration: 'taren', english: 'Shoulder' },
    { id: 'bp21', olChiki: 'ᱥᱚᱯᱟ', transliteration: 'sopa', english: 'arm' },
    { id: 'bp22', olChiki: 'ᱦᱟᱨᱛᱟ', transliteration: 'harta', english: 'Skin' },
    { id: 'bp23', olChiki: 'ᱛᱤ', transliteration: 'ti', english: 'Hand' },
    { id: 'bp24', olChiki: 'ᱢᱚᱠᱟ', transliteration: 'moka', english: 'Elbow' },
    { id: 'bp25', olChiki: 'ᱛᱤᱷ ᱛᱟᱞᱠᱷᱟ', transliteration: 'ti talka', english: 'Palm' },
    { id: 'bp26', olChiki: 'ᱠᱟᱹᱴᱩᱵ', transliteration: 'kăṭub', english: 'Finger' },
    { id: 'bp27', olChiki: 'ᱨᱟᱢᱟ', transliteration: 'rama', english: 'Nail' },
    { id: 'bp28', olChiki: 'ᱮᱸᱜᱟ ᱠᱟᱹᱴᱩᱵ', transliteration: 'enga kăṭub', english: 'Thumb' },
    { id: 'bp29', olChiki: 'ᱩᱫᱩᱜ ᱠᱟᱹᱴᱩᱵ', transliteration: 'udug kăṭub', english: 'Pointer Finger' }, 
    { id: 'bp30', olChiki: 'ᱥᱤᱫ ᱠᱟᱹᱴᱩᱵ', transliteration: 'sid kăṭub', english: 'Middle finger' },
    { id: 'bp31', olChiki: 'ᱵᱟᱯᱞᱟ ᱠᱟᱹᱴᱩᱵᱽ', transliteration: 'bapla kăṭub', english: 'Ring finger' },
    { id: 'bp32', olChiki: 'ᱦᱩᱰᱤᱧ ᱠᱟᱹᱴᱩᱵ', transliteration: 'huḍinj kăṭub', english: 'Little finger' },
    { id: 'bp33', olChiki: 'ᱠᱚᱲᱟᱢ', transliteration: 'koṛam', english: 'Chest' }, 
    { id: 'bp34', olChiki: 'ᱵᱚᱨᱚ', transliteration: 'boro', english: 'Lungs' },
    { id: 'bp35', olChiki: 'ᱤᱱ', transliteration: 'in', english: 'Heart' },
    { id: 'bp36', olChiki: 'ᱵᱩᱠᱟᱹ', transliteration: 'bukă', english: 'Navel' },
    { id: 'bp37', olChiki: 'ᱫᱮᱭᱟ', transliteration: 'deya', english: 'Back' },
    { id: 'bp38', olChiki: 'ᱰᱩᱵᱷᱤ', transliteration: 'ḍubhi', english: 'Rump' },
    { id: 'bp39', olChiki: 'ᱞᱟᱡᱽ', transliteration: 'laj', english: 'Stomach' },
    { id: 'bp40', olChiki: 'ᱰᱟᱸᱰᱟ', transliteration: 'ḍanḍa', english: 'Waist' },
    { id: 'bp41', olChiki: 'ᱢᱩᱛᱩ', transliteration: 'mutu', english: 'genital' },
    { id: 'bp42', olChiki: 'ᱰᱮᱠᱮ', transliteration: 'ḍeke', english: 'Buttock' },
    { id: 'bp43', olChiki: 'ᱡᱟᱝ', transliteration: 'jang', english: 'Bone' },
    { id: 'bp44', olChiki: 'ᱡᱤᱞ', transliteration: 'jil_meat_bodypart', english: 'Meat' }, 
    { id: 'bp45', olChiki: 'ᱢᱟᱭᱟᱢ', transliteration: 'mayam', english: 'Blood' },
    { id: 'bp46', olChiki: 'ᱵᱩᱞᱩ', transliteration: 'bulu', english: 'Thigh' }, 
    { id: 'bp47', olChiki: 'ᱴᱷᱤᱴᱲᱟᱜ', transliteration: 'ṭhiṭṛag', english: 'Knee' }, 
    { id: 'bp48', olChiki: 'ᱡᱟᱝᱜᱟ', transliteration: 'janga', english: 'Foot' },
    { id: 'bp49', olChiki: 'ᱤᱲᱤ', transliteration: 'iṛi', english: 'Heel' }, 
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
    { id: 't6', olChiki: 'ᱠᱟᱹᱴᱩᱵ', transliteration: 'kăṭub_knife', english: 'Knife' }, 
    { id: 't7', olChiki: 'ᱪᱟᱨᱯᱟᱭ', transliteration: 'carpai', english: 'Bed' },
  ],
  "Food Items": [ 
    { id: 'f1', olChiki: 'ᱫᱟᱠᱟ', transliteration: 'daka', english: 'Cooked Rice' },
    { id: 'f2', olChiki: 'ᱩᱛᱩ', transliteration: 'utu_curry', english: 'Curry/Vegetable Dish' },
    { id: 'f3', olChiki: 'ᱡᱚ', transliteration: 'jo', english: 'Fruit' },
    { id: 'f4', olChiki: 'ᱯᱤᱴᱷᱟᱹ', transliteration: 'piṭhạ̈', english: 'Rice Cake/Pancake' },
    { id: 'f5', olChiki: 'ᱦᱟᱺᱰᱤ', transliteration: 'haṇḍi', english: 'Rice Beer' },
    { id: 'f6', olChiki: 'ᱵᱩᱞᱩᱝ', transliteration: 'buluṅ', english: 'Salt' },
    { id: 'f7', olChiki: 'ᱢᱟᱹᱨᱤᱪ', transliteration: 'mărich_chilli', english: 'Chilli' },
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
    { id: 'rel9', olChiki: 'ᱜᱚᱲᱚᱢ ᱦᱚᱲᱟᱢ', transliteration: 'godom horam', english: 'Maternal Grandfather' }, 
    { id: 'rel10', olChiki: 'ᱜᱚᱲᱚᱢ ᱵᱩᱲᱷᱤ', transliteration: 'godom budhi_maternal', english: 'Maternal Grandmother' },
    { id: 'rel11', olChiki: 'ᱡᱟᱶᱟᱭ', transliteration: 'jaway', english: 'Husband' }, 
    { id: 'rel12', olChiki: 'ᱵᱤᱴᱤ', transliteration: 'biti', english: 'Daughter' },
    { id: 'rel13', olChiki: 'ᱵᱮᱴᱟ', transliteration: 'beta', english: 'Son' },
    { id: 'rel14', olChiki: 'ᱫᱩᱞᱟᱹᱲ', transliteration: 'dulăṛ', english: 'Love' }, 
    { id: 'rel15', olChiki: 'ᱵᱚᱠᱚᱧ ᱠᱩᱲᱤ', transliteration: 'bokoing kudi', english: 'Sister' },
    { id: 'rel16', olChiki: 'ᱵᱚᱭᱦᱟ', transliteration: 'boyha', english: 'Brother' },
    { id: 'rel17', olChiki: 'ᱯᱮᱲᱟ', transliteration: 'peda', english: 'Guest' },
    { id: 'rel18', olChiki: 'ᱢᱟᱪᱮᱛ', transliteration: 'machet', english: 'Teacher' }, 
    { id: 'rel19', olChiki: 'ᱜᱩᱨᱩ', transliteration: 'guru', english: 'Preceptor' },
    { id: 'rel20', olChiki: 'ᱤᱨᱤᱞ ᱠᱩᱲᱤ ᱥᱟᱞᱤ', transliteration: 'iril kudi sali', english: "Sister in law (wife's younger sister)" },
    { id: 'rel21', olChiki: 'ᱤᱨᱤᱞ ᱠᱩᱲᱤ ᱱᱚᱱᱚᱫ', transliteration: 'iril kudi nonod', english: "Sister in law (husband's sister)" }, 
    { id: 'rel22', olChiki: 'ᱤᱨᱤᱞ ᱠᱩᱲᱤ ᱫᱮᱣᱨᱟᱱᱤ', transliteration: 'iril kudi dewrani', english: "Sister in law (younger brother's wife)" },
    { id: 'rel23', olChiki: 'ᱢᱟᱢᱟ', transliteration: 'mama', english: 'Maternal Uncle' },
    { id: 'rel24', olChiki: 'ᱢᱟᱢᱤ', transliteration: 'mami', english: 'Maternal Aunt' },
    { id: 'rel25', olChiki: 'ᱠᱟᱹᱠᱤ', transliteration: 'kaki_mothers_sister', english: "Mother's sister" }, 
    { id: 'rel26', olChiki: 'ᱟᱪᱮᱛ', transliteration: 'achet', english: 'Pupil' }, 
    { id: 'rel27', olChiki: 'ᱱᱤᱡᱟᱹᱨ', transliteration: 'nijăr', english: 'Own' }, 
    { id: 'rel28', olChiki: 'ᱦᱚᱧᱦᱟᱨ ᱵᱟᱵᱟ', transliteration: 'honjhar baba', english: 'Father in law' },
    { id: 'rel29', olChiki: 'ᱦᱚᱧᱦᱟᱨ ᱟᱭᱚ', transliteration: 'honjhar ayo', english: 'Mother in law' },
    { id: 'rel30', olChiki: 'ᱱᱤᱡᱟᱹᱨ ᱯᱮᱲᱟ', transliteration: 'nijăr peṛa', english: 'Relative' }, 
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
    { id: 'd4', olChiki: 'ᱥᱟᱹᱜᱩᱱ', transliteration: 'săgun', english: 'Wednesday' },
    { id: 'd5', olChiki: 'ᱥᱟᱹᱨᱫᱤ', transliteration: 'sărdi', english: 'Thursday' },
    { id: 'd6', olChiki: 'ᱡᱟᱹᱨᱩᱵ', transliteration: 'jărub', english: 'Friday' },
    { id: 'd7', olChiki: 'ᱧᱩᱸᱦᱩᱢ', transliteration: 'inguhum', english: 'Saturday' },
  ],
  "Months": [
    { id: 'm1', olChiki: 'ᱢᱟᱜᱽ', transliteration: 'mag', english: 'January' },
    { id: 'm2', olChiki: 'ᱯᱷᱟᱹᱜᱩᱱ', transliteration: 'phăgun', english: 'February' },
    { id: 'm3', olChiki: 'ᱪᱟᱹᱛ', transliteration: 'chăt', english: 'March' },
    { id: 'm4', olChiki: 'ᱵᱟᱹᱭᱥᱟᱹᱠ', transliteration: 'băisăk', english: 'April' },
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
    { id: 'o4', olChiki: 'ᱟᱹᱛᱩ', transliteration: 'ătu', english: 'Village' },
    { id: 'o5', olChiki: 'ᱧᱩᱛᱟᱹ', transliteration: 'ñută', english: 'Night' },
    { id: 'o6', olChiki: 'ᱥᱮᱛᱟᱜ', transliteration: 'setag', english: 'Morning' },
    { id: 'o7', olChiki: 'ᱟᱭᱩᱵ', transliteration: 'ayub', english: 'Evening' },
    { id: 'o8', olChiki: 'ᱮᱱᱮᱭ', transliteration: 'eney', english: 'dance' },
  ],
  // This category will hold the new, larger dictionary data
  "Expanded General Vocabulary": [], 
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
    if (n === 0) return santaliUnitWords[0]; 
    if (n > 0 && n < 10) return santaliUnitWords[n];

    if (n === 10) return "Gel";
    if (n > 10 && n < 20) return `Gel ${santaliUnitWords[n % 10]}`; 

    if (n === 20) return "Isi";
    if (n > 20 && n < 30) return `Isi ${santaliUnitWords[n % 10]}`;

    const tensDigit = Math.floor(n / 10);
    const unitDigit = n % 10;

    if (unitDigit === 0 && n >= 30 && n < 100) { 
        return `${santaliUnitWords[tensDigit]} Gel`; 
    }
    if (n >= 30 && n < 100 && unitDigit !== 0) { 
        return `${santaliUnitWords[tensDigit]} Gel ${santaliUnitWords[unitDigit]}`;
    }

    if (n === 100) return "Say";
    return "";
}


function getOlChikiNumeral(n: number): string {
  if (n < 0 || n > 100) return "";
  if (n === 100) return olChikiUnitGlyphs[1] + olChikiUnitGlyphs[0] + olChikiUnitGlyphs[0]; 

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

// Function to parse the dictionary entries from the new format
function parseDictionaryEntries(dictString: string): OlChikiWord[] {
  const entries: OlChikiWord[] = [];
  const lines = dictString.trim().split('\n');
  let entryIdCounter = 1; // Start after existing egv entries
  const uniqueEntryChecker = new Set<string>();


  for (const line of lines) {
    if (line.trim().length === 0) continue;

    // Skip single-letter section headers (a, b, c, etc.)
    if (line.trim().length === 1 && /^[a-zA-Z]$/.test(line.trim())) {
      continue;
    }

    const parts = line.split(' – '); 
    if (parts.length < 2) continue;

    const englishPartRaw = parts[0].trim();
    // Take the first part of the English definition if multiple are separated by semicolon
    const englishPart = englishPartRaw.split(';')[0].trim();
    
    const detailsPart = parts.slice(1).join(' – ').trim();

    // Regex to find POS (like n., vt., adj.)
    const posRegex = /^(n\.|adj\.|vt\.|vi\.|adv\.)\s*/;
    let romanTransliterationPart = detailsPart.replace(posRegex, '').trim();
    
    // Take only the first Roman transliteration if multiple are provided separated by comma or semicolon
    romanTransliterationPart = romanTransliterationPart.split(/[,;]/)[0].trim();
    
    // If romanTransliterationPart contains further explanation in parentheses, remove it
    romanTransliterationPart = romanTransliterationPart.replace(/\s*\(.*?\)\s*/g, '').trim();


    if (!englishPart || !romanTransliterationPart) {
        console.warn("Skipping line due to missing English or Roman part:", line);
        continue;
    }

    const olChikiScript = convertRomanKeyToOlChiki(romanTransliterationPart);
    
    const uniqueKey = `${englishPart.toLowerCase()}-${romanTransliterationPart.toLowerCase()}`;
    if (uniqueEntryChecker.has(uniqueKey)) {
        // console.warn(`Skipping duplicate entry for uniqueKey: ${uniqueKey} from line: ${line}`);
        continue; 
    }
    uniqueEntryChecker.add(uniqueKey);

    entries.push({
      id: `genDict_${entryIdCounter++}`,
      english: englishPart, 
      transliteration: romanTransliterationPart,
      olChiki: olChikiScript,
    });
  }
  return entries;
}

const newDictionaryDataString = `
add – vt. SELED;
addition – n. SELED;
address – n. BUtA.; tHIKA.nA;
adjective – n. GUnUn;
adverb – n. TonoZ;
all – adj. SAnAm; JoTo; JAKAT;
angle – n. KOnA; KoNM;
animal – n. JAnWoR;
association – n. SEmLED;
bad – adj. BA.ZIJ; BAF_tHIK;
beginning – ge. ETohoB; EhoB;
big – adj. SE:MA; mARAF;
bird – n. CE:ME.;
black – adj. hE:DE.;
blacken – vt. hE:DE.;
blue – adj. LIL;
boil – vt., vi. hE:dE.J; hEdEJ;
bone – n. JAF;
book – n. PoToB; PUTHI;
boy – n. KoZA GIDX_RA.; BA.BU GIDX_RA.;
brain – n. hATAF; BHEJA;
break – vt., vi. RA.PUD;
bring – vt. A.GU;
broken – adj. RA.PUD;
cat – n. PUSI;
chief minister – n. SIRA. monTRI;
child – n. GIDX_RA.; hoPon;
collection – n. JARWA; JAWRA;
column – n. TINGU THAR; GITIJ THAR – n. row;
colour – n., vt. RoF;
complete – adj. PURA.; vt. SA.T; CABA;
compose – vt. GABAn;
composition – n. GABAn;
conjunction – n. TonoF;
consonant – n. KECED AZAF; PARhAZ KECED AZAF – n. unaspirated consonant; TA.PUG KECED AZAF – n. semi-consonant or glottalized consonant; RAZAF KECED AZAF – n. nasal consonant; JETLED KECED AZAF – n. sticky consonant;
continuous – adj. CoLoT;
count – vt. LEKHA; vi. BHoRSA;
country – n., adj. DISom;
cry – n., vi. RAG;
dance – n., vi. EnEJ;
decide – vt. tHA.WKA.;
decision – n. tHA.WKA.;
depend – vi. BHoRSA;
digit – n. EL;
direction – n. PAStA; PAhtA; SED; DISA.;
divide – vt. hA.tIQ; BHAGX; JUZU;
dividend – n. hAtAMCA;
divider – n. hAtAMhA;
division – n. hAtAM; hA.tIQ; BHAGX;
do – vt. KoRAW; KA.mI;
dog – n. SETA;
drink – n. QU~ JInIS; vt. QU~;
drop – n. tHoP; BUNDX; vt., vi. QUR;
dry – adj., vt., vi. RohoZ;
eat – vt., vi. Jom;
eatable – n. Jom; Jom_QU~; adj. JomAG JANhAN Jom DAZEGoG_A;
eight – n., adj. IRA.L;
eighth – adj. IRA.LAG; IRA.LIJ;
end – n., vt., vi. mUCA.D;
environment – n. SACARhE;
example – n. QECEL;
fact – n. SA.RI KATHA;
fan – n. PAFKHA;
far – adj. SA:GIQ;
fast – adv. LoGon;
fat – n. ITIL; CoRBI; adj. motA;
fifth – adj. moMEYAG; moMEYIJ;
fight – n., vi. TAPAm;
figure – n. RUP; CHoBI;
finish – vt. SA.T; CABA;
fire – n. SE:GE.L; vi. tHU;
first – adj. mAMAF; mAMAFAG; PUYLUWAG; mAMAFIJ; PUYLUYIJ; mIDAG; mIDIJ;
fish – n. hA.KU;
five – n. moME; adj. moME; moME GotEJ;
fly – n. Ro~; vi. UdA.W;
food – n. Jom, Jom_QU~; JomAG; Jom_QUWAG;
form – n. RUP; vt, vi. . BE.nAW;
four – n. PUn; adj. PUn; PUnYA.;
fourth – adj. PUnA.G; PUnIJ;
fox – n. TUYU;
frog – n. RotE;
fry – n., vt. BHA.JI;
function – n. KA.mI;
future – adj. DARAY; AGAm;
garden – n. BAGAn;
gather – vt., vi. JARWA; JAWRA;
gender – n. JAnAF; masculine gender – n. KoZA JAnAF; feminine gender – n. KUZI JAnAF; neuter gender – n. hAD JAnAF; common gender – n. JA.T JAnAF;
geography – n. oTno; DoRYATno;
girl – n. KUZI~ GIDX_RA.; mA.Y GIDX_RA.;
give – vt. Em;
go – vi. SEn; CALAW;
good – adj. BES;
grammar – n. RonoZ;
heap – n. PUNJI;
hill – n. BURU; dUNGX_RI;
history – n. nAGAm;
imprison – vt. JIhoL;
include – vt. ANGoC;
interjection – n. hAnAW;
intransitive – adj. onoG;
jail – n. JIhoL;
join – n., vt., vi. KHoNJA;
joint – n. KHoNJA;
keep – vt. Doho;
kind(of) – n. ToRon;
kind – adj. DoYALU;
know – vt. BAdAY; BAZAY;
language – n. RoZ; BHASA;
laugh – vi. LANDA;
law – n. nIYom; KA.nUn;
length – n. JHA.L;
lengthen – vt. JHA.L;
life – n. JIWI~; JIBon;
live – vi. TANhEn;
line – n. GAR;
literature – n. SAVhED;
long – adj. JHA.L;
lubricate – vt. SUnUm;
man (human being) – n. hoZ;
man (as a male) – n. KoZA;
marriage – n. BAPLA;
mathematician – n. ELKHARIYA.;
mathematics – n. ELKHA;
meat – n. JIL;
medicine – n. RAn;
meet – vi. QAPAm;
meeting – n. mIDUn;
milk – n. TOWA; ToWA; vt. DUhA.W;
motion – n. CoLoT;
mountain – n. BURU;
mud – n. LoSoD;
name – n., vt. QUTUm;
news – n. KHoBoR;
nine – n., adj. ARE;
ninth – adj. AREYAG; AREYIJ;
noun – n. QUnUm;
now – adv. nIToG; nIToF; nIT;
number (in grammar) – n. GotAn; singular number – n. mID GotAn; dual number – n. BAR GotAn; plural number – n. SANGE GotAn;
number (in mathematics) – n. LEKHA;
object (in grammar) – n. JoToS;
oil – n., vt. SUnUm;
old – adj. mARE; mAREnAG;
one – n. mID; adj. mID; mIDtIJ;
page – n. SAhtA;
parts of speech – n. PA.RIS;
past – n., adj. EnAF; SEDAY; PA.hIL;
perfect – adj. SA.TA.n;
person (in grammar) – n. GoRon; first person – n. mAMAF GoRon; second person – n. SAmAF GoRon; third person – n. SA:GIQ GoRon;
person – n. hoZ;
picture – n. CHoBI;
place – n. JAYGA; vt. tHANV;
point – n. tUdA.G; BInDU; vi. UDUG;
position – n. tHANV;
postposition – n. GA:nA.t;
preface – n. onoZ;
present – adj. nITAF; nAhAG;
president – n. PARSET;
press – vt. oTA;
previous – adj. PA.hIL; mAMAF;
prime minister – n. mARAF monTRI;
prison – n. JIhoL;
procession – n. mICHIL;
pronoun – n. UQUm; QUnUm;
queen – n. RA.nI;
quotient – n. hAZA; JUZU;
rat – n. GUdU; CUtU; SARGA; CUNDX;
recognition – n. UPURUm;
red – adj. ARAG;
relation – n. SA.GA.Y;
remainder – n. hAtAMSA; SAREJ;
root – n. REhED; BUtA; PHEZAT; JAF;
row – n. GITIJ THAR; PAnTE;
rule – n. nIYom;
save – vt. BAQCAW;
schedule – n. DHAP;
school – n. ASnA;
science – n. SANMES;
search – vt., vi. PAnTE;
second – adj. BARAG; DoSARAG; BARIJ; DoSARIJ; DoSAR; mID SE.KE.nd SomoY;
secretary – n. SUTRET; assistant secretary – n. JoGo SUTRET;
see – vt., vi. QEL;
seed – n. JAF; ITA.;
send – vt. BHEJA;
sentence – n. A.YA.T;
set – n. JARWA; JAWRA;
seven – n., adj. EYAY;
seventh – adj. EYAYAG; EYAYIJ;
share – n. JUZU; hA.tIQ; BHAGX; hAZA; vt. hA.tIQ; BHAGX;
shoe – n. PAnAhI; JUTA.;
sin – n., vi. PAP;
sinner – n. PA.PI;
sit – vi. DUZUB;
six – n., adj. TURUY;
sixth – adj. TURUYAG; TURUYIJ;
sleep – n., vi. JA.PID;
slim – adj., vi. PATLA; moRA;
small – adj. hUdIQ; hoPon;
smell – vt. JI~; n., vi. So~;
smile – n., vi. LANDA;
smoke – n. DHUNVA; vi. PUNGI QU~;
snake – n. BIQ;
society – n. SAVTA;
soil – n., vi. hASA;
soul – n. JIWI~;
sound – n., vi. SAdE; SAZE;
space – n. PHADA; JAYGA;
speak – vt., vi. RoZ; mEn;
student – n. CETETIYA.; CEDoGIJ;
subject – n. mUTA.n;
subtract – vt. BHEGED;
subtraction – n. BHEGED;
take – vt. IDI;
tall – adj. USUL;
talk – vi. RoZ; BHASon Em;
tea – n. CA;
teach – vt. PAZhAW;
teacher – n. mACET;
tell – vt. RoZ; mEn;
ten – n., adj. GEL;
tenth – adj. GELAG; GELIJ;
tense – n. nAF;
thing – n. JInIS;
third – adj. PEYAG; TESARAG; PEYIJ; TESARIJ; TESAR;
three – n. PE; adj. PE; PEYA;
throw – vt. CAPAD;
tiger – n. TA.RUB;
time – n. tAZAF; SomoY; oKTo;
transitive – adj. EnED;
two – n. BAR; adj. BAR; BARYA;
understand – vt., vi. BUJHA.W;
verb – n. KAnWA;
village – n. A.TU;
vowel – n. RAhA AZAF;
volcano – n. SE:GE.L BURU;
war – n. LA.ZhA.Y; JUDXDHo~;
water – n. DAG;
white – adj. PUNM;
wire – n. TAR;
woman – n. KUZI~; old woman – n. BUZhI; BUdHI;
word – n. A.ZA.;
write – vt., vi. oL;
writer – n. onoLIYA.;
earth; ground – n. oT;
`;

const parsedNewWords = parseDictionaryEntries(newDictionaryDataString);

// Merge new words with existing expandedGeneralVocabulary, ensuring uniqueness
const existingExpandedVocab = categorizedOlChikiWords["Expanded General Vocabulary"] || [];
const combinedVocabulary = [...existingExpandedVocab, ...parsedNewWords];

// Ensure uniqueness based on a combination of English and Roman transliteration
const uniqueEntriesMap = new Map<string, OlChikiWord>();
combinedVocabulary.forEach(item => {
    const key = `${item.english.toLowerCase().trim()}-${item.transliteration.toLowerCase().trim()}`;
    if (!uniqueEntriesMap.has(key)) {
        uniqueEntriesMap.set(key, item);
    }
});

categorizedOlChikiWords["Expanded General Vocabulary"] = Array.from(uniqueEntriesMap.values());

// Re-export allOlChikiWords after updates
export const allOlChikiWords: OlChikiWord[] = Object.values(categorizedOlChikiWords).flat();

console.log(`Total entries in 'Expanded General Vocabulary' after merging: ${categorizedOlChikiWords["Expanded General Vocabulary"].length}`);
console.log(`Total unique entries in allOlChikiWords: ${allOlChikiWords.length}`);

    
