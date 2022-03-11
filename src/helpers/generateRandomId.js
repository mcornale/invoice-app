const ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const NUM_OF_LETTERS_IN_ID = 2;
const NUM_OF_NUMBERS_IN_ID = 4;

const generateRandomId = () => {
  let id = '';

  const generateRandomLetter = () => {
    return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  };

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10);
  };

  for (let i = 0; i < NUM_OF_LETTERS_IN_ID; i++) {
    id += generateRandomLetter();
  }

  for (let i = 0; i < NUM_OF_NUMBERS_IN_ID; i++) {
    id += generateRandomNumber();
  }

  return id;
};

export default generateRandomId;
