import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n').map(x => x.split(''));

const OPENING_CHARS = ['(', '{', '[', '<'];
const CLOSING_CHARS = [')', '}', ']', '>'];
const SYNTAX_ERROR_SCORE = [3, 1197, 57, 25137];
const INCOMPLETE_SCORE = [1, 3, 2, 4];

let incompleteScores = [] as number[];

lines.forEach(line => {
  let openings = [] as string[];
  let syntaxErrorCount = 0;
  let syntaxErrorScore = 0;

  for (let i = 0; i < line.length; i += 1) {
    if (OPENING_CHARS.includes(line[i])) {
      openings.push(line[i]);
    } else {
      const charIndex = CLOSING_CHARS.findIndex(x => x === line[i]);
      if (OPENING_CHARS[charIndex] !== openings[openings.length - 1]) {
        syntaxErrorCount += 1;

        syntaxErrorScore += SYNTAX_ERROR_SCORE[charIndex];
      }
      openings.pop();
    }

    if (syntaxErrorCount === 1) {
      break;
    }
  }

  if (syntaxErrorCount === 0) {
    let incompleteScore = 0;
    for (let i = openings.length - 1; i >= 0; i -= 1) {
      const charIndex = OPENING_CHARS.findIndex(x => x === openings[i]);

      incompleteScore *= 5;
      incompleteScore += INCOMPLETE_SCORE[charIndex];
    }

    incompleteScores.push(incompleteScore);
  }
});

console.log(incompleteScores.sort((a, b) => a - b)[Math.floor((incompleteScores.length - 1) / 2)]);
