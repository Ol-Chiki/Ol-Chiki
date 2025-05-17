
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

export const categorizedOlChikiWords: Record<string, OlChikiWord[]> = {
  "Animals": [
    { id: 'a1', olChiki: 'ᱥᱮᱛᱟ', transliteration: 'seta', english: 'Dog' },
    { id: 'a2', olChiki: 'ᱜᱟᱹᱭ', transliteration: 'găi', english: 'Cow' },
    { id: 'a3', olChiki: 'ᱪᱮᱬᱮ', transliteration: 'cɛ̃ṛɛ', english: 'Bird' }, // General bird, will be distinct from new Bird category
    { id: 'a4', olChiki: 'ᱦᱟᱹᱠᱩ', transliteration: 'haku', english: 'Fish' },
    { id: 'a5', olChiki: 'ᱵᱤᱛᱠᱤᱞ', transliteration: 'bitkil', english: 'Cat' }, 
    { id: 'a6', olChiki: 'ᱢᱮᱨᱚᱢ', transliteration: 'merom', english: 'Goat' },
    { id: 'a7', olChiki: 'ᱠᱩᱞᱟᱹᱭ', transliteration: 'kulay', english: 'Rabbit' },
    { id: 'a8', olChiki: 'ᱪᱤᱛᱟᱹ', transliteration: 'chitar', english: 'Panther' },
    { id: 'a9', olChiki: 'ᱠᱟᱴᱟᱣᱟ ᱛᱟᱹᱨᱩᱵ', transliteration: 'katwa tarub', english: 'Lion' },
    { id: 'a10', olChiki: 'ᱛᱟᱹᱨᱩᱵ', transliteration: 'tarub', english: 'Tiger' },
    { id: 'a11', olChiki: 'ᱵᱤᱨ ᱥᱩᱠᱨᱤ', transliteration: 'bir sukri', english: 'Boar' },
    { id: 'a12', olChiki: 'ᱵᱟᱱᱟ', transliteration: 'bana', english: 'Bear' },
    { id: 'a13', olChiki: 'ᱦᱟᱹᱬᱩ', transliteration: 'hanu', english: 'Monkey' },
    { id: 'a14', olChiki: 'ᱵᱤᱨᱦᱚᱲ', transliteration: 'bir hanu', english: 'Gorilla' },
    { id: 'a15', olChiki: 'ᱦᱟᱹᱛᱤ', transliteration: 'hati', english: 'Elephant' },
    { id: 'a16', olChiki: 'ᱡᱤᱞ', transliteration: 'jil', english: 'Deer' },
    { id: 'a18', olChiki: 'ᱛᱩᱭᱩ', transliteration: 'tuyu', english: 'Fox' },
    { id: 'a19', olChiki: 'ᱦᱟᱰᱜᱟᱨ', transliteration: 'hadgar', english: 'Hyena' },
    { id: 'a20', olChiki: 'ᱡᱤᱞ ᱦᱤᱡ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'jil hij gidra', english: 'Fawn' },
    { id: 'a21', olChiki: 'ᱛᱩᱲ', transliteration: 'tud', english: 'Squirrel' },
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
    { id: 'a34', olChiki: 'ᱢᱮᱨᱚᱢ', transliteration: 'merom', english: 'He goat' }, 
    { id: 'a35', olChiki: 'ᱮᱸᱜᱟ ᱢᱮᱨᱚᱢ', transliteration: 'enga merom', english: 'She goat' },
    { id: 'a36', olChiki: 'ᱢᱮᱨᱚᱢ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'merom gidra', english: 'Kid' },
    { id: 'a37', olChiki: 'ᱫᱟᱢᱠᱚᱢ', transliteration: 'damkom', english: 'Calf' },
    { id: 'a38', olChiki: 'ᱯᱩᱥᱤ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'pusi gidra', english: 'Kitten' },
    { id: 'a39', olChiki: 'ᱰᱟᱝᱨᱟ', transliteration: 'dangra', english: 'Ox' },
    { id: 'a40', olChiki: 'ᱵᱷᱤᱰᱤ ᱜᱤᱫᱽᱨᱟᱹ', transliteration: 'bhidi gidra', english: 'Lamb' },
    { id: 'a41', olChiki: 'ᱠᱟᱲᱟ', transliteration: 'kada', english: 'Buffalo' },
    { id: 'a42', olChiki: 'ᱥᱮᱸᱫᱽᱨᱟ ᱥᱮᱛᱟ', transliteration: 'sendra seta', english: 'Hound' }, // Corrected Hoond
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
    { id: 'f2', olChiki: 'ᱩᱛᱩ', transliteration: 'utu', english: 'Curry/Vegetable Dish' },
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
    { id: 'rel9', olChiki: 'ᱜᱚᱲᱚᱢ ᱦᱚᱲᱟᱢ', transliteration: 'godom hadam', english: 'Maternal Grandfather' },
    { id: 'rel10', olChiki: 'ᱜᱚᱲᱚᱢ ᱵᱩᱲᱷᱤ', transliteration: 'godom budhi', english: 'Maternal Grandmother' },
    { id: 'rel11', olChiki: 'ᱡᱟᱶᱟᱭ', transliteration: 'jaway gomke', english: 'Husband' },
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
  "Other Common Words": [
    { id: 'o1', olChiki: 'ᱤᱥᱠᱩᱞ', transliteration: 'iskul', english: 'School' },
    { id: 'o2', olChiki: 'ᱵᱟᱡᱟᱨ', transliteration: 'bajar', english: 'Market' },
    { id: 'o3', olChiki: 'ᱦᱚᱲ', transliteration: 'hɔṛ', english: 'Person/Man' },
    { id: 'o4', olChiki: 'ᱟᱹᱛᱩ', transliteration: 'ạtu', english: 'Village' },
    { id: 'o5', olChiki: 'ᱧᱩᱛᱟᱹ', transliteration: 'ñutạ̈', english: 'Night' },
    { id: 'o6', olChiki: 'ᱥᱮᱛᱟᱜ', transliteration: 'setag', english: 'Morning' },
    { id: 'o7', olChiki: 'ᱟᱭᱩᱵ', transliteration: 'ayub', english: 'Evening' },
  ]
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

  if (n % 10 === 0 && n >= 30 && n < 100) { 
    return `${santaliUnitWords[tensDigit]} Gel`;
  }
  if (n >= 30 && n < 100 && n % 10 !== 0) {
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

    
