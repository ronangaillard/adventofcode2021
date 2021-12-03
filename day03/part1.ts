import * as fs from 'fs';

const input = fs.readFileSync([__dirname, 'input.txt'].join('/'), 'utf8');

const lines = input.split('\n');

const bitCounter = Array(lines[0].length).fill(0);

let lineNumber = 0;

lines.forEach(line => {
  [...line].forEach((bit, index) => {
    if (bit === '1') {
      bitCounter[index] += 1;
    }
  });

  lineNumber += 1;
});

const gamma = parseInt(
  bitCounter.map(counter => (counter > lineNumber / 2 ? '1' : '0')).join(''),
  2
);

const epsilon = parseInt(
  bitCounter.map(counter => (counter <= lineNumber / 2 ? '1' : '0')).join(''),
  2
);

console.log(gamma * epsilon);
